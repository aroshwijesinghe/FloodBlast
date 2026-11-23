import { createDonorAuth } from "./auth.mjs";
import { HttpError, readJson, reply } from "./http.mjs";
import { createReliefRepository } from "./relief.mjs";
import { createDemoOperator } from "./operator.mjs";
import { createShelterRepository } from "./shelters.mjs";

const prefix = "/api/demo/";
const loopback = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

export function createDemoApi() {
  // The local simulator delivers the code to the UI instead of sending an SMS.
  const auth = createDonorAuth((_phone, code) => ({ demoCode: code }));
  const relief = createReliefRepository();
  const operator = createDemoOperator();
  const shelters = createShelterRepository();
  const shelterStreams = new Set();

  function broadcastShelters() {
    const event = `data: ${JSON.stringify(shelters.list())}\n\n`;
    for (const stream of shelterStreams) {
      if (stream.writableNeedDrain) stream.end();
      else stream.write(event);
    }
  }

  return async function demoApi(request, response, next) {
    if (!request.url?.startsWith(prefix)) return next();
    try {
      if (!loopback.has(request.socket.remoteAddress) || request.headers["x-forwarded-for"]) {
        throw new HttpError(403, "The demo API is available on localhost only.");
      }
      const origin = request.headers.origin;
      if (origin && origin !== `http://${request.headers.host}` && origin !== `https://${request.headers.host}`) {
        throw new HttpError(403, "Use the dashboard origin.");
      }
      const path = new URL(request.url, "http://localhost").pathname.slice(prefix.length);
      if (request.method === "GET" && path === "shelters") return reply(response, 200, shelters.list());
      if (request.method === "GET" && path.startsWith("shelters/needs/")) {
        operator.require(request.headers.authorization);
        return reply(response, 200, shelters.needs(path.slice("shelters/needs/".length)));
      }
      if (request.method === "GET" && path === "shelters/events") {
        if (shelterStreams.size >= 100) throw new HttpError(503, "Too many demo shelter streams.");
        response.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" });
        response.write(`data: ${JSON.stringify(shelters.list())}\n\n`);
        shelterStreams.add(response);
        const heartbeat = setInterval(() => {
          if (response.writableNeedDrain) response.end();
          else response.write(": heartbeat\n\n");
        }, 20_000);
        response.once("close", () => {
          shelterStreams.delete(response);
          clearInterval(heartbeat);
        });
        return;
      }
      if (request.method === "GET" && path === "relief/requests") return reply(response, 200, relief.list());
      if (request.method === "GET" && path === "relief/operations") {
        operator.require(request.headers.authorization);
        return reply(response, 200, relief.list(true));
      }
      if (request.method === "GET" && path === "donors/pledges") {
        const donor = auth.authenticate(request.headers.authorization);
        return reply(response, 200, relief.history(donor));
      }
      if (request.method === "POST") {
        const body = await readJson(request);
        if (path === "donors/otp") return reply(response, 200, auth.issue(body.phone));
        if (path === "operators/sign-in") return reply(response, 200, operator.signIn(body.email, body.password));
        if (path === "shelters/audit") {
          operator.require(request.headers.authorization);
          const shelter = shelters.audit(body);
          broadcastShelters();
          return reply(response, 200, shelter);
        }
        if (path === "shelters/occupancy") {
          operator.require(request.headers.authorization);
          const shelter = shelters.updateOccupancy(body);
          broadcastShelters();
          return reply(response, 200, shelter);
        }
        if (path === "shelters/demographics") {
          operator.require(request.headers.authorization);
          return reply(response, 200, shelters.updateDemographics(body));
        }
        if (path === "shelters/publish-lunch") {
          operator.require(request.headers.authorization);
          const shelter = shelters.find(body.id);
          return reply(response, 200, relief.publishLunch(shelter, shelters.needs(shelter.id).mealPacksPerWindow));
        }
        if (path === "relief/fulfillment") {
          operator.require(request.headers.authorization);
          return reply(response, 200, relief.advance(body));
        }
        if (path === "donors/verify") return reply(response, 200, auth.verify(body.phone, body.code));
        if (path === "relief/pledges") {
          const donor = auth.authenticate(request.headers.authorization);
          return reply(response, 201, relief.pledge(donor, body));
        }
        if (path === "donors/sign-out") {
          auth.signOut(request.headers.authorization);
          return reply(response, 200, {});
        }
      }
      throw new HttpError(404, "Demo endpoint not found.");
    } catch (error) {
      if (!(error instanceof HttpError)) console.error(error);
      reply(response, error instanceof HttpError ? error.status : 500,
        { message: error instanceof HttpError ? error.message : "The demo service could not complete the request." });
    }
  };
}
