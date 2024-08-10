export const SERVER_BASE_URL = import.meta.env.DEV
  ? "http://localhost:7777"
  : "https://intervention.jryng.com";

export const API_BASE_URL = `${SERVER_BASE_URL}/api/v1`;
