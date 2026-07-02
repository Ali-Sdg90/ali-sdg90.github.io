import { useState } from "react";

import AboutMeContent from "./AboutPanel/AboutMeContent";
import { getShelfItemDetailModule } from "./AboutPanel/ShelfItemDetails";
import LightboxImage from "./LightboxImage";
import { aboutData } from "../data/portfolio/aboutData";

const AboutPanel = ({ selectedShelfItem }) => {
    const [activeLanguage, setActiveLanguage] = useState("EN");
    const selectedModule = selectedShelfItem
        ? getShelfItemDetailModule(selectedShelfItem)
        : null;
    const isShowingDetailModule = Boolean(selectedModule);
    const { title, image, tags = [] } = selectedModule ?? aboutData;
    const DetailComponent = selectedModule?.Component;
    const contentKey = selectedShelfItem
        ? `${selectedShelfItem.section.id}-${selectedShelfItem.item.title}`
        : "about-me";

    return (
        <aside
            className={[
                "about-panel",
                isShowingDetailModule ? "is-showing-detail-module" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-labelledby="about-panel-title"
        >
            <div className="about-panel-card" key={contentKey}>
                <div className="about-panel-scroll">
                    {isShowingDetailModule && (
                        <div
                            className="about-panel-topbar"
                            key={`${contentKey}-language`}
                            aria-label="Panel controls"
                        >
                            <div
                                className={[
                                    "about-panel-language-toggle",
                                    activeLanguage === "FA"
                                        ? "is-fa-active"
                                        : "is-en-active",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                aria-label="Language"
                            >
                                <span
                                    className="about-panel-language-thumb"
                                    aria-hidden="true"
                                />
                                {["EN", "FA"].map((language) => (
                                    <button
                                        className={[
                                            "about-panel-language-option",
                                            activeLanguage === language
                                                ? "is-active"
                                                : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        key={language}
                                        type="button"
                                        aria-pressed={
                                            activeLanguage === language
                                        }
                                        onClick={() =>
                                            setActiveLanguage(language)
                                        }
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="about-panel-avatar-wrap">
                        <div className="about-panel-avatar-frame">
                            <LightboxImage
                                image={image}
                                imageKey={contentKey}
                                buttonClassName="about-panel-avatar-button"
                                fallbackClassName="about-panel-avatar about-panel-avatar-fallback"
                                imageClassName="about-panel-avatar"
                                imageProps={{
                                    width: image.width,
                                    height: image.height,
                                    style: {
                                        "--about-panel-avatar-zoom":
                                            image.zoom ?? 1,
                                    },
                                    decoding: "sync",
                                    fetchPriority: "high",
                                }}
                            />
                        </div>
                        <span
                            className="about-panel-status"
                            aria-hidden={isShowingDetailModule}
                            aria-label="Available"
                        />
                    </div>

                    <div className="about-panel-heading" key={contentKey}>
                        <h2
                            className="about-panel-title"
                            id="about-panel-title"
                        >
                            {title}
                        </h2>
                        {selectedModule?.subtitle && (
                            <p className="about-panel-subtitle">
                                {selectedModule.subtitle}
                            </p>
                        )}
                    </div>

                    <div className="about-panel-copy-shell">
                        <div className="about-panel-copy" key={contentKey}>
                            {DetailComponent ? (
                                <DetailComponent
                                    item={selectedShelfItem.item}
                                    section={selectedShelfItem.section}
                                    detail={selectedModule.detail}
                                />
                            ) : (
                                <AboutMeContent
                                    paragraphs={aboutData.paragraphs}
                                />
                            )}
                        </div>
                    </div>

                    {tags.length > 0 && (
                        <ul
                            className="about-panel-tags"
                            key={`${contentKey}-tags`}
                            aria-label="Skills"
                        >
                            {tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default AboutPanel;
