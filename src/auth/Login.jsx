import React, { useState } from "react";
import "../index.css";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500)); // mock latency

    // Allow login for any non-empty email/password
    if (email?.trim() && password?.trim()) {
      const isAdmin =
        email.trim().toLowerCase() === "admin@example.com" &&
        password === "admin";

      const user = {
        id: isAdmin ? 1 : Date.now(),
        name: isAdmin ? "Admin" : email.split("@")[0],
        email: email.trim(),
        role: isAdmin ? "Admin" : "User",
      };

      window.dispatchEvent(new CustomEvent("auth:login", { detail: user }));
      onSuccess?.(user);
    } else {
      setError("Please enter both email and password");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#003d3b] p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#012e2c] p-8 shadow-2xl shadow-black/40">
        <h2 className="text-center text-3xl font-bold text-white">Sign in</h2>
        <p className="mb-6 text-center text-sm text-gray-400">
          Use <span className="font-mono text-teal-400">admin@example.com</span>{" "}
          / <span className="font-mono text-teal-400">admin</span>
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-600/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Auth App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
