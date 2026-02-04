"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";

interface ServiceCategory {
    title: string;
    services: string[];
}

const categories: ServiceCategory[] = [
    {
        title: "Food & Daily Life",
        services: [
            "Home cooking",
            "Hotel cooking",
            "Catering for small gatherings",
            "Housekeeping"
        ]
    },
    {
        title: "Agriculture & Animals",
        services: [
            "Pig farming",
            "Goats, chickens",
            "Milk supply",
            "Meat handling",
            "Local produce"
        ]
    },
    {
        title: "Construction & Manual Skill",
        services: [
            "Carpentry",
            "Construction work",
            "Repair and maintenance"
        ]
    },
    {
        title: "Shops & Trade",
        services: [
            "Small shops",
            "Vegetables",
            "Daily essentials"
        ]
    },
    {
        title: "Hospitality & Transport",
        services: [
            "Hotel staff",
            "Receptionists",
            "Waiters",
            "Tour guides",
            "Drivers and cabs"
        ]
    },
    {
        title: "Digital & Knowledge Work",
        services: [
            "Digital marketing",
            "Website & booking management",
            "Product management",
            "Software & AI work",
            "Teaching and training"
        ]
    }
];

export default function EconomyPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="What We Actually Do"
                title="A Working Economy"
                subtitle="We do not claim to do everything. We list only what is real."
            />

            <section className="section">
                <div className="page-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="record-card"
                            >
                                <h3 className="text-lg font-serif mb-4 pb-3 border-b border-border">
                                    {category.title}
                                </h3>
                                <ul className="space-y-2">
                                    {category.services.map((service) => (
                                        <li
                                            key={service}
                                            className="text-sm text-muted flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 bg-accent rounded-full" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <div className="page-narrow mt-16">
                        <PullQuote>
                            This is not a catalog. This is a working economy.
                        </PullQuote>
                    </div>
                </div>
            </section>
        </div>
    );
}
