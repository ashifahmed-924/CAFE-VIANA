"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lunch } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function statusTone(status) {
  const s = (status || "DAILY").toUpperCase();
  if (s === "SPECIAL") return "special";
  if (s === "WEEKEND") return "weekend";
  return "daily";
}

export default function LunchBoard() {
  const sectionRef = useRef(null);
  const wallRef = useRef(null);
  const stripRefs = useRef([]);
  const reduced = useReducedMotion();
  const [hoverId, setHoverId] = useState(null);
  const [thumbPos, setThumbPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall || reduced) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const strips = stripRefs.current.filter(Boolean);
        gsap.set(strips, { x: -28, opacity: 0, rotate: -0.4 });

        gsap.to(strips, {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wall,
            start: "top 78%",
            once: true,
          },
        });
      }, wall);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  const handleWallMove = useCallback(
    (e) => {
      if (reduced || typeof window === "undefined") return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const wall = wallRef.current;
      if (!wall) return;

      const rect = wall.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      stripRefs.current.forEach((strip, i) => {
        if (!strip) return;
        const depth = 1 + (i % 3) * 0.15;
        gsap.to(strip, {
          x: nx * 18 * depth,
          y: ny * 6 * depth,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      setThumbPos({ x: e.clientX, y: e.clientY });
    },
    [reduced],
  );

  const handleWallLeave = useCallback(() => {
    setHoverId(null);
    stripRefs.current.forEach((strip) => {
      if (!strip) return;
      gsap.to(strip, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
    });
  }, []);

  const hovered = lunch.find((item) => item.id === hoverId);

  return (
    <section
      id="lunch"
      ref={sectionRef}
      className="relative overflow-hidden bg-porcelain/94 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="sage" className="mb-8">
          Lunch board
        </SectionLabel>

        <TextMask
          as="h2"
          className="max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-deep-plum"
        >
          LUNCH CHANGES THE DAY
        </TextMask>

        <p className="text-desc mt-4 max-w-xl font-body text-sm leading-relaxed md:text-base">
          Rolls, souvlaki, loaded chips, and rotating specials — see what is on
          the wall today.
        </p>

        <div
          ref={wallRef}
          className="relative mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5 md:mt-14"
          onMouseMove={handleWallMove}
          onMouseLeave={handleWallLeave}
          role="list"
          aria-label="Lunch menu strips"
        >
          {lunch.map((item, i) => {
            const tone = statusTone(item.status);
            const isSpecial = tone === "special";

            return (
              <article
                key={item.id}
                ref={(el) => {
                  stripRefs.current[i] = el;
                }}
                role="listitem"
                className="group relative border-l-[3px] border-pistachio/80 bg-buttercream/95 px-4 py-3.5 shadow-[0_1px_0_rgba(52,39,37,0.06)] transition-colors hover:bg-buttercream md:px-5 md:py-4"
                data-cursor="BITE"
                onMouseEnter={() => setHoverId(item.id)}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3
                    className={`font-display text-base leading-snug text-deep-plum md:text-lg ${
                      isSpecial
                        ? "underline decoration-raspberry decoration-2 underline-offset-4"
                        : ""
                    }`}
                  >
                    {item.name}
                  </h3>
                  <span
                    className={`shrink-0 font-nav text-[0.55rem] font-bold uppercase tracking-[0.18em] ${
                      tone === "weekend"
                        ? "text-apricot"
                        : isSpecial
                          ? "text-raspberry"
                          : "text-dark-sage"
                    }`}
                  >
                    {item.status || "DAILY"}
                  </span>
                </div>
                <p className="text-desc mt-1.5 font-body text-sm leading-relaxed md:text-[0.95rem]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {hovered && !reduced ? (
          <div
            className="pointer-events-none fixed z-40 hidden h-28 w-36 overflow-hidden rounded-sm border border-oxblood/20 bg-porcelain shadow-lg md:block"
            style={{
              left: thumbPos.x + 18,
              top: thumbPos.y - 56,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hovered.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
