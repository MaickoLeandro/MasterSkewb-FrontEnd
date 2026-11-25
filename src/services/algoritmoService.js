import { apiRequest } from "./api.js";

export function listarMetodos() {
  return apiRequest("/api/v1/metodos");
}

export function listarCasos(methodId) {
  return apiRequest(`/api/v1/metodos/${encodeURIComponent(methodId)}/casos`);
}

export function listarAlgoritmos(methodId, caseId) {
  return apiRequest(
    `/api/v1/metodos/${encodeURIComponent(methodId)}/casos/${encodeURIComponent(caseId)}/algoritmos`
  );
}
