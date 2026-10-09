"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bakery } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import BreadItem from "@/components/Bakery/BreadItem";
import MobileSwipeRow from "@/components/MobileSwipeRow";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BreadShelf() {
  const sectionRef = useRef(null);
  const shelfLineRef = useRef(null);
  const loafRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const section = sectionRef.current;
    const line = shelfLineRef.current;
    const loaves = loafRefs.current.filter(Boolean);
    if (!section) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });
          gsap.to(line, {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });
        }

        if (loaves.length) {
          gsap.fromTo(
            loaves,
            { y: 36, opacity: 0.2, rotate: -2 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      }, section);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      id="bakery"
      ref={sectionRef}
      className="relative overflow-hidden bg-[color-mix(in_srgb,var(--pistachio)_55%,var(--porcelain)_45%)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="espresso" className="mb-4">
          Artisan bread shelf
        </SectionLabel>
        <h2 className="mb-4 font-display text-[clamp(2rem,5.5vw,4.75rem)] leading-[1.05] text-deep-plum">
          Baked for <span className="text-oxblood">Baxter.</span>
        </h2>
        <p className="text-desc mb-10 max-w-xl font-body text-sm leading-relaxed md:text-base">
          Recent shelf selections — availability rotates. Check in store for today&apos;s loaves.
        </p>

        {/* Mobile: one-row swipe + 3-dot indicator */}
        <MobileSwipeRow
          className="md:hidden"
          ariaLabel="Artisan bread shelf"
          tone="light"
        >
          {bakery.map((item) => (
            <div
              key={item.id}
              role="listitem"
              className="w-[72%] shrink-0 snap-start sm:w-[58%]"
            >
              <BreadItem item={item} compact />
            </div>
          ))}
        </MobileSwipeRow>

        {/* Tablet / desktop: shelf row */}
        <div className="relative hidden md:block">
          <div
            ref={shelfLineRef}
            className="absolute bottom-[4.5rem] left-0 right-0 h-px origin-left bg-dark-sage/50"
            aria-hidden
            style={reduced ? { transform: "scaleX(1)" } : undefined}
          />

          <div className="shelf-scroll flex gap-8 overflow-x-auto pb-6 md:gap-10">
            {bakery.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  loafRefs.current[i] = el;
                }}
              >
                <BreadItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
