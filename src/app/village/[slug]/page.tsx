import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// ISR
export const revalidate = 60

// This acts as a 'getStaticPaths' equivalent for dynamic routes in App Router, but strictly optional
// export async function generateStaticParams() {
//   const { data: portfolios } = await supabase.from('portfolios').select('slug')
//   return portfolios?.map(({ slug }) => ({ slug })) || []
// }

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const { data: portfolio, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !portfolio) {
        // For demo purposes, we might not want to hard crash if table doesn't exist
        // notFound()
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white p-4">
                <h1 className="text-3xl font-bold mb-4">Portfolio not found</h1>
                <p className="text-white/60 mb-8">Could not find portfolio with slug: {slug}</p>
                <Link href="/village" className="text-yellow-400 hover:underline">
                    ← Back to Village
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <nav className="p-6">
                <Link href="/village" className="text-sm text-white/60 hover:text-white transition-colors">
                    ← Back to Village
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-12 text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mb-6 flex items-center justify-center text-3xl font-bold text-black border-4 border-[#0A0A0A] shadow-xl">
                        {portfolio.title.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{portfolio.title}</h1>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {portfolio.skills?.map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                            <h2 className="text-xl font-semibold mb-4 text-emerald-400">About</h2>
                            <p className="text-white/80 leading-relaxed whitespace-pre-line">
                                {portfolio.bio}
                            </p>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-lg font-medium mb-4">Contact</h3>
                            <p className="text-white/60">{portfolio.contact_info}</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
