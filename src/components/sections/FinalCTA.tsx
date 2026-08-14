"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (glow.current) {
        gsap.to(glow.current, {
          opacity: 0.85,
          scale: 1.12,
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      gsap.fromTo(
        "[data-cta-card]",
        { y: 48, opacity: 0, rotateX: 6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cta-card]", start: "top 82%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section ref={root} id="partner" className="relative overflow-hidden py-24 sm:py-32">
      <div
        ref={glow}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,242,74,0.16),transparent_55%)]"
      />
      <Container className="relative">
        <div
          data-cta-card
          className="grid gap-12 rounded-[2rem] border border-line bg-forest px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16"
          style={{ perspective: "1000px" }}
        >
          <Reveal>
            <p className="eyebrow">Partnerships</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] text-bone sm:text-5xl">
              Bring a modality. Leave with a map.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand">
              We brief scientific leadership in a ninety-minute session: one candidate, one
              organism, one atlas. If the geography is wrong, we rewrite it together.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {sent ? (
              <p className="rounded-2xl border border-phosphor/40 bg-ink/40 p-8 text-lg text-bone" role="status">
                Received. A scientist — not a sequencer — will reply within two working days.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-bone outline-none transition focus:border-phosphor"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
                    Work email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-bone outline-none transition focus:border-phosphor"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
                    What should we map?
                  </span>
                  <textarea
                    required
                    name="intent"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-line bg-ink/60 px-4 py-3 text-bone outline-none transition focus:border-phosphor"
                  />
                </label>
                <Button type="submit">Request a briefing</Button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
