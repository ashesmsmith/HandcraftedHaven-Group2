"use client"; // This tells Next.js this is a Client Component

import { cormorant, montserrat } from "@/ui/fonts";

export default function ProductDetails({
  product,
}: {
  product: { name: string; price: number | string; description: string };
}) {
  const price = Number(product.price) || 0; 

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
    </div>
  );
}
