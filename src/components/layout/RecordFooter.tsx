"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function RecordFooter() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                        {/* Brand */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h4
                                    className="text-xl font-semibold text-slate-900 mb-4"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {t("hero.title")}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                                    {t("footer.tagline")}
                                </p>

                                {/* Social / Contact Badge */}
                                <div className="mt-6 flex items-center gap-3">
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                        📍 Lamahatta, Darjeeling
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                    {t("footer.navigate")}
                                </h5>
                                <nav className="flex flex-col gap-3">
                                    <Link
                                        href="/why"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("nav.why")}
                                    </Link>
                                    <Link
                                        href="/generations"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("nav.change")}
                                    </Link>
                                    <Link
                                        href="/economy"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("nav.economy")}
                                    </Link>
                                    <Link
                                        href="/challenges"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("nav.challenges")}
                                    </Link>
                                </nav>
                            </motion.div>
                        </div>

                        {/* Opportunities */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                    {t("opportunities.title")}
                                </h5>
                                <nav className="flex flex-col gap-3">
                                    <Link
                                        href="/village"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("opportunities.villagers")}
                                    </Link>
                                    <Link
                                        href="/economy"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("opportunities.investors")}
                                    </Link>
                                    <Link
                                        href="/partners"
                                        className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                                    >
                                        {t("opportunities.partners")}
                                    </Link>
                                </nav>
                            </motion.div>
                        </div>

                        {/* Stay Connected */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                    {t("footer.connected")}
                                </h5>
                                <p className="text-sm text-slate-600 mb-4">
                                    {t("footer.connected.desc")}
                                </p>
                                <Link
                                    href="/updates"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                                >
                                    {t("footer.subscribe")}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 text-center sm:text-left">
                            {t("footer.credit")}
                        </p>
                        <p className="text-xs text-slate-400 italic text-center sm:text-right">
                            {t("footer.unfinished")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
