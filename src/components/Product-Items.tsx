"use client";

import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";
import Category from "./Category";
import BrandFilter from "./Brand-Filter";
import PriceFilter from "./Price-Filter";
import DateAddedFilter from "./Date-Added";

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  slug: { current: string };
  image: string;
  price: number;
  quantity: number;
  tags: string[];
  description: string;
  features: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  dateAdded: string; 
}

async function fetchProducts(
  selectedCategory?: string,
  minPrice?: number,
  maxPrice?: number,
  selectedBrand?: string,
  sortOrder?: string // Add sorting parameter
) {
  const query = `
    *[_type == "product"
     ${selectedCategory ? `&& category->slug.current == "${selectedCategory}"` : ""}
     ${minPrice ? `&& price >= ${minPrice}` : ""} 
     ${maxPrice ? `&& price <= ${maxPrice}` : ""}
     ${selectedBrand ? `&& brand->slug.current == "${selectedBrand}"` : ""}
     ] | order(dateAdded ${sortOrder || 'desc'}) {  // Sort by dateAdded
      _id,
      name,
      "category": category->title,
      "brand": brand->title,
      slug { current },
      "image": image.asset->url,
      price,
      quantity,
      tags,
      description,
      features,
      dimensions {
        height,
        width,
        depth
      },
      dateAdded
    }
  `;
  return await client.fetch(query);
}

export default function ProductItems() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get selected category from query params
  const selectedCategory = searchParams.get("category") || undefined;

  // Get selected brand from query params
  const selectedBrand = searchParams.get("brand") || undefined;

  // Get sorting order from query params
  const sortOrder = searchParams.get("sortOrder") || "desc"; // Default sorting is "desc" (newest first)

  useEffect(() => {
    // Fetch products whenever the selected category, brand, or sorting order changes
    const getProducts = async () => {
      const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
      const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
      const result = await fetchProducts(selectedCategory, minPrice, maxPrice, selectedBrand, sortOrder);
      setProducts(result);
    };
    getProducts();
  }, [selectedCategory, selectedBrand, sortOrder, searchParams]);

  // Function to handle category selection
  const handleCategorySelect = (categorySlug?: string) => {
    if (categorySlug) {
      router.push(`?category=${categorySlug}`); // Update URL with selected category
    } else {
      router.push(`/products`); // Show all products
    }
  };

  // Function to handle brand selection
  const handleBrandSelect = (brandSlug?: string) => {
    if (brandSlug) {
      router.push(`?brand=${brandSlug}`); // Update URL with selected brand
    } else {
      router.push(`/products`); // Show all products
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      {/* Category Filter */}
      <div className="hidden md:flex justify-between text-[#2A254B] py-4 px-10">
        <div className="flex">
          <Category onCategorySelect={handleCategorySelect} />
          <PriceFilter />
          <BrandFilter onBrandSelect={handleBrandSelect} />
        </div>
        <div className="flex">
          <Link href={"/"} className="font-semibold pl-10">
            Sort by:
          </Link>
          {/* Add DateAddedFilter */}
          <DateAddedFilter />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="flex justify-around p-5 gap-2 md:hidden">
        <button className="w-[163px] h-[56px] bg-[#F9F9F9] text-[#2A254B] flex items-center justify-center">
          Filters <MdArrowDropDown className="ml-2" />
        </button>
        <button className="w-[163px] h-[56px] bg-[#F9F9F9] text-[#2A254B] flex items-center justify-center">
          Sorting <MdArrowDropDown className="ml-2" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-[#2A254B] text-lg font-semibold">{product.name}</h2>
            <p className="text-[#2A254B] font-bold">Price: ${product.price}</p>

            {/* Dynamic Link */}
            <Link
              href={`/products/${product.slug.current}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="text-center my-10">
        <button className="w-[170px] h-[48px] text-[#2A254B] bg-[#F9F9F9]">
          View Collection
        </button>
      </div>
    </div>
  );
}
