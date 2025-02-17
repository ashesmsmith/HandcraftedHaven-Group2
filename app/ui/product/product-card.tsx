import Image from "next/image";

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: {
    product_id: string;
    productName: string;
    productDesc: string;
    price: number;
    imageSRC: string;
  };
  onAddToCart: (productId: string) => void; // Add function prop to handle add to cart
}) {
  // ✅ Ensure correct image path & provide a fallback image
  const imageSrc = product.imageSRC.startsWith("/")
    ? product.imageSRC
    : `/prod_images/${product.imageSRC}`;

  return (
    <div className="border rounded-md p-4 shadow-md">
      {/* Image container */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageSrc || "/prod_images/no-image.png"} // Fallback if image missing
          alt={product.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold">{product.productName}</h2>
      <p className="text-sm text-gray-600">{product.productDesc}</p>
      <p className="text-md font-semibold">${product.price.toFixed(2)}</p>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-[#8A5D3D] text-white font-semibold py-2 px-4 rounded hover:bg-[#543A27] focus:outline-none focus:ring-2 focus:ring-[#8A5D3D] focus:ring-offset-2"
        onClick={() => onAddToCart(product.product_id)} // Trigger the passed callback
      >
        Add to Cart
      </button>
    </div>
  );
}
