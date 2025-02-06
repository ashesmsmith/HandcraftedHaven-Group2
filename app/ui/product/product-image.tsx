import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
}

export default function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <div className="relative w-full h-96 bg-gray-200 p-4">

      {/* Container for the Image to fill */}
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt="Product"
          fill
          className="object-cover rounded-lg"
          // Optionally: priority
          // priority
        />
      </div>
    </div>
  );
}
