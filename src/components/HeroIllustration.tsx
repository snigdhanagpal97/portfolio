"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SKY_POSTER, WindowSky } from "@/components/WindowSky";

export function HeroIllustration() {
  const reduceMotion = useReducedMotion();
  const skyRef = useRef<HTMLVideoElement>(null);
  const [skyOpen, setSkyOpen] = useState(false);

  // Browsers may skip or pause autoplay (hidden tab, fade-in, offscreen), so
  // play the window sky whenever it's on screen and pause it when it isn't.
  useEffect(() => {
    const v = skyRef.current;
    if (!v) return;
    if (reduceMotion) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div className="relative">
      {/* The window pane is see-through; the sky video plays behind it */}
      <div
        className={`absolute top-[8.66%] left-[50.37%] h-[65.8%] w-[30%] overflow-hidden transition-opacity duration-[900ms] ${
          skyOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={skyRef}
          src="/images/hero-window.mp4"
          poster={SKY_POSTER}
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className="h-full w-full object-cover"
        />
      </div>
      <Image
        src="/images/hero-illustration-live.png"
        alt="Line drawing of Snigdha working on a laptop by a window, with a cat beside her"
        width={937}
        height={693}
        preload
        sizes="(min-width: 768px) 42vw, 100vw"
        className={`relative h-auto w-full transition-opacity duration-[900ms] ${skyOpen ? "opacity-0" : "opacity-100"}`}
      />
      {/* While the sky fills the background, crossfade to a cutout where only
          the wall is see-through; she, the laptop, the cat and the curtains stay white */}
      <Image
        src="/images/hero-illustration-cutout.png"
        alt=""
        aria-hidden
        width={937}
        height={693}
        sizes="(min-width: 768px) 42vw, 100vw"
        className={`absolute inset-0 h-auto w-full transition-opacity duration-[900ms] ${skyOpen ? "opacity-100" : "opacity-0"}`}
      />
      <CatDetails animate={!reduceMotion} />
      <WindowSky syncFrom={() => skyRef.current} onChange={setSkyOpen} />
    </div>
  );
}

/**
 * The cat's tail and eyes, lifted out of the illustration (see
 * hero-illustration-live.png) and redrawn in place so they can move: the
 * tail swishes slowly, and the happy closed eyes open for a slow blink every
 * few seconds. Static for reduced motion, so it matches the original drawing.
 */
function CatDetails({ animate }: { animate: boolean }) {
  const blink = { duration: 7, times: [0, 0.78, 0.8, 0.9, 0.92, 1], repeat: Infinity, ease: "linear" as const };
  return (
    <svg
      viewBox="0 0 937 693"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      stroke="#111"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "871px 622px" }}
        animate={animate ? { rotate: [0, -4, 1.5, -4, 0] } : undefined}
        transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      >
        <path
          d="M873 612 C886 614 897 624 899 638 C901 652 892 662 876 667 C858 672 830 671 814 668 C803 665 799 657 801 649 C802 643 807 640 815 640 C830 640 848 641 860 638 C865 637 869 635 871 632 L870 612 Z"
          fill="#fff"
          stroke="none"
        />
        <path
          d="M873 612 C886 614 897 624 899 638 C901 652 892 662 876 667 C858 672 830 671 814 668 C803 665 799 657 801 649 C802 643 807 640 815 640 C830 640 848 641 860 638 C865 637 869 635 871 632"
          strokeWidth={4.6}
        />
        <path d="M841 648 L839 658 M867 643 L872 651" strokeWidth={2.6} />
      </motion.g>

      {/* happy closed eyes */}
      <motion.g
        animate={animate ? { opacity: [1, 1, 0, 0, 1, 1] } : undefined}
        transition={blink}
      >
        <path d="M689.5 465 Q697 465.5 702.5 472.5" strokeWidth={4.4} />
        <path d="M728 476.5 Q739 468 751.5 474.5" strokeWidth={4.6} />
      </motion.g>
      {/* briefly open */}
      <motion.g
        fill="#111"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0, 1, 1, 0, 0] } : undefined}
        transition={blink}
      >
        <ellipse cx="696.5" cy="468" rx="4.2" ry="5" />
        <ellipse cx="740" cy="472.5" rx="4.2" ry="5" />
      </motion.g>
    </svg>
  );
}
