import { demoRequest } from "./api";

const operatorKey = "fb.demo.operator";

export function operatorToken() {
  return sessionStorage.getItem(operatorKey) || undefined;
}

export async function signInOperator(email: string, password: string) {
  sessionStorage.removeItem(operatorKey);
  try {
    const { token } = await demoRequest<{ token: string }>("operators/sign-in", { body: { email, password } });
    sessionStorage.setItem(operatorKey, token);
  } catch {
    // Preserve browser-local sign-in when the optional development API is absent.
  }
}

export function signOutOperator() {
  sessionStorage.removeItem(operatorKey);
}
