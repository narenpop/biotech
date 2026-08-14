"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const SCALES = [
  {
    id: "organism",
    label: "Organism",
    copy: "Whole-body occupancy maps show where a candidate travels, where it stalls, and which organs quietly absorb off-target payload.",
  },
  {
    id: "organ",
    label: "Organ",
    copy: "Vascular and stromal architecture is reconstructed as a living graph — not a slice — so delivery routes can be rewritten before synthesis.",
  },
  {
    id: "tissue",
    label: "Tissue",
    copy: "Neighborhoods of inflammation, fibrosis, and immune exclusion become coordinates the Atlas Engine can target with spatial programs.",
  },
  {
    id: "cell",
    label: "Cell",
    copy: "Single-cell identity, state, and neighborhood are fused so we treat the cell that drives pathology, not the tissue that merely hosts it.",
  },
  {
    id: "molecule",
    label: "Molecule",
    copy: "Transcript, epitope, and trafficking signals collapse into a writable recipe: ligand, payload, and release logic in one loop.",
  },
] as const;

export function AtlasDial() {
  const root = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState<(typeof SCALES)[number]["id"]>("cell");
  const current = SCALES.find((s) => s.id === active) ?? SCALES[3];

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-ring]", {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
      });
      gsap.to("[data-ring-mid]", {
        rotate: -360,
        duration: 36,
        ease: "none",
        repeat: -1,
      });
      gsap.to("[data-atlas-glow]", {
        scale: 1.25,
        opacity: 0.9,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  function select(id: (typeof SCALES)[number]["id"]) {
    setActive(id);
    const copy = copyRef.current;
    if (!copy || prefersReducedMotion()) return;
    gsap.fromTo(copy, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
  }

  return (
    <div ref={root} className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div data-ring className="absolute inset-[8%] rounded-full border border-bone/10" />
        <div data-ring-mid className="absolute inset-[22%] rounded-full border border-dashed border-phosphor/25" />
        <div data-ring className="absolute inset-[38%] rounded-full border border-aqua/20" />
        <div
          data-atlas-glow
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor/15 blur-2xl"
        />
        <svg viewBox="0 0 400 400" className="relative h-full w-full" role="img" aria-label="Interactive biological scale atlas">
          {SCALES.map((scale, index) => {
            const angle = (index / SCALES.length) * Math.PI * 2 - Math.PI / 2;
            const r = 148;
            const x = 200 + Math.cos(angle) * r;
            const y = 200 + Math.sin(angle) * r;
            const selected = scale.id === active;
            return (
              <g key={scale.id}>
                <line
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke={selected ? "#c8f24a" : "rgba(244,238,228,0.16)"}
                  strokeWidth={selected ? 1.4 : 1}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 11 : 7}
                  fill={selected ? "#c8f24a" : "#0d1c16"}
                  stroke={selected ? "#c8f24a" : "#7de8d0"}
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  onClick={() => select(scale.id)}
                />
              </g>
            );
          })}
          <circle cx="200" cy="200" r="26" fill="#c8f24a" />
          <text x="200" y="205" textAnchor="middle" fontSize="11" fill="#07110e" fontFamily="ui-monospace, monospace">
            ATLAS
          </text>
        </svg>
      </div>

      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Biological scales">
          {SCALES.map((scale) => {
            const selected = scale.id === active;
            return (
              <button
                key={scale.id}
                role="tab"
                aria-selected={selected}
                onClick={() => select(scale.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs tracking-[0.14em] uppercase transition-colors ${
                  selected
                    ? "border-phosphor bg-phosphor text-ink"
                    : "border-bone/15 text-sand hover:border-phosphor/50"
                }`}
              >
                {scale.label}
              </button>
            );
          })}
        </div>
        <p ref={copyRef} className="mt-6 max-w-md text-lg leading-relaxed text-sand">
          {current.copy}
        </p>
      </div>
    </div>
  );
}
