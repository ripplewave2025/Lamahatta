"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PartnerForm from "./PartnerForm";
import { PARTNER_PATHS, getPartnerPath, type PartnerSlug } from "./paths";

export default function PartnerPathPage({ slug }: { slug: PartnerSlug }) {
  const path = getPartnerPath(slug);
  if (!path) return null;
  const Icon = path.icon;
  const others = PARTNER_PATHS.filter((p) => p.slug !== path.slug);

  return (
    <div className="min-h-screen bg-[#f4efe4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07100f] pb-24 pt-32 text-white sm:pb-28 sm:pt-36">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-amber-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All partner paths
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex items-start gap-5 sm:gap-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-300/40 bg-amber-300/10 text-amber-300 sm:h-16 sm:w-16">
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
                {path.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-[1.06] sm:text-4xl lg:text-5xl">
                {path.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200/85 sm:text-lg">
                {path.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO + 3 BLOCKS */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl font-serif text-xl leading-[1.5] text-stone-800 sm:text-2xl"
        >
          {path.intro}
        </motion.p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Block
            tone="stone"
            eyebrow="What we need from you"
            items={path.need}
          />
          <Block
            tone="gold"
            eyebrow="What you get back"
            items={path.give}
          />
          <Block
            tone="dark"
            eyebrow="What happens next"
            items={path.next}
            numbered
          />
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
            Start the conversation
          </p>
          <h2 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
            Tell us what you have in mind.
          </h2>
          <p className="mt-3 max-w-xl text-stone-700">
            The shorter the better — the Samaj Head will call you to talk
            properly. No pitch decks required.
          </p>
        </motion.div>

        <div className="mt-8">
          <PartnerForm partnerType={path.slug} submitLabel={path.ctaPrimary} />
        </div>
      </section>

      {/* OTHER PATHS */}
      <section className="bg-[#07100f] py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
                Not the right door?
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Try another path.
              </h2>
            </div>
            <Link
              href="/partners"
              className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-amber-300 sm:inline-flex sm:items-center sm:gap-1"
            >
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => {
              const OtherIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  href={`/partners/${p.slug}`}
                  className="group flex flex-col gap-4 bg-[#0c1614] p-6 transition hover:bg-amber-300 hover:text-stone-950"
                >
                  <OtherIcon className="h-6 w-6 text-amber-300 transition group-hover:text-stone-950" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/80 group-hover:text-stone-700">
                      {p.eyebrow}
                    </p>
                    <h3 className="mt-2 font-serif text-xl">{p.shortTitle}</h3>
                  </div>
                  <ArrowRight className="mt-auto h-4 w-4 text-amber-300 transition group-hover:translate-x-1 group-hover:text-stone-950" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({
  eyebrow,
  items,
  tone,
  numbered,
}: {
  eyebrow: string;
  items: string[];
  tone: "stone" | "gold" | "dark";
  numbered?: boolean;
}) {
  const surface =
    tone === "gold"
      ? "bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200"
      : tone === "dark"
        ? "bg-stone-950 border-stone-900 text-stone-100"
        : "bg-white border-stone-200";
  const eyebrowColor =
    tone === "dark" ? "text-amber-300" : tone === "gold" ? "text-amber-800" : "text-stone-500";
  const tickColor = tone === "dark" ? "text-amber-300" : "text-amber-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className={`rounded-[1.75rem] border p-7 ${surface}`}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <ul className="mt-5 space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-6">
            {numbered ? (
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  tone === "dark"
                    ? "bg-amber-300 text-stone-950"
                    : "bg-stone-950 text-amber-300"
                }`}
              >
                {i + 1}
              </span>
            ) : (
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tickColor}`} />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
