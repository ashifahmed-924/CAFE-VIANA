"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, heroImages } from "@/data/cafeViana";
import VianaPattern from "@/components/VianaPattern";
import GradientButton from "@/components/GradientButton";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_IMAGES = [
  {
    key: "bread",
    src: heroImages.bread,
    alt: "artisan bread",
    heightClass: "h-[280px] xl:h-[360px]",
    yFrom: 40,
    yPercent: -4,
  },
  {
    key: "coffee",
    src: heroImages.coffee,
    alt: "coffee",
    heightClass: "h-[340px] xl:h-[440px]",
    yFrom: 65,
    yPercent: -8,
  },
  {
    key: "breakfast",
    src: heroImages.breakfast,
    alt: "breakfast",
    heightClass: "h-[300px] xl:h-[380px]",
    yFrom: 30,
    yPercent: -5,
  },
];

const HERO_VIDEO = "/videos/hero-bakery.mp4";

export default function HeroCounter() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const veilRef = useRef(null);
  const archRef = useRef(null);
  const cafeRef = useRef(null);
  const vianaRef = useRef(null);
  const imagesRef = useRef([]);
  const labelsRef = useRef([]);
  const ctaRef = useRef(null);
  const patternBaseRef = useRef(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const videoWrap = videoWrapRef.current;
      const veil = veilRef.current;
      const arch = archRef.current;
      const cafe = cafeRef.current;
      const viana = vianaRef.current;
      const images = imagesRef.current.filter(Boolean);
      const labels = labelsRef.current.filter(Boolean);
      const cta = ctaRef.current;
      const pattern = patternBaseRef.current;

      if (videoWrap) {
        gsap.fromTo(
          videoWrap,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        );
        gsap.to(videoWrap, {
          opacity: 0.72,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.8,
        });
      }

      if (veil) {
        gsap.fromTo(
          veil,
          { opacity: 0.92 },
          {
            opacity: 0.68,
            duration: 5.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.4,
          },
        );
      }

      if (arch) {
        gsap.fromTo(
          arch,
          { scaleY: 0.6, transformOrigin: "50% 100%" },
          { scaleY: 1, duration: 1.1, ease: "power3.out" },
        );
      }

      if (cafe) {
        gsap.fromTo(
          cafe,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out", delay: 0.15 },
        );
      }

      if (viana) {
        gsap.fromTo(
          viana,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.95, ease: "power3.out", delay: 0.28 },
        );
      }

      images.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: isDesktop ? (HERO_IMAGES[i]?.yFrom ?? 40) : 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.45 + i * 0.08,
          },
        );
      });

      if (labels.length) {
        gsap.fromTo(
          labels,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.9 },
        );
      }

      if (cta) {
        gsap.fromTo(
          cta,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.7, ease: "power2.out", delay: 1.05 },
        );
      }

      if (pattern) {
        gsap.fromTo(
          pattern,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1, ease: "power2.inOut", delay: 1.15 },
        );
      }

      if (arch) {
        gsap.to(arch, {
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      images.forEach((el, i) => {
        gsap.to(el, {
          yPercent: HERO_IMAGES[i]?.yPercent ?? -4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      if (cafe) {
        gsap.to(cafe, {
          xPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (viana) {
        gsap.to(viana, {
          xPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reduced, isDesktop]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-buttercream pt-[var(--nav-h)]"
    >
      <div
        ref={videoWrapRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {!reduced ? (
          <video
            ref={videoRef}
            className="h-full w-full scale-105 object-cover object-center"
            src={HERO_VIDEO}
            poster="/images/cafe-viana/hero-bread.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src="/images/cafe-viana/hero-bread.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      <div
        ref={veilRef}
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(250,245,233,0.94)_0%,rgba(242,229,201,0.78)_42%,rgba(250,245,233,0.62)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,252,245,0.35)_0%,transparent_55%)]"
        aria-hidden
      />

      <VianaPattern
        variant="pastry"
        colorClass="text-oxblood"
        className="z-[2] opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-6 pt-5 md:px-8 md:pb-10 md:pt-8 lg:pb-16 lg:pt-12">
        <div className="grid items-end gap-5 md:gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="relative z-20">
            <p
              ref={(el) => {
                labelsRef.current[0] = el;
              }}
              className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-oxblood md:text-[0.68rem] md:tracking-[0.32em]"
            >
              Baxter · Victoria
            </p>

            <h1 className="mt-2.5 font-display leading-[0.86] tracking-[-0.03em] text-deep-plum md:mt-4">
              <span className="block overflow-hidden">
                <span
                  ref={cafeRef}
                  className="block text-[clamp(2.85rem,14vw,7.75rem)]"
                >
                  CAFE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={vianaRef}
                  className="block text-[clamp(2.85rem,14vw,7.75rem)] text-oxblood"
                >
                  VIANA
                </span>
              </span>
            </h1>

            <p
              ref={(el) => {
                labelsRef.current[1] = el;
              }}
              className="mt-3 font-nav text-[0.65rem] font-medium uppercase tracking-[0.2em] text-dark-sage md:mt-5 md:text-[0.72rem] md:tracking-[0.22em]"
            >
              Artisan Bakery · Breakfast · Lunch
            </p>

            <p
              ref={(el) => {
                labelsRef.current[2] = el;
              }}
              className="text-desc mt-2.5 max-w-sm font-body text-sm leading-relaxed md:mt-4 md:text-base"
            >
              {business.tagline} on Grant Road — sourdough, pies, morning plates, and coffee
              to stay or take away.
            </p>

            <div ref={ctaRef} className="mt-5 flex flex-wrap gap-3 origin-left md:mt-8">
              <GradientButton href="#menu">View Menu</GradientButton>
              <Link
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </Link>
            </div>

            {!isDesktop ? (
              <ul
                className="mt-5 grid grid-cols-3 gap-2 md:mt-7 md:gap-3"
                aria-label="From the counter"
              >
                {HERO_IMAGES.map((img, i) => (
                  <li key={img.key}>
                    <figure
                      ref={(el) => {
                        imagesRef.current[i] = el;
                      }}
                      className="relative aspect-[5/4] overflow-hidden rounded-sm bg-porcelain shadow-[0_10px_24px_-18px_rgba(33,25,24,0.45)] md:aspect-[4/3]"
                      data-cursor={i === 1 ? "SIP" : "BAKE"}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority
                        sizes="30vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-plum/55 to-transparent px-1.5 pb-1.5 pt-4 font-nav text-[0.5rem] uppercase tracking-[0.14em] text-buttercream md:px-2 md:text-[0.55rem]">
                        {img.key}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {isDesktop ? (
            <div className="relative min-h-[480px] xl:min-h-[520px]">
              <div
                ref={archRef}
                className="pointer-events-none absolute left-1/2 top-0 h-[92%] w-[min(100%,520px)] -translate-x-1/2 text-pistachio"
                aria-hidden
              >
                <svg viewBox="0 0 320 420" className="h-full w-full" fill="none">
                  <path
                    d="M40 400 V170 A120 120 0 0 1 280 170 V400"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-pistachio"
                  />
                  <path
                    d="M40 400 V170 A120 120 0 0 1 280 170 V400"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-ash-lilac"
                    opacity="0.55"
                    transform="translate(8 0)"
                  />
                  <line
                    x1="160"
                    y1="50"
                    x2="160"
                    y2="400"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-pistachio/70"
                  />
                  <line
                    x1="40"
                    y1="220"
                    x2="280"
                    y2="220"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-pistachio/70"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex items-end justify-center gap-3 pt-10 lg:gap-4">
                {HERO_IMAGES.map((img, i) => (
                  <figure
                    key={img.key}
                    ref={(el) => {
                      imagesRef.current[i] = el;
                    }}
                    className={`relative w-[28%] overflow-hidden rounded-sm bg-porcelain shadow-[0_22px_50px_-30px_rgba(33,25,24,0.55)] ${img.heightClass}`}
                    data-cursor={i === 1 ? "SIP" : "BAKE"}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority
                      sizes="180px"
                      className="object-cover"
                    />
                    <figcaption className="absolute bottom-2 left-2 rounded-sm bg-buttercream/90 px-2 py-1 font-nav text-[0.55rem] uppercase tracking-[0.16em] text-deep-plum">
                      {img.key}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div
          ref={patternBaseRef}
          className="mt-5 h-px origin-left bg-gradient-to-r from-pistachio via-ash-lilac/60 to-transparent md:mt-8 lg:mt-10"
          aria-hidden
        />
      </div>
    </section>
  );
}
