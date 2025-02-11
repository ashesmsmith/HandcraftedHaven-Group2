"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!userEmail || !userPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (userPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Store credentials in localStorage
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userPassword", userPassword);

        alert("Signup successful! Redirecting to login...");
        setTimeout(() => {
            router.push("/dashboard/auth/login");
        }, 2000);
    };

    return (
      <section className="container mx-auto px-4 py-10 flex justify-center items-center">
        <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSignUp}>
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block mb-1 font-medium text-dark-brown">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
                placeholder="Confirm Password"
              />
            </div>
  
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold"
            >
              Sign Up
            </button>
          </form>
  
          {/* Login Link */}
          <div className="mt-4">
            <a href="/dashboard/auth/login" className="text-sm text-dark-brown/70 hover:underline">
              Already have an account? Login here.
            </a>
          </div>
        </div>
      </section>
    );
}
