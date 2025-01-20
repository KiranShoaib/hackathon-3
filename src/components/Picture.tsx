"use client";
import Image from "next/image";
import picture from "../../public/picture.png";
import { useRouter } from "next/navigation";


function Picture() {

    const router = useRouter();
    const handleViewCollection = (name:string) => {
      router.push(name);
    } 

    return (
        <div className="mx-auto max-w-[1440px] flex flex-wrap md:flex-nowrap gap-2 md:gap-8 px-4 md:px-8">
            {/* Left Side: Text and Button Section */}
            <div className="flex flex-col justify-between bg-[#2A254B] text-white px-6 py-8 sm:px-8 sm:py-12 w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] my-4 md:my-12">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-normal leading-[1.2] mb-4">
                        It started with a small idea
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg leading-6">
                        A global brand with local beginnings, our story began in a small studio in South London in early 2014.
                    </p>
                </div>
                <div className="mt-6 sm:mt-12">
                    <button className="bg-[#36305c] text-white px-6 py-3 rounded" onClick={() => handleViewCollection('/products')}>
                        View collection
                    </button>
                </div>
            </div>

            {/* Right Side: Image Section */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] my-4 md:my-12">
                <Image
                    src={picture}
                    alt="sofa picture"
                    className="object-cover w-full h-full"
                    priority
                />
            </div>
        </div>
    );
}

export default Picture;
