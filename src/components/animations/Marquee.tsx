"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const ITEMS = [
  "Whole-body occupancy",
  "Single-cell identity",
  "Spatial programs",
  "Closed-loop design",
  "In-vivo cartography",
  "Ligand rewrite",
  "Immune weather",
  "StrandWrite",
];

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div ref={track} className="flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.28em] text-sand">
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-phosphor" />
          </span>
        ))}
      </div>
    </div>
  );
}
