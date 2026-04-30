"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  active?: boolean;
  className?: string;
};

/**
 * Refined monogram avatar — dark ink disc with serif "e",
 * subtle amber pulse when active. No 3D, no gloss, no candy.
 */
export function ExpeOrb({ size = 28, active = false, className }: Props) {
  const fontSize = Math.round(size * 0.58);
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center flex-shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label="Expe"
    >
      {active && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-amber/35"
            animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-amber/35"
            animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.9,
            }}
          />
        </>
      )}
      <span
        className="absolute inset-0 rounded-full bg-ink-900 ring-1 ring-ink-800"
        aria-hidden
      />
      {/* Tiny amber 'live' dot */}
      <span
        aria-hidden
        className={cn(
          "absolute rounded-full bg-amber",
          active && "animate-breathe",
        )}
        style={{
          width: Math.max(3, size * 0.13),
          height: Math.max(3, size * 0.13),
          top: size * 0.14,
          right: size * 0.14,
          boxShadow: active ? "0 0 6px rgba(255,199,44,0.7)" : "none",
        }}
      />
      <span
        className="relative font-display leading-none text-cream-50 select-none"
        style={{ fontSize, marginTop: -size * 0.02 }}
      >
        e
      </span>
    </span>
  );
}
