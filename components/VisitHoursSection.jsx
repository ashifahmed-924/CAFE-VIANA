"use client";

import { useMemo } from "react";
import Link from "next/link";
import { business, dayKeyFromDate } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ArchDraw from "@/components/motion/ArchDraw";
import ImageMask from "@/components/motion/ImageMask";
import GradientButton from "@/components/GradientButton";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const STOREFRONT = "/images/cafe-viana/storefront.jpg";

export default function VisitHoursSection() {
  const todayKey = useMemo(() => dayKeyFromDate(new Date()), []);

  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain/94 py-16 md:py-24"
    >
      <span id="hours" className="sr-only" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-8 xl:gap-12">
        {/* Cafe door sign */}
        <div className="flex">
          <div className="flex w-full flex-col rounded-sm border border-buttercream/25 bg-deep-plum p-8 text-buttercream shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)] md:p-10">
            <SectionLabel tone="sage" className="mb-6 [&_p]:text-pistachio">
              Cafe door sign
            </SectionLabel>

            <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.92] text-buttercream">
              <TextMask as="span" className="block">
                OPEN
              </TextMask>
              <TextMask as="span" className="mt-1 block text-apricot" delay={0.1}>
                EARLY.
              </TextMask>
            </h2>

            <p className="mt-4 font-nav text-[0.68rem] uppercase tracking-[0.2em] text-pistachio/90">
              Mon–Sat {business.hours.monday.short} · Sun{" "}
              {business.hours.sunday.short}
            </p>

            <ul className="mt-8 space-y-3 border-t border-buttercream/15 pt-8">
              {DAY_ORDER.map((key) => {
                const row = business.hours[key];
                const isToday = key === todayKey;

                return (
                  <li
                    key={key}
                    className={`flex items-baseline justify-between gap-4 font-body text-sm ${
                      isToday ? "text-apricot" : "text-buttercream/85"
                    }`}
                  >
                    <span className="font-nav text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                      {row.label}
                      {isToday ? (
                        <span className="ml-2 text-[0.58rem] text-apricot/90">
                          Today
                        </span>
                      ) : null}
                    </span>
                    <span className="tabular-nums">
                      {row.open} – {row.close}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="text-desc-on-dark mt-auto pt-8 font-body text-xs leading-relaxed">
              {business.hoursNote}
            </p>
          </div>
        </div>

        {/* The Baxter window */}
        <div className="flex flex-col justify-center">
          <SectionLabel tone="sage" className="mb-8">
            The Baxter window
          </SectionLabel>

          <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-8">
            <div className="relative mx-auto w-full max-w-[220px] sm:max-w-none">
              <div
                className="pointer-events-none absolute -left-2 top-4 z-10 w-12 text-oxblood/70 sm:-left-4 sm:w-14"
                aria-hidden
              >
                <ArchDraw color="currentColor" duration={1.65} />
              </div>

              <div className="relative overflow-hidden rounded-t-[2.75rem] rounded-b-sm border border-dark-sage/40 bg-buttercream/40 p-1.5">
                <div className="aspect-[4/5] overflow-hidden rounded-t-[2.4rem] rounded-b-sm">
                  <ImageMask
                    variant="curtain"
                    src={STOREFRONT}
                    alt="Cafe Viana storefront on Grant Road"
                    className="h-full w-full"
                    duration={1.25}
                  />
                </div>
              </div>
            </div>

            <div>
              <TextMask
                as="h2"
                className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] text-deep-plum"
              >
                {business.name} on Grant Road.
              </TextMask>

              <address className="mt-5 not-italic">
                {business.address.lines.map((line) => (
                  <TextMask
                    key={line}
                    as="p"
                    className="text-desc font-body text-sm md:text-base"
                    delay={0.06}
                  >
                    {line}
                  </TextMask>
                ))}
              </address>

              <TextMask
                as="p"
                className="text-desc mt-3 font-body text-sm md:text-base"
                delay={0.12}
              >
                <a
                  href={business.phoneHref}
                  className="underline decoration-oxblood/35 underline-offset-4 transition-colors hover:text-oxblood"
                >
                  {business.phoneDisplay}
                </a>
              </TextMask>

              <div className="mt-8 flex flex-wrap gap-3">
                <GradientButton
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GO"
                  showArrow
                >
                  Get Directions
                </GradientButton>
                <Link
                  href={business.phoneHref}
                  className="btn-secondary"
                  data-cursor="GO"
                >
                  Call
                </Link>
              </div>

              <p className="mt-5 font-nav text-[0.58rem] uppercase tracking-[0.14em] text-dark-sage">
                {business.suburbLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
