// app/ui/product/product-card.tsx

import Image from "next/image";

export default function ProductCard({
  product,
}: {
  product: {
    product_id: string;
    productName: string;
    productDesc: string;
    price: number | string;
    imageSRC: string;
  };
}) {
  return (
    <div className="border rounded-md p-4 shadow-md">
      {/* Image container */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.imageSRC}
          alt={product.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold">{product.productName}</h2>
      <p className="text-sm text-gray-600">{product.productDesc}</p>
      <p className="text-md font-semibold">
        ${Number(product.price).toFixed(2)}
      </p>
    </div>
  );
}
