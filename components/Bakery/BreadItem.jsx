"use client";

import Image from "next/image";

export default function BreadItem({ item, compact = false }) {
  return (
    <article
      className={`group relative flex shrink-0 flex-col items-center ${
        compact ? "w-full" : "w-[min(72vw,200px)] md:w-[180px]"
      }`}
      data-cursor="BAKE"
    >
      <div className="relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-sm bg-porcelain/80 transition-transform duration-500 group-hover:-translate-y-1.5 md:mb-4">
        <Image
          src={item.image}
          alt={`${item.name}`}
          fill
          sizes={compact ? "72vw" : "200px"}
          className="object-cover"
        />
        <span className="absolute bottom-3 left-1/2 w-[72%] -translate-x-1/2 rotate-[-2deg] bg-buttercream px-2 py-1.5 text-center font-nav text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-deep-plum shadow-sm transition-transform duration-500 group-hover:rotate-0">
          {item.availability || "Ask in store"}
        </span>
      </div>
      <h3 className="text-center font-display text-base leading-tight text-deep-plum md:text-lg">
        {item.name}
      </h3>
      <p className="text-desc mt-1.5 text-center font-body text-xs leading-snug md:text-sm">
        {item.description}
      </p>
      {item.status ? (
        <p className="mt-2 font-nav text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-oxblood/90">
          {item.status}
        </p>
      ) : null}
    </article>
  );
}
