"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CheckoutButton from "@/components/Checkout-Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = { fullName: "", email: "", address: "", phone: "" };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Shipping address is required";
      isValid = false;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Agar form valid nahi hai toh checkout button kaam nahi karega
    }

    console.log("Form is valid. Proceeding with checkout...");
  };

  return (
    <div className="max-w-[1440px] mx-auto bg-gray-100 px-4 py-8">
      <h2 className="text-2xl font-semibold text-center text-[#2A254B] mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#2A254B] mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="text-[#2A254B]">{item.name}</p>
              </div>
              <p className="font-semibold text-[#2A254B]">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between mt-4 text-lg text-[#2A254B] font-semibold">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#2A254B] mb-4">Shipping Details</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md ${errors.address ? "border-red-500" : ""}`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <CheckoutButton cartItems={cart} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
