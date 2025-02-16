"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchProductsBySeller, Product } from "@/lib/products";

type SellerUser = {
  account_id: string;
  firstName?: string;
  firstname?: string;
  lastName?: string;
  lastname?: string;
};

export default function SellerDashboard() {
  const { acct_id } = useParams() as { acct_id: string };
  const [seller, setSeller] = useState<SellerUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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
        const sellerObj = Array.isArray(data) ? data[0] : data;
        setSeller({
          account_id: sellerObj.account_id,
          firstName: sellerObj.firstName || sellerObj.firstname || "",
          lastName: sellerObj.lastName || sellerObj.lastname || "",
        });
      } catch (err) {
        setError(`Error loading seller: ${String(err)}`);
      } finally {
        setLoading(false);
      }
    }
    loadSellerData();
  }, [acct_id]);

  useEffect(() => {
    async function loadSellerProducts() {
      try {
        const sellerProducts = await fetchProductsBySeller(acct_id);
        setProducts(sellerProducts);
      } catch (error) {
        console.error("Error fetching seller products:", error);
      }
    }
    loadSellerProducts();
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

  // Use combined view/edit listings page link.
  const viewEditListingsLink = `/dashboard/seller/${acct_id}/listings`;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-[#535E1C]">
          Welcome, {seller.firstName} {seller.lastName}!
        </h1>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edit Profile */}
        <Link href={`/dashboard/seller/${acct_id}/profile`}>
          <div className="bg-[#535E1C] text-white p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#444D16]">
            <h2 className="text-xl font-semibold">👩 Edit Profile</h2>
            <p className="text-sm">Manage your personal and business details.</p>
          </div>
        </Link>

        {/* View Public Profile */}
        <Link href={`/dashboard/seller/${acct_id}/public`}>
          <div className="bg-[#BBC191] text-black p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#A1A67F]">
            <h2 className="text-xl font-semibold">🌍 View Public Profile</h2>
            <p className="text-sm">See how your profile appears to others.</p>
          </div>
        </Link>

        {/* View/Edit Listings */}
        <Link href={viewEditListingsLink}>
          <div className="bg-[#8A5D3D] text-white p-6 rounded-lg shadow-md cursor-pointer transition hover:bg-[#754D33]">
            <h2 className="text-xl font-semibold">📦 View/Edit Listings</h2>
            <p className="text-sm">Check and manage your product listings.</p>
          </div>
        </Link>

        {/* Add New Listing */}
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
