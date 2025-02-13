"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="border-b border-dark-brown/20 bg-light-green">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Clickable Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.webp" alt="Handcrafted Haven Logo" width={50} height={50} priority />
          <div className="font-bold text-xl font-serif">Handcrafted Haven</div>
        </Link>

        {/* Auth & Catalog Buttons */}
        <div className="flex items-center space-x-4">
          {/* Product Catalog Button */}
          <Link href="/products/product-catalog">
            <button className="bg-dark-brown text-white py-2 px-4 rounded hover:bg-dark-green hover:text-white transition-colors">
              Product Catalog
            </button>
          </Link>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link href="/dashboard/auth/login">
              <button className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
