'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Heart, ArrowLeft, ChefHat, BookOpen, Users } from "lucide-react"

const recipes = [
    {
        id: 1,
        author: "Pema Diki",
        avatar: "👩‍🍳",
        title: "Traditional Sel Roti",
        category: "Recipe",
        likes: 56
    },
    {
        id: 2,
        author: "Yangchen Lhamo",
        avatar: "🍲",
        title: "Authentic Thukpa",
        category: "Recipe",
        likes: 42
    },
    {
        id: 3,
        author: "Karma Doma",
        avatar: "🌿",
        title: "Herbal Remedies for Cold",
        category: "Tradition",
        likes: 38
    }
]

export default function MothersCircle() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-red-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-rose-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-rose-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.mothers")}</h1>
                            <p className="text-xs text-muted">Kitchen stories & wisdom</p>
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
                    className="bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl p-8 mb-8 text-white"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <ChefHat className="w-10 h-10" />
                        <div>
                            <h2 className="text-2xl font-serif">Ama's Circle</h2>
                            <p className="text-white/80">Recipes, traditions & generational wisdom</p>
                        </div>
                    </div>
                    <p className="text-white/90 text-sm">
                        A space for mothers to share recipes, parenting tips, and the beautiful traditions that make our village special.
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { icon: ChefHat, label: "Recipes", count: 12 },
                        { icon: BookOpen, label: "Traditions", count: 8 },
                        { icon: Users, label: "Parenting", count: 5 }
                    ].map((cat, i) => (
                        <motion.button
                            key={cat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 bg-white rounded-xl border border-rose-100 hover:border-rose-300 transition-colors text-center"
                        >
                            <cat.icon className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-earth">{cat.label}</p>
                            <p className="text-xs text-muted">{cat.count} posts</p>
                        </motion.button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipes.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-white rounded-2xl border border-rose-100 p-5 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-2xl">
                                    {item.avatar}
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full">
                                        {item.category}
                                    </span>
                                    <h3 className="font-serif text-lg text-earth mt-2">{item.title}</h3>
                                    <p className="text-sm text-muted">by {item.author}</p>
                                    <div className="flex items-center gap-1 mt-2 text-rose-500">
                                        <Heart className="w-4 h-4 fill-current" />
                                        <span className="text-sm">{item.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>
        </div>
    )
}
