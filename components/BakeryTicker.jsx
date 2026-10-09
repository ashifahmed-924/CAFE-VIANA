"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { business } from "@/data/cafeViana";
import useReducedMotion from "@/hooks/useReducedMotion";

function TickerRow({ items }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((word) => (
        <span key={word} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-nav text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-buttercream">
            {word}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-apricot" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export default function BakeryTicker() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const items = business.ticker;

  useEffect(() => {
    if (reduced) return undefined;

    const track = trackRef.current;
    if (!track) return undefined;

    let ctx;
    let tween;

    const run = () => {
      ctx = gsap.context(() => {
        const width = track.scrollWidth / 2;
        if (!width) return;

        tween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -width,
            duration: Math.max(28, width / 18),
            ease: "none",
            repeat: -1,
          },
        );
      }, track);
    };

    run();

    return () => {
      tween?.kill();
      ctx?.revert();
    };
  }, [reduced, items]);

  return (
    <div
      className="overflow-hidden border-y border-buttercream/10 bg-oxblood/90 py-3.5"
      aria-hidden
    >
      <div
        ref={trackRef}
        className={`flex w-max ${reduced ? "justify-center px-4" : ""}`}
      >
        {reduced ? (
          <p className="font-nav text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-buttercream">
            {items.join(" · ")}
          </p>
        ) : (
          <>
            <TickerRow items={items} />
            <TickerRow items={items} />
          </>
        )}
      </div>
    </div>
  );
}
