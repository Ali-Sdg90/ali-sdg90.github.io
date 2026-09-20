import { useEffect, useRef, useState } from "react";

import AboutPanelExpandToggle from "./AboutPanelExpandToggle";
import AboutMeContent from "./AboutMeContent";
import { getShelfItemDetailModule } from "./ShelfItemDetails";
import CustomScrollbar from "../ui/CustomScrollbar";
import LightboxImage from "../ui/LightboxImage";
import { aboutData } from "../../data/portfolio/aboutData";

const AboutPanelLanguageToggle = ({ activeLanguage, onLanguageChange }) => (
    <div
        className={[
            "about-panel-language-toggle",
            activeLanguage === "FA" ? "is-fa-active" : "is-en-active",
        ]
            .filter(Boolean)
            .join(" ")}
        aria-label="Language"
    >
        <span className="about-panel-language-thumb" aria-hidden="true" />
        {["EN", "FA"].map((language) => (
            <button
                className={[
                    "about-panel-language-option",
                    activeLanguage === language ? "is-active" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
                onClick={() => onLanguageChange(language)}
            >
                {language}
            </button>
        ))}
    </div>
);

const AboutPanel = ({ aboutMePulse, selectedShelfItem }) => {
    const [activeLanguage, setActiveLanguage] = useState("EN");
    const selectedModule = selectedShelfItem
        ? getShelfItemDetailModule(selectedShelfItem)
        : null;
    const isShowingDetailModule = Boolean(selectedModule);
    const isSimpleDetailModule = selectedModule?.detailVariant === "simple";
    const isCompactDetailModule = selectedModule?.detailVariant === "compact";
    const [isExpanded, setIsExpanded] = useState(false);
    const aboutPanelRef = useRef(null);
    const handledAboutMePulseRef = useRef(aboutMePulse);
    const [wasShowingDetailModule, setWasShowingDetailModule] = useState(
        isShowingDetailModule,
    );
    const shouldCollapseFromDetail =
        wasShowingDetailModule && !isShowingDetailModule;

    useEffect(() => {
        if (aboutMePulse === handledAboutMePulseRef.current) return undefined;

        handledAboutMePulseRef.current = aboutMePulse;

        if (!aboutMePulse || isShowingDetailModule) return undefined;

        const aboutPanel = aboutPanelRef.current;

        if (!aboutPanel) return undefined;

        aboutPanel.classList.remove("is-about-me-pulsing");
        void aboutPanel.offsetWidth;
        aboutPanel.classList.add("is-about-me-pulsing");

        const handleAnimationEnd = () => {
            aboutPanel.classList.remove("is-about-me-pulsing");
        };

        aboutPanel.addEventListener("animationend", handleAnimationEnd, {
            once: true,
        });

        return () =>
            aboutPanel.removeEventListener("animationend", handleAnimationEnd);
    }, [aboutMePulse, isShowingDetailModule]);

    if (shouldCollapseFromDetail) {
        setIsExpanded(false);
        setWasShowingDetailModule(false);
    } else if (wasShowingDetailModule !== isShowingDetailModule) {
        setWasShowingDetailModule(isShowingDetailModule);
    }

    const {
        title,
        titleEn,
        titleFa,
        image,
        tags = [],
    } = selectedModule ?? aboutData;
    const DetailComponent = selectedModule?.Component;
    const contentKey = selectedShelfItem
        ? `${selectedShelfItem.section.id}-${selectedShelfItem.item.title}`
        : "about-me";
    const aboutMeParagraphs =
        activeLanguage === "FA"
            ? aboutData.paragraphs.fa
            : aboutData.paragraphs.en;
    const aboutMeDirection = activeLanguage === "FA" ? "rtl" : "ltr";
    const isAboutMeFarsi = !isShowingDetailModule && activeLanguage === "FA";
    const panelTitle = isShowingDetailModule
        ? title
        : isAboutMeFarsi
          ? titleFa
          : titleEn;

    const visibleTags = isShowingDetailModule ? tags : aboutData.tags;
    const languageToggle = (
        <AboutPanelLanguageToggle
            activeLanguage={activeLanguage}
            onLanguageChange={setActiveLanguage}
        />
    );

    return (
        <aside
            id="about-panel"
            className={[
                "about-panel",
                isShowingDetailModule ? "is-showing-detail-module" : "",
                isSimpleDetailModule ? "is-simple-detail-module" : "",
                isCompactDetailModule ? "is-compact-detail-module" : "",
                isExpanded ? "is-expanded" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-labelledby="about-panel-title"
            ref={aboutPanelRef}
        >
            <AboutPanelExpandToggle
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded((currentValue) => !currentValue)}
            />

            <div className="about-panel-card" key={contentKey}>
                <div className="about-panel-scroll">
                    {!isShowingDetailModule && (
                        <div
                            className="about-panel-topbar"
                            key={`${contentKey}-language`}
                            aria-label="Panel controls"
                        >
                            {languageToggle}
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
                            className={[
                                "about-panel-title",
                                isAboutMeFarsi ? "is-farsi-text" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            id="about-panel-title"
                            dir={isAboutMeFarsi ? "rtl" : undefined}
                            lang={isAboutMeFarsi ? "fa" : undefined}
                        >
                            {panelTitle}
                            {/* {!isShowingDetailModule && (
                                <>
                                    {" "}
                                    <span
                                        style={{ cursor: "help" }}
                                        title="I know it is a bit too long. I will shorten it later"
                                    >
                                        *
                                    </span>
                                </>
                            )} */}
                        </h2>
                        {selectedModule?.subtitle && (
                            <p className="about-panel-subtitle">
                                {selectedModule.subtitle}
                            </p>
                        )}
                    </div>

                    <div className="about-panel-copy-shell">
                        <CustomScrollbar
                            className="about-panel-copy-scrollbar"
                            contentKey={contentKey}
                            viewportClassName="about-panel-copy"
                            key={contentKey}
                        >
                            {DetailComponent ? (
                                <DetailComponent
                                    item={selectedShelfItem.item}
                                    section={selectedShelfItem.section}
                                    detail={selectedModule.detail}
                                    activeLanguage={activeLanguage}
                                    languageToggle={languageToggle}
                                />
                            ) : (
                                <AboutMeContent
                                    direction={aboutMeDirection}
                                    language={activeLanguage}
                                    paragraphs={aboutMeParagraphs}
                                />
                            )}
                        </CustomScrollbar>
                    </div>

                    {visibleTags.length > 0 && (
                        <ul
                            className={[
                                "about-panel-tags",
                                // isAboutMeFarsi ? "is-farsi-text" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            key={`${contentKey}-tags`}
                            aria-label="Skills"
                            dir={isAboutMeFarsi ? "rtl" : undefined}
                            lang={isAboutMeFarsi ? "fa" : undefined}
                        >
                            {visibleTags.map((tag) => (
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
