'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import {
    Video,
    Sparkles,
    Heart,
    Hammer,
    Megaphone,
    Trophy,
    ArrowRight,
    Sun
} from "lucide-react"

const categories = [
    {
        id: "creators",
        titleKey: "hub.creators",
        descKey: "hub.creators.desc",
        icon: Video,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        href: "/hub/creators"
    },
    {
        id: "youth",
        titleKey: "hub.youth",
        descKey: "hub.youth.desc",
        icon: Sparkles,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-50",
        iconColor: "text-cyan-600",
        href: "/hub/youth"
    },
    {
        id: "mothers",
        titleKey: "hub.mothers",
        descKey: "hub.mothers.desc",
        icon: Heart,
        color: "from-rose-500 to-red-500",
        bgColor: "bg-rose-50",
        iconColor: "text-rose-600",
        href: "/hub/mothers"
    },
    {
        id: "fathers",
        titleKey: "hub.fathers",
        descKey: "hub.fathers.desc",
        icon: Hammer,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-50",
        iconColor: "text-amber-600",
        href: "/hub/fathers"
    },
    {
        id: "updates",
        titleKey: "hub.updates",
        descKey: "hub.updates.desc",
        icon: Megaphone,
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-50",
        iconColor: "text-emerald-600",
        href: "/hub/updates"
    },
    {
        id: "praises",
        titleKey: "hub.praises",
        descKey: "hub.praises.desc",
        icon: Trophy,
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-600",
        href: "/hub/praises"
    }
]

export default function SunlightHub() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                {/* Decorative sun rays */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-20">
                    <div className="absolute inset-0 bg-gradient-radial from-amber-300 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <Sun className="w-10 h-10 text-amber-500" />
                        <h1 className="text-4xl md:text-6xl font-serif text-earth">
                            {t("hub.title")}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8"
                    >
                        {t("hub.subtitle")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Link
                            href="/auth"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-medium shadow-lg shadow-amber-500/25"
                        >
                            {t("hub.join")}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-serif text-earth mb-2">
                        {t("hub.explore")}
                    </h2>
                    <p className="text-muted">{t("hub.explore.desc")}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => {
                        const Icon = category.icon
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index + 0.4 }}
                            >
                                <Link href={category.href}>
                                    <div className={`group relative p-6 rounded-2xl ${category.bgColor} border border-white/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden`}>
                                        {/* Gradient overlay on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                        <div className="relative z-10">
                                            <div className={`w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`w-7 h-7 ${category.iconColor}`} />
                                            </div>

                                            <h3 className="text-xl font-serif text-earth mb-2 group-hover:text-amber-700 transition-colors">
                                                {t(category.titleKey)}
                                            </h3>

                                            <p className="text-sm text-muted leading-relaxed">
                                                {t(category.descKey)}
                                            </p>

                                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t("hub.enter")}
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-earth py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { num: "93", label: t("hub.stats.members") },
                            { num: "22", label: t("hub.stats.families") },
                            { num: "∞", label: t("hub.stats.stories") }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-3xl md:text-5xl font-serif text-amber-400 mb-2">
                                    {stat.num}
                                </div>
                                <div className="text-xs md:text-sm uppercase tracking-wider text-white/60">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
