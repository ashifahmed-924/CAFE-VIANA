"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeedbackTable() {
  const sectionRef = useRef(null);
  const keywordRefs = useRef([]);
  const noteRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const keywords = keywordRefs.current.filter(Boolean);
        const notes = noteRefs.current.filter(Boolean);

        gsap.fromTo(
          keywords,
          { filter: "blur(10px)", opacity: 0.35 },
          {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.85,
            stagger: 0.11,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          notes,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.11,
            delay: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
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

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="relative overflow-hidden bg-ash-lilac/45 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="espresso" className="mb-8">
          A long cafe table of words
        </SectionLabel>

        <TextMask
          as="h2"
          className="font-display text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.06] text-deep-plum"
        >
          Themes from public customer feedback.
        </TextMask>

        <p className="mt-4 font-nav text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-oxblood">
          Public customer feedback
        </p>

        <p className="text-desc mt-2 max-w-xl font-body text-sm">
          Paraphrased themes only — no names, no star ratings, no individual
          reviews.
        </p>

        <div
          className="mt-12 border-t border-deep-plum/20"
          role="list"
          aria-label="Feedback themes"
        >
          {business.feedbackThemes.map((row, i) => (
            <div
              key={row.keyword}
              role="listitem"
              className="grid gap-2 border-b border-deep-plum/15 py-6 md:grid-cols-[minmax(9rem,12rem)_1fr] md:items-baseline md:gap-10 md:py-7"
            >
              <p
                ref={(el) => {
                  keywordRefs.current[i] = el;
                }}
                className="font-nav text-[0.72rem] font-bold uppercase tracking-[0.24em] text-oxblood"
                style={reduced ? { filter: "none", opacity: 1 } : undefined}
              >
                {row.keyword}
              </p>
              <p
                ref={(el) => {
                  noteRefs.current[i] = el;
                }}
                className="text-desc font-body text-sm leading-relaxed md:text-base"
                style={reduced ? { opacity: 1, transform: "none" } : undefined}
              >
                {row.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
