"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { currentSpecials } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ImageMask from "@/components/motion/ImageMask";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SpecialsBoard() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const reduced = useReducedMotion();

  const active = useMemo(() => currentSpecials(), []);
  const [featured, ...rest] = active;
  const secondary = rest.slice(0, 2);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced || active.length === 0) return undefined;

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        const panels = panelRefs.current.filter(Boolean);
        gsap.fromTo(
          panels,
          { opacity: 0.2, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
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
      }, section);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced, active.length]);

  if (active.length === 0) {
    return null;
  }

  return (
    <section
      id="specials"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep-plum/95 py-16 text-buttercream md:py-24"
    >
      <VianaPattern variant="label" colorClass="text-buttercream" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="raspberry" className="mb-8 [&_p]:text-buttercream/90">
          On the board
        </SectionLabel>

        <TextMask
          as="h2"
          className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-buttercream"
          innerClassName="block"
        >
          ON THE BOARD
        </TextMask>

        <div
          className={`mt-10 grid gap-6 ${
            secondary.length > 0
              ? "md:grid-cols-[1.2fr_0.8fr]"
              : "md:grid-cols-1"
          }`}
        >
          {featured ? (
            <article
              ref={(el) => {
                panelRefs.current[0] = el;
              }}
              className="relative overflow-hidden rounded-sm border border-buttercream/15 bg-dark-espresso/30"
              data-cursor="TODAY"
              style={
                reduced
                  ? {
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    }
                  : undefined
              }
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                  <ImageMask
                    variant="diagonal"
                    src={featured.image}
                    alt={`${featured.name}`}
                    className="h-full min-h-[240px] w-full md:min-h-full"
                    start="top 90%"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <p className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-apricot">
                    Current special
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-buttercream md:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="text-desc-on-dark mt-3 font-body text-sm leading-relaxed md:text-base">
                    {featured.description}
                  </p>
                  <p className="mt-4 font-nav text-[0.62rem] uppercase tracking-[0.16em] text-ash-lilac">
                    {featured.availability}
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          {secondary.length > 0 ? (
            <div className="flex flex-col gap-6">
              {secondary.map((item, i) => (
                <article
                  key={item.id}
                  ref={(el) => {
                    panelRefs.current[i + 1] = el;
                  }}
                  className="relative overflow-hidden rounded-sm border border-buttercream/10 bg-dark-espresso/25"
                  style={
                    reduced
                      ? {
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }
                      : undefined
                  }
                >
                  <div className="relative aspect-[16/10] w-full">
                    <ImageMask
                      variant="diagonal"
                      src={item.image}
                      alt={`${item.name}`}
                      className="h-full w-full"
                      delay={0.1 * (i + 1)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-buttercream">
                      {item.name}
                    </h3>
                    <p className="text-desc-on-dark mt-1.5 line-clamp-2 font-body text-xs leading-snug md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
