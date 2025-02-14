"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Retrieve stored credentials from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const storedUserType = localStorage.getItem("userType"); // e.g., "Seller" or "Customer"
    const storedAcctId = localStorage.getItem("acct_id");    // The seller's unique ID

    if (!storedEmail || !storedPassword || !storedUserType) {
      setError("Account not found. Please sign up.");
      return;
    }

    // Check if userEmail matches storedEmail
    if (userEmail !== storedEmail) {
      setError("Account not found. Please sign up.");
      return;
    }

    // Check if password matches
    if (userPassword !== storedPassword) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // If we get here, credentials match
    alert("Login successful! Redirecting...");
    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      if (storedUserType === "Seller" && storedAcctId) {
        // If user is a seller, push them to their seller dashboard
        router.push(`/dashboard/seller/${storedAcctId}`);
      } else {
        // If user is a customer (or no acct_id), push them to /dashboard
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <section className="container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-dark-brown">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
              placeholder="email@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-dark-brown">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
              placeholder="Password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4">
          <a href="/dashboard/auth/signup" className="text-sm text-dark-brown/70 hover:underline">
            Not a member? Register today.
          </a>
        </div>
      </div>
    </section>
  );
}
