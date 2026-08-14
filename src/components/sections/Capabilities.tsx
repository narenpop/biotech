"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const CAPABILITIES = [
  {
    title: "Spatial therapeutics",
    body: "Design programs that ignite only inside defined tissue neighborhoods — inflamed synovium, hypoxic tumor core, demyelinating plaque.",
    tag: "Design",
  },
  {
    title: "Partner candidate interrogation",
    body: "Bring a modality. We map where it actually goes, which cells it touches, and how to retarget it before the next GMP run.",
    tag: "Alliances",
  },
  {
    title: "Immune cartography",
    body: "Track exhausted, regulatory, and effector states as a moving weather system rather than a single IHC snapshot.",
    tag: "Immunology",
  },
  {
    title: "Delivery rewrite",
    body: "Swap tropism, linker chemistry, and release timers against live occupancy data until the payload prefers the driver cell.",
    tag: "CMC",
  },
];

export function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cap-row]",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cap-list]", start: "top 80%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  function enter(index: number, node: HTMLLIElement) {
    setHover(index);
    if (prefersReducedMotion()) return;
    gsap.to(node, { x: 12, duration: 0.35, ease: "power3.out" });
    const rule = node.querySelector("[data-cap-rule]");
    if (rule) gsap.to(rule, { scaleX: 1, duration: 0.45, ease: "power3.out" });
  }

  function leave(node: HTMLLIElement) {
    setHover(null);
    if (prefersReducedMotion()) return;
    gsap.to(node, { x: 0, duration: 0.4, ease: "power3.out" });
    const rule = node.querySelector("[data-cap-rule]");
    if (rule) gsap.to(rule, { scaleX: 0, duration: 0.3, ease: "power2.in" });
  }

  return (
    <section ref={root} id="capabilities" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 className="display mt-4 max-w-2xl text-4xl leading-[1.05] text-bone sm:text-5xl">
            What we build with — and for — you.
          </h2>
        </Reveal>

        <ul data-cap-list className="mt-14 divide-y divide-line border-y border-line">
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.title}
              data-cap-row
              onMouseEnter={(e) => enter(index, e.currentTarget)}
              onMouseLeave={(e) => leave(e.currentTarget)}
              onFocus={(e) => enter(index, e.currentTarget)}
              onBlur={(e) => leave(e.currentTarget)}
              className="group relative"
            >
              <span
                data-cap-rule
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-phosphor"
              />
              <button
                type="button"
                className="grid w-full grid-cols-1 gap-3 py-8 text-left sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-8"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-phosphor">
                  {item.tag}
                </span>
                <span>
                  <span className="display block text-2xl text-bone transition-colors group-hover:text-phosphor sm:text-3xl">
                    {item.title}
                  </span>
                  <span
                    className={`mt-2 block max-w-xl text-sm leading-relaxed text-sand transition-opacity duration-300 ${
                      hover === index ? "opacity-100" : "opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                    }`}
                  >
                    {item.body}
                  </span>
                </span>
                <span className="hidden font-mono text-xs text-muted sm:block">0{index + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
