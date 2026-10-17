"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { MarginNote } from "@/components/MarginNote";

// Resume-backed stats only (see reference/plan.md). The back of each card
// is the decision behind the number, also from the resume.
const STATS = [
  {
    value: 13,
    format: (n: number) => `$${n}K/day`,
    label: "Write-offs eliminated",
    company: "Noon",
    call: "Owned an hourly markdown engine that repriced leftover perishables against sell-through curves, inside category margin floors.",
  },
  {
    value: 10,
    format: (n: number) => `${n}K+`,
    label: "Lifetime orders",
    company: "Purple Pixie Cakes",
    call: "Negotiated vendor terms and standardized sourcing to protect margins, then ran retention campaigns that grew repeat orders.",
  },
  {
    value: 25,
    from: 16,
    format: (n: number) => `16% → ${n}%`,
    label: "Rec rail impression to add-to-cart",
    company: "Blinkit",
    call: "Swapped popularity ranking for cart affinity (PMI), persona clusters and a time-of-day boost for perishables.",
  },
  {
    value: 12,
    format: (n: number) => `${n}%`,
    label: "Search conversion uplift",
    company: "Blinkit",
    call: "Built keyword spike detection on search behavior, so demand showed up early enough to order inventory ahead of it.",
  },
];

export function NumbersStrip() {
  return (
    <section aria-labelledby="numbers-title" className="border-y border-black/10 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2
            id="numbers-title"
            className="font-display text-[28px] font-bold leading-tight tracking-tight md:text-[32px]"
          >
            Numbers that tell a story
          </h2>
          <MarginNote>tap one, there&rsquo;s a call behind it</MarginNote>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-8">
          {STATS.map((stat, i) => (
            <li key={stat.label}>
              <StatCard {...stat} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({
  value,
  format,
  label,
  company,
  call,
  index,
  from = 0,
}: (typeof STATS)[number] & { index: number; from?: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [counted, setCounted] = useState(from);
  const shown = reduceMotion ? value : counted;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(from, value, {
      duration: 1.2,
      delay: index * 0.12,
      ease: "easeOut",
      onUpdate: (v) => setCounted(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, index, from]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${format(value)} ${label}, ${company}. ${flipped ? call : "Show the decision behind it"}`}
      className="group block h-44 w-full md:h-48 text-left [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600 rounded-card"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-card border border-black/10 bg-surface-50 p-5 transition-shadow [backface-visibility:hidden] group-hover:shadow-[0_6px_24px_-12px_rgb(83_65_132/0.45)]">
          <span className="font-numeric text-[34px] font-bold leading-none tracking-tight">
            {format(shown)}
          </span>
          <span>
            <span className="block text-lg font-semibold leading-snug text-ink-80">{label}</span>
            <span className="mt-1 flex items-center justify-between text-[13px] uppercase tracking-wide text-ink-52">
              {company}
              <span aria-hidden className="normal-case text-purple-600 opacity-70 transition-opacity group-hover:opacity-100">
                flip ↻
              </span>
            </span>
          </span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-card bg-purple-600 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-[15px] leading-relaxed">{call}</span>
          <span className="text-[13px] uppercase tracking-wide text-white/60">{company}</span>
        </div>
      </motion.div>
    </button>
  );
}
