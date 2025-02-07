"use client";

import { useState } from "react";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export default function CheckoutButton({ cartItems }: { cartItems: CartItem[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const { url } = await response.json();
    window.location.href = url;
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full max-w-[1440px] mx-auto font-semibold bg-[#36305c] hover:bg-[#4a3e74] transition text-white px-4 py-2 rounded"
    >
      {loading ? "Loading..." : "Place Order"}
    </button>
  );
}
