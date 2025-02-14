"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SellerAccountsTable } from "@/app/lib/definitions";

export default function SellerProfilePage() {
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
    return <p>Loading seller profile...</p>;
  }

  if (!seller) {
    return <p>Seller profile not found.</p>;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold font-serif text-dark-brown">
        {seller.firstName} {seller.lastName}'s Profile
      </h1>
      <p className="text-lg text-gray-600">Manage your business details below.</p>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <label className="block mb-2 text-lg font-semibold">Business Name</label>
        <input
          type="text"
          value={seller.businessName ?? ""}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />

        <label className="block mt-4 mb-2 text-lg font-semibold">Your Story</label>
        <textarea
          value={seller.story}
          onChange={(e) => /* handle saving if needed */ null}
          className="w-full border p-2 rounded h-32"
        ></textarea>
      </div>
    </section>
  );
}
