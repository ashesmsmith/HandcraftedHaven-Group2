"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function CustomImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...rest}
      onError={() => setImgSrc("/default_product.webp")}
    />
  );
}
