"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "primary"
      ? "bg-phosphor text-ink hover:brightness-110"
      : "border border-bone/20 bg-transparent text-bone hover:border-phosphor/60 hover:text-phosphor";

  const inner = (
    <span className="inline-flex items-center gap-2 text-[0.8rem] font-medium tracking-[0.08em] uppercase">
      {children}
    </span>
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `inline-flex items-center justify-center rounded-full px-6 py-3.5 transition-[filter,border-color,color] duration-300 ${styles} ${className}`,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
