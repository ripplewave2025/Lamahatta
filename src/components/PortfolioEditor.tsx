'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface UserProps {
    id: string;
    email?: string;
}

export default function PortfolioEditor({ user }: { user: UserProps }) {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        title: '',
        bio: '',
        slug: '',
        contact_info: '',
        // skills and images can be arrays, keeping it simple for now stringified or managed later
        skills: '', // comma separated
    })

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const { data } = await supabase
                    .from('portfolios')
                    .select('*')
                    .eq('user_id', user.id)
                    .single()

                if (data) {
                    setFormData({
                        title: data.title || '',
                        bio: data.bio || '',
                        slug: data.slug || '',
                        contact_info: data.contact_info || '',
                        skills: data.skills ? data.skills.join(', ') : '',
                    })
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPortfolio()
    }, [user.id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const updates = {
            user_id: user.id,
            title: formData.title,
            bio: formData.bio,
            slug: formData.slug,
            contact_info: formData.contact_info,
            skills: formData.skills.split(',').map((s) => s.trim()).filter((s) => s),
            updated_at: new Date(),
        }

        try {
            const { error } = await supabase.from('portfolios').upsert(updates, { onConflict: 'user_id' })
            if (error) throw error
            alert('Portfolio updated!')
        } catch (error) {
            alert('Error updating portfolio')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="text-white">Loading...</div>

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Portfolio Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                    placeholder="e.g. Handmade Woolen Crafts"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Public URL Slug</label>
                <div className="flex items-center">
                    <span className="text-white/40 mr-2">/village/</span>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                        placeholder="my-shop-name"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Bio / Description</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                    placeholder="Tell your story..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Skills / Offerings (comma separated)</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                    placeholder="Weaving, Pottery, Tour Guiding"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Contact Info</label>
                <input
                    type="text"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                    placeholder="Phone number, email, or social link"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-black font-medium py-3 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save Portfolio'}
            </button>
        </form>
    )
}
