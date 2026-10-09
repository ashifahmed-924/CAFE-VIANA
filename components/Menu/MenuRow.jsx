"use client";

import { priceLabel } from "@/data/cafeViana";

export default function MenuRow({ item, index = 0 }) {
  return (
    <article
      className="menu-row group border-b border-dark-sage/25 py-4 md:py-5"
      data-menu-row
      data-index={index}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-display text-lg text-deep-plum transition-colors group-hover:text-oxblood md:text-xl">
          {item.name}
        </h4>
        <span className="shrink-0 font-nav text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-meta">
          {priceLabel(item)}
        </span>
      </div>
      {item.description ? (
        <p className="text-desc mt-1.5 max-w-xl font-body text-sm leading-relaxed md:text-[0.95rem]">
          {item.description}
        </p>
      ) : null}
      {item.availability ? (
        <p className="text-meta mt-2 font-nav text-[0.58rem] uppercase tracking-[0.14em]">
          {item.availability}
        </p>
      ) : null}
      {item.status && !item.availability ? (
        <p className="text-meta mt-2 font-nav text-[0.58rem] uppercase tracking-[0.14em]">
          {item.status}
        </p>
      ) : null}
    </article>
  );
}
