"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fills a relatively positioned parent and reveals the photo on scroll.
 * Photos stay visible by default — motion is additive, never a permanent hide.
 */
export default function ImageMask({
  variant = "bottom",
  src,
  alt = "",
  className = "",
  imgClassName = "",
  delay = 0,
  duration = 0.9,
  start = "top 92%",
  once = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const reduced = useReducedMotion();

  const wrapClasses = useMemo(
    () =>
      ["absolute inset-0 overflow-hidden bg-buttercream/40", className]
        .filter(Boolean)
        .join(" "),
    [className],
  );

  const yFrom = variant === "top" ? -28 : 28;

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return undefined;

    if (reduced) {
      gsap.set(img, { clearProps: "all", opacity: 1, y: 0 });
      return undefined;
    }

    let safetyId = 0;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        img,
        { opacity: 0.15, y: yFrom },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: wrap,
            start,
            once,
            invalidateOnRefresh: true,
            toggleActions: "play none none none",
          },
        },
      );

      safetyId = window.setTimeout(() => {
        if (tween.progress() < 1) {
          gsap.to(img, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        }
      }, 1600);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, wrap);

    return () => {
      window.clearTimeout(safetyId);
      ctx.revert();
      gsap.set(img, { clearProps: "transform,opacity", opacity: 1, y: 0 });
    };
  }, [reduced, yFrom, delay, duration, start, once]);

  return (
    <div ref={wrapRef} className={wrapClasses}>
      <div ref={imgRef} className="absolute inset-0 h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`.trim()}
        />
      </div>
    </div>
  );
}
