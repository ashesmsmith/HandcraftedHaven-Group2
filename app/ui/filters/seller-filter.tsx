'use client';

import { useState } from 'react';

// Define the props to accept an array of sellers with `account_id` and `businessName`
export default function SellerFilter({
  sellers,
  onFilterChange,
}: {
  sellers: { account_id: string; businessName: string }[]; // Expect sellers with `businessName`
  onFilterChange: (selectedSeller: string | null) => void;
}) {
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const handleSellerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSeller(value === '' ? null : value);
    onFilterChange(value === '' ? null : value);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Filter by Seller</h3>
      <select
        value={selectedSeller || ''}
        onChange={handleSellerChange}
        className="w-full border rounded p-2 bg-white text-[#543A27] hover:bg-[#E5E0D4] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
      >
        <option value="">All Sellers</option>
        {sellers.map((seller) => (
          <option key={seller.account_id} value={seller.account_id}>
            {seller.businessName} {/* Display seller's business name */}
          </option>
        ))}
      </select>
    </div>
  );
}
