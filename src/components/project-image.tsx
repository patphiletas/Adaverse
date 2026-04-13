"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  sources: string[];
  alt: string;
  className?: string;
  fill?: boolean;
  height?: number;
  priority?: boolean;
  sizes?: string;
  width?: number;
};

export default function ProjectImage({
  alt,
  className,
  fill = false,
  height,
  priority = false,
  sizes,
  sources,
  width,
}: Props) {
  const imageSources = sources?.length ? sources : ["/default-project.svg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const src = imageSources[currentIndex];

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      height={height}
      onError={() => {
        setCurrentIndex((index) => {
          if (index >= imageSources.length - 1) return index;
          return index + 1;
        });
      }}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}
