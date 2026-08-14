"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const PILLARS = [
  {
    index: "01",
    title: "See the system, not the slice",
    body: "Pathology is rarely local. Atlas Engine stitches occupancy, perfusion, and immune geography into one navigable volume so we stop guessing from biopsies.",
  },
  {
    index: "02",
    title: "Treat the cell that decides",
    body: "We isolate driver states — exhausted, senescent, fibrotic, invasive — and write ligands that prefer those neighborhoods over healthy tissue.",
  },
  {
    index: "03",
    title: "Close the loop overnight",
    body: "Each in-vivo run feeds StrandWrite. The next candidate is not a new hypothesis from a slide deck; it is a revision of evidence.",
  },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-pillar]",
        { y: 64, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-pillar-grid]", start: "top 78%" },
        },
      );

      gsap.fromTo(
        "[data-scan]",
        { yPercent: -120, opacity: 0.15 },
        {
          yPercent: 220,
          opacity: 0,
          duration: 2.4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1.2,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="science" className="relative overflow-hidden py-24 sm:py-32">
      <div
        data-scan
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-phosphor/20 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Innovation</p>
            <h2 className="display mt-4 max-w-md text-4xl leading-[1.05] text-bone sm:text-5xl">
              Biology wants context. We refuse to flatten it.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-lg leading-relaxed text-sand">
              Most discovery still collapses a living organism into a well plate. Nexora was
              founded to keep the organism intact — then resolve it until a single cell can be
              addressed without waking the rest of the body.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Our scientists, physicists, and systems engineers share one constraint: if we cannot
              watch a therapy arrive, engage, and leave, we do not ship it.
            </p>
          </Reveal>
        </div>

        <div
          data-pillar-grid
          className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3"
          style={{ perspective: "900px" }}
        >
          {PILLARS.map((pillar) => (
            <article key={pillar.index} data-pillar className="bg-forest p-8 sm:p-10">
              <p className="font-mono text-xs tracking-[0.2em] text-phosphor">{pillar.index}</p>
              <h3 className="display mt-6 text-2xl text-bone">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-sand">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
