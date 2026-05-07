"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import { voiceTopics } from "@/lib/village-content";
import { useLanguage } from "@/context/LanguageContext";

const contributors = [
  {
    title: "Elders and long memory",
    description:
      "What changed, what was difficult, and what the village should never forget while growing.",
  },
  {
    title: "Workers and service providers",
    description:
      "Roads, transport, delivery, internet issues, pricing pressure, and everyday village economics.",
  },
  {
    title: "Students and young builders",
    description:
      "Education, English, computers, gaming, content creation, entrepreneurship, and remote work.",
  },
  {
    title: "Families and caregivers",
    description:
      "Healthcare, elder care, childcare, safety, welfare access, and what makes life easier at home.",
  },
];

export default function VoicesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-stone-900">
      <PageHeader
        label={t("voices.label") || "Voices page"}
        title={t("voices.title") || "This page should become the village opinion board."}
        subtitle={t("voices.subtitle") || "People should be able to say what is needed, what is working, and what should be built next."}
      />

      <section className="section">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white">
                <div className="relative aspect-[1.15]">
                  <Image
                    src="/village/rooftops.jpg"
                    alt="Village rooftops and homes"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-700">
                  {t("voices.post_heading") || "What should be posted here"}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-700">
                  <li>Road issues, transport issues, and delivery needs</li>
                  <li>Education, training, and job opportunities</li>
                  <li>Health, old-age care, and public service gaps</li>
                  <li>Business ideas people want to try together</li>
                  <li>Tourism ideas, events, and hospitality suggestions</li>
                  <li>What villagers buy daily and what can be supplied locally</li>
                </ul>
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose"
              >
                <p>
                  {t("voices.desc") || "This page should not be decorative. It should become the place where the village speaks in categories that help action happen."}
                </p>
              </motion.div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {voiceTopics.map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[1.6rem] border border-stone-200 bg-white p-5"
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700">
                      {t("voices.topic") || "Topic"}
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-stone-900">
                      {topic}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <PullQuote>
                {t("voices.quote") || "If the village cannot state its needs clearly, other people will define them badly."}
              </PullQuote>

              <div className="grid gap-5">
                {contributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[1.75rem] border border-stone-200 bg-white p-6"
                  >
                    <h3 className="font-serif text-2xl text-stone-900">
                      {contributor.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {contributor.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/hub/updates"
                  className="btn-primary justify-center"
                >
                  {t("voices.cta.updates") || "Go to community updates"}
                </Link>
                <Link
                  href="/hub"
                  className="btn-secondary justify-center"
                >
                  {t("voices.cta.hub") || "Enter the hub"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
