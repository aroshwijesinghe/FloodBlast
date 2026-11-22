export async function demoRequest<T>(path: string, options: { body?: object; token?: string } = {}): Promise<T> {
  const { body, token } = options;
  const response = await fetch(`/api/demo/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  });
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("Start the Vite development server to use the local demo API.");
  }
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result as T;
}
