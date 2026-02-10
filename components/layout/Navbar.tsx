"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import SearchComp from "@/components/layout/SearchComp";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-md backdrop-blur bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 text-slate-800 dark:text-slate-200">

          {/* Logo */}
          <div className="flex shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 cursor-pointer">
                <MdOutlineProductionQuantityLimits />
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link href="/" className="hover:text-indigo-500">Home</Link>
            <Link href="/about" className="hover:text-indigo-500">About</Link>
            <Link href="/products" className="hover:text-indigo-500">Products</Link>
            <Link href="/contact" className="hover:text-indigo-500">Contact</Link>

            {/* <SearchComp /> */}
          </div>

          <ModeToggle />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg">
          <div className="px-4 pt-6 space-y-3 text-slate-800 dark:text-slate-200">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
