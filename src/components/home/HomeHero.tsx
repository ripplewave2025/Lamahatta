"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cable,
  HeartHandshake,
  Landmark,
  Mountain,
  Orbit,
  Sparkles,
  Users,
} from "lucide-react";
import {
  actionLanes,
  buildTracks,
  currentNeeds,
  engagementSteps,
  galleryImages,
  strengths,
  villageOsModules,
  villageStats,
} from "@/lib/village-content";
import { useLanguage } from "@/context/LanguageContext";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeHero() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative overflow-hidden bg-[#0b1111] text-stone-100">
        <div className="absolute inset-0">
          <Image
            src="/village/kanchenjunga.jpg"
            alt="Kanchenjunga seen from Sunaray village"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,rgba(11,17,17,0.3),rgba(11,17,17,0.9))]" />
        </div>

        <div className="relative mx-auto grid min-h-screen max-w-7xl gap-14 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-amber-200/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Lamahatta, Darjeeling
            </div>

            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {t("hero.main_title")}
              <span className="mt-2 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                {t("hero.main_subtitle")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200/78 sm:text-xl">
              Built from real village images, real local needs, and real
              ambition: a technical hill village with heart, memory, talent,
              hospitality, and room for builders who want to create something
              useful.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#paths"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-amber-400"
              >
                Explore the platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-amber-300 hover:bg-white/12"
              >
                Start an enquiry
              </Link>
              <Link
                href="/voices"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-200 transition hover:border-white/30 hover:text-white"
              >
                Voice local priorities
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {villageStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm"
                >
                  <div className="font-serif text-4xl text-amber-300">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-300/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-stone-300/70">
              {[
                "Glenburn",
                "Dabaipani",
                "Tinchuley",
                "Lamahatta",
                "Takdah",
                "Peshok",
                "6th Mile",
                "10th Mile",
                "11th Mile",
              ].map((place) => (
                <span
                  key={place}
                  className="rounded-full border border-white/10 bg-black/15 px-3 py-2"
                >
                  {place}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-5"
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
              <div className="flex aspect-[0.9] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-[#141d1c] p-8 shadow-2xl shadow-black/20">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-amber-200/90">
                    Hill network
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-snug text-white sm:text-4xl">
                    A village that already sits inside a regional movement
                    corridor.
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[2rem] border border-white/10 bg-[#141d1c] p-6">
                  <div className="flex items-center gap-3 text-amber-300">
                    <Orbit className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-[0.22em]">
                      Village operating system
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-stone-200/75">
                    The goal is not just tourism content. The goal is a useful
                    public layer for schemes, funds, updates, skills, work,
                    services, and investments.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="h-5 w-5 text-sky-300" />
                      <h3 className="font-serif text-xl">Heart of gold</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-stone-200/72">
                      The village story should feel warm, direct, and ambitious,
                      not polished into generic tourism language.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-6">
                    <div className="flex items-center gap-3 text-amber-200">
                      <Mountain className="h-5 w-5" />
                      <h3 className="font-serif text-xl text-white">
                        What this site should do
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm text-stone-100/78">
                      <li>Attract useful investment</li>
                      <li>Publish the village need-map</li>
                      <li>Surface talent and local services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="paths" className="bg-[#f4efe4] py-24 text-stone-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-amber-700">
              Three clear paths
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              A stronger public front door for villagers, outsiders, and talent.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              The site should not confuse people. It should quickly show what
              they can do here, what the village needs, and where the next
              conversation starts.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {actionLanes.map((lane, index) => (
              <motion.div
                key={lane.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_25px_50px_rgba(0,0,0,0.06)]"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${lane.accent}`}
                />
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-stone-900">
                    {lane.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {lane.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-800">
                    {lane.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={lane.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 transition group-hover:text-amber-600"
                  >
                    {lane.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-stone-900">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-amber-700">
              Why this village stands out
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Beautiful place, useful position, and a sharper ambition than the
              average village pitch.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
              Your notes point in the right direction: this should become a
              practical village platform for governance, services, tourism,
              training, and local business development.
            </p>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200">
              <div className="relative aspect-[1.18]">
                <Image
                  src="/village/signboard.jpg"
                  alt="Hospitality construction site in Sunaray"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[2rem] border border-stone-200 bg-[#faf7f0] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-stone-950 p-3 text-amber-300">
                    {index === 0 && <Mountain className="h-5 w-5" />}
                    {index === 1 && <Sparkles className="h-5 w-5" />}
                    {index === 2 && <HeartHandshake className="h-5 w-5" />}
                    {index === 3 && <Building2 className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="needs" className="bg-[#f8fbfb] py-24 text-stone-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.26em] text-amber-700">
                What people need now
              </p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                The website should reflect immediate village demand, not abstract
                branding.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-stone-700">
              Internet, jobs, delivery, health access, training, hangout spaces,
              and better roads are not side notes. They are the operating
              priorities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {currentNeeds.map((need, index) => (
              <motion.article
                key={need.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_20px_45px_rgba(0,0,0,0.04)]"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700">
                  Priority {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-serif text-2xl text-stone-900">
                  {need.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {need.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#0f1716] py-24 text-stone-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.26em] text-amber-300">
              Real village gallery
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              These are not stock mountains. This is the place itself.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300/75">
              The site needs to feel anchored in actual ground conditions:
              mountain grandeur, village roofs, ridge roads, and visible
              construction of future hospitality and services.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 ${
                  index === 0 || index === 1 ? "xl:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[1.1]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <figcaption className="space-y-2 p-5">
                  <h3 className="font-serif text-xl text-white">{image.alt}</h3>
                  <p className="text-sm leading-7 text-stone-300/72">
                    {image.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="build" className="bg-[#f7f2e8] py-24 text-stone-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-amber-700">
              What can be built here
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              A village platform should lead to projects, services, and capital
              movement.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              These tracks come directly from your notes: village OS tools,
              hospitality, training, business circulation, welfare support, and
              a stronger grants pipeline.
            </p>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white">
              <div className="relative aspect-[1.12]">
                <Image
                  src="/village/construction-path.jpg"
                  alt="Village path and hospitality construction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {buildTracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[2rem] border border-stone-200 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-amber-100 p-3 text-amber-800">
                    {index === 0 && <Landmark className="h-5 w-5" />}
                    {index === 1 && <Building2 className="h-5 w-5" />}
                    {index === 2 && <Users className="h-5 w-5" />}
                    {index === 3 && <Orbit className="h-5 w-5" />}
                    {index === 4 && <HeartHandshake className="h-5 w-5" />}
                    {index === 5 && <Cable className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-stone-900">
                      {track.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {track.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101717] py-24 text-stone-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-amber-300">
              Village OS
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Make the village legible: track information that actually changes
              outcomes.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300/74">
              This is where Sunaray can become more than a brochure. The site
              can track schemes, funds, services, outages, schools, health,
              transport, and citizen-facing records.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {villageOsModules.map((module) => (
                <div
                  key={module}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-stone-200/76"
                >
                  {module}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300">
              How engagement should work
            </p>
            <div className="mt-6 space-y-5">
              {engagementSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1.75rem] border border-white/10 bg-black/15 p-5"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-amber-200/90">
                    Step {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300/75">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/voices"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-400"
              >
                Open voices page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hub"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/30"
              >
                Enter hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="engage" className="bg-white py-24 text-stone-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#0f1716_0%,#1f2937_45%,#d97706_145%)] p-8 text-white shadow-[0_35px_80px_rgba(0,0,0,0.18)] sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-amber-200">
                  Next move
                </p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                  Build something useful here, not just something visible.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                  Villagers should be able to speak. Outsiders should be able to
                  enquire. Talent should be able to contribute. Investors should
                  understand what is real, what is needed, and what is already
                  moving.
                </p>
              </div>

              <div className="grid gap-4">
                <Link
                  href="/partners"
                  className="flex items-center justify-between rounded-[1.6rem] bg-white/10 px-5 py-5 text-left transition hover:bg-white/14"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-amber-200">
                      Investors and builders
                    </div>
                    <div className="mt-2 font-serif text-2xl">
                      Start a project conversation
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/voices"
                  className="flex items-center justify-between rounded-[1.6rem] bg-white/10 px-5 py-5 text-left transition hover:bg-white/14"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-amber-200">
                      Villagers
                    </div>
                    <div className="mt-2 font-serif text-2xl">
                      Surface the real priorities
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/economy"
                  className="flex items-center justify-between rounded-[1.6rem] bg-white/10 px-5 py-5 text-left transition hover:bg-white/14"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-amber-200">
                      Trainers and employers
                    </div>
                    <div className="mt-2 font-serif text-2xl">
                      Plug talent into real work
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
