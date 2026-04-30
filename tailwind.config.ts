import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        cream: {
          50: "#FBF9F5",
          100: "#F5F1E9",
          200: "#EDE6D6",
        },
        ink: {
          900: "#0E0F0C",
          800: "#1A1B17",
          700: "#2A2B26",
          600: "#3D3E37",
          500: "#5A5B53",
          400: "#7C7D74",
          300: "#A8A99F",
          200: "#D2D2C9",
          100: "#E8E7DF",
        },
        amber: {
          DEFAULT: "#FFC72C",
          deep: "#E8A800",
          soft: "#FFF1B8",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,20,15,0.04), 0 8px 24px -12px rgba(20,20,15,0.10)",
        lift: "0 2px 4px rgba(20,20,15,0.06), 0 16px 40px -16px rgba(20,20,15,0.18)",
        amber: "0 0 0 4px rgba(255,199,44,0.15)",
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        breathe: "breathe 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
} satisfies Config;
