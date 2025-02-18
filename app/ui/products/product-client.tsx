"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductDetails from "@/ui/products/product-details";
import { ProductsTable } from "@/lib/definitions"; // ✅ Correct type import

// Define a new type for cart items that extends ProductsTable with quantity
interface CartItem extends ProductsTable {
  quantity: number;
}

export default function ProductClient({ product }: { product: ProductsTable }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  // Function to add product to cart (localStorage)
  const addToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product exists in the cart
    const existingItem = cart.find((item) => item.product_id === product.product_id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1, // ✅ Add quantity field properly
        imageSRC: product.imageSRC || "/no-image.png",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => router.push("/dashboard/buyer/cart"), 500);
  };

  return (
    <div className="w-full md:w-1/2">
      <ProductDetails
        product={{
          name: product.productName,
          price: Number(product.price).toFixed(2),
          description: product.productDesc,
        }}
      />

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        className={`mt-4 px-6 py-2 rounded w-full transition text-white ${
          added ? "bg-[#535E1C]" : "bg-[#543A27] hover:bg-[#8A5D3D]"
        }`}
      >
        {added ? "Added to Cart!" : "Add to Cart"}
      </button>
    </div>
  );
}
