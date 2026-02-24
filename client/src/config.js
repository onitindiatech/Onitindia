const isLocalhost = window.location.hostname === "localhost";

export const API_BASE = import.meta.env.VITE_API_URL || (isLocalhost
  ? "http://localhost:5000"
  : ""); // Use relative path in production for combined deployment
