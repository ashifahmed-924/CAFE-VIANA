"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pies } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import MobileSwipeRow from "@/components/MobileSwipeRow";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function PieWindow({ pie, index, innerRef, compact = false }) {
  return (
    <article
      ref={innerRef}
      className="group relative flex w-full flex-col"
      data-cursor="TASTE"
    >
      <div
        className={`relative mx-auto flex w-full flex-col overflow-hidden rounded-t-[999px] rounded-b-md border border-buttercream/12 bg-dark-espresso shadow-[inset_0_0_0_1px_rgba(250,245,233,0.06)] ${
          compact
            ? "h-[min(58vw,320px)] max-w-none"
            : "h-[min(62vw,420px)] max-w-[220px] md:h-[480px] md:max-w-none"
        }`}
      >
        <div className="pie-glass relative flex-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-pie-img
            src={pie.image}
            alt={`${pie.name}`}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark-espresso/90 to-transparent" />
        </div>
        <div className="border-t border-buttercream/10 bg-espresso/95 px-3 py-3 text-center md:px-4 md:py-4">
          <h3 className="font-display text-lg text-buttercream md:text-xl">
            {pie.name}
          </h3>
          <p className="text-desc-on-dark mt-1.5 font-body text-xs leading-snug md:text-sm">
            {pie.description}
          </p>
          <p className="mt-2 font-nav text-[0.58rem] uppercase tracking-[0.16em] text-pistachio">
            {pie.availability}
          </p>
        </div>
      </div>
      <span className="sr-only">Window {index + 1}</span>
    </article>
  );
}

export default function PieCabinet() {
  const sectionRef = useRef(null);
  const windowRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    let ctx;

    ctx = gsap.context(() => {
      windowRefs.current.filter(Boolean).forEach((win, i) => {
        const img = win.querySelector("[data-pie-img]");
        if (!img) return;

        gsap.fromTo(
          img,
          { opacity: 0.2, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: win,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark-espresso/95 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 md:mb-14">
          <SectionLabel tone="sage" className="[&_p]:text-pistachio">
            Today&apos;s pies
          </SectionLabel>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.92] text-buttercream">
            <TextMask as="span" className="block">
              THE
            </TextMask>
            <TextMask as="span" className="block text-raspberry" delay={0.08}>
              PIE
            </TextMask>
            <TextMask as="span" className="block" delay={0.16}>
              CABINET.
            </TextMask>
          </h2>
          <p className="text-desc-on-dark mt-4 max-w-xl font-body text-sm leading-relaxed md:text-base">
            Fillings rotate — ask in store for what&apos;s in the cabinet today.
          </p>
        </div>

        {/* Mobile: two pies per swipe row + 3-dot indicator */}
        <MobileSwipeRow
          className="md:hidden"
          trackClassName="gap-3"
          ariaLabel="Today's pies"
          tone="dark"
        >
          {pies.map((pie, i) => (
            <div
              key={pie.id}
              role="listitem"
              className="w-[calc(50%-0.375rem)] shrink-0 snap-start"
            >
              <PieWindow pie={pie} index={i} compact />
            </div>
          ))}
        </MobileSwipeRow>

        {/* Tablet / desktop: three windows */}
        <div className="hidden gap-8 md:grid md:grid-cols-3 md:gap-6">
          {pies.map((pie, i) => (
            <PieWindow
              key={pie.id}
              pie={pie}
              index={i}
              innerRef={(el) => {
                windowRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
