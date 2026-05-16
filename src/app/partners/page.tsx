"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { PARTNER_PATHS } from "./paths";

const HERO_STATS = [
  { value: "22", label: "Households" },
  { value: "9", label: "Tourism corridors" },
  { value: "0", label: "Dependence on charity" },
];

export default function PartnersIndexPage() {
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
            Partner with Sunaray Gaon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Help us build India's first
            <span className="block bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(245,158,11,0.35)]">
              self-sustaining village.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-7 text-stone-200/85 sm:text-lg"
          >
            Lamahatta has 22 households, real skills, and a Samaj Head who
            answers the phone. Choose the door that fits you — we'll do the
            rest.
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

      {/* PATH PICKER */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
              How would you like to support us?
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl">
              Pick a door. Step in.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PARTNER_PATHS.map((p, i) => {
            const Icon = p.icon;
            const featured = i === 1; // visually anchor "Corporate"
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={featured ? "lg:row-span-1" : ""}
              >
                <Link
                  href={`/partners/${p.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 ${
                    featured
                      ? "border-stone-900 bg-stone-950 text-stone-50 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
                      : "border-stone-200 bg-white hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_30px_60px_rgba(212,175,55,0.18)]"
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 -top-12 h-32 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.35),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                      featured ? "opacity-50" : ""
                    }`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured
                          ? "border border-amber-300/40 bg-amber-300/10 text-amber-300"
                          : "bg-stone-950 text-amber-300"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p
                      className={`mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] ${
                        featured ? "text-amber-300" : "text-amber-700"
                      }`}
                    >
                      {p.eyebrow}
                    </p>
                    <h3
                      className={`mt-3 font-serif text-2xl leading-tight ${
                        featured ? "text-stone-50" : "text-stone-950"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-6 ${
                        featured ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      {p.tagline}
                    </p>
                    <div
                      className={`mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        featured ? "text-amber-300" : "text-stone-950"
                      }`}
                    >
                      Enter this path
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
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
              title="Every rupee on a public dashboard"
              body="Geo-tagged photos, named beneficiaries, line-item ledger. Open before, during, and after."
            />
            <TrustItem
              icon={<MapPin className="h-5 w-5" />}
              title="One village. One phone number."
              body="The Samaj Head is the single point of contact. No NGO middleman, no project office in another city."
            />
            <TrustItem
              icon={<Sparkles className="h-5 w-5" />}
              title="Schedule VII compliant"
              body="80G receipts, CSR-ready reporting, and an audit trail you can hand to your board."
            />
          </div>

          <div className="mt-14 flex flex-col items-start gap-5 rounded-[1.75rem] border border-stone-200 bg-[#f4efe4] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                Still not sure?
              </p>
              <h3 className="mt-2 font-serif text-2xl text-stone-950 sm:text-3xl">
                See where every contribution lands.
              </h3>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-200 transition hover:bg-stone-800 sm:text-sm"
            >
              Open the village dashboard
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
