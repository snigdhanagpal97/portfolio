"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

// From reference/testimonials.md (typo fixed, approved).
const QUOTES = [
  {
    lead: "Snigdha is one of the most product-minded and customer-centric analysts I’ve worked with.",
    rest: "She brings sharp thinking, strong ownership, and a clear bias for impact across everything she works on.",
    title: "Associate Director",
    company: "Blinkit",
  },
  {
    lead: "Snigdha was amazing for us.",
    rest: "She has a strong ability to connect data with business decisions. She is dependable, thoughtful, and consistently focused on driving meaningful outcomes.",
    title: "GM - Platform Operations",
    company: "Noon Minutes",
  },
  {
    lead: "Snigdha brings clarity to ambiguity, strong ownership, and a sharp analytical mindset. She consistently turns insight into action.",
    rest: "We saw real improvement in wastages and our instock metrics after using her demand forecasting, ordering & allocation frameworks for perishables.",
    title: "Senior Instock Manager",
    company: "Noon Minutes",
  },
  {
    lead: "Snigdha was my go-to analyst on high-stakes initiatives and consistently set the pace for peers.",
    rest: "Her ability to translate vague or noisy signals into crisp problem statements, to design mechanisms that outlive her, and to move peers and senior operators without formal authority is what sets her apart.",
    title: "VP",
    company: "Blinkit",
  },
];

const DURATION = 8000; // ms each quote stays up
const TICK = 50;

/**
 * One featured quote at a time. Quotes crossfade on a timer; a progress bar
 * under each name shows how long until the next. Hover or focus pauses it,
 * clicking a name jumps to that quote. No auto-advance for reduced motion.
 */
export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [{ index, elapsed }, setState] = useState({ index: 0, elapsed: 0 });
  const [paused, setPaused] = useState(false);
  const auto = !reduceMotion;

  useEffect(() => {
    if (!auto || paused) return;
    const id = setInterval(() => {
      setState((s) =>
        s.elapsed + TICK >= DURATION
          ? { index: (s.index + 1) % QUOTES.length, elapsed: 0 }
          : { ...s, elapsed: s.elapsed + TICK },
      );
    }, TICK);
    return () => clearInterval(id);
  }, [auto, paused]);

  const select = (i: number) => setState({ index: i, elapsed: 0 });

  const q = QUOTES[index];

  return (
    <section aria-labelledby="testimonials-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="testimonials-title"
            className="font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
          >
            What colleagues say about me
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12 md:mt-14">
          <PeekingCat />
          <div
            className="relative grid gap-8 rounded-panel border border-black/10 bg-white p-6 md:grid-cols-12 md:gap-12 md:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* The quote */}
            <figure className="relative min-h-[300px] md:col-span-8 md:min-h-[280px]">
              <span
                aria-hidden
                className="block font-display text-7xl font-bold leading-[0.6] text-purple-600"
              >
                &ldquo;
              </span>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  aria-live="polite"
                  className="mt-6"
                >
                  <p className="font-display text-2xl font-bold leading-snug md:text-[28px]">
                    {q.lead}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink-70 md:text-lg">
                    {q.rest}
                  </p>
                  <footer className="mt-6 text-base">
                    <span className="font-semibold">{q.title}</span>
                    <span className="text-purple-600"> @{q.company}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </figure>

            {/* Who said it: pick a colleague; the bar shows time to the next quote */}
            <ol className="grid grid-cols-2 gap-x-4 gap-y-5 md:col-span-4 md:grid-cols-1 md:content-center md:gap-y-6">
              {QUOTES.map((item, i) => {
                const active = i === index;
                const fill = active ? (auto ? elapsed / DURATION : 1) : 0;
                return (
                  <li key={item.title + item.company}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={active ? "true" : undefined}
                      className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600 rounded-sm"
                    >
                      <span className="block h-0.5 w-full overflow-hidden rounded-full bg-black/10">
                        <span
                          className="block h-full origin-left rounded-full bg-purple-600"
                          style={{ transform: `scaleX(${fill})` }}
                        />
                      </span>
                      <span
                        className={`mt-3 block text-sm font-semibold transition-colors md:text-base ${
                          active ? "text-ink" : "text-ink-52 group-hover:text-ink-80"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`block text-sm transition-colors ${
                          active ? "text-purple-600" : "text-ink-52"
                        }`}
                      >
                        @{item.company}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A tiny line-art cat peeking over the top edge of the quote card. It sits
 * behind the card, rises into view once, and blinks now and then.
 */
function PeekingCat() {
  const reduceMotion = useReducedMotion();
  const blink = { duration: 6, times: [0, 0.8, 0.82, 0.9, 0.92, 1], repeat: Infinity, ease: "linear" as const };
  return (
    <motion.svg
      viewBox="0 0 64 34"
      aria-hidden
      className="absolute right-10 bottom-full -mb-2 w-14 md:right-24 md:w-16"
      fill="none"
      stroke="#111"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduceMotion ? false : { y: 18 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.3, 1.3, 0.5, 1] }}
    >
      <path
        d="M13 34 C13 21 17 14 21 11 L19 2.5 Q19 1.5 20 2 L28 8 C30.5 7.4 33.5 7.4 36 8 L44 2 Q45 1.5 45 2.5 L43 11 C47 14 51 21 51 34"
        fill="#fff"
      />
      <path d="M22 6.5 L23.5 10 M42 6.5 L40.5 10" strokeWidth={1.4} />
      <motion.g animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0, 1, 1] }} transition={blink}>
        <path d="M24.5 21 Q27 18.5 29.5 21 M34.5 21 Q37 18.5 39.5 21" strokeWidth={1.8} />
      </motion.g>
      <motion.g
        fill="#111"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: [0, 0, 1, 1, 0, 0] }}
        transition={blink}
      >
        <ellipse cx="27" cy="20" rx="1.7" ry="2.1" />
        <ellipse cx="37" cy="20" rx="1.7" ry="2.1" />
      </motion.g>
      <path d="M31 24.2 L33 24.2 L32 25.5 Z" fill="#111" strokeWidth={1} />
      <path d="M30 27 Q31 28 32 26.6 Q33 28 34 27" strokeWidth={1.2} />
      <path d="M20 25 L11 24 M20 27.5 L11 28.5 M44 25 L53 24 M44 27.5 L53 28.5" strokeWidth={1} />
    </motion.svg>
  );
}
