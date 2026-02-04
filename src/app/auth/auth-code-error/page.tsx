import Link from 'next/link'

export default function AuthError() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="bg-white/10 p-8 rounded-2xl border border-white/20 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
                <p className="text-gray-300 mb-6">
                    There was an issue signing you in. The link may have expired or is invalid.
                </p>
                <Link
                    href="/auth"
                    className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                    Try Again
                </Link>
            </div>
        </div>
    )
}
