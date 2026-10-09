"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { business, breakfast } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import useReducedMotion from "@/hooks/useReducedMotion";

const MORNING_THEMES = ["BIG BREAKFAST", "GOOD COFFEE", "FRIENDLY SERVICE"];
const MORNING_VIDEO = "/videos/morning-cafe.mp4";

const GALLERY = [
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    src: "/images/cafe-viana/morning-iced-coffee.png",
    alt: "Iced coffee and bake at Cafe Viana",
  },
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    src: "/images/cafe-viana/eggs-benedict.jpg",
    alt: "Eggs Benedict at Cafe Viana",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    src: "/images/cafe-viana/avocado-toast.jpg",
    alt: "Avocado toast at Cafe Viana",
  },
  {
    id: "pancakes",
    name: "Pancakes",
    src: "/images/cafe-viana/pancakes.jpg",
    alt: "Pancakes at Cafe Viana",
  },
];

export default function MorningTable() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const touchStartX = useRef(null);
  const [index, setIndex] = useState(0);

  const themes = useMemo(
    () =>
      business.feedbackThemes.filter((t) =>
        MORNING_THEMES.includes(t.keyword),
      ),
    [],
  );

  const count = GALLERY.length;
  const active = GALLERY[index] ?? GALLERY[0];

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + count) % count);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % count);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return undefined;

    const play = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", play);
    play();

    return () => video.removeEventListener("loadeddata", play);
  }, [reduced]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start == null || end == null) return;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  return (
    <section
      id="mornings"
      className="relative overflow-hidden bg-porcelain py-12 md:py-14 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {!reduced ? (
          <video
            ref={videoRef}
            className="h-full w-full scale-105 object-cover object-center"
            src={MORNING_VIDEO}
            poster="/images/cafe-viana/morning-iced-coffee.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src="/images/cafe-viana/morning-iced-coffee.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,rgba(250,245,233,0.94)_0%,rgba(250,245,233,0.82)_48%,rgba(242,229,201,0.72)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="sage" className="mb-6 w-fit md:mb-7 lg:mb-10">
          Mornings at Viana
        </SectionLabel>

        <div className="grid items-start gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-6 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[240px] md:mx-0 md:max-w-[210px] lg:max-w-sm xl:max-w-md">
            <div className="relative p-2 md:p-2.5 lg:p-4">
              <div
                className="pointer-events-none absolute inset-0 rounded-sm border border-dark-sage/45"
                aria-hidden
              />

              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-porcelain md:aspect-[3/4] lg:aspect-[4/5]"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {GALLERY.map((item, i) => (
                  <Image
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 220px, 320px"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-500 ease-out ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous morning plate"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-dark-sage/40 bg-buttercream/90 text-deep-plum transition-colors hover:border-oxblood/50 hover:text-oxblood"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>

              <p className="min-w-0 flex-1 text-center font-nav text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-deep-plum">
                {active.name}
                <span className="mt-0.5 block font-normal tracking-[0.14em] text-dark-sage">
                  {index + 1} / {count}
                </span>
              </p>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next morning plate"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-dark-sage/40 bg-buttercream/90 text-deep-plum transition-colors hover:border-oxblood/50 hover:text-oxblood"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-[clamp(2.1rem,4.2vw,4.5rem)] leading-[0.95] text-deep-plum md:text-[clamp(2rem,3.4vw,2.65rem)] lg:text-[clamp(2.6rem,5vw,4.5rem)]">
              <TextMask as="span" className="block" delay={0.05}>
                Mornings
              </TextMask>
              <TextMask as="span" className="block text-oxblood" delay={0.12}>
                at Viana.
              </TextMask>
            </h2>

            <TextMask
              as="p"
              className="text-desc mt-3 max-w-lg font-body text-sm leading-relaxed md:mt-3 md:text-[0.92rem] md:leading-snug lg:mt-5 lg:text-base lg:leading-relaxed"
              delay={0.18}
            >
              Start the day with bakery bread, coffee, and morning plates — from big breakfasts
              and eggs Benedict to avocado toast, pancakes, and fruit toast. See today&apos;s board
              in store.
            </TextMask>

            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-dark-sage/25 pt-5 md:mt-4 md:gap-1.5 md:pt-4 lg:mt-8 lg:gap-2 lg:pt-8">
              {breakfast.map((item, i) => (
                <li key={item.id}>
                  <TextMask as="div" delay={0.06 * i}>
                    <span className="inline-block border border-dark-sage/35 bg-buttercream/80 px-2.5 py-1.5 font-nav text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-oxblood md:px-2 md:py-1 md:text-[0.5rem] md:tracking-[0.1em] lg:px-3 lg:py-2 lg:text-[0.62rem] lg:tracking-[0.16em]">
                      {item.name}
                    </span>
                  </TextMask>
                </li>
              ))}
            </ul>

            <ul className="mt-4 grid gap-2 md:mt-3 md:grid-cols-1 md:gap-1.5 lg:mt-6 lg:gap-3">
              {themes.map((theme, i) => (
                <li key={theme.keyword}>
                  <TextMask
                    as="div"
                    delay={0.08 * i}
                    innerClassName="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3 md:gap-2 lg:gap-4"
                  >
                    <span className="shrink-0 font-nav text-[0.58rem] font-bold uppercase tracking-[0.16em] text-raspberry md:text-[0.55rem] lg:text-[0.65rem] lg:tracking-[0.22em]">
                      {theme.keyword}
                    </span>
                    <span className="text-desc font-body text-xs leading-snug md:text-[0.8rem] lg:text-sm">
                      {theme.note}
                    </span>
                  </TextMask>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-nav text-[0.55rem] uppercase tracking-[0.14em] text-dark-sage md:mt-4 md:text-[0.52rem] lg:mt-8 lg:text-[0.62rem] lg:tracking-[0.18em]">
              Breakfast served daily — {business.hours.monday.open} to{" "}
              {business.hours.monday.close}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
