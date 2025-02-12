"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs"; // Clerk Auth Hook
import { useRouter } from "next/navigation"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  // Remove product from wishlist
  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Show toast notification for removal
    toast.info("Product removed from wishlist!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // Notify the navbar to update the wishlist count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Add product to cart (and notify navbar)
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    if (!isSignedIn) {
      toast.error("Please log in to add items to cart!", { position: "bottom-right", autoClose: 2000 });
      router.push("/sign-in"); // Redirect to login page
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex(
      (item: Product) => item._id === product._id
    );

    if (existingProductIndex === -1) {
      // Product not in cart, add it
      cart.push({ ...product, quantity: 1 });
    } else {
      // Product already in cart, update quantity
      cart[existingProductIndex].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify the navbar to update the cart count
    window.dispatchEvent(new Event("cartUpdated"));

    // Show toast notification for success
    toast.success("Your product is added to the cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold text-center text-[#2A254B] mb-6">
        Your Wishlist
      </h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 bg-[#36305c] p-1 rounded-full hover:bg-[#4a3e74]"
              >
                <RxCross2 size={20} className="text-white" />
              </button>

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-48 object-cover"
              />

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2A254B]">
                  {product.name}
                </h3>
                <p className="mt-2 text-[#505977]">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-[#36305c] text-white py-2 rounded-md hover:bg-[#4a3e74]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#505977] text-center">Your wishlist is empty.</p>
      )}

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Wishlist;

