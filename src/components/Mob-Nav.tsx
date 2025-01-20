"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function MobNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="max-w-[1440px] mx-auto lg:hidden bg-white shadow-md relative">

            <div className="flex justify-between  items-center px-4 py-3">

                <FiMenu
                    className="w-6 h-6 text-[#726E8D] cursor-pointer"
                    onClick={toggleMenu}
                />
            </div>


            <div
                className={`fixed top-0 right-0 h-full w-40  bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
            >

                <div className="flex justify-end p-4">
                    <IoClose
                        className="w-6 h-6 text-[#726E8D] cursor-pointer"
                        onClick={toggleMenu}
                    />
                </div>

                <nav className="flex flex-col ml-8 items-start p-4 space-y-4">
                    <Link href="./" passHref>
                        <p
                            className="text-[#726E8D] hover:text-gray-200 text-1xl"
                            onClick={handleOptionClick}
                        >
                            Home
                        </p>
                    </Link>
                    <Link href="/products" passHref>
                        <p
                            className="text-[#726E8D] hover:text-gray-200 text-1xl"
                            onClick={handleOptionClick}
                        >
                            Products
                        </p>
                    </Link>
                    <Link href="/about" passHref>
                        <p
                            className="text-[#726E8D] hover:text-gray-200 text-1xl"
                            onClick={handleOptionClick}
                        >
                            About Us
                        </p>
                    </Link>


                </nav>
            </div>
        </div>
    );
};

export default MobNav