"use client";
import { useRouter } from "next/navigation";

function Paragraph() {

    const router = useRouter();
    const handleViewCollection = (name:string) => {
      router.push(name);
    }  
  
    return (
        <div className="max-w-full h-auto flex flex-col md:flex-row md:items-center justify-center p-4">
            {/* Text Section */}
            <div className="w-full md:w-[704px] text-[#2A254B] mt-8 md:mt-[88px] text-center md:text-left">
                <p className="font-normal text-[36px] leading-[50.4px] sm:text-[28px] md:text-[36px]">
                    A brand built on the love of craftsmanship, quality, and outstanding customer service
                </p>
            </div>
            
            {/* Button Section */}
            <div className="w-full md:w-auto mt-6 md:mt-[88px] text-center">
                <button className="bg-[#f9f9f9] w-[192px] h-[56px] text-[#2A254B] mx-auto md:ml-[288px]" onClick={() => handleViewCollection('/products')}>
                    View our products
                </button>
            </div>
        </div>
    );
}

export default Paragraph;
