"use client";
import Image from "next/image";
import hero from "../../public/hero.png";
import { useRouter } from "next/navigation";

function Hero() {
  
  const router = useRouter();
  const handleViewCollection = (name:string) => {
    router.push(name);
  } 

  return (
    <main className="mx-auto max-w-[1440px] flex flex-col lg:flex-row h-auto lg:h-[700px]">
      {/* Left Section: Text Content */}
      <div className="flex-1 bg-[#2A254B] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.4] mb-6">
          The furniture brand for the future, with timeless designs
        </h2>
        <button className="bg-[#36305c] text-white text-sm w-[120px] h-[40px] rounded-md hover:bg-[#4a3e74] transition" onClick={() => handleViewCollection('/products')}>
          View collection
        </button>
        <p className="leading-[1.6] text-sm sm:text-base lg:text-lg mt-12">
          A new era in eco-friendly furniture with Avelon, the French luxury
          retail brand with nice fonts, tasteful colors, and a beautiful way to
          display things digitally using modern web technologies.
        </p>
      </div>

      {/* Right Section: Image (Hidden on Small Screens) */}
      <div className="hidden lg:block flex-1">
        <Image
          src={hero}
          alt="chair picture"
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </main>
  );
}

export default Hero;
