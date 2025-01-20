import Image from "next/image";
import quality from "../../public/quality.png";

function Quality() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center gap-8">
      {/* Text Section */}
      <div className="flex-1 mt-8 lg:mt-0 lg:pr-8 text-center lg:text-left">
        <h1 className="text-[#2A254B] text-xl sm:text-2xl md:text-3xl leading-[1.4] font-normal">
          From a studio in London to a global brand with over 400 outlets
        </h1>
        <div className="mt-6 space-y-4">
          <p className="text-[#2A254B] text-sm sm:text-base leading-[1.6]">
            When we started Avion, the idea was simple. Make high-quality
            furniture affordable and available for the mass market.
          </p>
          <p className="text-[#2A254B] text-sm sm:text-base leading-[1.6]">
            Handmade, and lovingly crafted furniture and homeware is what we
            live, breathe and design so our Chelsea boutique became the hotbed
            for the London interior design community.
          </p>
        </div>
        <div className="mt-8">
          <button className="bg-[#F9F9F9] px-6 py-3  text-[#36305c]  ">
            Get in touch
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full h-auto">
        <Image
          src={quality}
          alt="chair picture"
          className="w-full h-auto object-cover "
          priority
        />
      </div>
    </main>
  );
}

export default Quality;
