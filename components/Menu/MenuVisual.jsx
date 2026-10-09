"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function MenuVisual({ item, categoryId }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const reduced = useReducedMotion();
  const prevCategory = useRef(categoryId);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || reduced) return undefined;

    if (prevCategory.current === categoryId) return undefined;
    prevCategory.current = categoryId;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        gsap.set(img, {
          clipPath: "inset(0 100% 0 0)",
          WebkitClipPath: "inset(0 100% 0 0)",
          scale: 1.06,
        });

        gsap.to(img, {
          clipPath: "inset(0 0 0 0)",
          WebkitClipPath: "inset(0 0 0 0)",
          scale: 1,
          duration: 0.75,
          ease: "power3.inOut",
        });
      }, wrap);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [categoryId, item?.id, reduced]);

  if (!item) {
    return (
      <div
        className="flex aspect-[3/4] items-center justify-center rounded-sm border border-dark-sage/25 bg-buttercream/40 p-6 text-center"
        aria-hidden
      >
        <p className="font-nav text-[0.62rem] uppercase tracking-[0.18em] text-dark-sage">
          Select a category
        </p>
      </div>
    );
  }

  const alt = `${item.name}`;

  return (
    <figure
      ref={wrapRef}
      className="relative aspect-[3/4] overflow-hidden rounded-sm border border-oxblood/15 bg-porcelain/80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        key={`${categoryId}-${item.id}`}
        src={item.image}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-espresso/75 to-transparent px-4 pb-4 pt-12">
        <span className="font-display text-lg text-buttercream">{item.name}</span>
      </figcaption>
    </figure>
  );
}
