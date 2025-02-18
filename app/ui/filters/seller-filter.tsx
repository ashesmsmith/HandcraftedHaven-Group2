"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SellerFilter({ sellers }: { sellers: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSeller, setSelectedSeller] = useState("");

  // ✅ Ensure selected seller is read from URL on first load
  useEffect(() => {
    setSelectedSeller(searchParams.get("seller") || "");
  }, [searchParams]);

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seller = event.target.value;
    setSelectedSeller(seller);

    // Construct new URL parameters
    const newParams = new URLSearchParams(searchParams.toString());
    if (seller) {
      newParams.set("seller", seller);
    } else {
      newParams.delete("seller");
    }

    // Update the URL with new filter parameters
    router.push(`/products/product-catalog?${newParams.toString()}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="seller" className="block text-sm font-medium text-gray-700">
        Filter by Seller:
      </label>
      <select
        id="seller"
        name="seller"
        value={selectedSeller}
        onChange={handleFilterChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">All Sellers</option>
        {sellers.length > 0 ? (
          sellers.map((seller) => (
            <option key={seller} value={seller}>
              {seller}
            </option>
          ))
        ) : (
          <option disabled>No Sellers Found</option>
        )}
      </select>
    </div>
  );
}
