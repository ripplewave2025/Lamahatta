'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Hammer, ArrowLeft, Wrench, Tractor, Lightbulb, Users } from "lucide-react"

const posts = [
    {
        id: 1,
        author: "Dorje Tamang",
        avatar: "🔨",
        title: "Building Earthquake-Safe Homes",
        category: "Construction",
        likes: 34
    },
    {
        id: 2,
        author: "Phurba Sherpa",
        avatar: "🌾",
        title: "Organic Farming: First Season Tips",
        category: "Farming",
        likes: 28
    },
    {
        id: 3,
        author: "Tshering Bhutia",
        avatar: "💡",
        title: "Starting a Small Business Guide",
        category: "Business",
        likes: 45
    }
]

export default function FathersGuild() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-amber-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-amber-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                            <Hammer className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.fathers")}</h1>
                            <p className="text-xs text-muted">Builder's corner</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 mb-8 text-white"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Hammer className="w-10 h-10" />
                        <div>
                            <h2 className="text-2xl font-serif">Bua's Guild</h2>
                            <p className="text-white/80">Construction, farming & mentorship</p>
                        </div>
                    </div>
                    <p className="text-white/90 text-sm">
                        Where village builders share skills, farming knowledge, and business advice to help our community grow.
                    </p>
                </motion.div>

                {/* Skills Categories */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {[
                        { icon: Wrench, label: "Construction" },
                        { icon: Tractor, label: "Farming" },
                        { icon: Lightbulb, label: "Business" },
                        { icon: Users, label: "Mentorship" }
                    ].map((cat, i) => (
                        <motion.button
                            key={cat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-3 bg-white rounded-xl border border-amber-100 hover:border-amber-300 transition-colors text-center"
                        >
                            <cat.icon className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                            <p className="text-xs font-medium text-earth">{cat.label}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Posts */}
                <div className="space-y-4">
                    {posts.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-white rounded-2xl border border-amber-100 p-5 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
                                    {item.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-lg text-earth">{item.title}</h3>
                                    <p className="text-sm text-muted">by {item.author}</p>
                                </div>
                                <div className="text-amber-500 font-medium text-sm">
                                    ❤️ {item.likes}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Mentorship CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-earth rounded-2xl p-6 text-white text-center"
                >
                    <Users className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="text-lg font-serif mb-2">Become a Mentor</h3>
                    <p className="text-white/80 text-sm mb-4">
                        Share your expertise with the next generation
                    </p>
                    <Link
                        href="/auth"
                        className="inline-block px-5 py-2.5 bg-amber-500 text-earth rounded-full text-sm font-medium hover:bg-amber-400 transition-colors"
                    >
                        Apply as Mentor
                    </Link>
                </motion.div>
            </main>
        </div>
    )
}
