"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        // Retrieve stored credentials
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (!storedEmail) {
            setError("Account not found. Please sign up.");
            return;
        }

        if (userEmail === storedEmail) {
            if (userPassword === storedPassword) {
                alert("Login successful! Redirecting to dashboard...");
                localStorage.setItem("isLoggedIn", "true");

                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else {
                setError("Incorrect password. Please try again.");
            }
        } else {
            setError("Account not found. Please sign up.");
        }
    };

    return (
      <section className="container mx-auto px-4 py-10 flex justify-center items-center">
        <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">
            Customer Login
          </h1>
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
                placeholder="email@email.com"
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