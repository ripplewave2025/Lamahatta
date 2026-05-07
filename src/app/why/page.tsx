"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";

export default function WhyPage() {
  return (
    <div className="min-h-screen bg-[#101717] text-stone-100">
      <PageHeader
        label="Why this exists"
        title="A village should not have to wait quietly for recognition."
        subtitle="This platform exists to turn memory, need, skill, and ambition into something visible and actionable."
        dark
      />

      <section className="section">
        <div className="page-narrow">
          <div className="relative mb-14 overflow-hidden rounded-[2rem] border border-white/10">
            <div className="relative aspect-[1.3]">
              <Image
                src="/village/night-lights.jpg"
                alt="Night lights seen from Sunaray"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="max-w-xl text-sm leading-7 text-stone-200/76">
                  The website should document what is already real on the
                  ground: movement, construction, hospitality potential, unmet
                  needs, and a village that wants to organize itself better.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose"
          >
            <p style={{ color: "rgba(231,229,228,0.82)" }}>
              The current village story is not just about scenic value. It is
              about people who want practical change:
            </p>

            <ul
              className="my-8 space-y-3"
              style={{ color: "rgba(245,245,244,0.92)" }}
            >
              <li className="text-lg">better roads and easier movement</li>
              <li className="text-lg">reliable internet and real tech support</li>
              <li className="text-lg">training that leads to income</li>
              <li className="text-lg">healthcare, elder care, and support systems</li>
              <li className="text-lg">restaurants, hangout spaces, and local jobs</li>
            </ul>
          </motion.div>

          <PullQuote dark>
            This should be a village website that people can actually use, not
            a page they visit once and forget.
          </PullQuote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose mt-12"
          >
            <p style={{ color: "rgba(231,229,228,0.74)" }}>
              That means making the village legible. What funds are available?
              What skills already exist? What businesses make sense? What do
              families buy every day? What can be built here together instead of
              separately?
            </p>

            <p style={{ color: "rgba(231,229,228,0.74)" }}>
              The next version of Sunaray should help villagers coordinate,
              outsiders enquire, and builders understand the local picture
              faster.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              "Make local needs visible",
              "Map talent and services",
              "Open cleaner paths for investment",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-amber-300">
                  Focus
                </p>
                <h3 className="mt-3 font-serif text-2xl text-white">{item}</h3>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/voices"
              className="btn-primary justify-center bg-amber-500 text-stone-950 hover:bg-amber-400"
            >
              Open voices page
            </Link>
            <Link
              href="/partners"
              className="btn-secondary justify-center border-white/15 bg-transparent text-white hover:bg-white/8"
            >
              Start an investor enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
