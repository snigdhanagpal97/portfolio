"use client";

import { useReducedMotion } from "framer-motion";

/** Muted looping demo; shows controls instead of autoplaying for reduced motion. */
export function DemoVideo({ src, label, portrait = false }: { src: string; label: string; portrait?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <video
      src={src}
      aria-label={label}
      autoPlay={!reduceMotion}
      controls={!!reduceMotion}
      loop
      muted
      playsInline
      preload="metadata"
      className={
        portrait
          ? "h-[min(70vh,640px)] w-auto rounded-[28px] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)]"
          : "h-auto max-h-[80vh] w-full object-contain"
      }
    />
  );
}
