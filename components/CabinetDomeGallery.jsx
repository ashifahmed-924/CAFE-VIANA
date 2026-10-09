"use client";

import { useMemo } from "react";
import DomeGallery from "@/components/DomeGallery";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import { gallery, pastries } from "@/data/cafeViana";

function buildDomeImages() {
  const seen = new Set();
  const pool = [];

  const push = (src, alt) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    pool.push({ src, alt });
  };

  for (const item of pastries) {
    push(item.image, `${item.name} at Cafe Viana`);
  }

  for (const item of gallery) {
    push(item.image, `${item.title} at Cafe Viana`);
  }

  return pool;
}

export default function CabinetDomeGallery() {
  const images = useMemo(() => buildDomeImages(), []);

  return (
    <section
      id="pastries"
      className="relative overflow-hidden bg-dark-espresso/90 text-buttercream"
    >
      <span id="gallery" className="sr-only" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-6 pt-16 md:px-8 md:pb-8 md:pt-24">
        <SectionLabel tone="raspberry" className="mb-6">
          Sweet cabinet · Baker&apos;s contact sheet
        </SectionLabel>

        <TextMask
          as="h2"
          className="max-w-3xl font-display text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1.05] text-buttercream"
        >
          Sweet from the cabinet — frames from the counter.
        </TextMask>

        <p className="text-desc-on-dark mt-4 max-w-xl font-body text-sm leading-relaxed md:text-base">
          Jars, danish, scones, biscuits, and bakery frames — drag the dome to
          browse. Selections rotate; ask what is in the case today.
        </p>
      </div>

      <div className="relative w-full h-[min(100svh,920px)] min-h-[520px]">
        <DomeGallery
          images={images}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale
          overlayBlurColor="#211918"
          imageBorderRadius="8px"
          openedImageBorderRadius="10px"
        />
      </div>
    </section>
  );
}
