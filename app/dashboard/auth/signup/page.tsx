"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Signup failed.");
                setLoading(false);
                return;
            }

            alert("Signup successful! Redirecting to login...");
            router.push("/dashboard/auth/login");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <section className="container mx-auto px-4 py-10 flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleSignUp}>
                    {/* First Name */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="John" />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="Doe" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="email@example.com" />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="123-456-7890" />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="123 Main St" />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="Password" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-medium text-dark-brown">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full border px-3 py-2 rounded" placeholder="Confirm Password" />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Sign Up Button */}
                    <button type="submit" className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-4">
                    <a href="/dashboard/auth/login" className="text-sm text-dark-brown/70 hover:underline">Already have an account? Login here.</a>
                </div>
            </div>
        </section>
    );
}
