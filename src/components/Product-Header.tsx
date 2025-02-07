"use client"
import Image from "next/image";
import productheader from "../../public/productheader.png";


function ProductHeader() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="relative">
        <Image
          src={productheader}
          alt="Product Header"
          className="w-full h-[146px] md:h-[209px]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center md:justify-start md:items-end md:bottom-10 md:left-16 text-white font-semibold text-4xl">
          <p>All products</p>
        </div>
      </div> 
    </div>
  );
}

export default ProductHeader;


