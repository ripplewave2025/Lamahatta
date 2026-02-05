"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Real social handles
const socialAccounts = [
    {
        platform: "twitter",
        name: "X (Twitter)",
        handle: "@upeshinmars",
        url: "https://x.com/upeshinmars",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        color: "hover:text-white hover:bg-black",
        bgGradient: "from-gray-900 to-black"
    },
    {
        platform: "youtube",
        name: "YouTube",
        handle: "@techinahurry-A",
        url: "https://www.youtube.com/@techinahurry-A",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        color: "hover:text-white hover:bg-red-600",
        bgGradient: "from-red-600 to-red-700"
    },
    {
        platform: "instagram",
        name: "Instagram",
        handle: "@hotbpoison",
        url: "https://www.instagram.com/hotbpoison",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        color: "hover:text-white",
        bgGradient: "from-purple-600 via-pink-500 to-orange-400"
    },
    {
        platform: "threads",
        name: "Threads",
        handle: "@hotbpoison",
        url: "https://www.threads.net/@hotbpoison",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.131 1.37-2.78.813-.55 1.925-.84 3.21-.84.524 0 1.07.043 1.632.13-.02-.488-.09-.935-.207-1.338-.22-.758-.637-1.357-1.24-1.78-.51-.358-1.158-.564-1.925-.612v-2.07c1.088.06 2.052.36 2.867.893.911.594 1.59 1.426 2.017 2.472.42 1.028.617 2.232.584 3.578 1.088.457 1.964 1.126 2.58 2.004.89 1.27 1.22 2.852.96 4.576-.34 2.254-1.36 4.074-3.032 5.411C17.89 23.154 15.35 23.98 12.186 24zm-.09-5.732c1.03-.056 1.836-.433 2.395-1.122.498-.614.822-1.456.964-2.504-.67-.128-1.37-.2-2.082-.2-.96 0-1.746.178-2.337.53-.497.296-.758.69-.732 1.108.026.42.292.781.75 1.016.516.266 1.22.392 2.042.392v-1.22z" />
            </svg>
        ),
        color: "hover:text-white hover:bg-black",
        bgGradient: "from-gray-800 to-black"
    },
    {
        platform: "facebook",
        name: "Facebook",
        handle: "Upesh Bishwakarma",
        url: "https://www.facebook.com/upesh.bishwakarma/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        color: "hover:text-white hover:bg-blue-600",
        bgGradient: "from-blue-600 to-blue-700"
    },
    {
        platform: "github",
        name: "GitHub",
        handle: "ripplewave2025",
        url: "https://github.com/ripplewave2025",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        color: "hover:text-white hover:bg-gray-800",
        bgGradient: "from-gray-700 to-gray-900"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function SocialAccounts() {
    return (
        <section className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                        Stay Connected
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                        Follow Our Journey
                    </h3>
                    <p className="text-white/50 max-w-md mx-auto">
                        Get the latest updates, behind-the-scenes content, and community stories across all platforms.
                    </p>
                </motion.div>

                {/* Social Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {socialAccounts.map((account) => (
                        <motion.div
                            key={account.platform}
                            variants={itemVariants}
                        >
                            <Link
                                href={account.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 text-center transition-all duration-300 hover:border-accent/50 hover:bg-white/10"
                                >
                                    {/* Gradient Overlay on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${account.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                                    {/* Icon */}
                                    <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white/70 mb-4 transition-all duration-300 group-hover:scale-110 ${account.color}`}>
                                        {account.icon}
                                    </div>

                                    {/* Platform Name */}
                                    <h4 className="relative z-10 text-white font-medium text-sm mb-1">
                                        {account.name}
                                    </h4>

                                    {/* Handle */}
                                    <p className="relative z-10 text-white/40 text-xs group-hover:text-accent transition-colors">
                                        {account.handle}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="text-white/40 text-sm mb-2">
                        📧 Want updates in your inbox?
                    </p>
                    <p className="text-white/60 text-xs">
                        Subscribe to our newsletter above for AI-curated highlights from all our social channels.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
