'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from 'lucide-react'

interface Post {
    id: number
    content: string
    media_url: string | null
    media_type: string | null
    created_at: string
    likes_count: number
    profiles: {
        full_name: string
        avatar_url: string | null
    } | null // If user is deleted or join fails
}

function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
}

export default function PostFeed({ posts }: { posts: any[] }) {
    // Cast to Post for safety inside
    const safePosts = posts as Post[]

    if (!safePosts || safePosts.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No stories yet in this village.</p>
                <p className="text-sm text-gray-400">Be the first to share something!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {safePosts.map((post, i) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border border-amber-200">
                                {post.profiles?.avatar_url ? (
                                    <img src={post.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-amber-600" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-earth">
                                    {post.profiles?.full_name || 'Villager'}
                                </h3>
                                <p className="text-xs text-gray-500">{timeAgo(post.created_at)}</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4">
                        <p className="text-earth/90 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    {/* Media */}
                    {post.media_url && (
                        <div className="bg-black/5">
                            {post.media_type === 'video' ? (
                                <video
                                    src={post.media_url}
                                    controls
                                    className="w-full max-h-[500px] object-contain"
                                />
                            ) : (
                                <img
                                    src={post.media_url}
                                    alt="Post content"
                                    className="w-full max-h-[500px] object-cover"
                                />
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 flex items-center gap-6 border-t border-gray-50">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.likes_count || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Comment</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors ml-auto">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
