import { apiRequest } from "./api.js";

export function fazerLogin(email, password) {
  return apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: { email, password },
  });
}
