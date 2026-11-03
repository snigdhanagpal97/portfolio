"use client";

// How saving went before Backpocket, played as three steps: save, forget
// (a clock spins while saves get buried), search (each place scrolls past
// fast, with a question mark where the slide should be). Runs on a simple tick clock while on screen. With reduced motion it
// shows the finished state of each step, and the step tabs still work.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Icon, IconBadge, type IconName } from "@/components/case-study/icons";

const PLACES: { icon: IconName; place: string; label: string; saves: string[] }[] = [
  { icon: "film", place: "Instagram Saved", label: "Reels", saves: ["Cover letter tips", "Paneer recipe", "Excel shortcut"] },
  { icon: "image", place: "Camera roll", label: "Slides", saves: ["Tech PM casing slide", "Good interview slide", "Class notes"] },
  { icon: "chat", place: "WhatsApp to myself", label: "Links", saves: ["FedEx internship", "Coffee chat notes", "BCBSM internship"] },
];

const TICK_MS = 400;
// Ticks where each step starts, and the last tick before the loop restarts.
const STEPS = [
  { name: "Save", start: 0, end: 11 },
  { name: "Forget", start: 12, end: 19 },
  { name: "Search", start: 20, end: 36 },
];
const LAST = STEPS[2].end;
const SEARCH_DONE = 32;
const MAX_FILLERS = 12;

export function SaveStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => setTick((t) => (t >= LAST ? 0 : t + 1)), TICK_MS);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);

  // Reduced motion: show each step finished, starting on the last one.
  const shown = reduceMotion ? (tick === 0 ? SEARCH_DONE : tick) : tick;
  const step = STEPS.findIndex((s) => shown <= s.end);

  const savesShown = Math.min(shown, 9);
  const fillers = Math.max(0, Math.min((shown - 11) * 3, MAX_FILLERS));
  const searching = step === 2;
  const found = shown >= SEARCH_DONE;
  const minutes = Math.min(Math.round(((shown - 20) * 25) / 12), 25);
  const scanning = searching && !found ? Math.floor((shown - 20) / 2) % 3 : -1;

  const jump = (i: number) => setTick(reduceMotion ? (i === 2 ? SEARCH_DONE : STEPS[i].end) : STEPS[i].start);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">Where my saves went to die</p>
        <p className="inline-flex items-center gap-2 rounded-pill bg-[#fbeee9] px-3.5 py-1.5 text-sm font-bold text-[#b4441a]">
          <span className="h-2 w-2 rounded-full bg-[#e0582a]" aria-hidden />
          Before Backpocket
        </p>
      </div>

      {/* Step tabs, each with a progress line like a story */}
      <div className="mt-5 grid grid-cols-3 gap-2" role="tablist" aria-label="Steps">
        {STEPS.map((s, i) => {
          const progress = i < step ? 1 : i > step ? 0 : (shown - s.start) / (s.end - s.start);
          return (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={i === step}
              onClick={() => jump(i)}
              className="text-left"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-black/[0.08]">
                <span
                  className="block h-full rounded-full bg-purple-600 transition-[width] duration-[400ms] ease-linear"
                  style={{ width: `${(reduceMotion ? (i <= step ? 1 : 0) : progress) * 100}%` }}
                />
              </span>
              <span className={`mt-2 block text-sm font-semibold ${i === step ? "text-purple-600" : "text-ink-52"}`}>
                {i + 1}. {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* What this step means, in one line */}
      <div className="mt-4 flex min-h-[64px] flex-wrap items-end justify-between gap-x-4 gap-y-2" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step === 2 ? (found ? "found" : "search") : step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && <Headline big="Seconds" small="to save it" />}
            {step === 1 && <Headline big="Weeks" small="of never opening it" icon={<Clock spin={!reduceMotion} />} />}
            {step === 2 && !found && <Headline big={`${Math.max(minutes, 0)} min`} small="of scrolling, looking for one slide" />}
            {step === 2 && found && (
              <Headline big="10 to 30 minutes" small="to find it again, if I found it at all" warn />
            )}
          </motion.div>
        </AnimatePresence>
        <motion.p
          className="inline-flex items-center gap-2 rounded-pill border border-black/10 bg-white px-3 py-1.5 text-sm text-ink-70 shadow-sm"
          animate={{ opacity: searching ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden={!searching}
        >
          <Icon name="search" className="h-4 w-4" /> that interview slide from class?
        </motion.p>
      </div>

      {/* The three places, filling up and then burying what matters */}
      <div className="mt-4 grid h-64 grid-cols-3 grid-rows-[minmax(0,1fr)] gap-2 md:h-72 md:gap-3">
        {PLACES.map((p, col) => (
          <div
            key={p.place}
            className={`relative flex min-h-0 flex-col overflow-hidden rounded-card border bg-white p-2.5 shadow-sm transition-colors duration-300 md:p-3 ${
              scanning === col ? "border-purple-400 ring-2 ring-purple-400/30" : "border-black/10"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <IconBadge name={p.icon} />
              <p className="text-[13px] font-semibold leading-tight text-ink-80 md:text-sm">{p.place}</p>
            </div>
            {searching && !found && !reduceMotion ? (
              <ScrollPast saves={p.saves} speed={0.6 + col * 0.12} />
            ) : (
              <ul className="mt-3 flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
                <AnimatePresence initial={false}>
                  {Array.from({ length: fillers }, (_, i) => (
                    <motion.li
                      key={`filler-${i}`}
                      layout={!reduceMotion}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="h-7 shrink-0 rounded-md bg-black/[0.06]"
                      aria-hidden
                    />
                  ))}
                  {p.saves.map((save, row) =>
                    row * 3 + col < savesShown ? (
                      <motion.li
                        key={save}
                        layout={!reduceMotion}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step === 0 ? 1 : 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="shrink-0 truncate rounded-md bg-lavender px-2 py-1.5 text-[12px] font-medium text-purple-600 md:text-[13px]"
                      >
                        {save}
                      </motion.li>
                    ) : null,
                  )}
                </AnimatePresence>
              </ul>
            )}
            {/* A question mark where the save should be */}
            <AnimatePresence>
              {(scanning === col || found) && (
                <motion.span
                  key={found ? "lost" : "looking"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white font-display text-2xl font-bold shadow-md ring-1 ring-black/10 md:h-14 md:w-14 md:text-3xl ${
                    found ? "text-[#b4441a]" : "text-purple-600"
                  }`}
                  aria-hidden
                >
                  ?
                </motion.span>
              )}
            </AnimatePresence>
            {/* Fade the bottom, so buried saves drop out of sight */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Headline({ big, small, warn, icon }: { big: string; small: string; warn?: boolean; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <p>
        <span className={`block font-numeric text-2xl font-bold tabular-nums md:text-3xl ${warn ? "text-[#b4441a]" : "text-ink"}`}>
          {big}
        </span>
        <span className="text-sm text-ink-60">{small}</span>
      </p>
    </div>
  );
}

/** A clock whose hands race, for weeks going by. */
function Clock({ spin }: { spin: boolean }) {
  const hand = (length: number, seconds: number) => (
    <motion.line
      x1="20"
      y1="20"
      x2="20"
      y2={20 - length}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ transformBox: "view-box", transformOrigin: "20px 20px" }}
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ duration: seconds, ease: "linear", repeat: Infinity }}
    />
  );
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11 shrink-0 text-purple-600 md:h-12 md:w-12" aria-hidden>
      <circle cx="20" cy="20" r="17" fill="white" stroke="currentColor" strokeWidth="2.5" />
      {hand(8, 6)}
      {hand(12, 0.6)}
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

/** One place scrolling past fast, with the saves flashing by in the clutter. */
function ScrollPast({ saves, speed }: { saves: string[]; speed: number }) {
  const strip = (copy: number) => (
    <div key={copy} className="flex flex-col gap-1.5 pb-1.5">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
        i % 3 === 1 ? (
          <span key={i} className="truncate rounded-md bg-lavender/60 px-2 py-1.5 text-[12px] font-medium text-purple-600/50 md:text-[13px]">
            {saves[(i - 1) / 3]}
          </span>
        ) : (
          <span key={i} className="h-7 shrink-0 rounded-md bg-black/[0.06]" />
        ),
      )}
    </div>
  );
  return (
    <div className="mt-3 min-h-0 flex-1 overflow-hidden" aria-hidden>
      <motion.div animate={{ y: ["0%", "-50%"] }} transition={{ duration: speed, ease: "linear", repeat: Infinity }}>
        {strip(0)}
        {strip(1)}
      </motion.div>
    </div>
  );
}
