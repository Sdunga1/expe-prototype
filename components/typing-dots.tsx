"use client";

import { motion } from "motion/react";

export function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-2.5 rounded-2xl bg-ink-100">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-ink-500"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
