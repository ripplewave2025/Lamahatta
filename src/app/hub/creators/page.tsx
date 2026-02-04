'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Video, ArrowLeft, Play, Heart, MessageCircle, Share2 } from "lucide-react"

// Sample content - will be replaced with Supabase data
const samplePosts = [
    {
        id: 1,
        author: "Suman Tamang",
        avatar: "🎬",
        title: "Village Morning Routine",
        type: "video",
        likes: 24,
        comments: 5,
        timeAgo: "2h ago"
    },
    {
        id: 2,
        author: "Maya Sherpa",
        avatar: "🎥",
        title: "Traditional Momo Making",
        type: "video",
        likes: 48,
        comments: 12,
        timeAgo: "5h ago"
    },
    {
        id: 3,
        author: "Raj Gurung",
        avatar: "📹",
        title: "Sunrise at Lamahatta",
        type: "video",
        likes: 67,
        comments: 8,
        timeAgo: "1d ago"
    }
]

export default function CreatorsCorner() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-purple-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-purple-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Video className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.creators")}</h1>
                            <p className="text-xs text-muted">3 creators active</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Feed */}
            <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Create Post CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white"
                >
                    <h2 className="text-xl font-serif mb-2">Share Your Creation</h2>
                    <p className="text-white/80 text-sm mb-4">
                        Got a video showcasing village life? Upload and share with the community!
                    </p>
                    <Link
                        href="/auth"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium hover:bg-purple-50 transition-colors"
                    >
                        <Play className="w-4 h-4" />
                        Upload Video
                    </Link>
                </motion.div>

                {/* Feed */}
                <div className="space-y-4">
                    {samplePosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Post Header */}
                            <div className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                                    {post.avatar}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-earth">{post.author}</p>
                                    <p className="text-xs text-muted">{post.timeAgo}</p>
                                </div>
                            </div>

                            {/* Video Placeholder */}
                            <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                    <Play className="w-8 h-8 text-purple-600 ml-1" />
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="p-4">
                                <h3 className="font-serif text-lg text-earth mb-3">{post.title}</h3>

                                {/* Actions */}
                                <div className="flex items-center gap-6 text-muted">
                                    <button className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                                        <Heart className="w-5 h-5" />
                                        <span className="text-sm">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-sm">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Coming Soon Note */}
                <div className="mt-8 p-6 text-center border-2 border-dashed border-purple-200 rounded-2xl">
                    <p className="text-muted text-sm">
                        More creator content coming soon! Sign up to be notified.
                    </p>
                </div>
            </main>
        </div>
    )
}
