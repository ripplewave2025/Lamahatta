import Link from 'next/link'

interface Portfolio {
    title: string
    slug: string
    bio: string
    skills: string[]
    // images?: string[] // Future
}

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
    return (
        <Link href={`/village/${portfolio.slug}`} className="block group">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300 h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-4xl">🎨</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {portfolio.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-3 flex-1">{portfolio.bio}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {portfolio.skills?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
