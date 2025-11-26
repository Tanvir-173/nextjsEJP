"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 relative">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>

          {!user ? (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          ) : (
            <div className="relative">
              {/* User Dropdown Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
              >
                {user.email}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-48 bg-white border rounded shadow-md z-50">
                  <Link
                    href="/products/add"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/products/manage"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Manage Products
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden mt-4 space-y-2 border-t pt-4">
          <Link href="/" className="block" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link
            href="/products"
            className="block"
            onClick={() => setMobileMenu(false)}
          >
            Products
          </Link>

          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="block"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block"
                onClick={() => setMobileMenu(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/products/add"
                className="block"
                onClick={() => setMobileMenu(false)}
              >
                Add Product
              </Link>
              <Link
                href="/products/manage"
                className="block"
                onClick={() => setMobileMenu(false)}
              >
                Manage Products
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
