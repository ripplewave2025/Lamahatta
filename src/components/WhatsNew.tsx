const events = [
    {
        date: "MAR 15",
        title: "Virtual Trunk Show",
        description: "An exclusive first look at the Spring 2026 Collection via interactive live stream.",
        time: "10:00 AM EST"
    },
    {
        date: "APR 02",
        title: "Bridal Fashion Week",
        description: "Sunaray Gown takes the stage at the Grand Palais. Register for private viewing.",
        time: "03:00 PM CET"
    },
    {
        date: "MAY 10",
        title: "Custom Workshop",
        description: "Meet our designers and discuss your dream gown in this intimate virtual setting.",
        time: "11:00 AM EST"
    }
];

const WhatsNew = () => {
    return (
        <section id="events" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h3 className="section-title mb-0">Launch Events</h3>
                    <button className="text-xs uppercase tracking-widest font-bold text-accent">View All Dates</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {events.map((event, i) => (
                        <div key={i} className="flex gap-6 group cursor-pointer border-l border-black/5 dark:border-white/5 pl-6 hover:border-accent transition-colors duration-300">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-serif italic text-accent">{event.date.split(" ")[1]}</span>
                                <span className="text-[10px] uppercase tracking-tighter text-foreground/40 font-bold">{event.date.split(" ")[0]}</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2 uppercase tracking-wide group-hover:text-accent transition-colors">{event.title}</h4>
                                <p className="text-sm text-foreground/60 font-light mb-4 leading-relaxed">
                                    {event.description}
                                </p>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">{event.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatsNew;
