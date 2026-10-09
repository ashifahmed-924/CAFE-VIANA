"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { business } from "@/data/cafeViana";
import TextMask from "@/components/motion/TextMask";
import GradientButton from "@/components/GradientButton";
import useReducedMotion from "@/hooks/useReducedMotion";

const ROTATING = [
  {
    key: "sourdough",
    src: "/images/cafe-viana/sourdough-white.jpg",
    alt: "Artisan sourdough at Cafe Viana",
  },
  {
    key: "coffee",
    src: "/images/cafe-viana/coffee.jpg",
    alt: "Coffee at Cafe Viana",
  },
  {
    key: "pie",
    src: "/images/cafe-viana/pie-beef.jpg",
    alt: "Pie from the Cafe Viana cabinet",
  },
  {
    key: "breakfast",
    src: "/images/cafe-viana/big-breakfast.jpg",
    alt: "Breakfast at Cafe Viana",
  },
  {
    key: "pancakes",
    src: "/images/cafe-viana/pancakes.jpg",
    alt: "Pancakes at Cafe Viana",
  },
];

export default function FinalCTA() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING.length);
    }, 1000);

    return () => window.clearInterval(id);
  }, [reduced]);

  const active = ROTATING[index];

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-buttercream/92 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[220px] md:mx-0 md:max-w-[240px] lg:max-w-[320px]">
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-porcelain/60 shadow-[0_20px_44px_-32px_rgba(52,39,37,0.5)]">
              {ROTATING.map((item, i) => (
                <img
                  key={item.key}
                  src={item.src}
                  alt={i === index ? item.alt : ""}
                  aria-hidden={i !== index}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </figure>
            <p className="sr-only" aria-live="polite">
              Showing {active.alt}
            </p>
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-display text-[clamp(2.35rem,5.5vw,4.75rem)] leading-[0.92] text-deep-plum">
              <TextMask as="span" className="block">
                SEE YOU
              </TextMask>
              <TextMask as="span" className="block text-oxblood" delay={0.1}>
                AT VIANA.
              </TextMask>
            </h2>

            <TextMask
              as="p"
              className="text-desc mx-auto mt-4 max-w-md font-body text-sm leading-relaxed md:mx-0 md:mt-5 md:text-base"
              delay={0.16}
            >
              Breakfast, coffee, bakery favourites and lunch in Baxter.
            </TextMask>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10 md:justify-start">
              <GradientButton href="#menu">View Menu</GradientButton>
              <Link
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </Link>
              <Link href={business.phoneHref} className="btn-secondary">
                Call
              </Link>
            </div>

            {business.instagram ? (
              <p className="mt-7 font-nav text-[0.68rem] font-semibold uppercase tracking-[0.2em] md:mt-8">
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oxblood underline decoration-pistachio/80 underline-offset-4 transition-colors hover:text-raspberry"
                >
                  Follow current specials
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
