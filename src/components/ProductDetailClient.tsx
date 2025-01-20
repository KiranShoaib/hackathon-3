"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: string;
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
}

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white p-4">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border">
          {/* Image Section */}
          <div className="flex justify-center items-stretch">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col justify-between">
            <h1 className="text-[#2A254B] text-3xl font-serif font-bold mt-8 mb-8">
              {product.name}
            </h1>
            <p className="text-lg text-[#2A254B]">${product.price}</p>
            <p className="mt-4 text-[#505977] text-sm">{product.description}</p>

            {/* Dimensions */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#505977]">Dimensions</h2>
              <div className="grid grid-cols-3 gap-4 text-center mt-2">
                <div className="text-[#505977]">
                  <p className="font-medium">Height</p>
                  <p>{product.dimensions.height} cm</p>
                </div>
                <div className="text-[#505977]">
                  <p className="font-medium">Width</p>
                  <p>{product.dimensions.width} cm</p>
                </div>
                <div className="text-[#505977]">
                  <p className="font-medium">Depth</p>
                  <p>{product.dimensions.depth} cm</p>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#2A254B]">Quantity</h2>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 mt-2 px-2 py-1 border rounded-md text-[#2A254B]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center space-x-4">
              <button className="px-4 py-2 bg-[#4E4D93] text-white rounded">Add to Cart</button>
              <button
                onClick={handleFavorite}
                className={`px-4 py-2 border rounded ${
                  isFavorite ? "text-[#2A254B] border-[#2A254B]" : "text-gray-600 border-gray-600"
                }`}
              >
                {isFavorite ? "Added to Favorites ❤" : "Save to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
