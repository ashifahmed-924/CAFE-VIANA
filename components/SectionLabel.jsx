import LineDraw from "@/components/motion/LineDraw";

export default function SectionLabel({
  children,
  className = "",
  tone = "oxblood",
  showLine = true,
  align = "left",
}) {
  const toneClasses = {
    oxblood: "text-oxblood",
    sage: "text-dark-sage",
    espresso: "text-espresso",
    raspberry: "text-raspberry",
  };

  const alignClasses =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div
      className={`flex flex-col gap-2 ${alignClasses} ${className}`.trim()}
    >
      <p
        className={`font-nav text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${toneClasses[tone] ?? toneClasses.oxblood}`}
      >
        {children}
      </p>
      {showLine ? (
        <LineDraw
          className={`h-3 w-16 ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""}`}
          color="var(--pistachio)"
          strokeWidth={1.25}
          autoDraw
        />
      ) : null}
    </div>
  );
}
