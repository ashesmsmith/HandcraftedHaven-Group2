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
  const [accountType, setAccountType] = useState("Seller");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log("Sending Signup Request...");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          account_type: accountType,
          firstName,
          lastName,
          businessName
        })
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

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
            <label className="block mb-1 font-medium text-dark-brown">Email</label>
            <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">Password</label>
            <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">Confirm Password</label>
            <input type="password" className="w-full border px-3 py-2 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">First Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-medium text-dark-brown">Last Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown transition-colors font-semibold">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
