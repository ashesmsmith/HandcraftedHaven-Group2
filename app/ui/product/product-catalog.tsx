"use client";

import { useState } from "react";
import CategoryFilter from "@/app/ui/filters/category-filter";
import PriceFilter from "@/app/ui/filters/price-filter";
import SellerFilter from "@/app/ui/filters/seller-filter";
import ProductCard from "@/app/ui/product/product-card";
import Link from "next/link";

// ✅ Define ProductWithSeller Type
export type ProductWithSeller = {
  product_id: string;
  account_id: string;
  productName: string;
  productDesc: string;
  category: string;
  color: string;
  price: number; // ✅ Ensure price is a number
  imageSRC: string;
  businessName: string | null;
};

// ✅ No need to await anything in a client component
export default function ProductCatalogClient({
  products,
  searchParams,
}: {
  products: ProductWithSeller[];
  searchParams?: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    seller?: string;
    sort?: "asc" | "desc";
  };
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams?.category || null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: Number(searchParams?.minPrice) || 0,
    max: Number(searchParams?.maxPrice) || 1000,
  });
  const [selectedSeller, setSelectedSeller] = useState<string | null>(searchParams?.seller || null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(searchParams?.sort || null);

  // 🔍 Ensure price is a number
  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price), // ✅ Convert price to a number
  }));

  // 🔍 Filter products based on selected filters
  const filteredProducts = formattedProducts.filter((product) => {
    const isInCategory = !selectedCategory || product.category === selectedCategory;
    const isInPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    const isFromSeller = !selectedSeller || product.account_id === selectedSeller;
    return isInCategory && isInPriceRange && isFromSeller;
  });

  // 🔄 Sort products
  if (sortOrder) {
    filteredProducts.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
  }

  // 🧹 Clear Filters
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
          categories={[...new Set(products.map((p) => String(p.category)))] as string[]}
          onFilterChange={setSelectedCategory}
        />


      {/* Seller Filter */}
      <SellerFilter
        sellers={[
          ...new Map(
            products
              .filter((p) => p.businessName && p.businessName.trim() !== "") // ✅ Exclude NULL and empty values
              .map((p) => [
                p.account_id,
                { account_id: p.account_id, businessName: p.businessName! },
              ])
          ).values(),
        ] as { account_id: string; businessName: string }[]} // ✅ Ensure correct type
        onFilterChange={setSelectedSeller}
      />


        {/* Price Filter */}
        <div className="mt-6">
          <PriceFilter onPriceChange={(min, max) => setPriceRange({ min, max })} onSortChange={setSortOrder} />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="mt-6 px-4 py-2 bg-[#F1ECE2] text-[#543A27] font-semibold rounded border-2 border-[#543A27] hover:bg-[#E5E0D4] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
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
