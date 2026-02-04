'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createPost } from '@/app/hub/actions'
import { Loader2, Image as ImageIcon, Video, Send, X, Paperclip } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function CreatePostForm({ category }: { category: string }) {
    const { t } = useLanguage()
    const [content, setContent] = useState('')
    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setMediaFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const clearFile = () => {
        setMediaFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() && !mediaFile) return

        setLoading(true)
        let mediaUrl = ''
        let mediaType = 'none'

        try {
            // Check auth first client-side to be fast
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                alert("Please sign in to post!") // Replace with better UI later
                setLoading(false)
                return
            }

            // 1. Upload Media
            if (mediaFile) {
                const fileExt = mediaFile.name.split('.').pop()
                const fileName = `${category}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('hub-media')
                    .upload(fileName, mediaFile)

                if (uploadError) throw uploadError

                const { data } = supabase.storage.from('hub-media').getPublicUrl(fileName)
                mediaUrl = data.publicUrl
                mediaType = mediaFile.type.startsWith('video/') ? 'video' : 'image'
            }

            // 2. Server Action
            const formData = new FormData()
            formData.append('category', category)
            formData.append('content', content)
            formData.append('mediaUrl', mediaUrl)
            formData.append('mediaType', mediaType)

            const result = await createPost(null, formData)

            if (result?.error) {
                alert(result.error)
            } else {
                setContent('')
                clearFile()
            }
        } catch (error: any) {
            console.error(error)
            alert('Failed to post: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-4 mb-8">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share something with the village..."
                    className="w-full min-h-[100px] bg-transparent border-none resize-none focus:ring-0 text-earth placeholder:text-gray-400 text-lg"
                />

                <AnimatePresence>
                    {previewUrl && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative mb-4 rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
                        >
                            <button
                                type="button"
                                onClick={clearFile}
                                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {mediaFile?.type.startsWith('video/') ? (
                                <video src={previewUrl} controls className="max-h-[300px] w-full object-contain" />
                            ) : (
                                <img src={previewUrl} alt="Preview" className="max-h-[300px] w-full object-contain" />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-2 border-t border-amber-50">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors flex items-center gap-2 group"
                        >
                            <Paperclip className="w-5 h-5" />
                            <span className="text-sm font-medium hidden group-hover:block">Add Media</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*,video/*"
                            className="hidden"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || (!content.trim() && !mediaFile)}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}
