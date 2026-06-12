const shelfSections = [
    {
        label: "Featured Projects",
        id: "projects",
        items: [
            { title: "Path Finder", meta: "Interactive grids" },
            { title: "CS Queue Calendar", meta: "Session planner" },
            { title: "SettleitGPT", meta: "AI voice personas" },
            { title: "Gradient Paint", meta: "Web painting app" },
        ],
    },
    {
        label: "Things I've Built",
        items: [
            { title: "50+", meta: "Charts delivered" },
            { title: "60+", meta: "APIs integrated" },
            { title: "6", meta: "Internal products" },
            { title: "5", meta: "Automation tools" },
        ],
    },
    {
        label: "Tech Stack",
        items: [
            { title: "React", meta: "UI systems" },
            { title: "JavaScript", meta: "App logic" },
            { title: "TypeScript", meta: "Typed flows" },
            { title: "Tailwind", meta: "Utility CSS" },
            { title: "SCSS", meta: "Design styles" },
        ],
    },
    {
        label: "Career Journey",
        items: [
            { title: "2023", meta: "CS internship" },
            { title: "2023 - 2026", meta: "MelkRadar" },
            { title: "2024 - 2025", meta: "Dadeh Pardazi" },
            { title: "2025", meta: "SettleitGPT" },
        ],
    },
];

const Shelf = () => {
    return (
        <section className="shelf-wrapper" aria-label="Portfolio shelf">
            <div className="shelf-container">
                {shelfSections.map((section, index) => (
                    <div
                        className="shelf-section"
                        id={section.id}
                        key={section.label}
                        style={{ "--section-index": index }}
                    >
                        <h2 className="shelf-section-name">{section.label}</h2>

                        <div className="shelf-section-content">
                            {section.items.map((item) => (
                                <article
                                    className="shelf-card"
                                    key={item.title}
                                >
                                    <strong>{item.title}</strong>
                                    <span>{item.meta}</span>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Shelf;
