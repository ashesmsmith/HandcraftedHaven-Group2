"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilter from "@/ui/filters/category-filter"; 
import PriceFilter from "@/ui/filters/price-filter"; 
import SellerFilter from "@/ui/filters/seller-filter"; 
import ProductCard from "@/ui/product/product-card"; 

export type Product = {
  product_id: string;
  productName: string;
  productDesc: string;
  price: number;
  imageSRC: string;
  category: string;
  seller_id: string;
};

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states:
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === null || product.category === selectedCategory;
    const inPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    const inSeller =
      selectedSeller === null || product.seller_id === selectedSeller;
    return inCategory && inPriceRange && inSeller;
  });

  // Sort if needed
  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedSeller(null);
    setSortOrder(null);
  };

  // Extract unique filter options
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueSellers = Array.from(new Set(products.map((p) => p.seller_id)));

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 p-4">
      {/* Filters Section */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
        <CategoryFilter
          categories={uniqueCategories}
          onFilterChange={setSelectedCategory}
        />
        <div className="mt-6">
          <SellerFilter
            sellers={uniqueSellers}
            onFilterChange={setSelectedSeller}
          />
        </div>
        <div className="mt-6">
          <PriceFilter
            onPriceChange={(min, max) => setPriceRange({ min, max })}
            onSortChange={setSortOrder}
          />
        </div>
        <button
          onClick={clearFilters}
          className="mt-6 px-4 py-2 bg-[#F1ECE2] text-[#543A27] font-semibold rounded hover:bg-[#E5E0D4] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              href={`/products/${product.product_id}`}
              key={product.product_id}
            >
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">
            No products match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
