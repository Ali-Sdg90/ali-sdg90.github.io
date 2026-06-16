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

const shelfRotationValues = [
    { y: 10, z: -1 },
    { y: 10, z: -0.5 },
    { y: 10, z: 0.0 },
    { y: 8.5, z: 0.0 },
];
const shelfRowTopValues = ["21.6%", "40.2%", "57.5%", "74.4%"];

const Shelf = () => {
    return (
        <section className="shelf-wrapper" aria-label="Portfolio shelf">
            <div
                className="shelf-container"
                style={{ perspective: "900px", perspectiveOrigin: "0% 55%" }}
            >
                {shelfSections.map((section, index) => (
                    <div
                        className="shelf-section"
                        id={section.id}
                        key={section.label}
                        style={{
                            top: `${shelfRowTopValues[index]}`,
                            transform: `rotateX(0deg) rotateY(${shelfRotationValues[index].y}deg) rotateZ(${shelfRotationValues[index].z}deg)`,
                        }}
                    >
                        <div className="shelf-section-name">
                            {section.label}
                        </div>

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
