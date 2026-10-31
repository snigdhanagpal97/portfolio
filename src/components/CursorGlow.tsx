"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SPRING = { stiffness: 220, damping: 30, mass: 0.6 };

/**
 * A very faint purple glow that follows the mouse on every page. Mouse only,
 * since a touch screen has no cursor. Follows exactly under reduced motion.
 */
export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);
  const smoothY = useSpring(y, SPRING);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    let placed = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Start at the cursor rather than gliding in from the corner.
      if (!placed) {
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        placed = true;
      }
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, smoothX, smoothY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed -top-40 -left-40 z-[60] h-80 w-80 rounded-full"
      style={{
        x: reduceMotion ? x : smoothX,
        y: reduceMotion ? y : smoothY,
        background: "radial-gradient(circle, rgb(129 99 212 / 0.09), transparent 68%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}
