"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { business } from "@/data/cafeViana";
import VianaPattern from "@/components/VianaPattern";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const linksRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const links = linksRef.current;
    if (!panel) return undefined;

    document.body.style.overflow = "hidden";

    let ctx;

    if (!reduced) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
        );

        if (links) {
          const items = links.querySelectorAll("[data-nav-item]");
          gsap.fromTo(
            items,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.07,
              ease: "power3.out",
              delay: 0.08,
            },
          );
        }
      }, panel);
    }

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      ctx?.revert();
    };
  }, [open, onClose, reduced]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col bg-oxblood text-buttercream md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <VianaPattern variant="pastry" colorClass="text-buttercream" />

      <div className="relative z-10 flex items-center justify-between px-6 pt-6">
        <p className="font-nav text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-buttercream/80">
          {business.name}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="font-nav text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-buttercream/90"
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      <nav
        ref={linksRef}
        className="relative z-10 flex flex-1 flex-col justify-center gap-6 px-8"
        aria-label="Mobile"
      >
        {business.mobileNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-nav-item
            onClick={onClose}
            className="font-display text-[clamp(2rem,9vw,2.75rem)] leading-none text-buttercream transition-opacity hover:opacity-80"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="relative z-10 border-t border-buttercream/15 px-6 py-8">
        <a
          href={business.phoneHref}
          className="btn-gradient flex w-full justify-center text-deep-plum"
        >
          Call {business.phoneDisplay}
        </a>
        <p className="mt-3 text-center font-nav text-[0.58rem] uppercase tracking-[0.18em] text-buttercream/55">
          {business.address.lines.join(" · ")}
        </p>
      </div>
    </div>
  );
}
