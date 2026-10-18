"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Wraps a case study image so clicking it opens the full-resolution file,
 * filling the screen. Click anywhere or press Escape to close.
 */
export function Zoomable({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
      >
        {children}
        <span
          aria-hidden
          className="absolute top-3 right-3 rounded-pill bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-80 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Click to enlarge
        </span>
      </button>
      {open &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-black/80 p-4 md:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution original */}
                <img src={src} alt={alt} className="max-h-full max-w-full rounded-card bg-white object-contain" />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
