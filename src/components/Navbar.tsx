"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart , FaSignInAlt} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

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

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isWishlistPage = pathname === "/wishlist";

  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = storedCart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      );
      setCartItems(totalItems);
    };

    const updateWishlistCount = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistItems(storedWishlist.length);
    };

    updateCartCount();
    updateWishlistCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://ahopo2el.api.sanity.io/v2023-01-01/data/query/production?query=*[_type=='product']"
        );
        const data = await res.json();
        setProducts(data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <nav className="max-w-[1440px] mx-auto flex flex-col relative">
      <div className="bg-white w-full h-18 flex justify-between items-center px-3 py-2 shadow-md border border-gray-200">
        <div className="relative" ref={searchRef}>
          <FiSearch
            className="w-6 h-6 text-[#726E8D] cursor-pointer"
            onClick={() => setShowDropdown(true)}
          />
          {showDropdown && (
            <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg w-64 p-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
              />
              <ul className="mt-2 max-h-48 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setShowDropdown(false);
                      router.push(`/products/${product.slug.current}`);
                    }}
                  >
                    {product.name}
                  </li>
                ))}
                {filteredProducts.length === 0 && searchQuery && (
                  <li className="p-2 text-gray-500">No products found</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold">Avion</h1>
        <div className="flex items-center space-x-4">
           <div className="flex gap-2 mr-30">
             {/* ❤️ Wishlist */}
            <Link href="/wishlist">
               <div className="relative">
                 {isWishlistPage ? (
                  <FaHeart className="w-6 h-6 text-[#726E8D]" />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-[#726E8D]" />
                )}
                {wishlistItems > 0 && (
                  <span className="absolute top-0 left-4 bg-[#2A254B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                     {wishlistItems}
                   </span>
                 )}
               </div>
             </Link> 

             {/* 🛒 Cart */}
             <Link href="/cart">
               <div className="relative">
                 <FiShoppingCart className="w-6 h-6 text-[#726E8D]" />
                 {cartItems > 0 && (
                   <span className="absolute top-0 left-4 bg-[#2A254B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                     {cartItems}
                   </span>
                 )}
               </div>
             </Link>

             {/* 👤 Profile */}
             <SignedOut>
            <SignInButton mode="modal">
                <IoPersonCircleOutline className="text-xl w-6 h-6 text-[#726E8D]"/>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
           </div>
         </div>
       </div>

       {/* 📌 Navbar Links */}
       <div className="hidden lg:flex w-full h-18 justify-center space-x-10 items-center px-3 py-2 shadow-md border border-gray-300 bg-white">
         <Link href="/" className="text-[#726E8D] hover:underline">Home</Link>
         <Link href="/products" className="text-[#726E8D] hover:underline">Products</Link>
         <Link href="/about" className="text-[#726E8D] hover:underline">About Us</Link>
         <Link href="/contact" className="text-[#726E8D] hover:underline">Contact Us</Link>
       </div>
    </nav>
  );
}

export default Navbar;


