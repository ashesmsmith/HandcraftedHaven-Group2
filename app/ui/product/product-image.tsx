import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
}

export default function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <div className="relative w-full h-96 bg-gray-200 p-4">

      {/* Image container with `object-contain` for full visibility */}
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt="Product"
          fill
          className="object-contain rounded-lg" // 👈 Ensures the full image is visible without cropping
        />
      </div>
    </div>
  );
}
