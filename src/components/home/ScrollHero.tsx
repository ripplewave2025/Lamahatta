"use client";

// Sunaray Gaon scroll hero — built from the scroll-stop-builder skill.
// Static intro (sunaraygown.png) → pinned 4-scene scroll-scrub on
// sunaraygownamazing.mp4 (transcoded with dense keyframes for iOS smoothness).

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// Temporary: trying the new color-graded cut. Revert by switching to
// "/hero/sunaraygownamazing.mp4" (+ matching poster) if it doesn't land.
const VIDEO_SRC = "/hero/sunaraygown.mp4";
const POSTER_SRC = "/hero/sunaraygown-poster.jpg";

const HERO_STATS = [
  { value: "22", label: "Households" },
  { value: "93+", label: "Residents" },
  { value: "9", label: "Tourism corridors" },
];

type CTA = { label: string; href: string };
type Scene = {
  eyebrow: string;
  title: string;
  cta: CTA;
};

const SCENES: Scene[] = [
  {
    eyebrow: "Lamahatta · Darjeeling",
    title: "Above the tea, above the clouds — a village wakes online.",
    cta: { label: "Step inside", href: "/dashboard" },
  },
  {
    eyebrow: "Today in Sunaray",
    title: "When the road closes or the water comes back, you'll know first.",
    cta: { label: "Hear today's voices", href: "/voices" },
  },
  {
    eyebrow: "What we're building",
    title: "Homestays, training, healthcare — and reasons for our young people to stay.",
    cta: { label: "See the plan", href: "/why" },
  },
  {
    eyebrow: "Your way in",
    title: "Bring guests, work, or willing hands. The door is always open.",
    cta: { label: "Talk to us", href: "/partners" },
  },
];

const FADE_IN_PCT = 0.18;
const FADE_OUT_PCT = 0.18;

export default function ScrollHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      {/* H1 lives in the DOM for SEO; the visual headline is the video scrub itself. */}
      <h1 className="sr-only">Sunaray Gaon — Lamahatta, Darjeeling</h1>
      {reducedMotion ? <ReducedMotionFallback /> : <PinnedScrub />}
      <ExploreStrip />
    </>
  );
}

function PinnedScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    
    // Check if the video is ready enough to scrub without completely blocking
    if (v.readyState < 2) return;
    
    const next = Math.min(v.duration, Math.max(0, p * v.duration));
    if (Math.abs(v.currentTime - next) > 0.005) { // Slightly higher threshold to avoid micro-stutters
      v.currentTime = next;
    }
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${SCENES.length * 100}vh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden
          style={{ filter: "contrast(1.06) saturate(1.1)", objectPosition: "center 38%" }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Mobile: bottom-weighted gradient — keeps headline legible at top
            without dimming the houses behind. Desktop (sm+): only the left wash. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/35 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/10 to-transparent sm:block" />

        {SCENES.map((scene, i) => (
          <SceneOverlay
            key={i}
            scene={scene}
            index={i}
            total={SCENES.length}
            progress={scrollYProgress}
          />
        ))}

        <ProgressDots total={SCENES.length} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function SceneOverlay({
  scene,
  index,
  total,
  progress,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const slot = end - start;

  const opacity = useTransform(
    progress,
    [start, start + slot * FADE_IN_PCT, end - slot * FADE_OUT_PCT, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
            {scene.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-[1.06] text-white sm:mt-5 sm:text-4xl sm:leading-[1.04] lg:text-5xl">
            {scene.title}
          </h2>

          <Link
            href={scene.cta.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-300 sm:mt-8 sm:px-6 sm:text-sm"
          >
            {scene.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressDots({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const active = useTransform(progress, [start, start + 0.001, end, end + 0.001], [0.3, 1, 1, 0.3]);
  return (
    <motion.span
      style={{ opacity: active }}
      className="block h-1.5 w-7 bg-amber-300"
    />
  );
}

function ExploreStrip() {
  const explore = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Voices", href: "/voices" },
    { label: "Talent", href: "/village" },
    { label: "Opportunity", href: "/economy" },
    { label: "Community Hub", href: "/hub" },
    { label: "Story", href: "/why" },
    { label: "Generations", href: "/generations" },
    { label: "Challenges", href: "/challenges" },
    { label: "Updates", href: "/updates" },
    { label: "Partners", href: "/partners" },
  ];
  return (
    <section className="bg-[#07100f] py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
              The village, room by room
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Pick a door. Step in.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-200/80">
              Whether you live here, grew up here, or just found your way to us —
              these are the places to start.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 border-y border-white/15 py-5">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="pr-4">
                  <div className="font-serif text-3xl text-amber-300 sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:text-[11px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden bg-white/12 sm:grid-cols-3">
            {explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-24 items-center justify-between bg-white/[0.04] px-5 py-5 transition hover:bg-amber-300 hover:text-stone-950"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4 text-amber-300 transition group-hover:text-stone-950" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReducedMotionFallback() {
  return (
    <section className="relative bg-black text-white">
      <div className="relative h-[100svh] w-full overflow-hidden">
        <video
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="mx-auto max-w-5xl space-y-20 px-5 py-24 sm:px-8 lg:px-10">
        {SCENES.map((scene, i) => (
          <div key={i}>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
              {scene.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {scene.title}
            </h2>
            <Link
              href={scene.cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-stone-950"
            >
              {scene.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduced;
}
