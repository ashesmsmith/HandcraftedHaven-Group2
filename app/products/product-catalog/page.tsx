"use client";

import { useState } from "react";
import { products } from "@/app/lib/placeholder-data";
import CategoryFilter from "@/app/ui/filters/category-filter";
import PriceFilter from "@/app/ui/filters/price-filter";
import SellerFilter from "@/app/ui/filters/seller-filter";
import ProductCard from "@/app/ui/product/product-card";
import Link from "next/link";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Filter products based on the selected category, price range, and seller
  const filteredProducts = products.filter((product) => {
    const isInCategory =
      selectedCategory === null || product.category === selectedCategory;
    const isInPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
      const isFromSeller =
      selectedSeller === null || product.account_id === selectedSeller;    
    return isInCategory && isInPriceRange && isFromSeller;
  });

  // Sort products based on the sortOrder
  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  // Handle "Clear Filters" Button
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedSeller(null);
    setSortOrder(null);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 p-4">
      {/* Filters Section */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Product Catalog</h2>

        {/* Category Filter */}
        <CategoryFilter
          categories={[...new Set(products.map((p) => p.category))]} // Extract unique categories
          onFilterChange={setSelectedCategory}
        />

        {/* Seller Filter */}
        <div className="mt-6">
        <SellerFilter
          sellers={[...new Set(products.map((p) => p.account_id))]} // Use account_id instead
          onFilterChange={setSelectedSeller}
        />
        </div>

        {/* Price Filter */}
        <div className="mt-6">
          <PriceFilter
            onPriceChange={(min, max) => setPriceRange({ min, max })}
            onSortChange={setSortOrder}
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="mt-6 px-4 py-2 bg-[#F1ECE2] text-[#543A27] font-semibold rounded hover:bg-[#E5E0D4] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
        >
          Clear Filters
        </button>

      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.product_id}`} key={product.product_id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}