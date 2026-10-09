"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { menuCategories } from "@/data/cafeViana";
import SectionLabel from "@/components/SectionLabel";
import TextMask from "@/components/motion/TextMask";
import CategoryIndex from "@/components/Menu/CategoryIndex";
import MenuGroup from "@/components/Menu/MenuGroup";
import MenuVisual from "@/components/Menu/MenuVisual";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0]?.id ?? "breakfast");
  const listRef = useRef(null);
  const reduced = useReducedMotion();

  const activeCategory = useMemo(
    () => menuCategories.find((c) => c.id === activeId) ?? menuCategories[0],
    [activeId],
  );

  const visualItem = useMemo(() => {
    const items = activeCategory?.items ?? [];
    return items[0] ?? null;
  }, [activeCategory]);

  const animateRows = useCallback(() => {
    if (reduced) return;
    const list = listRef.current;
    if (!list) return;

    const rows = list.querySelectorAll("[data-menu-row]");
    gsap.fromTo(
      rows,
      { y: 22, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [reduced]);

  useEffect(() => {
    animateRows();
  }, [activeId, animateRows]);

  const handleSelect = (id) => {
    setActiveId(id);
  };

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-buttercream/92 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel tone="oxblood" className="mb-8">
          Full menu
        </SectionLabel>

        <TextMask
          as="h2"
          className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.05] text-deep-plum"
        >
          From breakfast to the cabinet
        </TextMask>

        <CategoryIndex
          categories={menuCategories}
          activeId={activeId}
          onSelect={handleSelect}
          layout="tabs"
        />

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-3">
            <CategoryIndex
              categories={menuCategories}
              activeId={activeId}
              onSelect={handleSelect}
              layout="sidebar"
            />
          </div>

          <div
            ref={listRef}
            className="surface-read-warm rounded-sm border border-dark-sage/15 px-4 py-2 md:col-span-5 md:px-5 md:py-3 lg:col-span-6"
          >
            <h3 className="sr-only">{activeCategory?.label} menu</h3>
            <MenuGroup
              items={activeCategory?.items}
              groupKey={activeCategory?.id}
            />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <MenuVisual item={visualItem} categoryId={activeId} />
          </div>
        </div>

        <p className="text-meta mt-10 font-nav text-[0.62rem] uppercase tracking-[0.16em]">
          Prices shown as ask in store unless verified — no online-only offers.
        </p>
      </div>
    </section>
  );
}
