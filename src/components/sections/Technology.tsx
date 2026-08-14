"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AtlasDial } from "@/components/visuals/AtlasDial";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export function Technology() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-atlas-panel]",
        { scale: 0.94, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-atlas-panel]", start: "top 82%" },
        },
      );

      gsap.fromTo(
        "[data-module]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-module-grid]", start: "top 85%" },
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to("[data-atlas-panel]", {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="platform" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">Research platform</p>
          <h2 className="display mt-4 max-w-2xl text-4xl leading-[1.05] text-bone sm:text-5xl">
            Five scales. One writable atlas.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand">
            Move through the Atlas Engine. Each ring is a resolution we can actually measure — and
            a layer we can program against.
          </p>
        </Reveal>
        <div
          data-atlas-panel
          className="mt-16 rounded-[2rem] border border-line bg-forest/70 p-6 sm:p-10"
        >
          <AtlasDial />
        </div>

        <div data-module-grid className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["PulseMap", "In-vivo occupancy and off-target heat in hours, not quarters."],
            ["Atlas Engine", "Multiscale reconstruction from whole organism to epitope."],
            ["StrandWrite", "Closed-loop design of ligands, payloads, and release logic."],
          ].map(([name, copy]) => (
            <article key={name} data-module className="rounded-2xl border border-line p-6">
              <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-aqua">{name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">{copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
