"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const STATS = [
  { value: 86, suffix: "%", label: "reduction in off-target occupancy vs. parental constructs" },
  { value: 19, suffix: "d", label: "median cycle from in-vivo map to redesigned candidate" },
  { value: 3, suffix: "", label: "internal programs in IND-enabling: autoimmunity, glioma, ALS" },
  { value: 42, suffix: "", label: "active alliance assays across nucleic acid and protein modalities" },
];

export function Impact() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stat-card]",
        { y: 56, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-stat-grid]", start: "top 80%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="impact" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">Impact</p>
          <h2 className="display mt-4 max-w-2xl text-4xl leading-[1.05] text-bone sm:text-5xl">
            Evidence, not theater.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-sand">
            Every number below is from closed-loop campaigns we can replay — occupancy volumes,
            cell-state shifts, and the candidates they produced.
          </p>
        </Reveal>

        <div data-stat-grid className="mt-16 grid gap-6 sm:grid-cols-2">
          {STATS.map((stat) => (
            <article
              key={stat.label}
              data-stat-card
              className="rounded-3xl border border-line bg-forest/50 p-8 sm:p-10"
            >
              <p className="display text-5xl text-phosphor sm:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand">{stat.label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
