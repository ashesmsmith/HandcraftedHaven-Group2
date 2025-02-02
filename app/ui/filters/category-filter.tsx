"use client";

import { useState } from "react";

export default function CategoryFilter({
  categories,
  onFilterChange,
}: {
  categories: string[];
  onFilterChange: (selectedCategory: string | null) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onFilterChange(newCategory);
  };

  return (
    <div className="category-filter">
      <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category
                ? 'bg-[#543A27] text-white'
                : 'bg-[#F1ECE2] text-[#543A27]'
              } hover:bg-[#8A5D3D] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
