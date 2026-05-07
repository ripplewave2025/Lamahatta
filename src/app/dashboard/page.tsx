'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import PortfolioEditor from '@/components/PortfolioEditor'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { Settings, ShieldCheck, Users, FileText, CheckCircle, Clock } from 'lucide-react'

// Simulated RBAC for demonstration: 
// In a real app, this comes from a `profiles` table with a `role` column.
const ADMIN_EMAILS = ['admin@sunaray.com', 'head@lamahatta.com']

export default function Dashboard() {
    const { t } = useLanguage()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            // MOCK AUTH FOR PREVIEW
            // Simulate a user login so the user can preview the dashboard layout
            const mockUser = { id: 'mock-admin-id', email: 'admin@sunaray.com' }
            setUser(mockUser)
            setIsAdmin(true)
            setLoading(false)
            
            // Uncomment below for actual Supabase auth later:
            /*
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth')
            } else {
                setUser(session.user)
                if (session.user.email && ADMIN_EMAILS.includes(session.user.email)) {
                    setIsAdmin(true)
                }
            }
            setLoading(false)
            */
        }

        checkUser()
    }, [router])

    if (loading) return <div className="min-h-screen bg-[#f4efe4] flex items-center justify-center text-stone-900">{t('common.loading')}</div>
    if (!user) return null

    return (
        <div className="min-h-screen bg-[#f4efe4] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <header className="max-w-6xl mx-auto mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-stone-300 pb-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-700 mb-4">
                        {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <Settings className="w-4 h-4 text-stone-500" />}
                        {isAdmin ? t('dashboard.role.admin') || "Role: Samaj Head / Admin" : t('dashboard.role.villager') || "Role: Worker / Villager"}
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
                        {isAdmin ? t('dashboard.adminTitle') || "Admin Dashboard" : t('dashboard.title') || "Member Dashboard"}
                    </h1>
                    <p className="text-stone-600 text-lg">{t('dashboard.welcome') || "Welcome back"}, {user.email}</p>
                </div>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/')
                    }}
                    className="text-sm font-semibold uppercase tracking-wider text-red-600 hover:text-red-500 transition-colors bg-red-100 px-4 py-2 rounded-lg"
                >
                    {t('dashboard.signOut') || "Sign Out"}
                </button>
            </header>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* ADMIN VIEW */}
                {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl"><Clock className="w-5 h-5" /></div>
                                <h3 className="font-serif text-xl text-stone-900">{t('dashboard.admin.pending') || "Pending Approvals"}</h3>
                            </div>
                            <p className="text-sm text-stone-600 mb-6">{t('dashboard.admin.pendingDesc') || "Review updates from villagers."}</p>
                            <div className="text-center p-6 border-2 border-dashed border-stone-200 rounded-xl text-stone-500 text-sm">
                                {t('dashboard.admin.noPending') || "No pending items right now."}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-sky-100 text-sky-700 rounded-xl"><Users className="w-5 h-5" /></div>
                                <h3 className="font-serif text-xl text-stone-900">{t('dashboard.admin.users') || "Manage Users"}</h3>
                            </div>
                            <p className="text-sm text-stone-600 mb-6">{t('dashboard.admin.usersDesc') || "View registered villagers."}</p>
                            <button className="w-full py-3 rounded-xl bg-stone-100 text-stone-800 text-sm font-bold hover:bg-stone-200 transition">View Directory</button>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><FileText className="w-5 h-5" /></div>
                                <h3 className="font-serif text-xl text-stone-900">{t('dashboard.admin.inquiries') || "Investor Inquiries"}</h3>
                            </div>
                            <p className="text-sm text-stone-600 mb-6">{t('dashboard.admin.inquiriesDesc') || "Review partnership requests."}</p>
                            <button className="w-full py-3 rounded-xl bg-stone-100 text-stone-800 text-sm font-bold hover:bg-stone-200 transition">View Inquiries</button>
                        </div>
                    </div>
                )}

                {/* WORKER / VILLAGER VIEW */}
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-200">
                        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-amber-400 rounded-full"></span>
                            {t('dashboard.editPortfolio') || "Edit Your Portfolio"}
                        </h2>
                        <PortfolioEditor user={user} />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-200">
                            <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                                {t('dashboard.previewTips') || "Preview & Tips"}
                            </h2>
                            <p className="mb-4 text-stone-700">
                                {t('dashboard.tipsDesc') || "Your portfolio helps visitors discover your talents. Make sure to:"}
                            </p>
                            <ul className="space-y-3 text-sm text-stone-600">
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {t('dashboard.tip1') || "Choose a clear title (e.g., 'Homestay & Local Guide')."}</li>
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {t('dashboard.tip2') || "Write a short but engaging bio."}</li>
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {t('dashboard.tip3') || "List your key skills or offerings."}</li>
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {t('dashboard.tip4') || "Update your contact info so people can reach you."}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
