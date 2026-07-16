import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                {/* Brand */}
                <div className="col-span-1 lg:col-span-1">
                    <h4 className="text-xl font-bold tracking-tighter uppercase mb-6">
                        Sunaray<span className="text-accent">Gown</span>
                    </h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                        Crafting dreams since 1998. Every gown is a masterpiece designed to celebrate your unique story.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons placeholders */}
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all cursor-pointer">
                                <div className="w-4 h-4 rounded-sm border border-current" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-8 text-accent">Company</h5>
                    <ul className="space-y-4">
                        {["About Us", "Our Handcraft", "Sustainable Luxury", "Careers", "News"].map(link => (
                            <li key={link}><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">{link}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Links */}
                <div>
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-8 text-accent">Customer Care</h5>
                    <ul className="space-y-4">
                        {["Book Appointment", "Size Guide", "Order Tracking", "Shipping & Returns", "Contact Us"].map(link => (
                            <li key={link}><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">{link}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-8 text-accent">Newsletter</h5>
                    <p className="text-white/40 text-sm font-light mb-6">Be the first to see our new collections and event invites.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-accent w-full transition-colors"
                        />
                        <button className="ml-4 text-xs uppercase tracking-widest font-bold hover:text-accent transition-colors">Join</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-white/20 text-[10px] uppercase tracking-widest">
                        © 2026 Sunaray Gown Digital. All Rights Reserved.
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                        Made with ❤️ by{" "}
                        <Link 
                            href="https://portfolio-next-fawn-five.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white/60 hover:text-accent transition-colors font-medium underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                        >
                            Upesh
                        </Link>
                    </p>
                </div>
                <div className="flex gap-8">
                    <Link href="/privacy" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-white">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
