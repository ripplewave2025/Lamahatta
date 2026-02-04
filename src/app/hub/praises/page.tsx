'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Trophy, ArrowLeft, Star, ThumbsUp, PartyPopper, Medal } from "lucide-react"

const achievements = [
    {
        id: 1,
        title: "Village Cleanup Champion",
        recipient: "Sunaray Youth Group",
        date: "Jan 2026",
        type: "community",
        emoji: "🏆"
    },
    {
        id: 2,
        title: "Best Homestay Award",
        recipient: "Karma's Family",
        date: "Dec 2025",
        type: "business",
        emoji: "⭐"
    },
    {
        id: 3,
        title: "Thank You",
        recipient: "To all who helped during Losar",
        date: "Feb 2026",
        type: "thanks",
        emoji: "🙏"
    },
    {
        id: 4,
        title: "Festival Highlight",
        recipient: "Losar Celebration 2026",
        date: "Feb 2026",
        type: "festival",
        emoji: "🎉"
    }
]

export default function PraisesPage() {
    const { t } = useLanguage()

    const getTypeColor = (type: string) => {
        switch (type) {
            case "community": return "from-yellow-400 to-amber-500"
            case "business": return "from-purple-400 to-pink-500"
            case "thanks": return "from-rose-400 to-red-500"
            case "festival": return "from-green-400 to-emerald-500"
            default: return "from-amber-400 to-orange-500"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-amber-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-yellow-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-yellow-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-yellow-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.praises")}</h1>
                            <p className="text-xs text-muted">Celebrate together</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-8 mb-8 text-white text-center"
                >
                    <PartyPopper className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-2xl font-serif mb-2">Praises & Pride</h2>
                    <p className="text-white/90 text-sm max-w-md mx-auto">
                        Celebrating achievements, expressing gratitude, and sharing moments of joy from our village
                    </p>
                </motion.div>

                {/* Quick Actions */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {[
                        { icon: Trophy, label: "Achievements" },
                        { icon: ThumbsUp, label: "Thank You" },
                        { icon: Star, label: "Highlights" },
                        { icon: Medal, label: "Awards" }
                    ].map((action, i) => (
                        <motion.button
                            key={action.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-yellow-200 rounded-full hover:bg-yellow-50 transition-colors whitespace-nowrap"
                        >
                            <action.icon className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{action.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="relative overflow-hidden rounded-2xl border border-yellow-100 bg-white hover:shadow-xl transition-shadow group"
                        >
                            {/* Gradient Header */}
                            <div className={`h-24 bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center`}>
                                <span className="text-5xl group-hover:scale-110 transition-transform">
                                    {item.emoji}
                                </span>
                            </div>

                            <div className="p-5">
                                <span className="text-xs text-muted">{item.date}</span>
                                <h3 className="font-serif text-lg text-earth mt-1">{item.title}</h3>
                                <p className="text-sm text-amber-700 mt-2">{item.recipient}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Submit CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-2xl p-6 text-center"
                >
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <h3 className="text-lg font-serif text-earth mb-2">Share a Praise</h3>
                    <p className="text-muted text-sm mb-4">
                        Want to thank someone or celebrate an achievement?
                    </p>
                    <Link
                        href="/auth"
                        className="inline-block px-5 py-2.5 bg-yellow-500 text-earth rounded-full text-sm font-medium hover:bg-yellow-400 transition-colors"
                    >
                        Submit a Praise
                    </Link>
                </motion.div>
            </main>
        </div>
    )
}
