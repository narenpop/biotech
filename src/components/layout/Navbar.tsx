"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const LINKS = [
  { href: "#science", label: "Science" },
  { href: "#platform", label: "Platform" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#impact", label: "Impact" },
];

export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  useIsoLayoutEffect(() => {
    const el = header.current;
    if (!el) return;

    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (prefersReducedMotion()) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    let hidden = false;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const shouldHide = !openRef.current && self.direction === 1 && self.scroll() > 90;
          if (shouldHide === hidden) return;
          hidden = shouldHide;
          gsap.to(el, { y: shouldHide ? -96 : 0, duration: 0.42, ease: "power3.out", overwrite: true });
        },
      });
    }, el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const el = header.current;
    if (el && open) gsap.to(el, { y: 0, duration: 0.3, overwrite: true });
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useIsoLayoutEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-mobile-nav]", { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 });
      gsap.fromTo(
        "[data-mobile-link]",
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.04 },
      );
    }, header);
    return () => ctx.revert();
  }, [open]);

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Nexora home">
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-phosphor/50">
            <span className="h-2 w-2 rounded-full bg-phosphor" />
          </span>
          <span className="text-sm tracking-[0.28em] uppercase text-bone">Nexora</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.16em] uppercase text-sand transition-colors hover:text-phosphor"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#partner" className="!px-5 !py-2.5">
            Partner
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-4 bg-bone transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-bone transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" data-mobile-nav className="border-t border-line bg-ink md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                data-mobile-link
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-bone"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#partner"
              data-mobile-link
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-fit rounded-full bg-phosphor px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink"
            >
              Partner
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
