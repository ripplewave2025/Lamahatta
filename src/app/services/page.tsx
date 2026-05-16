"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import { SERVICES, type ServiceCategory } from "./services";

const CATEGORY_ORDER: ServiceCategory[] = [
  "Hospitality",
  "Trades",
  "Digital & AI",
  "Build with us",
  "Government",
];

const HERO_STATS = [
  { value: "8", label: "Services on offer" },
  { value: "22", label: "Households behind them" },
  { value: "48h", label: "To a real quote" },
];

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07100f] pb-28 pt-32 text-white sm:pb-32 sm:pt-36">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.10),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300"
          >
            Services from Sunaray Gaon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            The village
            <span className="mt-1 block bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(245,158,11,0.35)]">
              is open for work.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-7 text-stone-200/85 sm:text-lg"
          >
            Catering, carpentry, homestays, digital, government liaison, AI
            for teachers, course design — and the chance to build your business
            here. Hire the village directly. No middleman.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-[#0c1614] p-5 sm:p-6">
                <div className="font-serif text-3xl text-amber-300 sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/65 sm:text-[11px]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID — grouped by category */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
              What we do
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl">
              Hire a service. Or hire the whole village.
            </h2>
          </div>
        </div>

        <div className="mt-14 space-y-14">
          {CATEGORY_ORDER.map((cat) => {
            const items = SERVICES.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <div className="mb-6 flex items-baseline gap-4">
                  <h3 className="font-serif text-2xl text-stone-950">{cat}</h3>
                  <span className="h-px flex-1 bg-stone-300" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
                    {items.length} service{items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={s.slug}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: i * 0.05 }}
                      >
                        <Link
                          href={`/services/${s.slug}`}
                          className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_30px_60px_rgba(212,175,55,0.18)]"
                        >
                          <div
                            aria-hidden
                            className="absolute inset-x-0 -top-12 h-32 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.35),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                          <div className="relative flex h-full flex-col">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-amber-300 transition group-hover:scale-105">
                              <Icon className="h-6 w-6" />
                            </div>
                            <h4 className="mt-5 font-serif text-xl leading-tight text-stone-950">
                              {s.title}
                            </h4>
                            <p className="mt-3 text-sm leading-6 text-stone-700">
                              {s.short}
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-950">
                              See details
                              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-3">
            <TrustItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title="One Samaj. One invoice."
              body="No subcontractor layers, no surprise add-ons. The Samaj is responsible end to end."
            />
            <TrustItem
              icon={<Clock className="h-5 w-5" />}
              title="48 hours to a real quote"
              body="No 'we'll get back to you.' You will hear back within two working days with numbers and dates."
            />
            <TrustItem
              icon={<MapPin className="h-5 w-5" />}
              title="Money stays in the hills"
              body="Every rupee you pay goes to a household ledger you can see on the village dashboard."
            />
          </div>

          <div className="mt-14 flex flex-col items-start gap-5 rounded-[1.75rem] border border-stone-200 bg-[#f4efe4] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                Not sure which one fits?
              </p>
              <h3 className="mt-2 font-serif text-2xl text-stone-950 sm:text-3xl">
                Tell us the problem. We'll route it.
              </h3>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-200 transition hover:bg-stone-800 sm:text-sm"
            >
              Talk to the Samaj Head
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
        {icon}
      </div>
      <h3 className="mt-4 font-serif text-xl text-stone-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
    </div>
  );
}
