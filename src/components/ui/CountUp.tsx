"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export function CountUp({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const state = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        val: value,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.val).toLocaleString()}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
