const detailCopyBySection = {
    projects: {
        intro: "Placeholder project brief for the selected portfolio item. This area can grow into a concise case study with goals, constraints, technical decisions, and final outcomes.",
        stats: [
            ["Detail type", "Project profile"],
            ["Next content", "Case study notes"],
        ],
    },
    achievements: {
        intro: "Placeholder impact brief for the selected metric. This area can later explain the context, contribution, and evidence behind the number.",
        stats: [
            ["Detail type", "Impact note"],
            ["Next content", "Proof and context"],
        ],
    },
    "tech-stack": {
        intro: "Placeholder technology brief for the selected tool. This area can later describe where it fits in the stack, how it was used, and production lessons learned.",
        stats: [
            ["Detail type", "Technology note"],
            ["Next content", "Usage examples"],
        ],
    },
};

const GenericShelfItemDetail = ({ item, section }) => {
    const detailCopy = detailCopyBySection[section.id] ?? {
        intro: "Placeholder detail brief for the selected item. This module is ready for future structured content.",
        stats: [
            ["Detail type", "Overview"],
            ["Next content", "Expanded notes"],
        ],
    };

    return (
        <div className="about-panel-detail">
            <p>{detailCopy.intro}</p>

            <dl className="about-panel-detail-stats">
                {detailCopy.stats.map(([label, value]) => (
                    <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
                {item.meta && (
                    <div>
                        <dt>Current label</dt>
                        <dd>{item.meta}</dd>
                    </div>
                )}
            </dl>
        </div>
    );
};

export default GenericShelfItemDetail;
