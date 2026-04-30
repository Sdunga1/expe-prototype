"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Guest" },
  { href: "/host", label: "Host" },
  { href: "/reception", label: "Reception" },
];

export function DemoNav() {
  const pathname = usePathname();
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 rounded-full bg-ink-900/90 backdrop-blur px-1.5 py-1.5 shadow-lift">
        <span className="px-2.5 text-[11px] uppercase tracking-[0.14em] text-cream-50/60 font-mono">
          Expe demo
        </span>
        {links.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium transition",
                active
                  ? "bg-cream-50 text-ink-900"
                  : "text-cream-50/70 hover:text-cream-50",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
