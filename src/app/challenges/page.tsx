"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import Link from "next/link";

interface Challenge {
    title: string;
    description: string;
    status: "critical" | "ongoing" | "improving";
}

const challenges: Challenge[] = [
    {
        title: "Internet and Mobile Connectivity",
        description: "Unstable signal affects communication, work, and access to information.",
        status: "critical"
    },
    {
        title: "Road Access",
        description: "The main access road is incomplete. 1 mile of \"bad road\" needs reconstruction.",
        status: "critical"
    },
    {
        title: "Walking Paths",
        description: "Multiple village paths are unsafe and need rebuilding.",
        status: "ongoing"
    },
    {
        title: "Community Hub",
        description: "There is no shared public space inside the village — no mall, no community center.",
        status: "ongoing"
    }
];

const getStatusLabel = (status: string) => {
    switch (status) {
        case "critical": return "Critical";
        case "ongoing": return "Ongoing";
        case "improving": return "Improving";
        default: return status;
    }
};

export default function ChallengesPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="Ground Reality"
                title="What Still Needs Work"
                subtitle="We do not hide our problems."
            />

            <section className="section">
                <div className="page-narrow">
                    <div className="space-y-6">
                        {challenges.map((challenge, index) => (
                            <motion.div
                                key={challenge.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="problem-card"
                            >
                                <span className={`problem-status status-${challenge.status}`}>
                                    {getStatusLabel(challenge.status)}
                                </span>
                                <h3 className="text-xl font-serif mb-2">
                                    {challenge.title}
                                </h3>
                                <p className="text-muted text-sm">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <PullQuote>
                        These are not complaints. They are constraints we design around.
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-6 bg-warmgray border border-border"
                    >
                        <p className="text-sm text-muted mb-4">
                            <strong className="text-text">Real images are shown here</strong> — not stock photos.
                        </p>
                        <p className="text-xs text-muted opacity-70">
                            [Village photos would be placed here]
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link href="/policy" className="btn-secondary">
                            Read About Access & Policy →
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
