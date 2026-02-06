import { supabase } from '@/lib/supabase'
import PortfolioCard from '@/components/PortfolioCard'
import Link from 'next/link'

export const revalidate = 60 // ISR

export default async function VillageShowcase() {
    // Fetch real data in production, mock for now if no tables
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let portfolios: any[] = []

    try {
        const { data } = await supabase.from('portfolios').select('*')
        if (data) portfolios = data
    } catch (e) {
        console.error("Failed to fetch portfolios", e)
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        The Village <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Talent</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                        Discover the creators, guides, and artisans that make Lamahatta special.
                    </p>
                    <Link
                        href="/auth"
                        className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all text-sm font-medium"
                    >
                        Create Your Portfolio →
                    </Link>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Grid */}
            <main className="max-w-7xl mx-auto px-6 pb-32">
                {portfolios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolios.map((portfolio) => (
                            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                        <p className="text-white/40 mb-4">No portfolios yet. Be the first!</p>
                    </div>
                )}
            </main>
        </div>
    )
}
