"use client";

import { motion } from "framer-motion";

/**
 * Handwritten aside with a hand-drawn arrow that draws itself in when the
 * note scrolls into view.
 */
export function MarginNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.4 }}
      className={`flex items-end gap-1.5 font-hand text-lg leading-none text-purple-600 md:text-xl ${className}`}
    >
      <span className="-rotate-2">{children}</span>
      <svg width="34" height="32" viewBox="0 0 42 40" fill="none" aria-hidden className="shrink-0">
        <motion.path
          d="M6 4 C 18 6, 30 14, 30 34 M30 34 L 23 27 M30 34 L 36 26"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </motion.p>
  );
}
