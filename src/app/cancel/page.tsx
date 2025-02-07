"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

const CancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Automatically clear cart from localStorage
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto flex items-center justify-center h-screen bg-gradient-to-r from-[#8B0000] to-[#B22222]">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#2A254B]">Payment Failed!</h2>
        <FaTimesCircle className="text-red-500 text-5xl mx-auto my-4" />
        <p className="text-gray-600">Oops! Your payment could not be processed. Please try again.</p>
        <button
          onClick={() => router.push("/checkout")}
          className="mt-6 px-6 py-3 bg-[#8B0000] text-white font-semibold rounded-lg shadow-md hover:bg-[#B22222] transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default CancelPage;

  