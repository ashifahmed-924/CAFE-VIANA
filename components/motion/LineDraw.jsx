"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_D = "M 4 12 Q 60 4 116 12";

const LineDraw = forwardRef(function LineDraw(
  {
    className = "",
    color = "var(--pistachio)",
    strokeWidth = 1.5,
    d = DEFAULT_D,
    viewBox = "0 0 120 24",
    duration = 1.2,
    delay = 0,
    start = "top 85%",
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
        ease: opts.ease ?? "power2.out",
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
          ease: "power2.out",
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
  }, [reduced, autoDraw, duration, delay, start, once, d]);

  return (
    <svg
      ref={rootRef}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
});

export default LineDraw;
