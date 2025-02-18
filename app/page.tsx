"use client"; 

import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "./ui/Carousel";

// Define the Product type
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
      {/* Logo with Thicker Border */}
      <div className="bg-white border-4 border-dark-brown shadow-lg p-6 rounded-lg flex justify-center items-center">
        <div className="relative w-60 h-60">
          <Image
            src="/logo.webp"
            alt="Handcrafted Haven Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Show loading, error, or carousel */}
      {loading && <p className="text-gray-500 mt-10 text-xl">Loading products...</p>}
      {error && <p className="text-red-600 mt-10 text-xl">{error}</p>}

      {/* Display products in carousel if available */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12">
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
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-500 mt-10 text-lg">
            No products available at the moment. Check back soon!
          </p>
        )
      )}
    </section>
  );
}
