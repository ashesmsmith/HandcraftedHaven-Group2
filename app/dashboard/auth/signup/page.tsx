"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Basic checks
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const account_type = "Seller";

      // Call our /api/auth/register route
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          account_type,
          firstName,
          lastName,
          businessName
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // 2. On success
      alert("Registration successful. You can now log in.");
      router.push("/dashboard/auth/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong during signup.");
    }
  }

  return (
    <section className="container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">
          Sign Up
        </h1>
        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-dark-brown">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded 
                         focus:outline-none focus:ring-2 focus:ring-dark-green"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-dark-brown">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-dark-green"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm */}
          <div>
            <label htmlFor="confirm-password" className="block mb-1 font-medium text-dark-brown">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-dark-green"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Optional extra fields */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">First Name</label>
            <input
              type="text"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-dark-brown">Last Name</label>
            <input
              type="text"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-dark-brown">Business Name</label>
            <input
              type="text"
              className="w-full border border-dark-brown/20 px-3 py-2 rounded"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
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
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-4">
          <a href="/dashboard/auth/login" className="text-sm text-dark-brown/70 hover:underline">
            Already have an account? Login here.
          </a>
        </div>
      </div>
    </section>
  );
}
