"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    label?: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
}

export default function PageHeader({ label, title, subtitle, dark = false }: PageHeaderProps) {
    return (
        <header className="py-24 md:py-32">
            <div className="page-narrow">
                {label && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="section-label"
                    >
                        {label}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`page-title ${dark ? "text-warmgray" : ""}`}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="page-subtitle"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </header>
    );
}
