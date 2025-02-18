"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acctId, setAcctId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [navKey, setNavKey] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Function to update login state
  const updateAuthState = () => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedAcctId = localStorage.getItem("acct_id");
    setIsLoggedIn(loggedInStatus);
    setAcctId(storedAcctId);
    setNavKey((prevKey) => prevKey + 1); 
  };

  // Function to update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItemCount(cart.length);
  };

  // Run once when the page loads and whenever storage updates
  useEffect(() => {
    updateAuthState();
    updateCartCount();

    // Listen for localStorage changes
    const handleStorageChange = () => {
      updateAuthState();
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Login trigger
  useEffect(() => {
    const loginCheckInterval = setInterval(() => {
      if (localStorage.getItem("isLoggedIn") === "true") {
        updateAuthState();
        clearInterval(loginCheckInterval);
      }
    }, 500);

    return () => clearInterval(loginCheckInterval);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("acct_id");
    updateAuthState();
    router.push("/");
  };

  return (
    <header className="border-b border-dark-brown/20 bg-light-green" key={navKey}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.webp" alt="Handcrafted Haven Logo" width={50} height={50} priority />
          <span className="font-bold text-xl font-serif">Handcrafted Haven</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/products/product-catalog">
            <button
              className={`py-2 px-4 rounded transition-colors ${
                pathname === "/products/product-catalog"
                  ? "bg-dark-brown text-white"
                  : "bg-dark-green text-white hover:bg-dark-brown"
              }`}
            >
              Product Catalog
            </button>
          </Link>

          {/* Only Show Dashboard & Cart if Logged In */}
          {isLoggedIn && acctId && (
            <>
              <Link href={`/dashboard/seller/${acctId}`}>
                <button
                  className={`py-2 px-4 rounded transition-colors ${
                    pathname.startsWith(`/dashboard/seller/${acctId}`)
                      ? "bg-dark-brown text-white"
                      : "bg-dark-green text-white hover:bg-dark-brown"
                  }`}
                >
                  Dashboard
                </button>
              </Link>

              <Link href="/dashboard/buyer/cart">
                <button
                  className={`py-2 px-4 rounded transition-colors ${
                    pathname === "/cart"
                      ? "bg-dark-brown text-white"
                      : "bg-dark-green text-white hover:bg-dark-brown"
                  }`}
                >
                  🛒 Cart ({cartItemCount})
                </button>
              </Link>
            </>
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
              <button
                className="bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
              >
                Login
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6 text-dark-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <>
                <Link href={`/dashboard/seller/${acctId}`}>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
                  >
                    Dashboard
                  </button>
                </Link>

                <Link href="cart">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left bg-dark-green text-white py-2 px-4 rounded hover:bg-dark-brown transition-colors"
                  >
                    Cart ({cartItemCount})
                  </button>
                </Link>
              </>
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
