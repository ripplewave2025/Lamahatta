"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import { supabase } from "@/lib/supabase";

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
    const [formData, setFormData] = useState({ phone: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone.trim()) return;

        setStatus("loading");
        try {
            const { error } = await supabase.from("contact_requests").insert({
                phone: formData.phone,
                message: formData.message,
                type: "investor"
            });

            if (error) throw error;
            setStatus("success");
            setFormData({ phone: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

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

            {/* Investor Section */}
            <section className="py-20 bg-earth text-white">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-amber-400 text-xs uppercase tracking-[0.2em]">For Investors</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">A Letter to You</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-lg mb-12"
                    >
                        <div className="prose prose-invert max-w-none text-white/80">
                            <p className="text-lg leading-relaxed mb-6">
                                Dear Investor,
                            </p>
                            <p className="leading-relaxed mb-4">
                                If you are looking for land to build a vacation home, homestay, restaurant, or retreat
                                in the mountains of Darjeeling — we welcome you to Sunaray Gown.
                            </p>
                            <p className="leading-relaxed mb-4">
                                Our village sits at the edge of Lamahatta, surrounded by pine forests and
                                mountain views. We have 22 houses, 93 residents, and a community that values
                                careful growth over quick money.
                            </p>
                            <p className="leading-relaxed mb-4">
                                We are open to partnerships that respect our land, involve our people, and
                                contribute to the local economy. Whether you want to build a boutique homestay,
                                a small café, or simply own a piece of mountain peace — let&apos;s talk.
                            </p>
                            <p className="leading-relaxed text-amber-300 italic">
                                We remember who stood with us when we were small.
                            </p>
                        </div>
                    </motion.div>

                    {/* Investor Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-md mx-auto"
                    >
                        <h3 className="text-xl font-serif mb-6 text-center">Interested in Investing?</h3>

                        {status === "success" ? (
                            <div className="text-center p-8 bg-green-900/30 border border-green-500/30 rounded-lg">
                                <span className="text-4xl mb-4 block">✅</span>
                                <p className="text-green-300 font-medium">Thank you! We&apos;ll be in touch soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white focus:border-amber-400 focus:outline-none transition-colors rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">What are you interested in?</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        placeholder="E.g., Building a homestay, buying land, opening a café..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white focus:border-amber-400 focus:outline-none transition-colors resize-none rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full px-8 py-4 bg-amber-500 text-earth text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors disabled:opacity-50 font-medium rounded"
                                >
                                    {status === "loading" ? "Sending..." : "Contact Us"}
                                </button>
                                {status === "error" && (
                                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link
                            href="/partners"
                            className="text-amber-400 hover:text-amber-300 text-sm uppercase tracking-widest border-b border-amber-400/30 hover:border-amber-400 pb-1 transition-colors"
                        >
                            Learn More About Partnerships →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
