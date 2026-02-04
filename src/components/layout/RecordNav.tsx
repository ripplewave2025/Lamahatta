"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "@/components/LanguageToggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/why", label: "Why This Exists" },
    { href: "/generations", label: "Change" },
    { href: "/economy", label: "What We Do" },
    { href: "/challenges", label: "Challenges" },
    { href: "/voices", label: "Voices" },
];

export default function RecordNav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-serif text-lg md:text-xl tracking-wide text-slate-900 hover:text-amber-600 transition-colors"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Seemana Gaon
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs xl:text-sm font-medium uppercase tracking-wider text-slate-600 hover:text-amber-600 transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
                                </Link>
                            ))}
                            <div className="ml-2">
                                <LanguageToggle />
                            </div>
                        </div>

                        {/* Mobile: Language + Menu */}
                        <div className="flex lg:hidden items-center gap-2">
                            <LanguageToggle />
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-5 flex flex-col justify-between">
                                    <motion.span
                                        animate={{
                                            rotate: mobileOpen ? 45 : 0,
                                            y: mobileOpen ? 8 : 0
                                        }}
                                        className="block h-0.5 bg-slate-700 rounded-full origin-left"
                                    />
                                    <motion.span
                                        animate={{ opacity: mobileOpen ? 0 : 1 }}
                                        className="block h-0.5 bg-slate-700 rounded-full"
                                    />
                                    <motion.span
                                        animate={{
                                            rotate: mobileOpen ? -45 : 0,
                                            y: mobileOpen ? -8 : 0
                                        }}
                                        className="block h-0.5 bg-slate-700 rounded-full origin-left"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-16 left-0 right-0 bg-white shadow-xl z-40 lg:hidden border-b border-slate-100"
                        >
                            <div className="max-w-7xl mx-auto px-4 py-6">
                                <nav className="flex flex-col gap-1">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block py-3 px-4 text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Mobile CTA */}
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <Link
                                        href="/partners"
                                        className="block w-full py-3 px-4 text-center bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Partner With Us
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
