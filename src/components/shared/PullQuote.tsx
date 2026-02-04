"use client";

import { motion } from "framer-motion";

interface PullQuoteProps {
    children: React.ReactNode;
    dark?: boolean;
}

export default function PullQuote({ children, dark = false }: PullQuoteProps) {
    return (
        <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`pull-quote ${dark ? "pull-quote-dark" : ""}`}
        >
            <p>{children}</p>
        </motion.blockquote>
    );
}
