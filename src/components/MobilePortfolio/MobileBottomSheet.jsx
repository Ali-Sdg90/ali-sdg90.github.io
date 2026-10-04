import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

import { getShelfItemDetailModule } from "../AboutPanel/ShelfItemDetails";
import { aboutData } from "../../data/portfolio/aboutData";

const EXIT_ANIMATION_MS = 420;

const LanguageToggle = ({ activeLanguage, onChange }) => (
    <div className="mobile-sheet-language" aria-label="Language">
        {["EN", "FA"].map((language) => (
            <button
                className={activeLanguage === language ? "is-active" : ""}
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
                onClick={() => onChange(language)}
            >
                {language}
            </button>
        ))}
    </div>
);

const MobileBottomSheet = ({ content, onClose }) => {
    const [activeLanguage, setActiveLanguage] = useState("EN");
    const [isClosing, setIsClosing] = useState(false);
    const closeButtonRef = useRef(null);
    const closeTimerRef = useRef(null);
    const isAboutMe = content?.type === "about";
    const selectedShelfItem = isAboutMe ? null : content;
    const selectedModule = selectedShelfItem
        ? getShelfItemDetailModule(selectedShelfItem)
        : null;
    const DetailComponent = selectedModule?.Component;
    const isFarsi = activeLanguage === "FA";
    const title = isAboutMe
        ? isFarsi
            ? aboutData.titleFa
            : aboutData.titleEn
        : selectedModule?.title;
    const subtitle = isAboutMe ? "Software Engineer" : selectedModule?.subtitle;
    const image = isAboutMe ? aboutData.image : selectedModule?.image;
    const ImpactIcon =
        selectedShelfItem?.section.id === "achievements"
            ? selectedShelfItem.item.icon
            : null;
    const languageToggle = (
        <LanguageToggle
            activeLanguage={activeLanguage}
            onChange={setActiveLanguage}
        />
    );

    const requestClose = useCallback(() => {
        if (closeTimerRef.current !== null) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        setIsClosing(true);
        closeTimerRef.current = window.setTimeout(
            () => {
                closeTimerRef.current = null;
                onClose();
                setIsClosing(false);
            },
            prefersReducedMotion ? 0 : EXIT_ANIMATION_MS,
        );
    }, [onClose]);

    useEffect(
        () => () => {
            if (closeTimerRef.current !== null) {
                window.clearTimeout(closeTimerRef.current);
            }
        },
        [],
    );

    useEffect(() => {
        if (!content) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") requestClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [content, requestClose]);

    if (!content) return null;

    const aboutParagraphs = isFarsi
        ? aboutData.paragraphs.fa
        : aboutData.paragraphs.en;

    return (
        <div className={`mobile-sheet-layer${isClosing ? " is-closing" : ""}`}>
            <button
                className="mobile-sheet-backdrop"
                type="button"
                aria-label="Close details"
                onClick={requestClose}
            />

            <section
                className="mobile-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-sheet-title"
            >
                <div className="mobile-sheet-handle" aria-hidden="true" />

                <header className="mobile-sheet-header">
                    <p>
                        {isAboutMe
                            ? "About me"
                            : selectedShelfItem.section.label}
                    </p>
                    <button
                        className="mobile-sheet-close"
                        type="button"
                        aria-label="Close details"
                        ref={closeButtonRef}
                        onClick={requestClose}
                    >
                        <HiOutlineXMark aria-hidden="true" />
                    </button>
                </header>

                <div className="mobile-sheet-scroll">
                    <div className="mobile-sheet-hero">
                        <div className="mobile-sheet-media">
                            {ImpactIcon ? (
                                <ImpactIcon aria-hidden="true" />
                            ) : (
                                <img
                                    src={image?.src}
                                    alt={image?.alt ?? `${title} preview`}
                                    width={image?.width}
                                    height={image?.height}
                                    decoding="async"
                                />
                            )}
                        </div>

                        <div className="mobile-sheet-heading">
                            <h2
                                id="mobile-sheet-title"
                                className={
                                    isAboutMe && isFarsi ? "is-farsi-text" : ""
                                }
                                dir={isAboutMe && isFarsi ? "rtl" : undefined}
                            >
                                {title}
                            </h2>
                            {subtitle && <p>{subtitle}</p>}
                        </div>
                    </div>

                    {isAboutMe && (
                        <div className="mobile-sheet-controls">
                            {languageToggle}
                        </div>
                    )}

                    {isAboutMe ? (
                        <div
                            className={`mobile-sheet-about${isFarsi ? " is-farsi-text" : ""}`}
                            dir={isFarsi ? "rtl" : "ltr"}
                            lang={isFarsi ? "fa" : "en"}
                        >
                            {aboutParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}

                            <ul aria-label="Skills">
                                {aboutData.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        DetailComponent && (
                            <DetailComponent
                                item={selectedShelfItem.item}
                                section={selectedShelfItem.section}
                                detail={selectedModule.detail}
                                activeLanguage={activeLanguage}
                                isExpanded
                                languageToggle={languageToggle}
                                onLanguageChange={setActiveLanguage}
                            />
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default MobileBottomSheet;
