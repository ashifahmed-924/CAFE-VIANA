"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextMask({
  as: Component = "div",
  className = "",
  innerClassName = "",
  children,
  delay = 0,
  duration = 0.85,
  y = "115%",
  start = "top 88%",
  once = true,
}) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        gsap.set(inner, { y, opacity: 0.001 });

        gsap.to(inner, {
          y: "0%",
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      }, root);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced, delay, duration, y, start, once]);

  return (
    <Component ref={rootRef} className={`mask-reveal ${className}`.trim()}>
      <span
        ref={innerRef}
        className={innerClassName}
        style={reduced ? { transform: "none", opacity: 1 } : undefined}
      >
        {children}
      </span>
    </Component>
  );
}
