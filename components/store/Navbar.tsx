'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    router.push("/cart");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-indigo-600 text-2xl">
            <MdOutlineProductionQuantityLimits />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>

            <ModeToggle />

            {/* Cart always visible */}
            <button
              onClick={handleCartClick}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              🛒 Cart ({cart.length})
            </button>

            {/* Login/Register or Logout */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button onClick={() => setIsOpen(true)}>
              <GiHamburgerMenu size={24} />
            </button>
          </div>

        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" />}

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={drawerRef}
          className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 z-50 shadow-xl md:hidden"
        >
          <div className="flex justify-start p-4 border-b">
            <button onClick={() => setIsOpen(false)}>
              <MdClose size={24} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-4 text-lg">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            {/* Cart */}
            <button
              onClick={() => {
                setIsOpen(false);
                handleCartClick();
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              🛒({cart.length})
            </button>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
