const isLocalhost = window.location.hostname === "localhost";

export const API_BASE = isLocalhost
  ? "http://localhost:5000"              // Local backend
  : "https://onitindia.onrender.com";    // Render backend
