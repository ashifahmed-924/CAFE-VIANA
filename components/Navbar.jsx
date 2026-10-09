"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/cafeViana";
import BrandMark from "@/components/BrandMark";
import GradientButton from "@/components/GradientButton";
import MobileMenu from "@/components/MobileMenu";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const innerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const inner = innerRef.current;
    if (!header || !logo || !inner) return undefined;

    if (reduced) {
      header.style.height = "var(--nav-h-scrolled)";
      return undefined;
    }

    let ctx;

    const run = () => {
      ctx = gsap.context(() => {
        gsap.set(header, { height: "var(--nav-h)" });
        gsap.set(logo, { scale: 1, transformOrigin: "0% 50%" });

        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "+=120",
              scrub: 0.35,
              onUpdate: (self) => setScrolled(self.progress > 0.12),
            },
          })
          .to(
            header,
            {
              height: "var(--nav-h-scrolled)",
              ease: "none",
            },
            0,
          )
          .to(logo, { scale: 0.92, ease: "none" }, 0);

        tl.progress(0);
      }, header);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  const shellClasses = scrolled
    ? "border-b border-dark-sage/35 bg-buttercream/92 text-deep-plum shadow-sm backdrop-blur-md"
    : "border-b border-transparent bg-transparent text-deep-plum";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${shellClasses}`}
        style={{ height: reduced ? "var(--nav-h-scrolled)" : "var(--nav-h)" }}
      >
        <div
          ref={innerRef}
          className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          <Link
            href="#top"
            className="shrink-0 focus-visible:outline-none"
            aria-label={`${business.name} home`}
          >
            <div ref={logoRef} className="origin-left">
              <BrandMark className="text-deep-plum [&_.font-display]:text-[clamp(1.35rem,3vw,2rem)] [&_.font-nav]:text-[0.52rem]" />
            </div>
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {business.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-nav text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-deep-plum/90 transition-colors hover:text-oxblood"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <GradientButton href="#specials" showArrow={false}>
              Today&apos;s Specials
            </GradientButton>
          </div>

          <button
            type="button"
            className="font-nav text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-deep-plum lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
