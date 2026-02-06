"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";

export default function UpdatesPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen">
            <PageHeader
                label="Stay Connected"
                title="Stay In Touch"
                subtitle="Local updates, government schemes, opportunities."
            />

            <section className="section">
                <div className="page-narrow">
                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm text-muted mb-2"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors"
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full justify-center">
                                Subscribe to Updates
                            </button>

                            <p className="text-xs text-muted text-center mt-6">
                                No spam. No noise.
                            </p>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center max-w-md mx-auto"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 border border-accent rounded-full flex items-center justify-center">
                                <span className="text-accent text-2xl">✓</span>
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Thank you</h3>
                            <p className="text-muted">
                                You&apos;ll receive updates about:<br />
                                local news, government schemes, and village opportunities.
                            </p>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="record-card text-center">
                            <span className="section-label">Updates</span>
                            <h4 className="font-serif text-lg mt-2">Local News</h4>
                            <p className="text-sm text-muted mt-2">
                                What&apos;s happening in and around the village
                            </p>
                        </div>
                        <div className="record-card text-center">
                            <span className="section-label">Opportunities</span>
                            <h4 className="font-serif text-lg mt-2">Govt Schemes</h4>
                            <p className="text-sm text-muted mt-2">
                                Grants, programs, and support available
                            </p>
                        </div>
                        <div className="record-card text-center">
                            <span className="section-label">Change</span>
                            <h4 className="font-serif text-lg mt-2">Progress</h4>
                            <p className="text-sm text-muted mt-2">
                                What&apos;s improving, what&apos;s next
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
