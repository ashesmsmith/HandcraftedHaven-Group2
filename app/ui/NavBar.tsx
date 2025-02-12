"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto flex items-center justify-between">
      {/* Clickable Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.webp" alt="Handcrafted Haven Logo" width={50} height={50} priority />
        <div className="font-bold text-xl font-serif">Handcrafted Haven</div>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {/* Product Catalog Button */}
        <Link href="/products/product-catalog">
          <button className="bg-dark-brown text-white py-2 px-4 rounded hover:bg-light-green hover:text-dark-brown transition-colors">
            Product Catalog
          </button>
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/dashboard/auth/login">
              <button className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown hover:text-white transition-colors">
                Login
              </button>
            </Link>

          </>
        )}
      </div>
    </div>
  );
}
