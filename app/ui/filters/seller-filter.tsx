'use client';

import { useState } from 'react';

export default function SellerFilter({
  sellers,
  onFilterChange,
}: {
  sellers: string[]; // Array of seller IDs
  onFilterChange: (selectedSeller: string | null) => void;
}) {
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  // Handle seller selection
  const handleSellerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newSeller = value === '' ? null : value; // Empty value means no filter
    setSelectedSeller(newSeller);
    onFilterChange(newSeller); // Notify parent
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Filter by Seller</h3>
            <select
        value={selectedSeller || ''}
        onChange={handleSellerChange}
        className="w-full border rounded p-2 bg-[#F1ECE2] text-[#543A27] hover:bg-[#E5E0D4] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
      >
        <option value="">All Sellers</option>
        {sellers.map((seller) => (
          <option key={seller} value={seller}>
            Seller ID: {seller}
          </option>
        ))}
      </select>

    </div>
  );
}
