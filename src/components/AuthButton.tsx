'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Lock, ArrowRight, Phone, User } from 'lucide-react'
import { signUpWithPhone, signInWithPhone } from '@/app/auth/actions'

type Mode = 'phoneSignUp' | 'phoneSignIn' | 'emailSignIn'

export default function AuthButton() {
    const supabase = createClient()
    const router = useRouter()
    const [mode, setMode] = useState<Mode>('phoneSignUp')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [pendingTx, startTransition] = useTransition()
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)

        if (mode === 'phoneSignUp') {
            startTransition(async () => {
                const res = await signUpWithPhone({ phone, password, fullName })
                if (!res.ok) {
                    setMessage({ type: 'error', text: res.message })
                    return
                }
                router.push('/dashboard')
                router.refresh()
            })
            return
        }

        if (mode === 'phoneSignIn') {
            startTransition(async () => {
                const res = await signInWithPhone({ phone, password })
                if (!res.ok) {
                    setMessage({ type: 'error', text: res.message })
                    return
                }
                router.push('/dashboard')
                router.refresh()
            })
            return
        }

        // emailSignIn (admin / legacy)
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            router.push('/dashboard')
            router.refresh()
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Sign in failed.'
            setMessage({ type: 'error', text: msg })
        } finally {
            setLoading(false)
        }
    }

    const busy = loading || pendingTx
    const isPhoneFlow = mode === 'phoneSignUp' || mode === 'phoneSignIn'

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Mode tabs */}
            <div className="mb-6 flex gap-1 rounded-2xl bg-white/5 p-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                <button
                    type="button"
                    onClick={() => { setMode('phoneSignUp'); setMessage(null) }}
                    className={`flex-1 rounded-xl py-2 transition ${
                        mode === 'phoneSignUp' ? 'bg-amber-500 text-stone-950' : 'hover:text-white'
                    }`}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={() => { setMode('phoneSignIn'); setMessage(null) }}
                    className={`flex-1 rounded-xl py-2 transition ${
                        mode === 'phoneSignIn' ? 'bg-amber-500 text-stone-950' : 'hover:text-white'
                    }`}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => { setMode('emailSignIn'); setMessage(null) }}
                    className={`flex-1 rounded-xl py-2 transition ${
                        mode === 'emailSignIn' ? 'bg-amber-500 text-stone-950' : 'hover:text-white'
                    }`}
                    title="For Samaj Head / admin accounts"
                >
                    Admin
                </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                {mode === 'phoneSignUp' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Your name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Indra Da"
                            />
                        </div>
                    </div>
                )}

                {isPhoneFlow ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="+91 98765 43210"
                                autoComplete="tel"
                            />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500">Include the country code, e.g. +91 for India.</p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="••••••••"
                            autoComplete={mode === 'phoneSignUp' ? 'new-password' : 'current-password'}
                        />
                    </div>
                </div>

                {message && (
                    <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-200' : 'bg-green-500/10 text-green-200'}`}>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={busy}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {busy ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {mode === 'phoneSignUp' ? 'Create account' : 'Sign In'}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            {mode === 'phoneSignUp' && (
                <p className="mt-6 text-center text-xs text-gray-400">
                    By signing up, the Samaj Head will link your account to your household so you can see your record.
                </p>
            )}
        </div>
    )
}
