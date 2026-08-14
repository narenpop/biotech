"use client";

import { useEffect, useRef } from "react";

export default function HelixField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      t += reduce ? 0 : 0.012;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.52 + mouse.x * 28;
      const cy = height * 0.5 + mouse.y * 18;
      const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(200, 242, 74, 0.12)");
      glow.addColorStop(0.45, "rgba(125, 232, 208, 0.05)");
      glow.addColorStop(1, "rgba(7, 17, 14, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const turns = 7;
      const points = 160;
      const amp = Math.min(width, height) * 0.18;
      const length = height * 0.78;

      const drawStrand = (phase: number, color: string, widthLine: number) => {
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const p = i / points;
          const angle = p * Math.PI * 2 * turns + t + phase;
          const x = cx + Math.sin(angle) * amp * (0.55 + p * 0.55);
          const y = cy - length / 2 + p * length + Math.cos(t * 0.7 + p * 4) * 6;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = widthLine;
        ctx.stroke();
      };

      drawStrand(0, "rgba(200, 242, 74, 0.85)", 1.6);
      drawStrand(Math.PI, "rgba(125, 232, 208, 0.7)", 1.4);

      for (let i = 0; i < 18; i++) {
        const p = (i + 0.5) / 18;
        const angle = p * Math.PI * 2 * turns + t;
        const x1 = cx + Math.sin(angle) * amp * (0.55 + p * 0.55);
        const x2 = cx + Math.sin(angle + Math.PI) * amp * (0.55 + p * 0.55);
        const y = cy - length / 2 + p * length;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "rgba(244, 238, 228, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x1, y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "#c8f24a" : "#7de8d0";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2, y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(228, 165, 122, 0.9)";
        ctx.fill();
      }

      for (let i = 0; i < 28; i++) {
        const a = t * 0.4 + i * 0.9;
        const r = 90 + (i % 7) * 22;
        const x = cx + Math.cos(a) * r + mouse.x * 20;
        const y = cy + Math.sin(a * 1.3) * r * 0.62 + mouse.y * 16;
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + (i % 3) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(244, 238, 228, 0.35)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}
