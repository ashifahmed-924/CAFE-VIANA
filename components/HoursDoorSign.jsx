"use client";

import { useMemo } from "react";
import { business, dayKeyFromDate } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function HoursDoorSign() {
  const todayKey = useMemo(() => dayKeyFromDate(new Date()), []);

  return (
    <section
      id="hours"
      className="relative overflow-hidden bg-deep-plum py-16 text-buttercream md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-md rounded-sm border border-buttercream/25 bg-dark-espresso/40 p-8 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)] md:p-10">
          <SectionLabel tone="sage" className="mb-6 [&_p]:text-pistachio">
            Cafe door sign
          </SectionLabel>

          <h2 className="font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.92] text-buttercream">
            <TextMask as="span" className="block">
              OPEN
            </TextMask>
            <TextMask as="span" className="mt-1 block text-apricot" delay={0.1}>
              EARLY.
            </TextMask>
          </h2>

          <p className="mt-4 font-nav text-[0.68rem] uppercase tracking-[0.2em] text-pistachio/90">
            Mon–Sat {business.hours.monday.short} · Sun {business.hours.sunday.short}
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
                      <span className="ml-2 text-[0.58rem] text-apricot/90">Today</span>
                    ) : null}
                  </span>
                  <span className="tabular-nums">
                    {row.open} – {row.close}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="text-desc-on-dark mt-8 font-body text-xs leading-relaxed">
            {business.hoursNote}
          </p>
        </div>
      </div>
    </section>
  );
}
