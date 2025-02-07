"use client";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // ✅ Function to update cart and notify Navbar
  const updateCartAndNotify = (updatedCart: Product[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navbar ko notify karne ke liye event dispatch karo
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCartAndNotify(updatedCart);

    // Show toast notification for removal
    toast.info("Product removed from cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0);

    updateCartAndNotify(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-[#2A254B]">Your Shopping Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />
          {cart.length === 0 ? (
            <p className="text-[#2A254B]">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="grid grid-cols-3 items-center gap-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 p-2 rounded-md">
                      <Image src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                      <button onClick={() => handleRemoveFromCart(item._id)} className="text-xs text-red-500 cursor-pointer mt-1">
                        <ImBin2 />
                      </button>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          -
                        </button>
                        <span className="mx-2.5">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <h4 className="text-base font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <h2 className="text-2xl font-bold text-[#2A254B] text-center">Order Summary</h2>
          <ul className="text-[#2A254B] mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base ">
              Subtotal <span className="ml-auto ">${calculateTotal()}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto font-bold">${calculateTotal()}</span>
            </li>
          </ul>
          <div className="mt-8 space-y-2">
            <Link href="/checkout">
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-[#36305c] hover:bg-[#4a3e74] text-white rounded-md"
              >
                Checkout
              </button>
            </Link>
            <Link href="/products">
              <button
                type="button"
                className="mt-4 text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-[#2A254B] border border-gray-300 rounded-md"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}
