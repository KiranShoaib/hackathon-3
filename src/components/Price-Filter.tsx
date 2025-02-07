"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";

export default function PriceFilter() {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || undefined;

  const handlePriceFilter = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", String(minPrice));
    if (maxPrice) params.set("maxPrice", String(maxPrice));

    router.push(`?${params.toString()}`);
    
    // 🔽 Dropdown close karne ke liye state update karein
    setShowPriceFilter(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPriceFilter(!showPriceFilter)}
        className="flex items-center text-[#2A254B] font-semibold pl-10"
      >
        Price <MdArrowDropDown className="ml-2" />
      </button>

      {showPriceFilter && (
        <div className="absolute mt-2 bg-white shadow-lg p-4 w-52 rounded">
          <input
            type="number"
            placeholder="From"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="To"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handlePriceFilter}
            className="bg-[#36305c] text-white px-4 py-2 w-full rounded"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

