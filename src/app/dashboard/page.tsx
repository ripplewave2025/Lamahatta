'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import PortfolioEditor from '@/components/PortfolioEditor'
import { useRouter } from 'next/navigation'

import { User } from '@supabase/supabase-js'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth')
            } else {
                setUser(session.user)
            }
            setLoading(false)
        }

        checkUser()
    }, [router])

    if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Loading...</div>
    if (!user) return null

    return (
        <div className="min-h-screen bg-[#0A0A0A] p-8">
            <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Member Dashboard</h1>
                    <p className="text-white/60">Welcome back, {user.email}</p>
                </div>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/')
                    }}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                    Sign Out
                </button>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
                        Edit Your Portfolio
                    </h2>
                    <PortfolioEditor user={user} />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                        Preview & Tips
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/80">
                        <p className="mb-4">
                            Your portfolio helps visitors discover your talents. Make sure to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-white/60">
                            <li>Choose a clear title (e.g., &quot;Homestay & Local Guide&quot;).</li>
                            <li>Write a short but engaging bio.</li>
                            <li>List your key skills or offerings.</li>
                            <li>Update your contact info so people can reach you.</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
