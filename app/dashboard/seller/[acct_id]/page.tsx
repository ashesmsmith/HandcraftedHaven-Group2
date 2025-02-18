"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type SellerUser = {
  account_id: string;
  firstName?: string;
  firstname?: string;
  lastName?: string;
  lastname?: string;
};

export default function SellerDashboard() {
  const { acct_id } = useParams<{ acct_id: string }>();
  const [seller, setSeller] = useState<SellerUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSellerData() {
      try {
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          setError(`Error fetching seller data: ${await res.text()}`);
          return;
        }
        const data: SellerUser = await res.json();
        setSeller({
          account_id: data.account_id,
          firstName: data.firstName || data.firstname || "",
          lastName: data.lastName || data.lastname || "",
        });
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
    return <div className="p-4 text-red-600">{error || "Seller data not found."}</div>;
  }

  if (!seller) {
    return <p className="p-4 text-red-600">No seller data returned.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-[#535E1C]">
          Welcome, {seller.firstName} {seller.lastName}!
        </h1>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href={`/dashboard/seller/${acct_id}/profile`}>
          <div className="bg-[#535E1C] text-white p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#444D16]">
            <h2 className="text-xl font-semibold">👩 Edit Profile</h2>
            <p className="text-sm">Manage your personal and business details.</p>
          </div>
        </Link>

        <Link href={`/dashboard/seller/${acct_id}/public`}>
          <div className="bg-[#BBC191] text-black p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#A1A67F]">
            <h2 className="text-xl font-semibold">🌍 View Public Profile</h2>
            <p className="text-sm">See how your profile appears to others.</p>
          </div>
        </Link>

        <Link href={`/dashboard/seller/${acct_id}/listings`}>
          <div className="bg-[#8A5D3D] text-white p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#754D33]">
            <h2 className="text-xl font-semibold">📦 View/Edit Listings</h2>
            <p className="text-sm">Check and manage your product listings.</p>
          </div>
        </Link>

        <Link href={`/dashboard/seller/${acct_id}/add-listing`}>
          <div className="bg-[#543A27] text-white p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#482F22]">
            <h2 className="text-xl font-semibold">➕ Add Listing</h2>
            <p className="text-sm">Create a new product listing for sale.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
