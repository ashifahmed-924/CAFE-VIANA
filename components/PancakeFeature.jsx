"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { breakfast } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import GradientButton from "@/components/GradientButton";
import TextMask from "@/components/motion/TextMask";
import VerticalImageFrames from "@/components/VerticalImageFrames";
import useReducedMotion from "@/hooks/useReducedMotion";

const PANCAKE_VIDEO = "/videos/pancake-stack.mp4";

const PANCAKE_FRAMES = [
  {
    src: "/images/cafe-viana/pancakes.jpg",
    alt: "Pancake stack at Cafe Viana",
  },
  {
    src: "/images/cafe-viana/fruit-toast.jpg",
    alt: "Fruit toast at Cafe Viana",
  },
  {
    src: "/images/cafe-viana/big-breakfast.jpg",
    alt: "Big breakfast at Cafe Viana",
  },
  {
    src: "/images/cafe-viana/eggs-benedict.jpg",
    alt: "Eggs Benedict at Cafe Viana",
  },
];

export default function PancakeFeature() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const pancakes =
    breakfast.find((item) => item.id === "pancakes") ?? breakfast[3];

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

  return (
    <section className="relative overflow-hidden bg-[color-mix(in_srgb,var(--ash-lilac)_22%,var(--porcelain)_78%)] py-10 md:py-12 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {!reduced ? (
          <video
            ref={videoRef}
            className="h-full w-full scale-105 object-cover object-[center_40%]"
            src={PANCAKE_VIDEO}
            poster="/images/cafe-viana/pancakes.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src="/images/cafe-viana/pancakes.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(250,245,233,0.94)_0%,rgba(245,238,228,0.86)_50%,rgba(181,171,182,0.5)_100%)]"
        aria-hidden
      />

      {/*
        Compact feature strip: copy left, dual frames in one short row.
        Cuts the tall stacked-frame height while keeping the 1s rotation.
      */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:px-8 lg:gap-12">
        <div className="min-w-0">
          <SectionLabel tone="oxblood" className="mb-0">
            Pancakes at Viana
          </SectionLabel>

          <h2 className="mt-3 font-display leading-[0.9] text-deep-plum md:mt-4">
            <TextMask
              as="span"
              className="block text-[clamp(2rem,5vw,3.5rem)] tracking-[0.14em] md:tracking-[0.16em]"
            >
              STACKED
            </TextMask>
            <TextMask
              as="span"
              className="mt-0.5 block text-[clamp(2rem,5vw,3.5rem)] tracking-[0.14em] text-oxblood md:tracking-[0.16em]"
              delay={0.1}
            >
              HIGH.
            </TextMask>
          </h2>

          <TextMask
            as="p"
            className="text-desc mt-3 max-w-md font-body text-sm leading-snug md:mt-4 md:text-[0.95rem] md:leading-relaxed"
            delay={0.08}
          >
            {pancakes.description}
            <span className="mt-1.5 block font-nav text-[0.58rem] uppercase tracking-[0.18em] text-dark-sage md:mt-2">
              {pancakes.availability} — ask in store for today&apos;s board
            </span>
          </TextMask>

          <div className="mt-5 md:mt-6">
            <GradientButton href="#menu">See Today&apos;s Menu</GradientButton>
          </div>
        </div>

        <div className="relative w-full max-w-lg md:max-w-none">
          <VerticalImageFrames
            images={PANCAKE_FRAMES}
            intervalMs={1000}
            altPrefix="Pancake board"
            layout="row"
            frameClassName="!aspect-[4/3]"
            className="gap-2 md:gap-2.5"
          />
        </div>
      </div>
    </section>
  );
}
