"use client";

import Link from "next/link";
import { business } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import ArchDraw from "@/components/motion/ArchDraw";
import ImageMask from "@/components/motion/ImageMask";
import GradientButton from "@/components/GradientButton";

const STOREFRONT = "/images/cafe-viana/storefront.jpg";

export default function LocationWindow() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-dark-sage/20 bg-porcelain py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="sage" className="mb-10">
          The Baxter window
        </SectionLabel>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -left-3 top-6 z-10 w-16 text-oxblood/70 md:-left-6 md:w-20"
              aria-hidden
            >
              <ArchDraw color="currentColor" duration={1.65} />
            </div>

            <div className="relative mx-auto max-w-sm overflow-hidden rounded-t-[3.5rem] rounded-b-sm border border-dark-sage/40 bg-buttercream/40 p-2 md:max-w-md">
              <div className="aspect-[4/5] overflow-hidden rounded-t-[3rem] rounded-b-sm">
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
              className="font-display text-[clamp(2rem,5vw,3.15rem)] leading-[1.05] text-deep-plum"
            >
              {business.name} on Grant Road.
            </TextMask>

            <address className="mt-6 not-italic">
              {business.address.lines.map((line) => (
                <TextMask
                  key={line}
                  as="p"
                  className="text-desc font-body text-base"
                  delay={0.06}
                >
                  {line}
                </TextMask>
              ))}
            </address>

            <TextMask
              as="p"
              className="text-desc mt-4 font-body text-base"
              delay={0.12}
            >
              <a
                href={business.phoneHref}
                className="underline decoration-oxblood/35 underline-offset-4 transition-colors hover:text-oxblood"
              >
                {business.phoneDisplay}
              </a>
            </TextMask>

            <div className="mt-10 flex flex-wrap gap-4">
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

            <p className="mt-6 font-nav text-[0.58rem] uppercase tracking-[0.14em] text-dark-sage">
              {business.suburbLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
