"use client";

import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ImageMask from "@/components/motion/ImageMask";
import VianaPattern from "@/components/VianaPattern";

const OUTDOOR_IMAGE = "/images/cafe-viana/outdoor.jpg";

export default function OutdoorSection() {
  if (!business.features.outdoorSeating) {
    return null;
  }

  const dogNote = business.features.dogFriendlyOutdoor
    ? "Dogs are welcome in the outdoor area — not inside the cafe."
    : null;

  return (
    <section
      id="outdoor"
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain py-16 md:py-24"
    >
      <VianaPattern variant="tile" colorClass="text-dark-sage/30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="sage" className="mb-10">
          Outside at Viana
        </SectionLabel>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <TextMask
              as="h2"
              className="font-display text-[clamp(2rem,5vw,3.35rem)] leading-[1.05] text-deep-plum"
            >
              Outdoor seating on Grant Road.
            </TextMask>

            <TextMask
              as="p"
              className="text-desc mt-5 max-w-lg font-body text-base leading-relaxed"
              delay={0.08}
            >
              Take breakfast or lunch outside when the weather suits — seating is
              outdoors, separate from the indoor dining room.
            </TextMask>

            {dogNote ? (
              <TextMask
                as="p"
                className="text-desc mt-4 max-w-lg font-body text-sm leading-relaxed"
                delay={0.14}
              >
                {dogNote}
              </TextMask>
            ) : null}

            <TextMask
              as="p"
              className="mt-6 font-nav text-[0.62rem] uppercase tracking-[0.16em] text-dark-sage"
              delay={0.2}
            >
              Availability depends on weather and seating on the day — ask staff if
              you are unsure.
            </TextMask>
          </div>

          <figure className="relative">
            <div
              className="pointer-events-none absolute -inset-2 rounded-sm border border-dark-sage/35 md:-inset-3"
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[5/6]">
              <ImageMask
                variant="bottom"
                src={OUTDOOR_IMAGE}
                alt="outdoor seating at Cafe Viana"
                className="h-full w-full"
                imgClassName="scale-[1.03]"
                duration={1.35}
              />
            </div>
            <figcaption className="sr-only">Outdoor area at Cafe Viana, Baxter</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
