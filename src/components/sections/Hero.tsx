"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const HelixField = dynamic(() => import("@/components/visuals/HelixField"), {
  ssr: false,
});

const LINE_ONE = ["Disease", "is", "a", "map."];
const LINE_TWO = ["We", "write", "the", "route."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const helix = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-hero]", { opacity: 1, y: 0, clearProps: "filter" });
        return;
      }

      const words = el.querySelectorAll(".hero-word span");
      gsap.set(words, { yPercent: 120, rotateX: 18 });
      gsap.set("[data-hero-eyebrow], [data-hero-copy], [data-hero-cta], [data-hero-stat]", { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
      )
        .fromTo(
          words,
          { yPercent: 120, rotateX: 18 },
          { yPercent: 0, rotateX: 0, duration: 1, stagger: 0.07 },
          0.12,
        )
        .fromTo(
          "[data-hero-copy]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.45,
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.62,
        )
        .fromTo(
          "[data-hero-stat]",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.78,
        );

      if (helix.current) {
        gsap.to(helix.current, {
          yPercent: 16,
          rotate: 4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }

      gsap.to("[data-hero-grid]", {
        backgroundPosition: "72px 72px",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <div data-hero-grid className="pointer-events-none absolute inset-0 grid-fade" />
      <div ref={helix} className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <HelixField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/20 lg:via-ink/70" />

      <Container className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-center pb-20">
        <p data-hero-eyebrow className="eyebrow">
          Living atlas · programmable therapy
        </p>
        <h1 className="display mt-6 max-w-3xl text-5xl leading-[0.95] text-bone sm:text-6xl lg:text-7xl" style={{ perspective: 900 }}>
          <span className="block">
            {LINE_ONE.map((word) => (
              <span key={word} className="hero-word mr-[0.22em] inline-block overflow-hidden align-bottom">
                <span className="inline-block will-change-transform">{word}</span>
              </span>
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((word) => (
              <span key={word} className="hero-word mr-[0.22em] inline-block overflow-hidden align-bottom">
                <span className="inline-block will-change-transform">{word}</span>
              </span>
            ))}
          </span>
        </h1>
        <p data-hero-copy className="mt-7 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
          Nexora reconstructs living systems from organism to molecule, then designs in-vivo
          programs that reach the cell that actually drives pathology.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <span data-hero-cta>
            <Button href="#platform">Explore the Atlas Engine</Button>
          </span>
          <span data-hero-cta>
            <Button href="#partner" variant="ghost">
              Request a briefing
            </Button>
          </span>
        </div>

        <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
          {[
            ["12µm", "spatial pitch"],
            ["4.8B", "cell states"],
            ["11", "closed loops"],
          ].map(([stat, label]) => (
            <div data-hero-stat key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-mono text-sm tracking-widest text-phosphor">{stat}</dd>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
