"use client"; // This tells Next.js this is a Client Component

import AddToCartButton from "./add-to-cart-button"; // Import the button
import { cormorant, montserrat } from "@/ui/fonts"; // Fonts for styling

export default function ProductDetails({
  product,
}: {
  product: { name: string; price: number | string; description: string };
}) {
  const price = Number(product.price) || 0; // Ensure price is a valid number

  return (
    <div className="w-full md:w-1/2">
      {/* Product Name */}
      <h1 className={`${cormorant.className} text-3xl md:text-4xl font-bold mt-4 md:mt-0 mb-4`}>
        {product.name}
      </h1>
      {/* Product Price */}
      <p className={`${montserrat.className} text-lg md:text-xl font-semibold text-gray-700 mb-4`}>
        {"Price: $" + price.toFixed(2)}
      </p>
      {/* Product Description */}
      <p className={`${montserrat.className} text-base md:text-lg text-gray-600 mb-4`}>
        {product.description}
      </p>
      {/* Add to Cart Button */}
      <div className="flex justify-end mb-8">
        <AddToCartButton
          onClick={() => {
            console.log(`${product.name} added to cart`);
          }}
        />
      </div>
    </div>
  );
}
