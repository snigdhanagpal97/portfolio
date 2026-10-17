"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Landmark } from "@/components/Landmarks";

// Years only; every line is backed by the resume (see reference/plan.md).
const STOPS = [
  {
    place: "Purple Pixie Cakes",
    years: "2018–2022",
    role: "Founder",
    line: "Started a bespoke bakery brand in Delhi and grew it to 10K+ lifetime orders across two cloud kitchens.",
    href: "/about",
    cta: "More about me",
    icon: "cake" as const,
  },
  {
    place: "Blinkit",
    years: "2022–2024",
    role: "Data Analyst → Sr. Data Analyst",
    line: "Switched to analytics. Promoted in 18 months to lead perishables analytics.",
    href: "/work/npr",
    cta: "Read the NPR case study",
    icon: "bag" as const,
  },
  {
    place: "Noon",
    years: "2025–2026",
    role: "Product Manager",
    line: "Moved into product. Shipped a markdown engine, an allocation model and a control tower for 150+ dark stores.",
    href: "/work/markdown-engine",
    cta: "Read the markdown engine case study",
    icon: "store" as const,
  },
  {
    place: "UNC Kenan-Flagler",
    years: "2026–2028",
    role: "MBA candidate",
    line: "Kenan-Flagler Fellowship recipient. Latest build: Blinkit Flash, my NextLeap AI PM Fellowship (Top Fellow) capstone.",
    href: "/work/flash",
    cta: "See Flash",
    icon: "well" as const,
  },
];

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  // The rail fills in as the timeline passes the reading line (70% down the screen).
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.7"],
  });

  return (
    <section aria-labelledby="journey-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="journey-title"
          className="font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
        >
          How I got here
        </h2>
        <p className="mt-3 text-base text-ink-60">
          Before all this: hotel school at IHM Delhi and a management
          traineeship at IHCL (Taj).
        </p>

        <ol ref={listRef} className="relative mt-12 space-y-12 md:mt-16 md:space-y-16">
          {/* Rail and its scroll-linked fill */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[21px] w-0.5 rounded-full bg-black/10 md:left-[185px]"
          />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[21px] w-0.5 origin-top rounded-full bg-purple-600 md:left-[185px]"
            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
          />

          {STOPS.map((s) => (
            <motion.li
              key={s.place}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative grid grid-cols-[44px_1fr] gap-x-5 md:grid-cols-[140px_44px_1fr] md:gap-x-6"
            >
              <p className="hidden pt-2.5 text-right font-numeric text-xl font-bold text-ink-80 md:block">
                {s.years}
              </p>
              <div className="relative z-10 h-11 w-11 rounded-tile bg-white">
                <div className="h-full w-full rounded-tile bg-lavender p-2">
                  <Landmark kind={s.icon} />
                </div>
              </div>
              <div className="max-w-xl">
                <p className="text-[13px] uppercase tracking-wide text-ink-52 md:hidden">
                  {s.years}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight">
                  {s.place}
                  <span className="font-medium text-ink-60"> · {s.role}</span>
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-70 md:text-lg">
                  {s.line}
                </p>
                <Link href={s.href} className="group mt-3 inline-block font-semibold text-purple-600">
                  {s.cta}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
                </Link>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
