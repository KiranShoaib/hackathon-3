

// import Link from 'next/link';
// import { FiShoppingCart, FiSearch } from 'react-icons/fi';
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa";

// function Navbar(){

//   const location= useLocation();

//  return (
//    <nav className="max-w-[1440px] mx-auto flex flex-col">
//    <div className='bg-white w-full h-18 flex justify-between items-center px-3 py-2 shadow-md border border-gray-200 '>
//     <Link href="/">
//     <FiSearch className="w-6 h-6 text-[#726E8D]"/>
//     </Link>
   
//      <h1 className="text-xl font-bold  items-center">Avion</h1>
     
//      <div className="flex items-center space-x-4">
     
//        <div className='flex gap-2 mr-30'>
          
//       <Link href="/wishlist"> <FaRegHeart className={`${location.pathname === '/wishlist' ? 'fill-current text-[#726E8D]' : ''} w-6 h-6 text-[#726E8D]`} /></Link>
//       <Link href="/cart"> <FiShoppingCart className="w-6 h-6 text-[#726E8D]" /></Link>
//       <Link href="/"> <IoPersonCircleOutline className="w-6 h-6 text-[#726E8D]" /></Link>
      
//        </div>
//      </div>
//      </div>
        
//         <div className="hidden lg:flex w-full h-18  justify-center space-x-10 items-center px-3 py-2 shadow-md border border-gray-300 bg-white">
//         <Link href="/" className="text-[#726E8D]  hover:underline">Home</Link>
//         <Link href="/products" className="text-[#726E8D]  hover:underline">Products</Link>
//         <Link href="/about" className="text-[#726E8D]  hover:underline">About Us</Link>
     
//      </div>
   
//    </nav>
//  );
// };

// export default Navbar;

import Link from 'next/link';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from 'next/router'; // Import useRouter hook from next/router

function Navbar() {
  const router = useRouter(); // Get access to the router object
  const location = router.pathname; // Get the current pathname (URL)

  return (
    <nav className="max-w-[1440px] mx-auto flex flex-col">
      <div className='bg-white w-full h-18 flex justify-between items-center px-3 py-2 shadow-md border border-gray-200'>
        <Link href="/">
          <FiSearch className="w-6 h-6 text-[#726E8D]" />
        </Link>
      
        <h1 className="text-xl font-bold items-center">Avion</h1>
      
        <div className="flex items-center space-x-4">
          <div className='flex gap-2 mr-30'>
            <Link href="/wishlist">
              <FaRegHeart
                className={`${location === '/wishlist' ? 'fill-current text-[#726E8D]' : ''} w-6 h-6 text-[#726E8D]`} 
              />
            </Link>
            <Link href="/cart">
              <FiShoppingCart className="w-6 h-6 text-[#726E8D]" />
            </Link>
            <Link href="/">
              <IoPersonCircleOutline className="w-6 h-6 text-[#726E8D]" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex w-full h-18 justify-center space-x-10 items-center px-3 py-2 shadow-md border border-gray-300 bg-white">
        <Link href="/" className="text-[#726E8D] hover:underline">Home</Link>
        <Link href="/products" className="text-[#726E8D] hover:underline">Products</Link>
        <Link href="/about" className="text-[#726E8D] hover:underline">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
