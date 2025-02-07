"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Automatically clear cart from localStorage
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto flex items-center justify-center h-screen bg-gradient-to-r from-[#36305c] to-[#4a3e74]">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#2A254B]">Payment Successful!</h2>
        <FaCheckCircle className="text-green-500 text-5xl mx-auto my-4" />
        <p className="text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
        <button
          onClick={() => router.push("/shipping")}
          className="mt-6 px-6 py-3 bg-[#36305c] text-white font-semibold rounded-lg shadow-md hover:bg-[#4a3e74] transition"
        >
          Generate Tracking Number!
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
