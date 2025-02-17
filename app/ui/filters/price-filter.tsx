"use client";

import { useState } from "react";

export default function PriceFilter({
  onPriceChange,
  onSortChange,
}: {
  onPriceChange: (min: number, max: number) => void;
  onSortChange: (order: "asc" | "desc") => void;
}) {
  const [minPrice, setMinPrice] = useState<number | "">(0); // Allow empty input
  const [maxPrice, setMaxPrice] = useState<number | "">(1000); // Allow empty input

  const handlePriceChange = () => {
    onPriceChange(Number(minPrice) || 0, Number(maxPrice) || 1000); // Convert empty string to number
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Filter by Price</h3>
      
      {/* Price Range Filter */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          placeholder="Min"
          value={minPrice === 0 ? "" : minPrice} // ✅ Hide 0 while typing
          onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="border rounded p-2 w-16"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice === 1000 ? "" : maxPrice} // ✅ Hide 1000 while typing
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="border rounded p-2 w-16"
        />
        <button
          onClick={handlePriceChange}
          className="px-1 py-1 bg-[#543A27] text-white font-semibold rounded hover:bg-[#8A5D3D] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
        >
          Apply
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onSortChange("asc")}
          className="px-3 py-1 bg-[#8A5D3D] text-white rounded hover:bg-[#6E482C] focus:outline-none focus:ring-2 focus:ring-[#8A5D3D] focus:ring-offset-2"
        >
          Low to High
        </button>
        <button
          onClick={() => onSortChange("desc")}
          className="px-3 py-1 bg-[#8A5D3D] text-white rounded hover:bg-[#6E482C] focus:outline-none focus:ring-2 focus:ring-[#8A5D3D] focus:ring-offset-2"
        >
          High to Low
        </button>
      </div>
    </div>
  );
}
