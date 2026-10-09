"use client";

export default function CategoryIndex({
  categories,
  activeId,
  onSelect,
  layout = "sidebar",
}) {
  const isTabs = layout === "tabs";

  return (
    <nav
      className={
        isTabs
          ? "shelf-scroll flex gap-2 overflow-x-auto pb-2 md:hidden"
          : "hidden md:flex md:flex-col md:gap-1 md:pr-4"
      }
      aria-label="Menu categories"
    >
      {categories.map((cat) => {
        const active = cat.id === activeId;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`group relative shrink-0 text-left font-nav text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              isTabs ? "rounded-full px-4 py-2.5" : "px-2 py-2.5"
            } ${
              active
                ? isTabs
                  ? "bg-buttercream text-oxblood"
                  : "text-oxblood"
                : "text-desc-muted hover:text-oxblood"
            }`}
            aria-current={active ? "true" : undefined}
          >
            <span className="flex items-center gap-2">
              {active ? (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-raspberry"
                  aria-hidden
                />
              ) : (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-transparent"
                  aria-hidden
                />
              )}
              {cat.label}
            </span>
            {active && !isTabs ? (
              <span
                className="absolute bottom-1 left-2 right-2 h-0.5 bg-dark-sage"
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
