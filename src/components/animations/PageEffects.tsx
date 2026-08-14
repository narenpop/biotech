"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId, useIsoLayoutEffect } from "@/lib/gsap";

export function PageEffects() {
  const progress = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const bar = progress.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "max",
          scrub: 0.35,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href^='#']");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      scrollToId(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const ring = cursor.current;
    const dot = cursorDot.current;
    if (!ring || !dot) return;
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      ring.style.display = "none";
      dot.style.display = "none";
      return;
    }

    document.body.classList.add("has-gsap-cursor");
    const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    const down = () => gsap.to(ring, { scale: 0.72, duration: 0.2 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.25 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.body.classList.remove("has-gsap-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        ref={progress}
        className="pointer-events-none fixed top-0 left-0 z-[70] h-[2px] w-full origin-left bg-phosphor"
        aria-hidden="true"
      />
      <div
        ref={cursor}
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-phosphor/70 mix-blend-difference lg:block"
        aria-hidden="true"
      />
      <div
        ref={cursorDot}
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor mix-blend-difference lg:block"
        aria-hidden="true"
      />
    </>
  );
}
