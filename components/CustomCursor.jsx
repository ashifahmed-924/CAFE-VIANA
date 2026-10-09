"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

const CURSOR_LABELS = new Set(["BAKE", "TASTE", "SIP", "GO"]);

function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isFinePointer() && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;

    const cursor = cursorRef.current;
    const labelEl = labelRef.current;
    if (!cursor) return undefined;

    document.body.classList.add("has-custom-cursor");
    cursor.classList.add("is-active");

    let xTo;
    let yTo;
    const ctx = gsap.context(() => {
      gsap.set(cursor, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50,
      });

      xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
      yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    }, cursor);

    const onMove = (e) => {
      xTo?.(e.clientX);
      yTo?.(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target || !labelEl) return;

      const raw = (target.getAttribute("data-cursor") || "").trim().toUpperCase();
      if (!CURSOR_LABELS.has(raw)) return;

      labelEl.textContent = raw;
      gsap.to(cursor, {
        width: 52,
        height: 52,
        duration: 0.22,
        ease: "power2.out",
      });
    };

    const onOut = (e) => {
      const from = e.target.closest("[data-cursor]");
      const to = e.relatedTarget?.closest?.("[data-cursor]");
      if (from && from === to) return;

      if (labelEl) labelEl.textContent = "";
      gsap.to(cursor, {
        width: 36,
        height: 36,
        duration: 0.22,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
      cursor.classList.remove("is-active");
      ctx.revert();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="viana-cursor" aria-hidden="true">
      <span ref={labelRef} className="pointer-events-none select-none" />
    </div>
  );
}
