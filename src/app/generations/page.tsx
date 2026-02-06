"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import Link from "next/link";

interface TimelineEra {
    period: string;
    title: string;
    description: string[];
}

const eras: TimelineEra[] = [
    {
        period: "Before 2000",
        title: "Subsistence",
        description: [
            "farming",
            "cutting grass for cattle",
            "raising pigs, hens, goats",
            "daily wage labor on others' land",
            "Education was limited. Mobility was limited.",
            "Identity was often fixed by birth."
        ]
    },
    {
        period: "2000–2010",
        title: "Survival",
        description: [
            "Seasonal migration increased",
            "Children often worked alongside parents",
            "Survival mattered more than aspiration"
        ]
    },
    {
        period: "2010–2020",
        title: "Exposure",
        description: [
            "Mobile phones arrived",
            "Internet exposure began",
            "Tourism appeared nearby",
            "Some service jobs became possible"
        ]
    },
    {
        period: "2020–Now",
        title: "Normalization",
        description: [
            "nurses",
            "police personnel",
            "teachers",
            "hotel professionals",
            "chefs",
            "product managers",
            "software and AI engineers"
        ]
    }
];

export default function GenerationsPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="A Generation of Change"
                title="From Land to Skill"
                subtitle="This village did not change suddenly. It changed slowly."
            />

            <section className="section">
                <div className="page-narrow">
                    {/* Timeline */}
                    <div className="timeline">
                        {eras.map((era, index) => (
                            <motion.div
                                key={era.period}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="timeline-item"
                            >
                                <span className="timeline-era">{era.period}</span>
                                <h3 className="text-2xl font-serif mb-4">{era.title}</h3>

                                {era.period === "2020–Now" ? (
                                    <>
                                        <p className="text-muted mb-4">
                                            Something shifted. People from this village now work as:
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {era.description.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="text-sm px-3 py-2 bg-accent/10 border border-accent/20"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <ul className="space-y-1">
                                        {era.description.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-muted text-sm"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <PullQuote>
                        This is not &quot;success&quot;.<br />
                        This is normalization — delayed, but real.
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/economy" className="btn-primary">
                            What We Actually Do
                        </Link>
                        <Link href="/memory" className="btn-secondary">
                            How We Remember
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
