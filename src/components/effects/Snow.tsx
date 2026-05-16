"use client";

import { useEffect, useRef } from "react";

/**
 * Faint, ambient snow drift rendered on a fixed full-viewport canvas.
 *
 * Design choices (matching the user's request for "very faint, small, slow, random"):
 *  - At most ~40 flakes, 1.2–2.4 px radius
 *  - Drift speed 20–55 px/s vertically with light horizontal sway
 *  - 0.18–0.42 alpha — present but never dominating
 *  - Disabled on touch devices and when prefers-reduced-motion is set
 *  - One requestAnimationFrame loop; cleans up on unmount
 */
export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flakesRef = useRef<Flake[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced-motion + skip on small/touch screens
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    let lastT = performance.now();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Seed flakes
    const count = Math.min(40, Math.max(20, Math.round((w * h) / 60000)));
    flakesRef.current = Array.from({ length: count }, () => spawnFlake(w, h, true));

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastT) / 1000); // seconds, capped at 50 ms
      lastT = now;

      ctx.clearRect(0, 0, w, h);

      for (const f of flakesRef.current) {
        // sway: very gentle horizontal sine
        f.swayPhase += dt * f.swaySpeed;
        const dx = Math.sin(f.swayPhase) * f.swayAmp;
        f.x += dx * dt;
        f.y += f.vy * dt;

        if (f.y - f.r > h) {
          // recycle off the top
          Object.assign(f, spawnFlake(w, h, false));
          f.y = -f.r * 2;
        }
        if (f.x < -10) f.x = w + 5;
        if (f.x > w + 10) f.x = -5;

        ctx.globalAlpha = f.a;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);

    window.addEventListener("resize", resize);

    // Pause when tab is hidden (saves CPU)
    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && rafRef.current === null) {
        lastT = performance.now();
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
    />
  );
}

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  a: number;
};

function spawnFlake(w: number, h: number, seeded: boolean): Flake {
  const r = 1.2 + Math.random() * 1.2; // 1.2–2.4 px
  return {
    x: Math.random() * w,
    y: seeded ? Math.random() * h : -10,
    r,
    vy: 20 + Math.random() * 35, // 20–55 px/s — slow
    swayPhase: Math.random() * Math.PI * 2,
    swaySpeed: 0.4 + Math.random() * 0.8,
    swayAmp: 6 + Math.random() * 14, // small horizontal sway
    a: 0.18 + Math.random() * 0.24, // 0.18–0.42 — faint
  };
}
