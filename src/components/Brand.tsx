import { TbTruckDelivery } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { LuSprout } from "react-icons/lu"

function Brand() {
    return (

        <div className="max-w-[1440px] mx-auto p-10 bg-white flex flex-col">
            <h2 className="text-[#2A254B]  text-3xl mb-10 font-serif  mt-10 text-center">What makes our brand different</h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">

                <div className="flex flex-col  justify-center border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <TbTruckDelivery className="h-8 w-8 text-[#2A254B] mb-2" />
                    <p className="text-sm text-[#2A254B] font-semibold">Next day as standard</p>
                    <p className="mt-4 text-[#2A254B]">Order before 3pm and get your order
                        the next day as standard</p>
                </div>
                <div className="flex flex-col justify-center border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <IoCheckmarkCircleOutline className="h-8 w-8 text-[#2A254B] mb-2" />
                    <p className="text-sm text-[#2A254B] font-semibold">Made by true artisans</p>
                    <p className="mt-4 text-[#2A254B]">Handmade crafted goods made with
                        real passion and craftmanship</p>
                </div>
                <div className="flex flex-col justify-center border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <HiOutlineCreditCard className="h-8 w-8 text-[#2A254B] mb-2" />
                    <p className="text-sm text-[#2A254B] font-semibold">Unbeatable prices</p>
                    <p className="mt-4 text-[#2A254B]">For our materials and quality you won’t find better prices anywhere</p>
                </div>
                <div className=" border p-4 rounded-lg shadow hover:shadow-lg flex flex-col  justify-center transition-shadow">
                    <LuSprout className="h-8 w-8 text-[#2A254B] mb-2" />
                    <p className="text-sm text-[#2A254B] font-semibold">Recycled packaging</p>
                    <p className="mt-4 text-[#2A254B]">We use 100% recycled packaging to ensure our footprint is manageable</p>
                </div>

            </div>
        </div>
    );


};
export default Brand;