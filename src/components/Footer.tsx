import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { ImSkype } from "react-icons/im";
import { AiOutlineTwitter } from "react-icons/ai";
import { RiPinterestFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] bg-[#2A254B] px-4 sm:px-8 pt-1">
      <div className="box-container flex flex-wrap justify-between mt-[58px]">
        {/* Menu Section */}
        <div className="box w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="font-normal text-[16px] text-[#fff] mb-[12px]">Menu</h3>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>New arrivals</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Best sellers</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Recently viewed</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Popular this week</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>All products</Link>
        </div>

        {/* Categories Section */}
        <div className="box w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="font-normal text-[16px] text-[#fff] mb-[12px]">Categories</h3>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Crockery</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Furniture</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Homeware</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Plant pots</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Chairs</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Crockery</Link>
        </div>

        {/* Our company Section */}
        <div className="box w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="font-normal text-[16px] text-[#fff] mb-[12px]">Our company</h3>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>About us</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Vacancies</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Contact us</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Privacy</Link>
          <Link className="text-[#fff] text-[14px] block pb-[7px]" href={"/"}>Return policy</Link>
        </div>

        {/* Join our mailing list Section */}
        <div className="box w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="font-normal text-[16px] text-[#fff] mb-[12px]">Join our mailing list</h3>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            className="bg-[#22202E] text-[#fff] w-full sm:w-[509px] h-[56px] mb-4"
          />
          <button className="w-full sm:w-[118px] h-[56px] text-[#2A254B] bg-[#fff] mb-4 sm:mb-0">
            Sign up
          </button>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="bg-[#4E4D93] w-full h-[1px] mt-[48px]" />

      {/* Footer Bottom Section */}
      <div className="mt-2 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-[#fff] text-[14px] leading-[18.9px] mb-4 sm:mb-0">
          Copyright 2022 Avion LTD
        </p>
        <div className="flex gap-x-6">
          <Link className="text-[#fff]" href={"/"}><FaLinkedin /></Link>
          <Link className="text-[#fff]" href={"/"}><FaFacebookSquare /></Link>
          <Link className="text-[#fff]" href={"/"}><IoLogoInstagram /></Link>
          <Link className="text-[#fff]" href={"/"}><ImSkype /></Link>
          <Link className="text-[#fff]" href={"/"}><AiOutlineTwitter /></Link>
          <Link className="text-[#fff]" href={"/"}><RiPinterestFill /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
