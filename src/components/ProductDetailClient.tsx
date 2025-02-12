"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs"; // Clerk Auth Hook
import { useRouter } from "next/navigation"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
 
  

  // Wishlist ki count track karne ke liye useEffect
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsFavorite(wishlist.some((item: Product) => item._id === product._id));
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, [product._id]);

  // Add/Remove from Wishlist
  const handleFavorite = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const isAlreadyInWishlist = wishlist.some((item: Product) => item._id === product._id);

    if (isAlreadyInWishlist) {
      wishlist = wishlist.filter((item: Product) => item._id !== product._id);
      setIsFavorite(false);
      toast.info("Product removed from wishlist!", { position: "bottom-right", autoClose: 2000 });
    } else {
      wishlist.push(product);
      setIsFavorite(true);
      toast.success("Product added to wishlist!", { position: "bottom-right", autoClose: 2000 });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Notify navbar to update the wishlist count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Add to Cart
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isSignedIn) {
      toast.error("Please log in to add items to cart!", { position: "bottom-right", autoClose: 2000 });
      router.push("/sign-in"); // Redirect to login page
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item: Product) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity; // Increase quantity
    } else {
      cart.push({ ...product, quantity }); // Add new product
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify navbar to update the cart count
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Product added to cart!", { position: "bottom-right", autoClose: 2000 });
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
              <h2 className="text-lg font-semibold text-[#2A252B]">Dimensions</h2>
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
            <div className="mt-6 flex  space-x-2">
              <h2 className="text-lg font-semibold text-[#2A254B]">Quantity:</h2>
              <div className="flex items-center justify-center border border-[#2A254B] rounded-md">
                <span
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-10 h-10 border-r border-[#2A254B] text-lg flex justify-center items-center text-[#2A254B] hover:text-[#4a3e74] cursor-pointer"
                >
                  <FaMinus />
                </span>
                <span className="md:px-10 px-5 font-medium text-[#2A254B]">
                  {quantity.toString().length > 1 ? quantity : "0" + quantity}
                </span>
                <span
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-l border-[#2A254B] text-lg flex justify-center items-center text-[#2A254B] hover:text-[#4a3e74] cursor-pointer"
                >
                  <FaPlus />
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#4E4D93] text-white rounded hover:bg-[#4a3e74]"
              >
                Add to Cart
              </button>
              <button
                onClick={handleFavorite}
                className={`px-4 py-2 border rounded flex items-center space-x-2 ${
                  isFavorite ? "text-[#2A254B] border-[#2A254B]" : "text-gray-600 border-gray-600"
                }`}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                <span>{isFavorite ? "Added to Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetailClient;

