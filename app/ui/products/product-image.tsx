"use client"; 

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
}

export default function ProductImage({ imageUrl }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="relative w-full h-96 bg-gray-200 p-4">

      {/* Image container with full visibility */}
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt="Product Image"
          fill
          className="object-contain rounded-lg"
          onError={() => setImgSrc("/no-image.png")} 
        />
      </div>
    </div>
  );
}
