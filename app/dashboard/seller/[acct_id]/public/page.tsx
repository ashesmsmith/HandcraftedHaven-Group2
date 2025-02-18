// app/dashboard/seller/[acct_id]/public/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export type Product = {
  product_id: string;
  productName: string;
  price: number | string;
  imageSRC: string;
};

export default function SellerProfilePublicPage() {
  const { acct_id } = useParams() as { acct_id: string };
  const [sellerName, setSellerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [storyHeading, setStoryHeading] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("/default_profile.webp");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [prodLoading, setProdLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          throw new Error(`Failed: ${await res.text()}`);
        }
        const data = await res.json();
        // Use camelCase keys as returned by the API
        setSellerName(`${data.firstName} ${data.lastName}`);
        setBusinessName(data.businessName || "Independent Seller");
        setStoryHeading(data.story_heading || "");
        setStory(data.story || "");
        setImage(data.image || "/default_profile.webp");
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [acct_id]);

  // Load the seller's products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`/api/seller/${acct_id}/products`);
        if (!res.ok) {
          throw new Error(`Failed to load products: ${await res.text()}`);
        }
        const data = await res.json();
        if (!data.products) {
          throw new Error("Response JSON does not contain a 'products' key");
        }
        setProducts(data.products);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setProdLoading(false);
      }
    }
    loadProducts();
  }, [acct_id]);

  if (loading) return <div className="p-4">Loading public profile...</div>;

  return (
    <section className="container mx-auto px-6 py-10">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <Image
          src={image}
          alt={`${sellerName} Profile`}
          width={150}
          height={150}
          className="rounded-full object-cover"
          onError={(e) => (e.target as HTMLImageElement).src = "/default_profile.webp"}
        />
      </div>
      <h1 className="text-2xl font-semibold text-center mb-2">{sellerName}</h1>
      <h2 className="text-xl text-center text-gray-500 mb-4">{businessName}</h2>
      <p className="text-center mb-6">{storyHeading}</p>
      <p className="text-center mb-6">{story}</p>

      {/* Product Grid */}
      {prodLoading ? (
        <div className="text-center p-4">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((prod) => (
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
                <Link href={`/products/${prod.product_id}`}>
                  <button className="mt-4 w-full bg-dark-green text-white py-2 rounded hover:bg-light-green transition">
                    View Product
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      )}
    </section>
  );
}
