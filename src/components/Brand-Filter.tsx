"use client";
import { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { client } from "@/sanity/lib/client";

interface Brand {
  name: string;
  slug: { current: string };
}

interface BrandProps {
  onBrandSelect: (BrandSlug?: string) => void; // Callback for brand selection
}

const BrandFilter = ({ onBrandSelect }: BrandProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const query = `*[_type == "brand"]{ name, slug }`;
      const result = await client.fetch(query);
      setBrands(result);
    };

    fetchBrands();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-[#2A254B] font-semibold pl-10"
      >
        Brands <MdArrowDropDown className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-10">
          {/* Add "All Brands" Option */}
          <button
            onClick={() => {
              onBrandSelect(undefined); // Clear filter
              setIsDropdownOpen(false);
            }}
            className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
          >
            All Brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand.slug.current}
              onClick={() => {
                onBrandSelect(brand.slug.current);
                setIsDropdownOpen(false);
              }}
              className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
            >
              {brand.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandFilter;