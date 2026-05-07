"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const platformLinks = [
  { href: "/", label: "Home" },
  { href: "/why", label: "Story" },
  { href: "/voices", label: "Voices" },
  { href: "/hub", label: "Hub" },
];

const actionLinks = [
  { href: "/economy", label: "Opportunity map" },
  { href: "/partners", label: "Investor enquiry" },
  { href: "/village", label: "Village talent" },
  { href: "/updates", label: "Updates" },
];

export default function RecordFooter() {
  return (
    <footer className="bg-[#0f1716] text-stone-100">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300">
              Sunaray Gaon
            </p>
            <h3 className="mt-4 font-serif text-3xl text-white">
              A village platform for work, visibility, and useful growth.
            </h3>
            <p className="mt-5 text-sm leading-7 text-stone-300/72">
              This should become the public face of the village and the internal
              tool for surfacing needs, talent, services, and practical
              opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
              Platform
            </h4>
            <nav className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-300/78 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
              Action
            </h4>
            <nav className="mt-5 space-y-3">
              {actionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-300/78 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              Best next entry points
            </h4>
            <p className="mt-4 text-sm leading-7 text-stone-300/72">
              Villagers should head to the hub and voices page. Outsiders should
              start with opportunity and enquiries. Trainers and employers
              should use the economy and talent sections.
            </p>
            <Link
              href="/partners"
              className="mt-5 inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-amber-400"
            >
              Contact the village
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Sunaray Gaon, Lamahatta, Darjeeling</p>
          <p>Built as a living record, a village OS, and an opportunity front door.</p>
        </div>
      </div>
    </footer>
  );
}
