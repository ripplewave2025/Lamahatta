"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ServiceRequestForm from "./ServiceRequestForm";
import { SERVICES, getService, type ServiceSlug } from "./services";

export default function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug);
  if (!service) return null;
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

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
            href="/services"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-amber-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All services
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
                {service.category}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-[1.06] sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200/85 sm:text-lg">
                {service.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO + 2-COL OFFER/PRICING */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl font-serif text-xl leading-[1.5] text-stone-800 sm:text-2xl"
        >
          {service.intro}
        </motion.p>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* What we offer */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-[1.75rem] border border-stone-200 bg-white p-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              What we offer
            </p>
            <ul className="mt-5 space-y-3.5">
              {service.offers.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-stone-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/60 p-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-800">
              Rates
            </p>
            <dl className="mt-5 space-y-3.5">
              {service.pricing.map((p, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-3 border-b border-amber-200/70 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm leading-6 text-stone-700">{p.label}</dt>
                  <dd className="font-serif text-lg text-stone-950">{p.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-amber-800/80">
              Indicative — final quote on the call.
            </p>
          </motion.div>
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-5 rounded-[1.75rem] border border-stone-900 bg-stone-950 p-7 text-stone-100"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300">
            How it works
          </p>
          <ol className="mt-5 grid gap-3.5 sm:grid-cols-3">
            {service.next.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300 text-[11px] font-bold text-stone-950">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
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
            Request a quote
          </p>
          <h2 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
            Tell us what you need.
          </h2>
          <p className="mt-3 max-w-xl text-stone-700">
            A few lines is enough. We'll call you with a real number and a
            timeline.
          </p>
        </motion.div>

        <div className="mt-8">
          <ServiceRequestForm
            serviceSlug={service.slug}
            submitLabel={service.ctaPrimary}
          />
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-[#07100f] py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
                More from the village
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Other services we offer.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-amber-300 sm:inline-flex sm:items-center sm:gap-1"
            >
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => {
              const OIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col gap-4 bg-[#0c1614] p-6 transition hover:bg-amber-300 hover:text-stone-950"
                >
                  <OIcon className="h-6 w-6 text-amber-300 transition group-hover:text-stone-950" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/80 group-hover:text-stone-700">
                      {s.category}
                    </p>
                    <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
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
