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
    Sun,
    Brain
} from "lucide-react"

const categories = [
    {
        id: "personality",
        titleKey: "hub.personality",
        descKey: "hub.personality.desc",
        icon: Brain,
        color: "from-fuchsia-500 to-pink-500",
        bgColor: "bg-white/95 backdrop-blur-md",
        iconColor: "text-fuchsia-600",
        href: "/hub/personality",
        featured: true
    },
    {
        id: "creators",
        titleKey: "hub.creators",
        descKey: "hub.creators.desc",
        icon: Video,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-purple-600",
        href: "/hub/creators"
    },
    {
        id: "youth",
        titleKey: "hub.youth",
        descKey: "hub.youth.desc",
        icon: Sparkles,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-cyan-600",
        href: "/hub/youth"
    },
    {
        id: "mothers",
        titleKey: "hub.mothers",
        descKey: "hub.mothers.desc",
        icon: Heart,
        color: "from-rose-500 to-red-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-rose-600",
        href: "/hub/mothers"
    },
    {
        id: "fathers",
        titleKey: "hub.fathers",
        descKey: "hub.fathers.desc",
        icon: Hammer,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-amber-600",
        href: "/hub/fathers"
    },
    {
        id: "updates",
        titleKey: "hub.updates",
        descKey: "hub.updates.desc",
        icon: Megaphone,
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-emerald-600",
        href: "/hub/updates"
    },
    {
        id: "praises",
        titleKey: "hub.praises",
        descKey: "hub.praises.desc",
        icon: Trophy,
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-white/90 backdrop-blur-sm",
        iconColor: "text-yellow-600",
        href: "/hub/praises"
    }

]

export default function SunlightHub() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen relative font-sans">
            {/* Background System */}
            <div className="fixed inset-0 z-0">
                {/* Mobile Portrait BG */}
                <div
                    className="absolute inset-0 block md:hidden bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/mobile-bg.jpg')" }}
                />
                {/* Desktop Landscape BG */}
                <div
                    className="absolute inset-0 hidden md:block bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/desktop-bg.jpg')" }}
                />
                {/* Premium Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 pt-24 pb-16 px-6">

                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <Sun className="w-12 h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                        <h1 className="text-4xl md:text-7xl font-serif text-white drop-shadow-md">
                            {t("hub.title")}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-light drop-shadow-sm"
                    >
                        {t("hub.subtitle")}
                    </motion.p>
                </div>

                {/* Categories Grid */}
                <section className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => {
                            const Icon = category.icon
                            // Make personality taking full width on mobile or specific style
                            const isFeatured = category.featured

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index + 0.3 }}
                                    className={`${isFeatured ? 'md:col-span-1 lg:col-span-1 ring-4 ring-white/20 rounded-2xl' : ''}`}
                                >
                                    <Link href={category.href}>
                                        <div className={`group relative p-8 h-full rounded-2xl ${category.bgColor} border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden`}>

                                            {/* Featured Badge */}
                                            {isFeatured && (
                                                <div className="absolute top-0 right-0 bg-gradient-to-l from-fuchsia-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                                                    POPULAR
                                                </div>
                                            )}

                                            <div className="relative z-10 flex flex-col items-start h-full">
                                                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className={`w-8 h-8 ${category.iconColor}`} />
                                                </div>

                                                <h3 className="text-2xl font-serif text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                                                    {t(category.titleKey)}
                                                </h3>

                                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                                    {t(category.descKey)}
                                                </p>

                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all">
                                                    {t("hub.enter")}
                                                    <ArrowRight className="w-4 h-4 text-amber-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}
