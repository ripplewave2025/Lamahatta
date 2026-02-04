"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";

interface Contributor {
    id: number;
    name: string;
    role: string;
    placeholder: boolean;
}

const contributors: Contributor[] = [
    { id: 1, name: "Elders", role: "Living memory", placeholder: true },
    { id: 2, name: "Workers", role: "Daily experience", placeholder: true },
    { id: 3, name: "Professionals", role: "New perspectives", placeholder: true },
    { id: 4, name: "Young People", role: "Future vision", placeholder: true },
];

export default function VoicesPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="Community Writers"
                title="People & Voices"
                subtitle="This record is not written by one person."
            />

            <section className="section">
                <div className="page-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose mb-12"
                    >
                        <p>
                            Contributors include: <strong>elders</strong>, <strong>workers</strong>,
                            <strong> professionals</strong>, and <strong>young people</strong>.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {contributors.map((contributor, index) => (
                            <motion.div
                                key={contributor.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="record-card"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-warmgray border border-border flex items-center justify-center">
                                        <span className="text-2xl text-muted/30">?</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-serif">{contributor.name}</h3>
                                        <p className="text-sm text-muted">{contributor.role}</p>
                                    </div>
                                </div>
                                {contributor.placeholder && (
                                    <p className="mt-4 text-xs text-muted opacity-60 italic">
                                        Contributor invited to share their perspective
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-warmgray border border-border p-8 mb-12"
                    >
                        <h4 className="font-serif text-lg mb-4">Each voice appears with:</h4>
                        <ul className="space-y-2 text-sm text-muted">
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                name
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                photo (if they choose)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                editable text
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                version history
                            </li>
                        </ul>
                    </motion.div>

                    <PullQuote>
                        No one's words are polished away.
                    </PullQuote>
                </div>
            </section>
        </div>
    );
}
