"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ImageMask from "@/components/motion/ImageMask";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LOCAL_STRIP = [
  {
    key: "storefront",
    src: "/images/cafe-viana/storefront.jpg",
    alt: "Cafe Viana storefront",
  },
  {
    key: "interior",
    src: "/images/cafe-viana/interior.jpg",
    alt: "Cafe Viana interior",
  },
  {
    key: "outdoor",
    src: "/images/cafe-viana/outdoor.jpg",
    alt: "outdoor seating",
  },
];

export default function CommunitySection() {
  const sectionRef = useRef(null);
  const stripRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      const frames = stripRefs.current.filter(Boolean);
      gsap.fromTo(
        frames,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative overflow-hidden bg-buttercream/92 py-10 md:py-14"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-2 md:gap-10 md:px-8 lg:gap-14">
        {/* Left — copy */}
        <div className="relative z-10 max-w-xl">
          <SectionLabel tone="oxblood" className="mb-5">
            Part of Baxter
          </SectionLabel>

          <TextMask
            as="h2"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] text-deep-plum"
          >
            A neighbourhood cafe on Grant Road.
          </TextMask>

          <div className="mt-5 space-y-3">
            {business.community.baxterPrimary
              .split(/(?<=[.!?])\s+/)
              .filter(Boolean)
              .map((sentence, i) => (
                <TextMask
                  key={sentence.slice(0, 24)}
                  as="p"
                  className="text-desc font-body text-sm leading-relaxed md:text-base"
                  delay={0.08 * i}
                >
                  {sentence.trim()}
                </TextMask>
              ))}
          </div>

          <p className="mt-6 font-nav text-[0.58rem] uppercase tracking-[0.18em] text-dark-sage">
            {business.shortSuburb}
          </p>
        </div>

        {/* Right — pattern + images */}
        <div className="relative">
          <VianaPattern
            variant="pastry"
            colorClass="text-oxblood"
            className="opacity-80"
          />

          <ul className="relative z-10 grid grid-cols-3 gap-2.5 md:gap-3">
            {LOCAL_STRIP.map((photo, i) => (
              <li
                key={photo.key}
                ref={(el) => {
                  stripRefs.current[i] = el;
                }}
                className={`overflow-hidden rounded-sm bg-porcelain/50 shadow-[0_12px_28px_-20px_rgba(52,39,37,0.5)] ${
                  i === 1 ? "mt-4 md:mt-6" : i === 2 ? "mt-2 md:mt-3" : ""
                }`}
              >
                <div className="aspect-[3/4] w-full">
                  <ImageMask
                    variant={i % 2 === 0 ? "bottom" : "top"}
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full"
                    delay={0.05 * i}
                    duration={1}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
