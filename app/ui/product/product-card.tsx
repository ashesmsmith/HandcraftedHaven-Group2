import Image from "next/image";

export default function ProductCard({
  product,
}: {
  product: {
    product_id: string;
    productName: string;
    productDesc: string;
    price: number;
    imageSRC: string;
  };
}) {
  // ✅ Ensure correct image path & provide a fallback image
  const imageSrc = product.imageSRC.startsWith("/")
    ? product.imageSRC // ✅ If it already starts with "/", it's correct
    : `/prod_images/${product.imageSRC}`; // ✅ Ensure it is inside the correct folder

  return (
    <div className="border rounded-md p-4 shadow-md">
      {/* Image container */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageSrc || "/prod_images/no-image.png"} // ✅ Use fallback if missing
          alt={product.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold">{product.productName}</h2>
      <p className="text-sm text-gray-600">{product.productDesc}</p>
      <p className="text-md font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
}
