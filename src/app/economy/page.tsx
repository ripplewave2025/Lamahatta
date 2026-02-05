"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

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
    const { t } = useLanguage();
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
                label={t("economy.label")}
                title={t("economy.title")}
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
                        <span className="text-amber-400 text-xs uppercase tracking-[0.2em]">{t("investor.label")}</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">{t("investor.title")}</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-lg mb-12"
                    >
                        <div className="prose prose-invert max-w-none text-white/80">
                            <p className="text-lg leading-relaxed mb-6">
                                {t("investor.greeting")}
                            </p>
                            <p className="leading-relaxed mb-4">
                                {t("investor.p1")}
                            </p>
                            <p className="leading-relaxed mb-4">
                                {t("investor.p2")}
                            </p>
                            <p className="leading-relaxed mb-4">
                                {t("investor.p3")}
                            </p>
                            <p className="leading-relaxed text-amber-300 italic">
                                {t("investor.closing")}
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
                        <h3 className="text-xl font-serif mb-6 text-center">{t("investor.formTitle")}</h3>

                        {status === "success" ? (
                            <div className="text-center p-8 bg-green-900/30 border border-green-500/30 rounded-lg">
                                <span className="text-4xl mb-4 block">✅</span>
                                <p className="text-green-300 font-medium">{t("investor.success")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">{t("investor.phone")} *</label>
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
                                    <label className="block text-sm text-white/60 mb-2">{t("investor.interest")}</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        placeholder={t("investor.placeholder")}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white focus:border-amber-400 focus:outline-none transition-colors resize-none rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full px-8 py-4 bg-amber-500 text-earth text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors disabled:opacity-50 font-medium rounded"
                                >
                                    {status === "loading" ? t("investor.sending") : t("investor.submit")}
                                </button>
                                {status === "error" && (
                                    <p className="text-red-400 text-sm text-center">{t("investor.error")}</p>
                                )}
                            </form>
                        )}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link
                            href="/partners"
                            className="text-amber-400 hover:text-amber-300 text-sm uppercase tracking-widest border-b border-amber-400/30 hover:border-amber-400 pb-1 transition-colors"
                        >
                            {t("investor.learn")}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
