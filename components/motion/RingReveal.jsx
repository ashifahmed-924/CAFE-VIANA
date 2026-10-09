"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RINGS = [
  { size: 280, border: "border-raspberry/35", delay: 0 },
  { size: 420, border: "border-apricot/30", delay: 0.12 },
  { size: 580, border: "border-pistachio/25", delay: 0.24 },
];

export default function RingReveal({
  className = "",
  start = "top 75%",
  once = true,
  duration = 1.4,
}) {
  const rootRef = useRef(null);
  const ringRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const root = rootRef.current;
    const rings = ringRefs.current.filter(Boolean);
    if (!root || rings.length === 0) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        gsap.set(rings, { scale: 0.35, opacity: 0, transformOrigin: "50% 50%" });

        gsap.to(rings, {
          scale: 1,
          opacity: 1,
          duration,
          stagger: 0.14,
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
  }, [reduced, start, once, duration]);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`.trim()}
      aria-hidden
    >
      {RINGS.map((ring, i) => (
        <span
          key={ring.size}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          className={`absolute rounded-full border ${ring.border}`}
          style={{
            width: ring.size,
            height: ring.size,
            ...(reduced ? { opacity: 0.6, transform: "scale(1)" } : {}),
          }}
        />
      ))}
    </div>
  );
}
