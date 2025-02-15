"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      // POST to our /api/auth/login route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // data => { message, acct_id, account_type }
      alert("Login successful!");

      // Set localStorage so user stays logged in
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("acct_id", data.acct_id);

      if (data.account_type === "Seller") {
        router.push(`/dashboard/seller/${data.acct_id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong during login.");
    }
  }

  return (
    <section className="container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">Email</label>
            <input
              type="email"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-dark-green"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">Password</label>
            <input
              type="password"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-dark-green"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="bg-dark-brown text-cream w-full py-2 rounded
                       hover:bg-light-brown hover:text-white transition-colors
                       font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4">
          <a
            href="/dashboard/auth/signup"
            className="text-sm text-dark-brown/70 hover:underline"
          >
            Need an account? Sign up here.
          </a>
        </div>
      </div>
    </section>
  );
}
