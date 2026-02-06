"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";

const whyPartner = [
    { title: "Genuine Service", desc: "We serve our community first" },
    { title: "Local Pride", desc: "We take pride in our work" },
    { title: "Careful Growth", desc: "We grow without losing identity" },
    { title: "Long Memory", desc: "We remember who stood with us" },
];

const experiences = [
    "Good food",
    "Honest hospitality",
    "Humor and warmth",
    "Shared enjoyment",
    "A sense of belonging"
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="Invest & Collaborate"
                title="Work With Us"
                subtitle="We are valuable because we serve genuinely, grow carefully, and remember."
            />

            <section className="section">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Why Partner */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {whyPartner.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 border border-border hover:border-accent transition-colors"
                            >
                                <div className="w-10 h-10 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                    <span className="text-accent font-serif">{index + 1}</span>
                                </div>
                                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* What Visitors Experience */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-earth text-warmgray p-12 mb-16"
                    >
                        <h3 className="font-serif text-2xl text-center mb-8">
                            People who come here experience:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {experiences.map((exp) => (
                                <span
                                    key={exp}
                                    className="px-5 py-2 border border-warmgray/20 text-sm"
                                >
                                    {exp}
                                </span>
                            ))}
                        </div>
                        <p className="text-center mt-8 text-warmgray/60 font-serif italic">
                            &quot;We do not sell spectacle. We build trust.&quot;
                        </p>
                    </motion.div>

                    {/* Contact Form Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="font-serif text-2xl mb-4">
                            Interested in partnering?
                        </h3>
                        <p className="text-muted mb-8">
                            Reach out for investment opportunities, collaborations, or visits.
                        </p>
                        <a
                            href="mailto:hello@seemanagaon.com"
                            className="inline-block px-8 py-4 bg-accent text-earth text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
                        >
                            Get In Touch
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
