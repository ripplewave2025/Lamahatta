"use client";

const featuredPeople = [
    { role: "Best Chef", name: "Pending...", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop" },
    { role: "Tour Guide", name: "Pending...", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop" },
    { role: "Video Creator", name: "Pending...", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" },
    { role: "AI Engineer", name: "Pending...", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop" },
];

const CommunityHub = () => {
    return (
        <section id="community" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-4">Community Voices</h2>
                    <h3 className="section-title">Wall of Fame</h3>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Celebrating the talent that makes Seemana Gaon unique. From the kitchen to the code.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredPeople.map((person, index) => (
                        <div key={index} className="group relative overflow-hidden aspect-[3/4] cursor-pointer bg-gray-100">
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                style={{ backgroundImage: `url(${person.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="text-accent text-xs uppercase tracking-widest font-bold block mb-1">{person.role}</span>
                                <h4 className="text-xl font-serif">{person.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-8 bg-black/5 dark:bg-white/5 border border-dashed border-foreground/20 rounded-lg text-center">
                    <h3 className="text-xl font-medium mb-4">Contribute to the Archive</h3>
                    <p className="mb-6 text-foreground/60 max-w-xl mx-auto">
                        Are you a resident? Use the local editor to write about village history, stories, or news.
                        <br />
                        <span className="text-xs italic mt-2 block">(Access for Dipen da, Raju da, Milan mama, Kishan da)</span>
                    </p>
                    <button className="px-6 py-2 bg-foreground text-background uppercase tracking-widest text-xs font-bold hover:opacity-90">
                        Open Editor
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CommunityHub;
