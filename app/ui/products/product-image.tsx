"use client"; 

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
}

export default function ProductImage({ imageUrl }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="relative w-full h-96 bg-gray-200 p-4 flex justify-center items-center">
      {/* Heart icon overlay */}
      <div className="absolute top-2 left-2 p-2 bg-black rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3.172 5a4 4 0 015.656 0L10 6.172l1.172-1.172a4 4 0 115.656 5.656L10 17.414l-6.828-6.828a4 4 0 010-5.656z" />
        </svg>
      </div>

      {/* Image container with `object-contain` for full visibility */}
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt="Product Image"
          fill
          className="object-contain rounded-lg"
          onError={() => setImgSrc("/placeholder.jpg")} 
        />
      </div>
    </div>
  );
}
