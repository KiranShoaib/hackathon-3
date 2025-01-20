import Image from "next/image";
import productheader from "../../public/productheader.png";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";

function ProductHeader() {
    return(
        <div className="mx-auto max-w-[1440px]">
            <div className="relative">
                <Image src={productheader} alt="" className="w-full h-[146px] md:h-[209px]"/>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center md:justify-start md:items-end md:bottom-10 md:left-16 text-white font-semibold text-4xl ">
                    <p>All products</p>
                </div>
            </div>
            <div className="hidden md:flex justify-between text-[#2A254B] py-4 px-10">
                <div className="flex">
                    <Link href={"/"} className="flex items-center">Category <MdArrowDropDown className="ml-2"/> </Link>
                    <Link href={"/"} className="pl-10 flex items-center">Product type <MdArrowDropDown className="ml-2"/> </Link>
                    <Link href={"/"} className="pl-10 flex items-center">Price <MdArrowDropDown className="ml-2"/> </Link>
                    <Link href={"/"} className="pl-10 flex items-center ">Brand <MdArrowDropDown className="ml-2"/> </Link>
                </div>
                <div className="flex">  
                    <Link href={"/"} className="pl-10">Sorty by:</Link>
                    <Link href={"/"} className="pl-10 flex items-center">Date Added <MdArrowDropDown className="ml-2"/> </Link>
                </div>                
            </div>
            <div className=" flex justify-around p-5 gap-2 md:hidden">
                <button className="w-[163px] h-[56px] bg-[#F9F9F9] text-[#2A254B] p flex items-center justify-center">Filters <MdArrowDropDown className="ml-2"/></button>
                <button className="w-[163px] h-[56px] bg-[#F9F9F9] text-[#2A254B] flex items-center justify-center">Sorting <MdArrowDropDown className="ml-2"/></button>
            </div>
        </div>
    )
}

export default ProductHeader