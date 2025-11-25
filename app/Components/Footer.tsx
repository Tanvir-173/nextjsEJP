import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left side: copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        
        {/* Right side: links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-900 dark:hover:text-white transition">
            Products
          </Link>
          <Link href="/auth/login" className="hover:text-gray-900 dark:hover:text-white transition">
            Login
          </Link>
          <Link href="/auth/register" className="hover:text-gray-900 dark:hover:text-white transition">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
