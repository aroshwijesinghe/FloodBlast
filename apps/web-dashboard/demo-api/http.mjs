export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function readJson(request) {
  if (request.headers["content-type"]?.split(";")[0] !== "application/json") {
    throw new HttpError(415, "Expected a JSON request.");
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 16_384) {
      // Drain the remaining input so the HTTP response can still be delivered.
      request.resume();
      throw new HttpError(413, "The request is too large.");
    }
    chunks.push(chunk);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (body && typeof body === "object" && !Array.isArray(body)) return body;
  } catch {
    // Use the same response for malformed JSON and unsupported JSON values.
  }
  throw new HttpError(400, "Expected a JSON object.");
}

export function reply(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(data));
}
