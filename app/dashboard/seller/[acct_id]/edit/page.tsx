"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  product_id: string;
  productName: string;
  productDesc: string;
  category: string;
  price: number;
  imageSRC: string;
}

export default function SellerListingsPage() {
  const params = (useParams() ?? {}) as Record<string, string>;
  const acct_id = params.acct_id ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      if (!acct_id) {
        setStatusMsg("Invalid account ID.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching products for account:", acct_id);
        const res = await fetch(`/api/seller/${acct_id}/products`);
        if (!res.ok) throw new Error("Failed to fetch products.");

        const data = await res.json();
        setProducts(data.products);
        console.log("Products loaded:", data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatusMsg("Error loading product listings.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [acct_id]);

  if (loading) return <div className="p-4">Loading products...</div>;
  if (!products.length) return <div className="p-4 text-gray-600">{statusMsg || "No products found."}</div>;

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Your Listings</h1>

      {statusMsg && <div className="text-red-600">{statusMsg}</div>}

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.product_id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.productName}</h2>
            <p>{product.productDesc}</p>
            <p className="text-gray-500">${product.price}</p>

            <div className="mt-4 flex gap-4">
              <Link href={`/dashboard/seller/${acct_id}/edit/${product.product_id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Edit
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Back to Dashboard Button */}
      <div className="mt-6 flex justify-center">
        <Link href={`/dashboard/seller/${acct_id}`}>
          <button className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
}
