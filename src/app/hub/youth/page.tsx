'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Sparkles, ArrowLeft, Star, Award, Palette } from "lucide-react"

const sampleContent = [
    {
        id: 1,
        author: "Tenzin, 8",
        avatar: "🎨",
        title: "My Drawing of Our Village",
        type: "artwork",
        category: "Art",
        likes: 32
    },
    {
        id: 2,
        author: "Mingma, 12",
        avatar: "📚",
        title: "First in Class!",
        type: "achievement",
        category: "School",
        likes: 45
    },
    {
        id: 3,
        author: "Dawa, 10",
        avatar: "⚽",
        title: "Football Match Winner",
        type: "sports",
        category: "Sports",
        likes: 28
    }
]

export default function YouthPage() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-blue-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-cyan-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-cyan-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.youth")}</h1>
                            <p className="text-xs text-muted">Future of Sunaray</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                {/* Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 mb-8 text-white text-center"
                >
                    <Sparkles className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-2xl font-serif mb-2">Young Voices of Sunaray</h2>
                    <p className="text-white/80 text-sm max-w-md mx-auto">
                        Celebrating the creativity, achievements, and dreams of our village children
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleContent.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-cyan-100 overflow-hidden hover:shadow-lg transition-all group"
                        >
                            {/* Content Preview */}
                            <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                                <span className="text-6xl group-hover:scale-110 transition-transform">
                                    {item.avatar}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="font-serif text-earth mb-1">{item.title}</h3>
                                <p className="text-sm text-muted">by {item.author}</p>

                                <div className="flex items-center gap-2 mt-3 text-amber-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm">{item.likes} likes</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 text-center border border-cyan-100"
                >
                    <Award className="w-10 h-10 text-cyan-500 mx-auto mb-4" />
                    <h3 className="text-xl font-serif text-earth mb-2">Got something to share?</h3>
                    <p className="text-muted text-sm mb-4">
                        Parents can submit their children's artwork, achievements, or stories!
                    </p>
                    <Link
                        href="/auth"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600 transition-colors"
                    >
                        <Palette className="w-4 h-4" />
                        Submit Content
                    </Link>
                </motion.div>
            </main>
        </div>
    )
}
