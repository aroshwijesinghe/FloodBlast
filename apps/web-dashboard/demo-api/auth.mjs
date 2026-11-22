import { randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { HttpError } from "./http.mjs";

const otpLifetime = 5 * 60_000;
const sessionLifetime = 8 * 60 * 60_000;
const resendDelay = 30_000;

export function normalizePhone(value) {
  const phone = typeof value === "string" ? value.replace(/[ -]/g, "") : "";
  if (/^\+947\d{8}$/.test(phone)) return phone;
  throw new HttpError(400, "Enter a Sri Lankan mobile number starting with +94.");
}

export function createDonorAuth(sendOtp, now = Date.now) {
  const challenges = new Map();
  const sessions = new Map();

  function removeExpired(records) {
    for (const [key, record] of records) {
      if (record.expiresAt <= now()) records.delete(key);
    }
  }

  return {
    issue(value) {
      const phone = normalizePhone(value);
      removeExpired(challenges);
      const issuedAt = now();
      if (issuedAt < (challenges.get(phone)?.issuedAt ?? -Infinity) + resendDelay) {
        throw new HttpError(429, "Wait 30 seconds before requesting another code.");
      }
      if (challenges.size >= 500) throw new HttpError(429, "Please try again shortly.");
      const code = String(randomInt(1_000_000)).padStart(6, "0");
      challenges.set(phone, { code, attempts: 0, issuedAt, expiresAt: issuedAt + otpLifetime });
      return { phone, expiresIn: otpLifetime / 1000, ...sendOtp(phone, code) };
    },
    verify(value, code) {
      const phone = normalizePhone(value);
      removeExpired(challenges);
      const challenge = challenges.get(phone);
      if (!challenge || challenge.attempts >= 5) throw new HttpError(401, "Request a new verification code.");
      challenge.attempts += 1;
      if (typeof code !== "string" || !/^\d{6}$/.test(code) ||
          !timingSafeEqual(Buffer.from(code), Buffer.from(challenge.code))) {
        throw new HttpError(401, "The verification code is incorrect.");
      }
      removeExpired(sessions);
      if (sessions.size >= 500) throw new HttpError(429, "Please try again shortly.");
      challenges.delete(phone);
      const token = randomBytes(32).toString("base64url");
      sessions.set(token, { phone, expiresAt: now() + sessionLifetime });
      return { phone, token };
    },
    authenticate(header) {
      const token = header?.match(/^Bearer ([\w-]+)$/)?.[1];
      const session = sessions.get(token);
      if (session && session.expiresAt > now()) return session.phone;
      sessions.delete(token);
      throw new HttpError(401, "Verify your donor phone number first.");
    },
    signOut(header) {
      sessions.delete(header?.match(/^Bearer ([\w-]+)$/)?.[1]);
    },
  };
}
