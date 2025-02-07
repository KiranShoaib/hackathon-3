"use client";
import { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { client } from "@/sanity/lib/client";

interface Category {
  name: string;
  slug: { current: string };
}

interface CategoryProps {
  onCategorySelect: (categorySlug?: string) => void; // Callback for category selection
}

const Category = ({ onCategorySelect }: CategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{ name, slug }`;
      const result = await client.fetch(query);
      setCategories(result);
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-[#2A254B] font-semibold"
      >
        Category <MdArrowDropDown className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-10">
          {/* Add "All Categories" Option */}
          <button
            onClick={() => {
              onCategorySelect(undefined); // Clear filter
              setIsDropdownOpen(false);
            }}
            className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.slug.current}
              onClick={() => {
                onCategorySelect(category.slug.current);
                setIsDropdownOpen(false);
              }}
              className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
