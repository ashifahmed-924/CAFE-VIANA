"use client";

import { useId } from "react";

const VARIANTS = {
  pastry: {
    opacity: 0.05,
    content: (
      <>
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="36" cy="8" r="1.5" fill="currentColor" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
        <path
          d="M 48 6 Q 56 20 48 34 Q 40 20 48 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M 64 10 C 72 10 76 18 72 26 C 68 34 58 34 54 26 C 50 18 56 10 64 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </>
    ),
  },
  tile: {
    opacity: 0.04,
    content: (
      <>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 16 + 2}
              y={row * 16 + 2}
              width="12"
              height="12"
              rx="1"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          )),
        )}
      </>
    ),
  },
  "bread-score": {
    opacity: 0.06,
    content: (
      <>
        <path d="M 8 40 L 72 8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 16 48 L 80 16" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 24 56 L 88 24" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 32 64 L 96 32" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
  label: {
    opacity: 0.07,
    content: (
      <>
        <circle
          cx="40"
          cy="40"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="40"
          cy="40"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 4"
        />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fontSize="7"
          fontFamily="var(--font-sora), system-ui, sans-serif"
          letterSpacing="0.2em"
          fill="currentColor"
        >
          VIANA
        </text>
      </>
    ),
  },
  grid: {
    opacity: 0.03,
    content: (
      <>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v-${i}`}
            x1={i * 16}
            y1="0"
            x2={i * 16}
            y2="96"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 16}
            x2="96"
            y2={i * 16}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
      </>
    ),
  },
};

export default function VianaPattern({
  variant = "grid",
  className = "",
  colorClass = "text-oxblood",
}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.grid;
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${colorClass} ${className}`.trim()}
      style={{ opacity: cfg.opacity }}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={patternId}
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <g>{cfg.content}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
