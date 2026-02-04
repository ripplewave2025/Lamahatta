"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeHero() {
    const { t } = useLanguage();

    // Portals with translated content
    const portals = [
        {
            id: "villagers",
            titleKey: "opportunities.villagers",
            subtitleKey: "opportunities.villagers.desc",
            href: "/hub",
            color: "from-green-600 to-green-800",
        },
        {
            id: "investors",
            titleKey: "opportunities.investors",
            subtitleKey: "opportunities.investors.desc",
            href: "/economy",
            color: "from-amber-600 to-amber-800",
        },
        {
            id: "partners",
            titleKey: "opportunities.partners",
            subtitleKey: "opportunities.partners.desc",
            href: "/partners",
            color: "from-blue-600 to-blue-800",
        },
    ];

    // Opportunities with translated content
    const opportunities = [
        { sectorKey: "gaps.homestay", icon: "🏠" },
        { sectorKey: "gaps.cafe", icon: "☕" },
        { sectorKey: "gaps.guide", icon: "🥾" },
        { sectorKey: "gaps.organic", icon: "🌱" },
    ];

    // Active economy with translated content
    const activeEconomy = [
        { categoryKey: "economy.food", count: 12 },
        { categoryKey: "economy.agriculture", count: 8 },
        { categoryKey: "economy.construction", count: 6 },
        { categoryKey: "economy.digital", count: 4 },
    ];

    return (
        <>
            {/* Hero Section with Full Image */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/village-hero.png"
                        alt="Seemana Gaon village panorama"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs uppercase tracking-[0.3em]">
                            {t("hero.location")}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("hero.title")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-8"
                    >
                        {t("hero.subtitle")}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex justify-center gap-8 md:gap-16 mb-12"
                    >
                        {[
                            { num: "22", labelKey: "hero.houses" },
                            { num: "93", labelKey: "hero.residents" },
                            { num: "∞", labelKey: "hero.potential" }
                        ].map((stat) => (
                            <div key={stat.labelKey} className="text-center">
                                <div className="text-4xl md:text-6xl font-serif text-amber-400">
                                    {stat.num}
                                </div>
                                <div className="text-xs uppercase tracking-widest text-white/50 mt-1">
                                    {t(stat.labelKey)}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="#opportunities"
                            className="px-8 py-4 bg-amber-500 text-earth text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors font-medium"
                        >
                            {t("hero.opportunity")}
                        </Link>
                        <Link
                            href="/why"
                            className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest hover:border-amber-400 hover:text-amber-400 transition-colors"
                        >
                            {t("hero.story")}
                        </Link>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white/50 text-sm"
                        >
                            {t("hero.scroll")}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Opportunities (Portals) */}
            <section id="opportunities" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-earth">
                            {t("opportunities.title")}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {portals.map((portal, index) => (
                            <motion.div
                                key={portal.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={portal.href}
                                    className={`block p-8 bg-gradient-to-br ${portal.color} text-white rounded-lg hover:scale-105 transition-transform duration-300`}
                                >
                                    <h3 className="text-2xl font-serif mb-2">{t(portal.titleKey)}</h3>
                                    <p className="text-white/80 text-sm">{t(portal.subtitleKey)}</p>
                                    <span className="inline-block mt-4 text-sm">
                                        {t("opportunities.enter")}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Map Section */}
            <section className="py-20 bg-warmgray overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-amber-600 text-xs uppercase tracking-[0.2em]">{t("location.label")}</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-earth mt-2">
                            {t("location.title")}
                        </h2>
                        <p className="text-muted mt-4">
                            {t("location.subtitle")}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Satellite Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <Image
                                src="/village-satellite.jpg"
                                alt="Satellite view of Seemana Gaon"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white">
                                <p className="text-xs uppercase tracking-widest mb-1">{t("location.satellite")}</p>
                                <p className="text-sm font-serif">{t("location.houses")}</p>
                            </div>
                        </motion.div>

                        {/* Map Embed */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.6946688647565!2d88.3499!3d27.0747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA0JzI4LjkiTiA4OMKwMjEnMDMuNiJF!5e0!3m2!1sen!2sin!4v1625634582918!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href="https://maps.app.goo.gl/QqA7aTt1YWLqjKMHA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium border-b border-amber-600/30 hover:border-amber-600 transition-colors pb-1"
                        >
                            {t("location.maps")}
                        </a>
                    </div>
                </div>
            </section>

            {/* Village Life Image Section */}
            <section className="relative py-32">
                <div className="absolute inset-0">
                    <Image
                        src="/village-life.png"
                        alt="Village tea stall gathering"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-serif italic leading-relaxed"
                    >
                        &ldquo;{t("life.quote")}&rdquo;
                    </motion.blockquote>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-white/60"
                    >
                        {t("life.attribution")}
                    </motion.p>
                </div>
            </section>

            {/* Opportunity Gaps */}
            <section className="py-20 bg-warmgray">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-amber-600 text-xs uppercase tracking-[0.2em]">
                                {t("gaps.label")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-earth mt-2 mb-4">
                                {t("gaps.title")}
                            </h2>
                            <p className="text-muted mb-8">
                                {t("gaps.subtitle")}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {opportunities.map((opp) => (
                                    <div
                                        key={opp.sectorKey}
                                        className="bg-white p-4 border border-border hover:border-amber-400 transition-colors"
                                    >
                                        <span className="text-2xl">{opp.icon}</span>
                                        <h3 className="font-serif text-lg mt-2">{t(opp.sectorKey)}</h3>
                                        <span className="text-xs text-red-600 uppercase">{t("gaps.status")}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-80 md:h-96 rounded-lg overflow-hidden"
                        >
                            <Image
                                src="/homestay.png"
                                alt="Potential homestay with mountain view"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4">
                                <p className="text-sm text-earth">
                                    {t("gaps.potential")}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Do - Economy */}
            <section className="py-20 bg-earth text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative h-80 md:h-96 rounded-lg overflow-hidden order-2 md:order-1"
                        >
                            <Image
                                src="/village-economy.png"
                                alt="Village economic activities"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <span className="text-amber-400 text-xs uppercase tracking-[0.2em]">
                                {t("economy.label")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                                {t("economy.title")}
                            </h2>
                            <p className="text-white/70 mb-8">
                                {t("economy.subtitle")}
                            </p>

                            <div className="space-y-4">
                                {activeEconomy.map((item) => (
                                    <div
                                        key={item.categoryKey}
                                        className="flex justify-between items-center border-b border-white/10 pb-3"
                                    >
                                        <span>{t(item.categoryKey)}</span>
                                        <span className="text-amber-400">{item.count} {t("economy.active")}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/economy"
                                className="inline-block mt-8 px-6 py-3 bg-amber-500 text-earth text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors"
                            >
                                {t("economy.view")}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Vision */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-amber-600 text-xs uppercase tracking-[0.2em]">
                            {t("vision.label")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-earth mt-2 mb-8">
                            {t("vision.title")}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            { num: "01", titleKey: "vision.portal", descKey: "vision.portal.desc" },
                            { num: "02", titleKey: "vision.hub", descKey: "vision.hub.desc" },
                            { num: "03", titleKey: "vision.network", descKey: "vision.network.desc" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 border border-border hover:border-amber-400 transition-colors"
                            >
                                <span className="text-4xl font-serif text-amber-400">{item.num}</span>
                                <h3 className="font-serif text-xl mt-4 mb-2">{t(item.titleKey)}</h3>
                                <p className="text-sm text-muted">{t(item.descKey)}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl font-serif text-muted italic"
                    >
                        &ldquo;{t("vision.quote")}&rdquo;
                    </motion.p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-earth">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-8">
                        {t("cta.title")}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/partners"
                            className="px-8 py-4 bg-amber-500 text-earth text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors"
                        >
                            {t("cta.partner")}
                        </Link>
                        <Link
                            href="/why"
                            className="px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-widest hover:border-amber-400 transition-colors"
                        >
                            {t("cta.story")}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
