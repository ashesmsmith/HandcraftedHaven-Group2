"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acctId, setAcctId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
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

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/products/product-catalog">
            <button className="bg-dark-brown text-white py-2 px-4 rounded hover:bg-dark-green transition-colors">
              Product Catalog
            </button>
          </Link>
          {isLoggedIn && acctId && (
            <Link href={`/dashboard/seller/${acctId}`}>
              <button className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors">
                Dashboard
              </button>
            </Link>
          )}
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
        </nav>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-6 w-6 text-dark-green"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-light-green border-t border-dark-brown/20">
          <div className="container mx-auto flex flex-col space-y-2 py-4 px-6">
            <Link href="/products/product-catalog">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left bg-dark-brown text-white py-2 px-4 rounded hover:bg-dark-green transition-colors"
              >
                Product Catalog
              </button>
            </Link>
            {isLoggedIn && acctId && (
              <Link href={`/dashboard/seller/${acctId}`}>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
                >
                  Dashboard
                </button>
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link href="/dashboard/auth/login">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
