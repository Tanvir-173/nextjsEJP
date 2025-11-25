"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center text-black">
      <Link href="/" className="font-bold text-xl">MyApp</Link>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>

        {!user ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        ) : (
          <>
            <span className="mr-2">{user.email}</span>
            <Link href="/products/add">Add Product</Link>
            <Link href="/products/manage">Manage Products</Link>
            <button onClick={handleLogout} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
