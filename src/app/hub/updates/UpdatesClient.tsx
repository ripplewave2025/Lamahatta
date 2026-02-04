'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Megaphone, ArrowLeft } from "lucide-react"
import CreatePostForm from "@/components/hub/CreatePostForm"
import PostFeed from "@/components/hub/PostFeed"

export default function UpdatesClient({ posts }: { posts: any[] }) {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-emerald-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.updates")}</h1>
                            <p className="text-xs text-muted">Development Board</p>
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
                    <CreatePostForm category="updates" />
                </motion.div>

                <div className="mt-8">
                    <PostFeed posts={posts} />
                </div>
            </main>
        </div>
    )
}
