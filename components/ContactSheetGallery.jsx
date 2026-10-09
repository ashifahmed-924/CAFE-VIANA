"use client";

import { gallery } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ImageMask from "@/components/motion/ImageMask";

const RATIO_CLASS = {
  tall: "aspect-[3/4] row-span-2",
  wide: "aspect-[5/3] sm:col-span-2",
  square: "aspect-square",
};

function frameIsOdd(frame) {
  const n = parseInt(frame, 10);
  return Number.isFinite(n) && n % 2 === 1;
}

export default function ContactSheetGallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="espresso" className="mb-8">
          Baker&apos;s contact sheet
        </SectionLabel>

        <TextMask
          as="h2"
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] text-deep-plum"
        >
          Ten frames from the cabinet, counter, and dining room.
        </TextMask>

        <p className="mt-3 font-nav text-[0.62rem] uppercase tracking-[0.2em] text-dark-sage">
          Free-licensed food photography — swap in Cafe Viana shots when ready
        </p>

        <ul className="mt-12 grid auto-rows-min grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((item, index) => {
            const odd = frameIsOdd(item.frame);
            const ratioKey = item.ratio in RATIO_CLASS ? item.ratio : "square";

            return (
              <li
                key={item.id}
                className={`group relative overflow-hidden rounded-sm bg-buttercream/50 ${RATIO_CLASS[ratioKey]}`}
              >
                <ImageMask
                  variant={odd ? "bottom" : "top"}
                  src={item.image}
                  alt={`${item.title} at Cafe Viana`}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  delay={0.04 * index}
                  duration={1.05}
                />
                <span
                  className="pointer-events-none absolute left-2 top-2 font-nav text-[0.65rem] font-bold tracking-[0.12em] text-espresso/25 transition-colors duration-300 group-hover:text-raspberry md:left-3 md:top-3 md:text-[0.72rem]"
                  aria-hidden
                >
                  {item.frame}
                </span>
                <span className="sr-only">
                  Frame {item.frame}: {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
