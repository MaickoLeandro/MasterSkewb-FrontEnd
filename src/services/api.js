const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
const TOKEN_KEY = "masterSkewb.accessToken";

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  let body = options.body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body && typeof body === "object" && !isFormData) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }

  const token = getAuthToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      ...options,
      headers,
      body,
      credentials: "include",
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está em execução.");
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => "");
  }

  if (!response.ok) {
    const mensagem =
      (typeof data === "string" && data) ||
      data?.message ||
      data?.detail ||
      data?.error ||
      `Erro na requisição (${response.status}).`;
    throw new Error(mensagem);
  }

  return data;
}
