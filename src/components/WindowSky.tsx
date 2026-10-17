"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const SRC = "/images/hero-window.mp4";

/**
 * Invisible hotspot over the illustration's window pane. Hovering it (or
 * tapping on touch screens) softly fades the sky in as a full-screen
 * background behind the page content; leaving fades it back out. Opacity
 * only, so there is no zoom or wipe, just a dissolve.
 */
export function WindowSky({
  syncFrom,
  onChange,
}: {
  syncFrom?: () => HTMLVideoElement | null;
  onChange?: (open: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hotspotRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // The background layer mounts on first hover and stays, so it can fade both ways.
  const [ready, setReady] = useState(false);

  const show = () => {
    setReady(true);
    setOpen(true);
    onChange?.(true);
  };
  const hide = () => {
    setOpen(false);
    onChange?.(false);
  };

  // Warm up: mount (and start loading) the background sky as soon as the
  // pointer enters the illustration, so it's ready by the time it reaches the window.
  useEffect(() => {
    const figure = hotspotRef.current?.parentElement;
    if (!figure) return;
    const warm = () => setReady(true);
    figure.addEventListener("pointerenter", warm, { once: true });
    return () => figure.removeEventListener("pointerenter", warm);
  }, []);

  // Start the big sky where the small window sky is, so the two match.
  useEffect(() => {
    const big = videoRef.current;
    if (!big) return;
    if (open) {
      const small = syncFrom?.();
      if (small) big.currentTime = small.currentTime;
      big.play().catch(() => {});
    } else {
      const t = setTimeout(() => big.pause(), 900);
      return () => clearTimeout(t);
    }
  }, [open, syncFrom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    const onScroll = () => hide();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
    // hide only closes over setters and the onChange prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={hotspotRef}
        type="button"
        aria-label="Look out the window"
        aria-pressed={open}
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onClick={() => (open ? hide() : show())}
        className="absolute z-10 top-[8.66%] left-[50.37%] h-[65.8%] w-[30%] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      />
      {ready &&
        createPortal(
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <video
              ref={videoRef}
              src={SRC}
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
            {/* Soft wash keeps body text readable over the clouds */}
            <div className="absolute inset-0 bg-white/30" />
          </motion.div>,
          document.body,
        )}
    </>
  );
}
