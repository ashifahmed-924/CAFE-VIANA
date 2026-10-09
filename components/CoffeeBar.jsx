"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drinks } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import LineDraw from "@/components/motion/LineDraw";
import ImageMask from "@/components/motion/ImageMask";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BAR_CURVE =
  "M 8 28 C 80 4 160 4 232 18 S 360 36 392 22";

const TAGS = ["COFFEE", "TEA", "FRESH JUICE"];

export default function CoffeeBar() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const tagsRef = useRef(null);
  const imagesRef = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const headline = headlineRef.current;
        const tags = tagsRef.current?.querySelectorAll("[data-coffee-tag]");
        const images = imagesRef.current.filter(Boolean);

        if (headline) {
          gsap.fromTo(
            headline,
            { filter: "blur(14px)", opacity: 0.35, y: 24 },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headline,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        if (tags?.length) {
          gsap.fromTo(
            tags,
            { opacity: 0, letterSpacing: "0.42em" },
            {
              opacity: 1,
              letterSpacing: "0.28em",
              duration: 0.9,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: tagsRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        if (images.length) {
          gsap.fromTo(
            images,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            },
          );
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
      id="coffee"
      ref={sectionRef}
      className="relative overflow-hidden bg-buttercream/92 py-16 md:py-24"
      data-cursor="SIP"
    >
      <VianaPattern variant="tile" colorClass="text-oxblood" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="oxblood" className="mb-8 md:mb-10">
          Coffee bar
        </SectionLabel>

        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.98] text-oxblood"
              style={reduced ? { filter: "none", opacity: 1 } : undefined}
            >
              COFFEE PLEASE
            </h2>

            <LineDraw
              className="mt-4 h-6 w-full max-w-md"
              d={BAR_CURVE}
              viewBox="0 0 400 32"
              color="var(--raspberry)"
              strokeWidth={2}
              duration={1.4}
              delay={0.15}
            />

            <p className="text-desc mt-6 max-w-md font-body text-base leading-relaxed">
              Espresso, pots of tea, and fresh juice — drink in at the counter or
              take away through Baxter.
            </p>

            <div
              ref={tagsRef}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              aria-label="Drinks available"
            >
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  data-coffee-tag
                  className="font-nav text-[0.68rem] font-bold uppercase tracking-[0.28em] text-deep-plum"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {drinks.map((item, i) => (
              <figure
                key={item.id}
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                className={`flex flex-col ${i === 1 ? "md:mt-8" : i === 2 ? "md:-mt-4" : ""}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-oxblood/15 bg-porcelain/60">
                  <ImageMask
                    variant={i === 0 ? "vertical" : i === 1 ? "bottom" : "curtain"}
                    src={item.image}
                    alt={`${item.name}`}
                    className="h-full w-full"
                    delay={0.08 * i}
                  />
                </div>
                <figcaption className="mt-2 font-display text-sm text-deep-plum md:text-base">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
