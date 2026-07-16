"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error: insertError } = await supabase
                .from('newsletter_subscribers')
                .insert({ email: email.toLowerCase().trim() });

            if (insertError) {
                // Handle duplicate email error
                if (insertError.code === '23505') {
                    setError("This email is already subscribed!");
                } else {
                    setError("Failed to subscribe. Please try again.");
                    console.error('Newsletter error:', insertError);
                }
                setIsSubmitting(false);
                return;
            }

            setIsSubmitting(false);
            setIsSubmitted(true);
            setEmail("");
        } catch (err) {
            console.error('Newsletter error:', err);
            setError("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                >
                    <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-light text-white mb-2">Subscribed!</h3>
                <p className="text-white/70">
                    You&apos;ll receive updates about government schemes, grants, and village benefits.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-accent hover:text-accent-hover transition-colors text-sm"
                >
                    Subscribe another email
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-accent/20">
                    <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <h3 className="text-2xl font-light text-white">Stay Updated</h3>
                    <p className="text-white/60 text-sm">Government schemes, grants & benefits</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/20"
                            } rounded-lg p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors`}
                    />
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        <>
                            <Mail className="w-4 h-4" />
                            Subscribe to Newsletter
                        </>
                    )}
                </motion.button>
            </form>

            <p className="text-white/40 text-xs mt-4 text-center">
                Receive updates about govt schemes, online portals & village opportunities.
                We store your email to send updates.{" "}
                <Link href="/privacy" className="text-white/55 underline hover:text-accent">
                    Privacy Policy
                </Link>
            </p>
        </motion.div>
    );
}
