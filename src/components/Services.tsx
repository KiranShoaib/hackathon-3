import Image from "next/image";
import service from "../../public/service.png";

function Services() {
    return (
        <main className="mx-auto max-w-[1440px] flex flex-col md:flex-row">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                <Image
                    src={service}
                    alt="sofa picture"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side: Text Section */}
            <div className="w-full md:w-1/2 bg-[#f9f9f9] p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-4">
                    <h1 className="text-[#2A254B] text-lg sm:text-2xl md:text-3xl font-normal leading-[1.3]">
                        Our service isn&#39;t just personal, it&#39;s actually hyper personally exquisite
                    </h1>
                    <p className="text-[#2A254B] text-sm sm:text-base leading-[1.6]">
                        When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.
                    </p>
                    <p className="text-[#2A254B] text-sm sm:text-base leading-[1.6]">
                        Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique became the hotbed for the London interior design community.
                    </p>
                </div>
                <div className="mt-6">
                    <button className="bg-[#fff] px-6 py-3 text-[#2A254B] rounded border border-[#2A254B]">
                        Get in touch
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Services;
