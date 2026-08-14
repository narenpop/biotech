"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-foot-mark] > span > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="overflow-hidden border-t border-line py-12">
      <Container>
        <p data-foot-mark className="display hidden text-[18vw] leading-[0.8] text-bone/10 sm:block" aria-hidden="true">
          {"NEXORA".split("").map((letter) => (
            <span key={letter} className="inline-block overflow-hidden align-top">
              <span className="inline-block">{letter}</span>
            </span>
          ))}
        </p>
      </Container>
      <Container className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm tracking-[0.28em] uppercase text-bone">Nexora</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A living atlas for programmable therapeutics. Built in Basel, Cambridge, and Kyoto.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] text-sand">
          <a href="#science" className="hover:text-phosphor">
            Science
          </a>
          <a href="#platform" className="hover:text-phosphor">
            Platform
          </a>
          <a href="#partner" className="hover:text-phosphor">
            Partnerships
          </a>
          <a href="mailto:alliances@nexora.bio" className="hover:text-phosphor">
            alliances@nexora.bio
          </a>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-2 text-[11px] tracking-[0.12em] uppercase text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Nexora Biosciences</p>
        <p>For partners and patients. Not a medical device.</p>
      </Container>
    </footer>
  );
}
