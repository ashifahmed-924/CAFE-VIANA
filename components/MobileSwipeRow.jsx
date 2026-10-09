"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Mobile horizontal swipe row — no scrollbar, always a 3-dot indicator.
 * Desktop layouts should hide this and show their own grid/shelf.
 */
export default function MobileSwipeRow({
  children,
  className = "",
  trackClassName = "",
  ariaLabel = "Swipe for more",
  tone = "light",
}) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const syncDots = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 4) {
      setActive(0);
      return;
    }
    const progress = el.scrollLeft / max;
    if (progress < 0.28) setActive(0);
    else if (progress < 0.72) setActive(1);
    else setActive(2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    syncDots();
    el.addEventListener("scroll", syncDots, { passive: true });
    window.addEventListener("resize", syncDots);

    return () => {
      el.removeEventListener("scroll", syncDots);
      window.removeEventListener("resize", syncDots);
    };
  }, [syncDots, children]);

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = (index / 2) * max;
    el.scrollTo({ left: target, behavior: "smooth" });
    setActive(index);
  };

  const activeDot =
    tone === "dark"
      ? "bg-buttercream"
      : "bg-oxblood";
  const idleDot =
    tone === "dark"
      ? "bg-buttercream/30"
      : "bg-deep-plum/25";

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className={`shelf-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] ${trackClassName}`}
        aria-label={ariaLabel}
        role="list"
      >
        {children}
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Slide position"
      >
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to position ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i
                ? `w-5 ${activeDot}`
                : `w-1.5 ${idleDot}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
