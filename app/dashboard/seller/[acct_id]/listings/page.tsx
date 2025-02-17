"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export type Product = {
  product_id: string;
  productName: string;
  price: number;
  imageSRC: string;
};

export default function SellerListingsPage() {
  const { acct_id } = useParams<{ acct_id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log(`🔍 Fetching seller listings for account ID: ${acct_id}`);
        const res = await fetch(`/api/seller/${acct_id}/products`);

        if (!res.ok) {
          throw new Error(`Failed to fetch listings: ${res.statusText}`);
        }

        const data = await res.json();
        if (!data.products) {
          throw new Error("Response JSON does not contain a 'products' key");
        }

        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching seller products:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [acct_id]);

  if (loading) return <div className="p-4">Loading listings...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Listings</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div key={prod.product_id} className="border rounded-md p-4 shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src={prod.imageSRC}
                  alt={prod.productName}
                  width={300}
                  height={200}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default_product.webp";
                  }}
                />
              </div>
              <h2 className="text-xl font-semibold text-center">{prod.productName}</h2>
              <p className="text-sm text-center">${Number(prod.price).toFixed(2)}</p>

              {/* Edit Listing Button */}
              <Link href={`/dashboard/seller/${acct_id}/edit/${prod.product_id}`}>
                <button className="mt-4 w-full bg-[#543A27] text-white py-2 rounded hover:bg-[#754D33] transition">
                  Edit Listing
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No listings found.</p>
      )}

      {/* Bottom Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Link href={`/dashboard/seller/${acct_id}`}>
          <button className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Back to Dashboard
          </button>
        </Link>
        <Link href={`/dashboard/seller/${acct_id}/add-listing`}>
          <button className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Add Listing
          </button>
        </Link>
      </div>
    </section>
  );
}
