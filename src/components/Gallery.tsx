const Gallery = () => {
    const images = [
        { url: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=2070&auto=format&fit=crop", title: "Hand-stitched Lace", size: "col-span-2 row-span-2" },
        { url: "https://images.unsplash.com/photo-1549416878-b9ca35c2d43a?q=80&w=1974&auto=format&fit=crop", title: "Silk Drapery", size: "col-span-1" },
        { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1974&auto=format&fit=crop", title: "Pearl Embellishments", size: "col-span-1" },
    ];

    return (
        <section id="gallery" className="py-24 px-6 bg-[#fcfcfc] dark:bg-[#0f0f0f]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-4">Behind the scenes</h2>
                    <h3 className="section-title">Meticulous Craftsmanship</h3>
                    <p className="text-foreground/60 leading-relaxed font-light">
                        Every stitch is a testament to our dedication to perfection. We source the finest silks and lace to ensure unparalleled comfort and luxury.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[800px]">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`relative overflow-hidden group ${img.size}`}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${img.url})` }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs uppercase tracking-[0.2em] font-medium">{img.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
