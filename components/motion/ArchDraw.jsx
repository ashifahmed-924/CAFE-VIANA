"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARCH_PATH =
  "M 28 148 L 28 62 Q 60 18 92 62 L 92 148 M 28 148 L 92 148 M 60 62 L 60 118 M 44 88 L 76 88";

const ArchDraw = forwardRef(function ArchDraw(
  {
    className = "",
    color = "currentColor",
    strokeWidth = 1.75,
    duration = 1.8,
    delay = 0,
    start = "top 80%",
    once = true,
    autoDraw = true,
  },
  ref,
) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const reduced = useReducedMotion();

  useImperativeHandle(ref, () => ({
    path: pathRef.current,
    root: rootRef.current,
    draw: (opts = {}) => {
      const path = pathRef.current;
      if (!path || typeof window === "undefined") return null;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      return gsap.to(path, {
        strokeDashoffset: 0,
        duration: opts.duration ?? duration,
        delay: opts.delay ?? delay,
        ease: opts.ease ?? "power2.inOut",
      });
    },
  }));

  useEffect(() => {
    const path = pathRef.current;
    const root = rootRef.current;
    if (!path || !root) return undefined;

    if (reduced) {
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      return undefined;
    }

    let ctx;

    const run = () => {
      const len = path.getTotalLength();
      ctx = gsap.context(() => {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

        if (!autoDraw) return;

        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start,
            once,
          },
        });
      }, root);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced, autoDraw, duration, delay, start, once]);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        ref={pathRef}
        d={ARCH_PATH}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ArchDraw;
