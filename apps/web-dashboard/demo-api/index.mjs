import { createDonorAuth } from "./auth.mjs";
import { HttpError, readJson, reply } from "./http.mjs";
import { createReliefRepository } from "./relief.mjs";

const prefix = "/api/demo/";
const loopback = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

export function createDemoApi() {
  // The local simulator delivers the code to the UI instead of sending an SMS.
  const auth = createDonorAuth((_phone, code) => ({ demoCode: code }));
  const relief = createReliefRepository();

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
      if (request.method === "GET" && path === "relief/requests") return reply(response, 200, relief.list());
      if (request.method === "GET" && path === "donors/pledges") {
        const donor = auth.authenticate(request.headers.authorization);
        return reply(response, 200, relief.history(donor));
      }
      if (request.method === "POST") {
        const body = await readJson(request);
        if (path === "donors/otp") return reply(response, 200, auth.issue(body.phone));
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
