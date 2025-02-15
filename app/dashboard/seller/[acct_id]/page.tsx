"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/**
 * Minimal type for the seller user 
 */
type SellerUser = {
  account_id: string;
  firstname: string;
  lastname: string;
};

export default function SellerDashboard() {
  const { acct_id } = useParams() as { acct_id: string };
  const [seller, setSeller] = useState<SellerUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSellerData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          const msg = await res.text();
          setError(`Error fetching seller data: ${msg}`);
          setLoading(false);
          return;
        }
        const data: SellerUser[] | SellerUser = await res.json();

        setSeller(data as SellerUser);

      } catch (err) {
        setError(`Error loading seller: ${String(err)}`);
      } finally {
        setLoading(false);
      }
    }

    loadSellerData();
  }, [acct_id]);

  if (loading) {
    return <p className="p-4">Loading seller data...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error || "Seller data not found."}
      </div>
    );
  }

  if (!seller) {
    return <p className="p-4 text-red-600">No seller data returned.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-dark-brown">
          Welcome, {seller.firstname} {seller.lastname}!
        </h1>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Edit Profile */}
        <Link href={`/dashboard/seller/${acct_id}/profile`}>
          <div className="bg-light-green p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-green hover:text-white transition">
            <h2 className="text-xl font-semibold">👩 Edit Profile</h2>
            <p className="text-sm">Manage your personal and business details.</p>
          </div>
        </Link>

        {/* View Public Profile */}
        <Link href={`/dashboard/seller/${acct_id}/public`}>
          <div className="bg-dark-brown text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-light-brown transition">
            <h2 className="text-xl font-semibold">🌍 View Public Profile</h2>
            <p className="text-sm">See how your profile appears to others.</p>
          </div>
        </Link>

        {/* View Listings */}
        <Link href={`/dashboard/seller/${acct_id}/listings`}>
          <div className="bg-light-brown p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-brown hover:text-white transition">
            <h2 className="text-xl font-semibold">📦 View Listings</h2>
            <p className="text-sm">Check all your active product listings.</p>
          </div>
        </Link>

        {/* Edit Listings */}
        <Link href={`/dashboard/seller/${acct_id}/listings/edit`}>
          <div className="bg-dark-green text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-light-green hover:text-dark-brown transition">
            <h2 className="text-xl font-semibold">✏️ Edit Listings</h2>
            <p className="text-sm">Modify your existing product details.</p>
          </div>
        </Link>

        {/* Add New Listing */}
        <Link href={`/dashboard/seller/${acct_id}/add-listing`}>
          <div className="bg-dark-brown text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-light-brown hover:text-dark-brown transition">
            <h2 className="text-xl font-semibold">➕ Add Listing</h2>
            <p className="text-sm">Create a new product listing for sale.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
