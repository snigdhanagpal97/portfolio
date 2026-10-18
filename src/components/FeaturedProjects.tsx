"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { FEATURED as PROJECTS } from "@/content/projects";

const DURATION = 5000; // ms each project stays in front
const TICK = 50;

// Where each card sits in the stack, by distance from the front.
// Desktop peeks to the right; mobile peeks below.
function pose(offset: number, n: number, wide: boolean) {
  if (offset === 0) return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 30 };
  if (offset === n - 1) {
    // the card that just left: slides out to the left and fades
    return { x: wide ? -80 : -40, y: 0, scale: 0.97, opacity: 0, zIndex: 40 };
  }
  const depth = Math.min(offset, 3);
  return {
    x: wide ? depth * 28 : 0,
    y: wide ? 0 : depth * 14,
    scale: 1 - depth * 0.04,
    opacity: depth >= 3 ? 0 : 1 - depth * 0.25,
    zIndex: 30 - depth,
  };
}

function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

/**
 * A stack of project cards: one in front, the next two peeking behind.
 * Advances on a timer (paused on hover or focus), or with the arrows,
 * the counter, or a swipe. No auto-advance for reduced motion.
 */
export function FeaturedProjects() {
  const reduceMotion = useReducedMotion();
  const wide = useWide();
  const n = PROJECTS.length;
  const [{ index, elapsed }, setState] = useState({ index: 0, elapsed: 0 });
  const [paused, setPaused] = useState(false);
  const auto = !reduceMotion;

  useEffect(() => {
    if (!auto || paused) return;
    const id = setInterval(() => {
      setState((s) =>
        s.elapsed + TICK >= DURATION
          ? { index: (s.index + 1) % n, elapsed: 0 }
          : { ...s, elapsed: s.elapsed + TICK },
      );
    }, TICK);
    return () => clearInterval(id);
  }, [auto, paused, n]);

  const progress = auto ? elapsed / DURATION : 1;

  const go = (step: number) =>
    setState((s) => ({ index: (s.index + step + n) % n, elapsed: 0 }));

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section aria-labelledby="projects-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex items-end justify-between gap-6">
          <h2
            id="projects-title"
            className="font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
          >
            Featured Projects
          </h2>
          <Link href="/work" className="group shrink-0 pb-1 font-semibold transition-colors hover:text-purple-600">
            View All{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-8 md:mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* All cards share one grid cell, so the stack sizes to the tallest */}
            <div
              className="grid pb-7 md:pr-14 md:pb-0"
              role="group"
              aria-roledescription="carousel"
              aria-label="Featured projects"
            >
              {PROJECTS.map((p, i) => {
                const offset = (i - index + n) % n;
                const front = offset === 0;
                return (
                  <motion.article
                    key={p.slug}
                    aria-hidden={!front}
                    initial={false}
                    animate={pose(offset, n, wide)}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
                    drag={front ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={onDragEnd}
                    style={{ gridArea: "1 / 1", originX: wide ? 1 : 0.5, originY: wide ? 0.5 : 1 }}
                    className={`rounded-panel border border-black/10 bg-white p-4 shadow-[0_18px_40px_-28px_rgb(83_65_132/0.45)] md:p-6 ${
                      front ? "" : "pointer-events-none"
                    }`}
                  >
                    {/* Cards behind the front one show only their edges */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: front ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : front ? 0.4 : 0.2, delay: front && !reduceMotion ? 0.15 : 0 }}
                      className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10"
                    >
                      <div className="overflow-hidden rounded-card border border-black/5 bg-surface-50 md:col-span-7">
                        <Image
                          src={`/images/project-${p.slug}.png`}
                          alt=""
                          width={1248}
                          height={946}
                          sizes="(min-width: 768px) 55vw, 100vw"
                          draggable={false}
                          className="h-auto w-full"
                        />
                      </div>
                      <div className="pb-2 md:col-span-5 md:pb-0">
                        <p className="text-[13px] uppercase tracking-wide text-ink-52">{p.context}</p>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-snug md:text-[28px]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-ink-70 md:text-lg">{p.subtitle}</p>
                        {p.metric && (
                          <p className="mt-5 flex items-baseline gap-2 border-l-2 border-purple-600 pl-3">
                            <span className="font-numeric text-2xl font-bold leading-none">{p.metric.value}</span>
                            <span className="text-sm text-ink-60">{p.metric.label}</span>
                          </p>
                        )}
                        <p className="mt-5 text-sm text-ink-60">{p.tags.join(" | ")}</p>
                        <Link
                          href={`/work/${p.slug}`}
                          tabIndex={front ? 0 : -1}
                          className="group mt-5 inline-block font-semibold text-purple-600"
                        >
                          Read the case study{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>

            {/* Counter, progress and arrows */}
            <div className="mt-6 flex items-center gap-5 md:pr-14">
              <span className="font-numeric text-lg font-bold tabular-nums" aria-live="polite">
                {String(index + 1).padStart(2, "0")}
                <span className="text-ink-52"> / {String(n).padStart(2, "0")}</span>
              </span>
              <span className="relative flex h-5 flex-1 items-center">
                <span className="h-0.5 w-full rounded-full bg-black/10" />
                <span
                  className="absolute left-0 h-0.5 w-full origin-left rounded-full bg-purple-600"
                  style={{ transform: `scaleX(${progress})` }}
                />
                {/* a paw print walks along with the progress */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="absolute h-4 w-4 -translate-x-1/2 rotate-90 text-purple-600"
                  style={{ left: `${progress * 100}%` }}
                  fill="currentColor"
                >
                  <ellipse cx="12" cy="16" rx="5" ry="4.2" />
                  <circle cx="5.8" cy="10.2" r="2.2" />
                  <circle cx="9.6" cy="6.4" r="2.2" />
                  <circle cx="14.4" cy="6.4" r="2.2" />
                  <circle cx="18.2" cy="10.2" r="2.2" />
                </svg>
              </span>
              <div className="flex gap-2">
                {[
                  { step: -1, label: "Previous project", d: "M15 6l-6 6 6 6" },
                  { step: 1, label: "Next project", d: "M9 6l6 6-6 6" },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => go(b.step)}
                    aria-label={b.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-ink-80 transition-colors hover:border-purple-600 hover:bg-purple-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={b.d} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
