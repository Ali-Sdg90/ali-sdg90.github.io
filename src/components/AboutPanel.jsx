import { useState } from "react";

import AboutMeContent from "./AboutPanel/AboutMeContent";
import { careerDetailModules } from "./AboutPanel/CareerDetails";
import ImagePreview from "./AboutPanel/ImagePreview";
import { aboutData } from "../data/portfolio/aboutData";

const AboutPanel = ({ selectedCareerItem }) => {
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("EN");
    const selectedModule = selectedCareerItem
        ? careerDetailModules[selectedCareerItem.id]
        : null;
    const isShowingCareerModule = Boolean(selectedModule);
    const { title, image, tags } = selectedModule ?? aboutData;
    const DetailComponent = selectedModule?.Component;
    const contentKey = selectedCareerItem?.id ?? "about-me";

    return (
        <>
            <aside
                className={[
                    "about-panel",
                    isShowingCareerModule ? "is-showing-career-module" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-labelledby="about-panel-title"
            >
                <div className="about-panel-card" key={contentKey}>
                    <div className="about-panel-scroll">
                        {isShowingCareerModule && (
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
                                <button
                                    className="about-panel-avatar-button"
                                    type="button"
                                    aria-label={`Preview ${image.alt}`}
                                    onClick={() => setIsImagePreviewOpen(true)}
                                >
                                    <img
                                        key={
                                            selectedCareerItem?.id ?? "about-me"
                                        }
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
                                </button>
                            </div>
                            <span
                                className="about-panel-status"
                                aria-hidden={isShowingCareerModule}
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
                                        careerItem={selectedCareerItem}
                                    />
                                ) : (
                                    <AboutMeContent
                                        paragraphs={aboutData.paragraphs}
                                    />
                                )}
                            </div>
                        </div>

                        <ul
                            className="about-panel-tags"
                            key={`${contentKey}-tags`}
                            aria-label="Skills"
                        >
                            {tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            {isImagePreviewOpen && (
                <ImagePreview
                    image={image}
                    onClose={() => setIsImagePreviewOpen(false)}
                />
            )}
        </>
    );
};

export default AboutPanel;
