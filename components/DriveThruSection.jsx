"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import LineDraw from "@/components/motion/LineDraw";
import GradientButton from "@/components/GradientButton";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { num: "01", label: "ORDER" },
  { num: "02", label: "PICK UP" },
  { num: "03", label: "GO" },
];

const ROUTE_D =
  "M 12 40 L 120 40 L 160 20 L 280 20 L 320 40 L 408 40";

export default function DriveThruSection() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const steps = stepRefs.current.filter(Boolean);
        gsap.fromTo(
          steps,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          },
        );
      }, section);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  if (!business.features.driveThru) {
    return null;
  }

  return (
    <section
      id="drive-thru"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="sage" className="mb-8">
          Drive-thru
        </SectionLabel>

        <TextMask
          as="h2"
          className="font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.02] text-deep-plum"
        >
          COFFEE. PIE. KEEP MOVING.
        </TextMask>

        <p className="mt-4 font-nav text-[0.72rem] font-bold uppercase tracking-[0.24em] text-oxblood">
          DRIVE-THRU AVAILABLE
        </p>

        <div className="relative mt-12 max-w-3xl">
          <LineDraw
            className="h-12 w-full"
            d={ROUTE_D}
            viewBox="0 0 420 48"
            color="var(--dark-sage)"
            strokeWidth={2}
            duration={1.5}
            delay={0.2}
          />

          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.num}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pl-1"
              >
                <span className="font-display text-3xl text-raspberry/90 md:text-4xl">
                  {step.num}
                </span>
                <p className="mt-1 font-nav text-[0.7rem] font-bold uppercase tracking-[0.22em] text-espresso">
                  {step.label}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-desc mt-10 max-w-lg font-body text-sm leading-relaxed md:text-base">
          Grab coffee, pies, and bakery favourites without leaving the car —
          same kitchen, same cabinet, built for Baxter mornings and lunch runs.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <GradientButton href={business.phoneHref} showArrow={false}>
            Call {business.phoneDisplay}
          </GradientButton>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Visit {business.shortSuburb}
          </a>
        </div>

        <p className="mt-6 font-nav text-[0.58rem] uppercase tracking-[0.14em] text-dark-sage">
          {business.address.full}
        </p>
      </div>
    </section>
  );
}
