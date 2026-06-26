import { aboutData } from "../data/portfolio/aboutData";

const AboutPanel = () => {
    const { title, image, paragraphs, tags } = aboutData;

    return (
        <aside className="about-panel" aria-labelledby="about-panel-title">
            <div className="about-panel-card">
                <div className="about-panel-scroll">
                    <div className="about-panel-avatar-wrap">
                        <div className="about-panel-avatar-frame">
                            <img
                                className="about-panel-avatar"
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                style={{
                                    "--about-panel-avatar-zoom":
                                        image.zoom ?? 1,
                                }}
                                decoding="sync"
                                fetchPriority="high"
                            />
                        </div>
                        <span
                            className="about-panel-status"
                            aria-label="Available"
                        />
                    </div>

                    <h2 className="about-panel-title" id="about-panel-title">
                        {title}
                    </h2>

                    <div className="about-panel-copy-shell">
                        <div className="about-panel-copy">
                            <div className="about-panel-text">
                                {paragraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <ul className="about-panel-tags" aria-label="Skills">
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default AboutPanel;
