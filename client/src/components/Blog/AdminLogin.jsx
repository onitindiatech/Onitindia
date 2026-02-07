import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("onit_admin", "true");
        alert("✅ Welcome back, Admin!");
        navigate("/admin-dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e3eafc] to-[#D9EEE3] px-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-sm transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            <span className="text-black">On</span>
            <span className="text-green-500">IT</span>
          </h1>
          <p className="text-gray-600 text-sm">Admin Login Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-black transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          Only authorized admin can access this portal.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
