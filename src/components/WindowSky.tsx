"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const SRC = "/images/hero-window.mp4";
// A still of the same sky (100 KB vs 11 MB). It shows instantly, and stays
// if a phone won't play the video (e.g. iPhone Low Power Mode).
export const SKY_POSTER = "/images/hero-window-poster.jpg";

/**
 * Invisible hotspot over the illustration's window pane. Hovering it (or
 * tapping on touch screens) softly fades the sky in as a full-screen
 * background behind the page content; leaving fades it back out. Opacity
 * only, so there is no zoom or wipe, just a dissolve.
 *
 * Nothing changes until the still sky has loaded, so the window never
 * flashes white while the video is still downloading.
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
  const [wanted, setWanted] = useState(false); // hovered or tapped
  const [posterReady, setPosterReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // The background layer mounts on first interest and stays, so it can fade both ways.
  const [ready, setReady] = useState(false);
  const open = wanted && posterReady;

  // Load the still sky in the background as soon as the page is up.
  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterReady(true);
    img.src = SKY_POSTER;
  }, []);

  // Warm up: mount (and start loading) the video as soon as the pointer
  // enters the illustration, so it's ready by the time it reaches the window.
  useEffect(() => {
    const figure = hotspotRef.current?.parentElement;
    if (!figure) return;
    const warm = () => setReady(true);
    figure.addEventListener("pointerenter", warm, { once: true });
    return () => figure.removeEventListener("pointerenter", warm);
  }, []);

  // Tell the illustration to crossfade only once the sky can actually show.
  useEffect(() => {
    onChange?.(open);
  }, [open, onChange]);

  // Start the big sky where the small window sky is, so the two match.
  useEffect(() => {
    const big = videoRef.current;
    if (!big) return;
    if (wanted) {
      const small = syncFrom?.();
      if (small && small.readyState > 0) big.currentTime = small.currentTime;
      big.play().catch(() => {});
    } else {
      const t = setTimeout(() => big.pause(), 900);
      return () => clearTimeout(t);
    }
  }, [wanted, ready, syncFrom]);

  useEffect(() => {
    if (!wanted) return;
    const hide = () => setWanted(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    // Close on a real scroll, not the tiny nudges phones make after a tap.
    const startY = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - startY) > 120 && hide();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [wanted]);

  const show = () => {
    setReady(true);
    setWanted(true);
  };

  return (
    <>
      <button
        ref={hotspotRef}
        type="button"
        aria-label="Look out the window"
        aria-pressed={open}
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={(e) => e.pointerType === "mouse" && setWanted(false)}
        onClick={() => (wanted ? setWanted(false) : show())}
        className="absolute z-10 top-[8.66%] left-[50.37%] h-[65.8%] w-[30%] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      />
      {ready &&
        createPortal(
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${SKY_POSTER})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <video
              ref={videoRef}
              src={SRC}
              poster={SKY_POSTER}
              loop
              muted
              playsInline
              preload="auto"
              onPlaying={() => setVideoPlaying(true)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                videoPlaying ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Soft wash keeps body text readable over the clouds */}
            <div className="absolute inset-0 bg-white/30" />
          </motion.div>,
          document.body,
        )}
    </>
  );
}
