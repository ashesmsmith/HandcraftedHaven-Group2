// app/ui/Carousel.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CarouselItem {
  src: string; // e.g. "/prod-images/book_shirt.webp"
  id: string;  // route param for /products/[id]
}

interface CarouselProps {
  images: CarouselItem[];
  interval?: number; // ms between auto-rotate
}

export default function Carousel({ images, interval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  // Manual nav
  function goToPrev() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-48 bg-light-brown flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <Link href={`/products/${currentImage.id}`}>
          <Image
            src={currentImage.src}
            alt={currentImage.id}
            fill
            className="object-cover cursor-pointer"
          />
        </Link>
      </div>

      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-brown text-cream px-3 py-1 rounded hover:bg-light-brown hover:text-white transition-colors"
      >
        Prev
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-brown text-cream px-3 py-1 rounded hover:bg-light-brown hover:text-white transition-colors"
      >
        Next
      </button>
    </div>
  );
}
