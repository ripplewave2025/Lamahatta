"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import Link from "next/link";

export default function WhyPage() {
    return (
        <div className="min-h-screen bg-earth text-warmgray">
            <PageHeader
                label="The Record"
                title="Why We Wrote This"
                subtitle="We are from a community that has historically been treated differently."
                dark
            />

            <section className="section">
                <div className="page-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose"
                    >
                        <p style={{ color: "rgba(245, 243, 240, 0.8)" }}>
                            Not by everyone — but enough that it shaped:
                        </p>

                        <ul className="my-8 space-y-2" style={{ color: "rgba(245, 243, 240, 0.9)" }}>
                            <li className="text-lg">where we could eat</li>
                            <li className="text-lg">whose food was accepted</li>
                            <li className="text-lg">whose labor was valued</li>
                        </ul>
                    </motion.div>

                    <PullQuote dark>
                        Some people did not eat in our village.<br />
                        Some people did not accept food cooked by us.
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose mt-12"
                    >
                        <p style={{ color: "rgba(245, 243, 240, 0.7)" }}>
                            This is not theory.<br />
                            This is <strong style={{ color: "#f5f3f0" }}>lived memory</strong>.
                        </p>

                        <p className="mt-8" style={{ color: "rgba(245, 243, 240, 0.7)" }}>
                            In the early 2000s, many of us worked as daily laborers with our parents.
                            Often, the only place we were allowed to eat was outside — in corridors —
                            the same place dogs ate.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="my-16 py-8 border-t border-b border-white/10"
                    >
                        <p className="text-2xl font-serif text-center leading-relaxed" style={{ color: "#f5f3f0" }}>
                            The world is changing.<br />
                            Things are better now.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose"
                    >
                        <p style={{ color: "rgba(245, 243, 240, 0.7)" }}>
                            But change does not arrive everywhere at the same speed.
                        </p>
                        <p style={{ color: "rgba(245, 243, 240, 0.7)" }}>
                            It takes at least <strong style={{ color: "#f5f3f0" }}>one generation</strong> for
                            dignity to catch up with possibility.
                        </p>
                    </motion.div>

                    <PullQuote dark>
                        This website exists because silence does not correct history — records do.
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link href="/generations" className="btn-primary" style={{ background: "#b8956c" }}>
                            See the Change →
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
