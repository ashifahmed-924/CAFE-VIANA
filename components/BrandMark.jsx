import { business } from "@/data/cafeViana";

export default function BrandMark({
  showLocation = false,
  className = "",
  locationLabel = business.shortSuburb,
}) {
  return (
    <div
      className={`inline-flex flex-col items-start text-espresso ${className}`.trim()}
      aria-label={`${business.name}, ${business.tagline}`}
    >
      <span className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-oxblood">
        CAFE
      </span>
      <span className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[0.92] tracking-[-0.02em] text-deep-plum uppercase">
        Viana
      </span>
      {showLocation ? (
        <span className="mt-2 font-nav text-[0.58rem] font-medium uppercase tracking-[0.28em] text-dark-sage">
          {locationLabel}
        </span>
      ) : null}
      <span className="sr-only">Decorative wordmark — not the official logo</span>
    </div>
  );
}
