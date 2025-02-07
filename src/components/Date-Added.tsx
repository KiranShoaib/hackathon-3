"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";

export default function DateAddedFilter() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || undefined;

  const handleDateFilter = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortOrder) params.set("sortOrder", sortOrder); // Set the sortOrder

    router.push(`?${params.toString()}`);

    // 🔽 Dropdown close karne ke liye state update karein
    setShowDateFilter(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDateFilter(!showDateFilter)}
        className="flex items-center text-[#2A254B] font-semibold pl-10"
      >
        Date Added <MdArrowDropDown className="ml-2" />
      </button>

      {showDateFilter && (
        <div className="absolute mt-2 bg-white shadow-lg p-4 w-52 rounded">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
          <button
            onClick={handleDateFilter}
            className="bg-[#36305c] text-white px-4 py-2 w-full rounded"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
// In the DateAddedFilter component, we have added a select dropdown to choose the sorting order. The selected value is stored in the sortOrder state. When the Apply button is clicked, the sortOrder is added to the URL query parameters and the dropdown is closed by updating the showDateFilter state.
