"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useReducedMotion from "@/hooks/useReducedMotion";

function Frame({ images, activeIndex, altPrefix, className }) {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-porcelain shadow-[0_16px_36px_-28px_rgba(52,39,37,0.45)] ${className}`}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === activeIndex ? img.alt || `${altPrefix} ${i + 1}` : ""}
          fill
          sizes="(max-width: 768px) 45vw, 280px"
          priority={i < 2}
          className={`object-cover transition-opacity duration-500 ease-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Two frames that advance every `intervalMs`.
 * layout: "stack" (up/down) | "row" (side by side — shorter section height)
 */
export default function VerticalImageFrames({
  images = [],
  intervalMs = 1000,
  className = "",
  frameClassName = "",
  altPrefix = "Gallery",
  layout = "stack",
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (reduced || count < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, count, intervalMs]);

  if (!count) return null;

  const secondIndex = count > 1 ? (index + 1) % count : index;
  const isRow = layout === "row";

  return (
    <div
      className={`${
        isRow ? "grid grid-cols-2 gap-2 md:gap-3" : "flex flex-col gap-2.5 md:gap-3"
      } w-full ${className}`}
    >
      <Frame
        images={images}
        activeIndex={index}
        altPrefix={altPrefix}
        className={frameClassName}
      />
      <Frame
        images={images}
        activeIndex={secondIndex}
        altPrefix={altPrefix}
        className={frameClassName}
      />
    </div>
  );
}
