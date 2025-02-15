"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acctId, setAcctId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if localStorage indicates we are logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");

    // Retrieve the stored account_id 
    const storedAcctId = localStorage.getItem("acct_id");
    if (storedAcctId) {
      setAcctId(storedAcctId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("acct_id");
    setIsLoggedIn(false);
    setAcctId(null);
    router.push("/");
  };

  return (
    <header className="border-b border-dark-brown/20 bg-light-green">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Home Link */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.webp"
            alt="Handcrafted Haven Logo"
            width={50}
            height={50}
            priority
          />
          <div className="font-bold text-xl font-serif">Handcrafted Haven</div>
        </Link>

        {/* Buttons on the right side */}
        <div className="flex items-center space-x-4">
          {/* Product Catalog Button */}
          <Link href="/products/product-catalog">
            <button className="bg-dark-brown text-white py-2 px-4 rounded hover:bg-dark-green hover:text-white transition-colors">
              Product Catalog
            </button>
          </Link>

          {/* Dashboard Button: shown if logged in and we have an acct_id */}
          {isLoggedIn && acctId && (
            <Link href={`/dashboard/seller/${acctId}`}>
              <button className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors">
                Dashboard
              </button>
            </Link>
          )}

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
