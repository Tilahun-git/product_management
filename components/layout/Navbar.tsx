"use client"
import Link from "next/link";
import React, {useActionState, useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import SearchComp from '@/components/layout/SearchComp'



function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 shadow-md backdrop-blur">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 ">
        <div className="flex justify-between items-center text-blue-800 h-16">

                {/*company branding logo*/}
        <div className="flex shrink-0">
          <Link href={'/'}>
          <span className="text-2xl font-bold text-indingo-700 cursor-pointer">
            <MdOutlineProductionQuantityLimits/>
          </span>
          </Link>
        </div>

        {/*navigation links here below*/}

        <div className="hidden md:flex space-x-10">
          <Link href="/" className="text-blue-700 hover:text-indigo-600 font-medium transition-colors duration-200">Home</Link>
          <Link href="/about" className="text-blue-700 hover:text-indigo-600 font-medium transition-colors duration-200">About</Link>
          <Link href="/products" className="text-blue-700 hover:text-indigo-600 font-medium transition-colors duration-200">Products</Link>
          <Link href="/contact" className="text-blue-700 hover:text-indigo-600 font-medium transition-colors duration-200">Contact</Link>
        
        <SearchComp/>
        </div>
        
            <ModeToggle/>
        {/*Mobile navigation humberger menu */}

        <div className="md:hidden">
          <button type = "button" onClick={()=> setIsOpen(!isOpen)}>
            {isOpen?
            <MdClose />:
            <GiHamburgerMenu/>
            }
          </button>
          
        </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="max-w-4xl md:hidden fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg z-49 transform transition-transform duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              About
            </Link>
            <Link href="/products"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              Products
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
