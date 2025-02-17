"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "./ui/Carousel";

//Define the Product type
type Product = {
  product_id: string;
  productName: string;
  imageSRC: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setProducts(data.products as Product[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">
        Handcrafted Haven
      </h1>
      <p className="text-lg text-dark-brown/70 mb-6">Custom Creations</p>

      <div className="flex space-x-4">
        <Link href="/dashboard/auth/login">
          <button className="border bg-dark-green border-dark-brown text-white px-6 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
            Login
          </button>
        </Link>
        <Link href="/dashboard/auth/signup">
          <button className="bg-dark-brown text-cream px-6 py-2 rounded hover:bg-light-brown hover:text-white transition-colors">
            Register
          </button>
        </Link>
      </div>

      {loading && <p className="text-gray-500 mt-10">Loading products...</p>}
      {error && <p className="text-red-600 mt-10">{error}</p>}

      {/* Display products in carousel if available */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
          <Carousel
            images={products.slice(0, Math.ceil(products.length / 2)).map((product) => ({
              src: product.imageSRC,
              id: product.product_id,
            }))}
            interval={3000}
          />
          <Carousel
            images={products.slice(Math.ceil(products.length / 2)).map((product) => ({
              src: product.imageSRC,
              id: product.product_id,
            }))}
            interval={4000}
          />
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <p className="text-gray-500 mt-10">No products available at the moment.</p>
      )}
    </section>
  );
}
