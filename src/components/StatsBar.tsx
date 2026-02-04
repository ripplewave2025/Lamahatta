"use client";

import { motion, useInView } from "framer-motion";
import { Home, Users, Briefcase, Globe } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface StatItemProps {
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix?: string;
    delay: number;
}

function StatItem({ icon, value, label, suffix = "", delay }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="glass-card text-center group hover-lift"
        >
            <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors">
                    {icon}
                </div>
            </div>
            <div className="text-4xl md:text-5xl font-light text-white mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm uppercase tracking-widest text-white/70">
                {label}
            </div>
        </motion.div>
    );
}

export default function StatsBar() {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-white">
                        Village at a <span className="gradient-text">Glance</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        A thriving community in the heart of Lamahatta, Darjeeling
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatItem
                        icon={<Home className="w-6 h-6 text-accent" />}
                        value={22}
                        label="Houses"
                        delay={0.1}
                    />
                    <StatItem
                        icon={<Users className="w-6 h-6 text-accent" />}
                        value={93}
                        label="Residents"
                        delay={0.2}
                    />
                    <StatItem
                        icon={<Briefcase className="w-6 h-6 text-accent" />}
                        value={15}
                        suffix="+"
                        label="Services"
                        delay={0.3}
                    />
                    <StatItem
                        icon={<Globe className="w-6 h-6 text-accent" />}
                        value={10}
                        label="Languages"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
