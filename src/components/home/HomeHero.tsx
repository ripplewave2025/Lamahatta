"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Bot,
  CalendarDays,
  HandCoins,
  HeartPulse,
  Landmark,
  Megaphone,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  Users,
  WalletCards,
} from "lucide-react";
import {
  actionLanes,
  buildTracks,
  currentNeeds,
  galleryImages,
  villageOsModules,
  villageStats,
} from "@/lib/village-content";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const operatingModules = [
  {
    title: "Realtime alerts",
    desc: "Power, water, road, meetings, scheme deadlines, and urgent village notices.",
    icon: Bell,
  },
  {
    title: "Issue + RTI flow",
    desc: "Report a problem, track status, and move serious issues toward public records.",
    icon: Landmark,
  },
  {
    title: "Marketplace",
    desc: "I Offer / I Need listings for food, labour, transport, skills, supplies, and services.",
    icon: ShoppingBag,
  },
  {
    title: "Golden Rays",
    desc: "A local points layer for volunteering, oldcare, content, training, and contribution.",
    icon: WalletCards,
  },
];

const quickActions = [
  { label: "Report issue", href: "/voices", icon: Megaphone },
  { label: "Open dashboard", href: "/dashboard", icon: RadioTower },
  { label: "Find work", href: "/economy", icon: HandCoins },
  { label: "Partner", href: "/partners", icon: Users },
];

const roadmap = [
  {
    phase: "Phase 0",
    time: "Weeks 1-3",
    title: "Make it alive",
    desc: "Dashboard, realtime alerts, quick actions, issue reporting, and household-facing stats.",
  },
  {
    phase: "Phase 1",
    time: "Weeks 4-10",
    title: "Daily life engine",
    desc: "Marketplace, points ledger, scheme trackers, tenders, power, water, health, and education.",
  },
  {
    phase: "Phase 2",
    time: "Months 3-5",
    title: "Cooperative security",
    desc: "Member status, health support, oldcare matching, hub bookings, workshops, and progress.",
  },
  {
    phase: "Phase 3",
    time: "Months 5-8",
    title: "AI village assistant",
    desc: "Scheme help, RTI drafting, farm advice, English practice, and daily suggestions.",
  },
];

const futureLayers = [
  { title: "Cooperative hub", icon: ShieldCheck },
  { title: "Oldcare matching", icon: HeartPulse },
  { title: "Golden Square bookings", icon: CalendarDays },
  { title: "AI assistant", icon: Bot },
];

export default function HomeHero() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 80]);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#07100f] text-white">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <Image
            src="/village/kanchenjunga.jpg"
            alt="Kanchenjunga seen from Sunaray village"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,15,0.95)_0%,rgba(7,16,15,0.78)_38%,rgba(7,16,15,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,15,0.18)_0%,rgba(7,16,15,0.72)_82%,#07100f_100%)]" />
        </motion.div>

        <div className="relative mx-auto grid min-h-screen max-w-7xl gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:px-10 lg:pb-20 lg:pt-32">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-3 border-l border-amber-300/70 pl-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              Lamahatta OS to Golden Village OS
            </p>

            <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.94] text-white sm:text-6xl lg:text-7xl">
              Golden Village OS for{" "}
              <span className="text-amber-300">Sunaray Gaon.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-100/82 sm:text-xl">
              A village website should do daily work: alerts, issue reporting,
              marketplace listings, scheme tracking, cooperative support, and a
              warm public front door for residents, diaspora, partners, and builders.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-300"
              >
                Open the hub
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/voices"
                className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:border-amber-200 hover:bg-white/16"
              >
                Report a priority
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/14 py-5">
              {villageStats.map((stat) => (
                <div key={stat.label} className="pr-4">
                  <div className="font-serif text-4xl text-amber-300">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-stone-200/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-white/12 bg-[#07100f]/72 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-amber-200">
                  Today in the village
                </p>
                <h2 className="mt-2 font-serif text-3xl text-white">
                  Operating dashboard
                </h2>
              </div>
              <span className="rounded-full bg-emerald-400/16 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Live layer
              </span>
            </div>

            <div className="grid gap-3 py-5">
              {operatingModules.map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.title}
                    className="grid grid-cols-[auto_1fr] gap-4 border border-white/10 bg-white/[0.06] p-4 transition hover:border-amber-300/40 hover:bg-white/[0.09]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center bg-amber-300 text-stone-950">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-white">
                        {module.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-stone-200/70">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex min-h-24 flex-col justify-between border border-white/10 bg-black/16 p-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/50 hover:bg-amber-300 hover:text-stone-950"
                  >
                    <Icon className="h-5 w-5 text-amber-200 transition group-hover:text-stone-950" />
                    <span>{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section id="paths" className="bg-[#f6f1e6] py-24 text-stone-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
              First design decision
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Make the site useful before making it decorative.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              The PDF points to one priority: people should open this because it
              helps them do something today. These three entry paths make that
              clear from the first scroll.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden bg-stone-300 md:grid-cols-3">
            {actionLanes.map((lane, index) => (
              <motion.div
                key={lane.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white p-7 transition hover:bg-stone-950 hover:text-white"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700 group-hover:text-amber-300">
                  Path {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-serif text-3xl">{lane.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600 group-hover:text-stone-300">
                  {lane.description}
                </p>
                <ul className="mt-7 space-y-3 text-sm">
                  {lane.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-5 bg-amber-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={lane.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-amber-700 transition group-hover:text-amber-300"
                >
                  {lane.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-stone-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
                Current village demand
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
                The content system should be organized around real needs,
                not abstract village branding.
              </h2>
            </div>
            <p className="text-lg leading-8 text-stone-700">
              Internet, road access, delivery, training, health, oldcare,
              hangout spaces, and local jobs are the operating priorities.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden bg-stone-200 md:grid-cols-2 xl:grid-cols-3">
            {currentNeeds.map((need, index) => (
              <motion.article
                key={need.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="min-h-64 bg-[#fbfaf6] p-7 transition hover:bg-amber-50"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Priority {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-serif text-2xl text-stone-950">
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

      <section className="relative overflow-hidden bg-[#081211] py-24 text-white">
        <Image
          src="/village/night-lights.jpg"
          alt="Night lights in Sunaray village"
          fill
          sizes="100vw"
          className="object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-[#081211]/84" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
              Village OS modules
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Make public information visible, searchable, and actionable.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-200/74">
              This is the technical heart of the site: schemes, funds, issues,
              transport, water, power, health, education, and citizen records.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden bg-white/12 sm:grid-cols-2">
            {villageOsModules.map((module, index) => (
              <motion.div
                key={module}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{ duration: 0.42, delay: index * 0.03 }}
                className="flex min-h-28 items-center bg-white/[0.06] p-5 text-sm font-semibold text-stone-100 backdrop-blur-md"
              >
                {module}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="build" className="bg-[#f7f2e8] py-24 text-stone-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
              Implementation roadmap
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The design now mirrors the build sequence from the plan.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Start with the dashboard and alerts, then expand into marketplace,
              cooperative benefits, skills, bookings, and the AI village assistant.
            </p>

            <div className="mt-8 overflow-hidden">
              <div className="relative aspect-[1.08]">
                <Image
                  src="/village/construction-path.jpg"
                  alt="Village path beside new hospitality construction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="border-l border-stone-300">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.phase}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative border-b border-stone-300 py-7 pl-8"
              >
                <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 bg-amber-600" />
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  {item.phase} / {item.time}
                </div>
                <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-stone-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
              Economic and security layers
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The site should show how money, care, training, and trust circulate.
            </h2>
            <div className="mt-8 grid gap-px overflow-hidden bg-stone-200 sm:grid-cols-2">
              {buildTracks.map((track, index) => (
                <motion.div
                  key={track.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={reveal}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="min-h-52 bg-[#fbfaf6] p-6"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    Track {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-serif text-2xl">{track.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {track.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:pt-24">
            <div className="bg-stone-950 p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                Future-ready layer
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-tight">
                Cooperative benefits and AI support should feel close, not far away.
              </h3>
              <div className="mt-8 grid gap-px overflow-hidden bg-white/12">
                {futureLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.title}
                      className="flex items-center gap-4 bg-white/[0.06] p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center bg-amber-300 text-stone-950">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-serif text-2xl">{layer.title}</span>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/partners"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-300"
              >
                Build with the village
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#081211] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
              Real village evidence
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The operating system still has to feel rooted in the actual place.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {galleryImages.slice(0, 6).map((image, index) => (
              <motion.figure
                key={image.src}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`group overflow-hidden bg-white/[0.06] ${
                  index === 0 || index === 1 ? "xl:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[1.05]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-serif text-xl text-white">{image.alt}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-300/72">
                    {image.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="engage" className="bg-[#f6f1e6] py-24 text-stone-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 border-y border-stone-300 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
                Next move
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Build the hub people will open every day.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
                The design now points residents to action, gives partners a clear
                investment story, and keeps the Golden Village OS roadmap visible.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-stone-800"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:border-amber-500"
              >
                Start an enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
