"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pastries } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ImageMask from "@/components/motion/ImageMask";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LAYOUT = [
  { span: "md:col-span-5 md:row-span-2", variant: "curtain", offset: "md:-mt-6" },
  { span: "md:col-span-4 md:col-start-6", variant: "vertical", offset: "md:mt-10" },
  { span: "md:col-span-3 md:col-start-10 md:row-start-1", variant: "bottom", offset: "" },
  { span: "md:col-span-4 md:col-start-6 md:row-start-2", variant: "top", offset: "md:mt-4" },
  { span: "md:col-span-3 md:col-start-1 md:row-start-3", variant: "center", offset: "" },
  { span: "md:col-span-5 md:col-start-4 md:row-start-3", variant: "diagonal", offset: "md:-mt-8" },
  { span: "md:col-span-4 md:col-start-9 md:row-start-2", variant: "vertical", offset: "md:mt-6" },
  { span: "md:col-span-3 md:col-start-1 md:row-start-4", variant: "bottom", offset: "" },
  { span: "md:col-span-6 md:col-start-4 md:row-start-4", variant: "curtain", offset: "" },
];

export default function PastryCounter() {
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduced) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const items = itemRefs.current.filter(Boolean);
        gsap.fromTo(
          items,
          { y: 48, opacity: 0, rotate: -1.5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.95,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              once: true,
            },
          },
        );
      }, grid);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      id="pastries"
      className="relative overflow-hidden bg-porcelain py-16 md:py-24"
    >
      <VianaPattern variant="pastry" colorClass="text-raspberry" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="raspberry" className="mb-8">
          Sweet cabinet
        </SectionLabel>

        <TextMask
          as="h2"
          className="max-w-xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-deep-plum"
        >
          SWEET FROM THE CABINET
        </TextMask>

        <p className="text-desc mt-4 max-w-lg font-body text-sm leading-relaxed md:text-base">
          Jars, danish, scones, and biscuits — selections rotate through the
          week. Ask what is in the case today.
        </p>

        <div
          ref={gridRef}
          className="mt-12 grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
        >
          {pastries.map((item, i) => {
            const cfg = LAYOUT[i % LAYOUT.length];
            return (
              <article
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`group ${cfg.span} ${cfg.offset}`}
                data-cursor="SWEET"
              >
                <div
                  className={`relative overflow-hidden rounded-sm border border-oxblood/15 bg-buttercream/90 ${
                    i === 0
                      ? "aspect-[4/5] md:aspect-auto md:min-h-[420px]"
                      : i % 3 === 1
                        ? "aspect-[5/4]"
                        : "aspect-[4/3]"
                  }`}
                >
                  <ImageMask
                    variant={cfg.variant}
                    src={item.image}
                    alt={`${item.name}`}
                    className="h-full w-full"
                    delay={0.05 * (i % 4)}
                  />
                </div>
                <h3 className="mt-3 font-display text-base leading-snug text-deep-plum md:text-lg">
                  {item.name}
                </h3>
                <p className="text-desc mt-1.5 font-body text-xs leading-snug md:text-sm">
                  {item.description}
                </p>
                <p className="mt-1 font-nav text-[0.55rem] uppercase tracking-[0.14em] text-dark-sage">
                  {item.availability}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
