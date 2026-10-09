"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import BrandMark from "@/components/BrandMark";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOOTER_LINE =
  "M 0 8 Q 120 2 240 8 T 480 8 T 720 8 T 960 8";

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.09 15.95 2 14.64 2 11.7 2 9.5 3.79 9.5 7.15V9.5H7v4h2.5V22h4.5v-8.5z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.76.07-2.25.1-3.3 1.17-3.4 3.4-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.1 2.22 1.16 3.3 3.4 3.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c2.25-.1 3.3-1.17 3.4-3.4.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.1-2.22-1.16-3.3-3.4-3.4-1.24-.06-1.61-.07-4.76-.07zm0 3.06a5.18 5.18 0 1 1 0 10.36 5.18 5.18 0 0 1 0-10.36zm0 1.8a3.38 3.38 0 1 0 0 6.76 3.38 3.38 0 0 0 0-6.76zm5.4-2.18a1.21 1.21 0 1 1 0 2.42 1.21 1.21 0 0 1 0-2.42z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.69l7.73-8.84L1.25 2.25h6.81l4.71 6.23 5.47-6.23zm-1.16 17.52h1.83L7.08 4.13H5.11l12 15.64z" />
    </svg>
  );
}

function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.57V8.43L15.82 12l-6.07 3.57z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: business.facebook,
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: business.instagram,
    Icon: InstagramIcon,
  },
  {
    label: "Twitter",
    href: business.twitter,
    Icon: TwitterIcon,
  },
  {
    label: "YouTube",
    href: business.youtube,
    Icon: YoutubeIcon,
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const pathRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const footer = footerRef.current;
    const path = pathRef.current;
    if (!footer || !path || reduced) {
      if (path && reduced) {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      }
      return undefined;
    }

    let ctx;

    const run = () => {
      const len = path.getTotalLength();
      ctx = gsap.context(() => {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            once: true,
          },
        });
      }, footer);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <footer
      ref={footerRef}
      className="relative bg-dark-espresso/92 pt-6 text-buttercream/85"
    >
      <svg
        className="h-4 w-full"
        viewBox="0 0 960 16"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="footer-viana-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--raspberry)" />
            <stop offset="55%" stopColor="var(--apricot)" />
            <stop offset="100%" stopColor="var(--raspberry)" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={FOOTER_LINE}
          fill="none"
          stroke="url(#footer-viana-line)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-8 md:pb-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <BrandMark
              showLocation
              locationLabel="Baxter · VIC"
              className="[&_.font-display]:text-buttercream [&_.font-nav]:text-apricot/90"
            />
            <p className="text-desc-on-dark mt-5 font-body text-sm leading-relaxed md:mt-6">
              {business.address.full}
            </p>
            <p className="mt-3 font-body text-sm">
              <a
                href={business.phoneHref}
                className="text-buttercream underline decoration-raspberry/40 underline-offset-4 transition-colors hover:text-apricot"
              >
                {business.phoneDisplay}
              </a>
            </p>

            <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href || "#"}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    aria-disabled={!href}
                    onClick={!href ? (e) => e.preventDefault() : undefined}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-buttercream/20 text-buttercream/80 transition-colors hover:border-apricot/60 hover:text-apricot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-apricot"
                  >
                    <Icon className="size-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-apricot/90">
              On this page
            </p>
            <ul className="mt-4 space-y-2">
              {business.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-buttercream/75 transition-colors hover:text-buttercream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-apricot/90">
              Find us
            </p>
            <ul className="mt-4 space-y-2 font-body text-sm">
              <li>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-buttercream/75 transition-colors hover:text-buttercream"
                >
                  Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-buttercream/10 pt-8 font-nav text-[0.58rem] uppercase tracking-[0.16em] text-buttercream/45">
          © 2026 Cafe Viana · {business.hoursNote}
        </p>
      </div>
    </footer>
  );
}
