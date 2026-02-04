import AuthButton from '@/components/AuthButton'

export default function AuthPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 mb-4">
                    Welcome Home
                </h1>
                <p className="text-white/60 text-lg max-w-md mx-auto">
                    Sign in to your account or join the community to start sharing your stories.
                </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                <AuthButton />
            </div>
        </div>
    )
}
