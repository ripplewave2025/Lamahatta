'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Video, ArrowLeft } from "lucide-react"
import CreatePostForm from "@/components/hub/CreatePostForm"
import PostFeed from "@/components/hub/PostFeed"

export default function CreatorsClient({ posts }: { posts: any[] }) {
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
                            <p className="text-xs text-muted">Community Gallery</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Feed */}
            <main className="max-w-2xl mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CreatePostForm category="creators" />
                </motion.div>

                <div className="mt-8">
                    <PostFeed posts={posts} />
                </div>
            </main>
        </div>
    )
}
