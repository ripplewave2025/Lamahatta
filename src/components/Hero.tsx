"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Users, Home } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 bg-[#121212]"
                style={{ y }}
            >
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
                <div className="absolute inset-0 gradient-overlay z-10" />

                {/* Background Image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544252899-724bc513b19c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center parallax" />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-glow delay-500" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-20 text-center px-6 max-w-5xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ opacity }}
            >
                {/* Subtitle with Icon */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-3 mb-6"
                >
                    <div className="w-12 h-[1px] bg-accent" />
                    <h2 className="text-accent uppercase tracking-[0.3em] text-sm font-semibold glow-text">
                        {t("hero.subtitle")}
                    </h2>
                    <div className="w-12 h-[1px] bg-accent" />
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight mb-6 leading-tight"
                >
                    {t("hero.welcome")} <br />
                    <span className="italic font-serif gradient-text glow-text text-6xl md:text-8xl lg:text-9xl">
                        Seemana Gaon
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-white/90 text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                    Connecting <span className="text-accent font-semibold">22 Houses</span>, {" "}
                    <span className="text-accent font-semibold">93 Residents</span>, and a world of possibilities.
                </motion.p>

                {/* Stats Pills */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                        <Home className="w-4 h-4 text-accent" />
                        <span className="text-white/90 text-sm">22 Houses</span>
                    </div>
                    <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-white/90 text-sm">93 Residents</span>
                    </div>
                    <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-white/90 text-sm">Lamahatta, Darjeeling</span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <motion.button
                        className="btn-primary w-full sm:w-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Services
                    </motion.button>
                    <Link href="/hub" className="w-full sm:w-auto">
                        <motion.button
                            className="btn-secondary w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("hero.join")}
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-[10px] uppercase tracking-widest">Village OS v1.0</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="w-5 h-5 text-accent" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
