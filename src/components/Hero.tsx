"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HeroIllustration } from "@/components/HeroIllustration";
import { RESUME } from "@/content/site";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <motion.section
      aria-labelledby="hero-title"
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16 md:pb-24 lg:px-8"
    >
      <motion.p variants={item} className="font-display text-lg sm:text-xl">
        Hi! I&rsquo;m Snigdha{" "}
        <motion.span
          aria-hidden
          className="inline-block origin-[70%_70%]"
          animate={{ rotate: [0, 16, -8, 16, 0] }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        >
          👋🏻
        </motion.span>
      </motion.p>

      <motion.h1
        id="hero-title"
        variants={item}
        className="mt-2 font-display text-[40px] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[60px] lg:leading-none"
      >
        I turn data into products that{" "}
        <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent sm:block">
          move metrics.
        </span>
      </motion.h1>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-center md:gap-10">
        <motion.figure variants={item} className="md:col-span-5">
          <HeroIllustration />
        </motion.figure>

        <div className="space-y-6 text-lg leading-relaxed text-ink-80 md:col-span-7 md:text-xl">
          <motion.p variants={item}>
            Product manager with a background in analytics and
            entrepreneurship, and 7 years of experience across both. I started a business, then took
            that same instinct for spotting gaps and fixing them into
            quick-commerce at scale.
            <br />
            I&rsquo;m drawn to ambiguous problems. The ones where the structure
            isn&rsquo;t obvious yet, and building it is the whole challenge.
          </motion.p>

          <motion.p variants={item}>
            MBA candidate at UNC Kenan-Flagler, Class of 2028.
          </motion.p>

          <motion.p variants={item} className="font-semibold text-ink">
            Open to product, strategy, and growth roles.{" "}
            <span aria-hidden>✨</span>
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-4 text-xl font-semibold text-ink md:text-2xl"
          >
            <Link
              href="/work"
              className="group transition-colors hover:text-purple-600"
            >
              View Projects{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                ➙
              </span>
            </Link>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="group transition-colors hover:text-purple-600"
            >
              View Resume{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                ➙
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
