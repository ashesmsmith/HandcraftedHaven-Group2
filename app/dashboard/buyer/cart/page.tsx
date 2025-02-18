"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the Cart Item type
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
};

export default function CartPage() {
  // Sample Cart Items (replace with actual cart state from global context/store)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  // Update quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {cartItems.map((item, index) => (
            <div
              key={item.id ? item.id : `cart-item-${index}`} // ✅ Ensures a unique key
              className="flex items-center justify-between border-b py-4"
            >
              {/* Product Image */}
              <div className="w-20 h-20 relative">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-4 border">{item.quantity}</span>
                <button
                  className="px-3 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="ml-4 text-red-600 hover:text-red-800"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price & Checkout */}
          <div className="text-right mt-6">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <Link href="/dashboard/buyer/checkout">
              <button className="mt-4 bg-[#543A27] text-white px-6 py-2 rounded hover:bg-[#8A5D3D]">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
