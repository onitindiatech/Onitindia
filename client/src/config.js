const isLocalhost = window.location.hostname === "localhost";

<<<<<<< HEAD
export const API_BASE = import.meta.env.VITE_API_URL || (isLocalhost
  ? "http://localhost:5000"
  : ""); // Use relative path in production for combined deployment
=======
export const API_BASE = isLocalhost
  ? "http://localhost:5000"              // Local backend
  : "https://onitindia.onrender.com";    // Render backend
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
