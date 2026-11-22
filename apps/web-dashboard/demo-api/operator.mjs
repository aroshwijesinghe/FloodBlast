import { randomBytes, timingSafeEqual } from "node:crypto";
import { HttpError } from "./http.mjs";

export function createDemoOperator() {
  // This credential is deliberately public in the local fixture UI.
  const token = randomBytes(32).toString("base64url");
  return {
    signIn(email, password) {
      if (email !== "officer@floodblast.test" || password !== "FloodDemo24!") {
        throw new HttpError(401, "Use the development workspace account.");
      }
      return { token };
    },
    require(header) {
      const expected = Buffer.from(`Bearer ${token}`);
      const candidate = Buffer.from(header || "");
      if (candidate.length !== expected.length || !timingSafeEqual(candidate, expected)) {
        throw new HttpError(401, "Sign in again with the demo operations account.");
      }
    },
  };
}
