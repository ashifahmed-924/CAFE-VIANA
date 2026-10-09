"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import LineDraw from "@/components/motion/LineDraw";
import ImageMask from "@/components/motion/ImageMask";
import GradientButton from "@/components/GradientButton";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { num: "01", label: "ORDER" },
  { num: "02", label: "PICK UP" },
  { num: "03", label: "GO" },
];

const ROUTE_D = "M 12 40 L 120 40 L 160 20 L 280 20 L 320 40 L 408 40";
const OUTDOOR_IMAGE = "/images/cafe-viana/outdoor.jpg";

export default function DriveThruOutdoorSection() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const reduced = useReducedMotion();

  const showDriveThru = business.features.driveThru;
  const showOutdoor = business.features.outdoorSeating;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced || !showDriveThru) return undefined;

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, [reduced, showDriveThru]);

  if (!showDriveThru && !showOutdoor) {
    return null;
  }

  const dogNote = business.features.dogFriendlyOutdoor
    ? "Dogs are welcome in the outdoor area — not inside the cafe."
    : null;

  const both = showDriveThru && showOutdoor;

  return (
    <section
      id="drive-thru"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain/94 py-16 md:py-24"
    >
      <span id="outdoor" className="sr-only" aria-hidden />
      <VianaPattern variant="tile" colorClass="text-dark-sage/25" />

      <div
        className={`relative mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 ${
          both ? "lg:grid-cols-2 lg:gap-10 xl:gap-14" : ""
        }`}
      >
        {showDriveThru ? (
          <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center md:max-w-2xl lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
            <SectionLabel tone="sage" className="mb-6 w-fit" align="center">
              Drive-thru
            </SectionLabel>

            <TextMask
              as="h2"
              className="font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.05] text-deep-plum lg:text-left"
            >
              COFFEE. PIE. KEEP MOVING.
            </TextMask>

            <p className="mt-3 font-nav text-[0.68rem] font-bold uppercase tracking-[0.22em] text-oxblood">
              DRIVE-THRU AVAILABLE
            </p>

            <div className="relative mt-8 w-full max-w-md">
              <LineDraw
                className="mx-auto h-10 w-full lg:mx-0"
                d={ROUTE_D}
                viewBox="0 0 420 48"
                color="var(--dark-sage)"
                strokeWidth={2}
                duration={1.5}
                delay={0.2}
              />

              <ol className="mt-5 grid grid-cols-3 gap-3">
                {STEPS.map((step, i) => (
                  <li
                    key={step.num}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="relative text-center lg:text-left"
                  >
                    <span className="font-display text-2xl text-raspberry/90 md:text-3xl">
                      {step.num}
                    </span>
                    <p className="mt-1 font-nav text-[0.62rem] font-bold uppercase tracking-[0.18em] text-espresso">
                      {step.label}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-desc mt-8 max-w-md font-body text-sm leading-relaxed">
              Grab coffee, pies, and bakery favourites without leaving the car —
              same kitchen, same cabinet, built for Baxter mornings and lunch
              runs.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
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

            <p className="mt-5 font-nav text-[0.55rem] uppercase tracking-[0.14em] text-dark-sage">
              {business.address.full}
            </p>
          </div>
        ) : null}

        {showOutdoor ? (
          <div className="mx-auto w-full max-w-xl text-center md:mx-0 md:max-w-none md:text-left lg:text-left">
            <SectionLabel
              tone="sage"
              className="mb-6 w-fit mx-auto md:mx-0"
              align="center"
            >
              Outside at Viana
            </SectionLabel>

            <div
              className={`grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-6 lg:gap-10 ${
                both
                  ? "xl:grid-cols-[1fr_0.9fr]"
                  : "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
              }`}
            >
              <div className="flex w-full flex-col items-center text-center md:items-start md:text-left lg:max-w-none">
                <TextMask
                  as="h2"
                  className="font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.05] text-deep-plum"
                >
                  Outdoor seating on Grant Road.
                </TextMask>

                <TextMask
                  as="p"
                  className="text-desc mt-4 max-w-md font-body text-sm leading-relaxed md:text-base"
                  delay={0.08}
                >
                  Take breakfast or lunch outside when the weather suits —
                  seating is outdoors, separate from the indoor dining room.
                </TextMask>

                {dogNote ? (
                  <TextMask
                    as="p"
                    className="text-desc mt-3 max-w-md font-body text-sm leading-relaxed"
                    delay={0.14}
                  >
                    {dogNote}
                  </TextMask>
                ) : null}

                <TextMask
                  as="p"
                  className="mt-5 font-nav text-[0.58rem] uppercase tracking-[0.16em] text-dark-sage"
                  delay={0.2}
                >
                  Availability depends on weather and seating on the day — ask
                  staff if you are unsure.
                </TextMask>
              </div>

              <figure className="relative mx-auto w-full max-w-[220px] md:mx-0 md:max-w-[240px] lg:max-w-sm xl:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-2 rounded-sm border border-dark-sage/35"
                  aria-hidden
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <ImageMask
                    variant="bottom"
                    src={OUTDOOR_IMAGE}
                    alt="outdoor seating at Cafe Viana"
                    className="h-full w-full"
                    imgClassName="scale-[1.03]"
                    duration={1.35}
                  />
                </div>
                <figcaption className="sr-only">
                  Outdoor area at Cafe Viana, Baxter
                </figcaption>
              </figure>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
