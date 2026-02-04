// Image import removed

const collections = [
    {
        title: "Bridal Gowns",
        description: "Ethereal designs for your most special day.",
        image: "https://images.unsplash.com/photo-1546167108-8395cc0dad90?q=80&w=1974&auto=format&fit=crop",
        category: "Signature"
    },
    {
        title: "Evening Wear",
        description: "Sophistication redefined for the modern dusk.",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2016&auto=format&fit=crop",
        category: "Classic"
    },
    {
        title: "Cocktail Dresses",
        description: "Versatile elegance for every celebration.",
        image: "https://images.unsplash.com/photo-1539109132332-34909569ce42?q=80&w=1974&auto=format&fit=crop",
        category: "Modern"
    },
    {
        title: "Accessories",
        description: "Finishing touches for a complete look.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
        category: "Fine Detail"
    }
];

const CollectionGrid = () => {
    return (
        <section id="collection" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-4">Explore our craft</h2>
                        <h3 className="section-title">The Collections</h3>
                        <p className="text-foreground/60 leading-relaxed font-light">
                            Each piece is handcrafted with precision, blending tradition with modern silhouettes to create gowns that tell a story.
                        </p>
                    </div>
                    <button className="text-xs uppercase tracking-widest font-bold border-b border-accent pb-1 hover:text-accent transition-colors">
                        View All Series
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collections.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[3/4] cursor-pointer"
                        >
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            </div>
                            <div className="absolute inset-0 card-gradient opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-[10px] uppercase tracking-widest text-accent mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 italic font-serif">
                                    {item.category}
                                </span>
                                <h4 className="text-xl font-light mb-2 tracking-wide uppercase">{item.title}</h4>
                                <p className="text-xs text-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionGrid;
