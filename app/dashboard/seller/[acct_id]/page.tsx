"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SellerAccountsTable } from "@/app/lib/definitions"; // Or relative path

export default function SellerDashboard() {
  const { acct_id } = useParams() as { acct_id: string };
  const [seller, setSeller] = useState<SellerAccountsTable | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSellerData() {
      try {
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          console.error("Error fetching seller data:", await res.text());
          return;
        }
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.error("Error loading seller data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSellerData();
  }, [acct_id]);

  if (loading) {
    return <p>Loading seller data...</p>;
  }

  if (!seller) {
    return <p>Seller data not found.</p>;
  }

  // Once we have the seller data, display the dashboard
  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold font-serif text-dark-brown">
        Welcome, {seller.firstName} {seller.lastName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* View Profile */}
        <a href={`/dashboard/seller/${acct_id}/profile`}>
          <div className="bg-light-green p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-green hover:text-white transition">
            <h2 className="text-xl font-semibold">👤 View & Edit Profile</h2>
            <p className="text-sm">Manage your personal and business details.</p>
          </div>
        </a>
      </div>
    </section>
  );
}
