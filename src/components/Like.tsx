"use client"
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  image: string;
  price: number;
}

function Like() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const query = `
        *[_type == "product"] | order(_createdAt desc)[5...9] {
          _id,
          name,
          "category": category->title,
          slug { current },
          "image": image.asset->url,
          price
        }
      `;
      const fetchedProducts: Product[] = await client.fetch(query);
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []); // Empty array means it runs once when the component mounts

  const router = useRouter();
  const handleViewCollection = (name: string) => {
    router.push(name);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-[#2A254B] text-3xl text-center sm:text-left">
          You might also like
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4">
            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
              width={500}
              height={500}
            />
            {/* Product Info */}
            <h2 className="text-[#2A254B] text-lg font-semibold">{product.name}</h2>
            <p className="text-[#2A254B] font-bold"> ${product.price}</p>
              {/* Link to Product Detail Page */}
              <Link
              href={`/products/${product.slug.current}`} // Navigate to the product details page
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      
      {/* Button */}
      <div className="text-center mt-10">
        <button
          className="w-[170px] h-[48px] text-[#2A254B] bg-[#F9F9F9]"
          onClick={() => handleViewCollection('/products')}
        >
          View Collection
        </button>
      </div>
    </div>
  );
}

export default Like;
