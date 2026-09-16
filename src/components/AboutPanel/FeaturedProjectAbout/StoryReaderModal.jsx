import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    FaArrowUpRightFromSquare,
    FaBookOpen,
    FaGithub,
    FaXmark,
} from "react-icons/fa6";

const EXIT_ANIMATION_MS = 220;
const STORY_SOURCE_BASE_URL =
    "https://github.com/Ali-Sdg90/ali-sdg90.github.io/blob/main/src/data/stories";
const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

const storyTypeLabels = {
    projects: "Project story",
    career: "Career story",
    default: "Story",
};

const StoryReaderModal = ({
    initialLanguage,
    onClose,
    returnFocusRef,
    storyEN,
    storyFA,
    storySource,
    storyType,
    title,
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState(initialLanguage);
    const dialogRef = useRef(null);
    const scrollAreaRef = useRef(null);
    const progressRef = useRef(null);
    const closeButtonRef = useRef(null);
    const titleId = useId();
    const isFarsi = activeLanguage === "FA" && storyFA;
    const visibleStory = isFarsi ? storyFA : storyEN;
    const paragraphs = visibleStory
        ?.split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    const languageFolder = isFarsi ? "fa" : "en";
    const labels = storyTypeLabels[storyType] ?? storyTypeLabels.default;
    const storySourceUrl = storySource
        ? `${STORY_SOURCE_BASE_URL}/${languageFolder}/${storySource.collection}/${storySource.slug}.md`
        : null;

    const requestClose = useCallback(() => {
        setIsClosing(true);
    }, []);

    useEffect(() => {
        if (!isClosing) return undefined;

        const closeTimer = window.setTimeout(onClose, EXIT_ANIMATION_MS);

        return () => window.clearTimeout(closeTimer);
    }, [isClosing, onClose]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previouslyFocusedElement = document.activeElement;
        const returnFocusElement =
            returnFocusRef?.current ?? previouslyFocusedElement;

        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                requestClose();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = Array.from(
                dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? [],
            );

            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements.at(-1);

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);

            returnFocusElement?.focus?.();
        };
    }, [requestClose, returnFocusRef]);

    useEffect(() => {
        const scrollArea = scrollAreaRef.current;

        if (!scrollArea) return;

        scrollArea.scrollTop = 0;
        progressRef.current?.style.setProperty(
            "--story-progress",
            scrollArea.scrollHeight > scrollArea.clientHeight ? "0%" : "100%",
        );
    }, [activeLanguage]);

    const updateScrollProgress = (event) => {
        const scrollArea = event.currentTarget;
        const maximumScroll = scrollArea.scrollHeight - scrollArea.clientHeight;

        const progress =
            maximumScroll > 0
                ? Math.min(100, (scrollArea.scrollTop / maximumScroll) * 100)
                : 100;

        progressRef.current?.style.setProperty(
            "--story-progress",
            `${progress}%`,
        );
    };

    return createPortal(
        <div
            className={[
                "about-panel-lightbox",
                "story-reader-modal",
                isClosing ? "is-closing" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={requestClose}
            ref={dialogRef}
        >
            <button
                className="about-panel-lightbox-close"
                type="button"
                aria-label={isFarsi ? "بستن استوری" : "Close story"}
                onClick={requestClose}
                ref={closeButtonRef}
            >
                <FaXmark aria-hidden="true" />
            </button>

            <div
                className="about-panel-lightbox-frame story-reader-modal__frame"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="story-reader-modal__surface">
                    <header className="story-reader-modal__header">
                        <div className="story-reader-modal__heading">
                            <span className="story-reader-modal__eyebrow">
                                <FaBookOpen aria-hidden="true" />
                                {labels}
                            </span>
                            <h2 id={titleId}>{title}</h2>
                        </div>

                        <div
                            className="story-reader-modal__controls"
                            aria-label="Story controls"
                        >
                            <div
                                className={[
                                    "about-panel-language-toggle",
                                    activeLanguage === "FA"
                                        ? "is-fa-active"
                                        : "is-en-active",
                                ].join(" ")}
                                aria-label="Story language"
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
                            {storySourceUrl && (
                                <a
                                    className="story-reader-modal__source-link"
                                    href={storySourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub aria-hidden="true" />
                                    <span>View on GitHub</span>
                                    <FaArrowUpRightFromSquare aria-hidden="true" />
                                </a>
                            )}
                        </div>

                        <span
                            className="story-reader-modal__progress"
                            aria-hidden="true"
                            ref={progressRef}
                        />
                    </header>

                    <div
                        className="story-reader-modal__scroll"
                        dir={isFarsi ? "rtl" : "ltr"}
                        lang={isFarsi ? "fa" : "en"}
                        onScroll={updateScrollProgress}
                        ref={scrollAreaRef}
                    >
                        <article className="story-reader-modal__content">
                            <div
                                className="story-reader-modal__opening-mark"
                                aria-hidden="true"
                            >
                                <span />
                                <FaBookOpen />
                                <span />
                            </div>

                            {paragraphs.map((paragraph, paragraphIndex) => (
                                <p key={`${paragraphIndex}-${paragraph}`}>
                                    {paragraph}
                                </p>
                            ))}

                            <div
                                className="story-reader-modal__closing-mark"
                                aria-hidden="true"
                            >
                                <span />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default StoryReaderModal;
