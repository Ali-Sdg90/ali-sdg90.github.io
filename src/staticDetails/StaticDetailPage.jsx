import { FaCheck } from "react-icons/fa6";

import AboutPanelLanguageToggle from "../components/AboutPanel/AboutPanelLanguageToggle.jsx";
import { aboutData } from "../data/portfolio/aboutData.js";

const LANGUAGE_TOGGLE_SCRIPT = `(() => {
    const setStoryLanguage = (story, language) => {
        const toggle = story.querySelector(".about-panel-language-toggle");

        if (!toggle) return;

        toggle.classList.toggle("is-en-active", language === "EN");
        toggle.classList.toggle("is-fa-active", language === "FA");

        toggle.querySelectorAll(".about-panel-language-option").forEach((button) => {
            const isActive = button.textContent.trim() === language;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        story.querySelectorAll("[data-story-language]").forEach((panel) => {
            panel.hidden = panel.dataset.storyLanguage !== language;
        });

    };

    document.querySelectorAll("[data-static-story]").forEach((story) => {
        story.querySelectorAll(".about-panel-language-option").forEach((button) => {
            button.addEventListener("click", () => {
                setStoryLanguage(story, button.textContent.trim());
            });
        });

        setStoryLanguage(story, "EN");
    });
})();`;

const splitStory = (story = "") =>
    story
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

const StoryParagraphs = ({ paragraphs }) =>
    paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph}`}>{paragraph}</p>
    ));

const PortfolioLink = ({ className = "", portfolioPath }) => (
    <a
        className={`static-detail-portfolio-button ${className}`.trim()}
        href={portfolioPath}
    >
        <span>Go to Ali&apos;s portfolio</span>
        <span aria-hidden="true">←</span>
    </a>
);

const DetailLinks = ({ links = [] }) => {
    const visibleLinks = links.filter(({ label, text, url }) =>
        Boolean(label || text || url),
    );

    if (!visibleLinks.length) return null;

    return (
        <section className="static-detail-section static-detail-links">
            <header className="static-detail-section-heading">
                <h2>Related links</h2>
            </header>
            <ul className="static-detail-link-list">
                {visibleLinks.map((link, index) => (
                    <li key={`${link.label}-${link.text}-${index}`}>
                        {link.url ? (
                            <a href={link.url} target="_blank" rel="noreferrer">
                                <span>
                                    <strong>{link.label}</strong>
                                    {link.text && <small>{link.text}</small>}
                                </span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        ) : (
                            <div>
                                <span>
                                    <strong>{link.label}</strong>
                                    {link.text && <small>{link.text}</small>}
                                </span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

const Story = ({ storyEN, storyFA, title }) => {
    const englishParagraphs = splitStory(storyEN);
    const farsiParagraphs = splitStory(storyFA);

    if (!englishParagraphs.length && !farsiParagraphs.length) return null;

    const hasLanguageToggle =
        englishParagraphs.length > 0 && farsiParagraphs.length > 0;

    return (
        <section className="static-detail-story" data-static-story>
            <header className="static-detail-story-header">
                <div>
                    <h2>{title}</h2>
                </div>

                {hasLanguageToggle && (
                    <AboutPanelLanguageToggle
                        activeLanguage="EN"
                        onLanguageChange={() => {}}
                    />
                )}
            </header>

            {englishParagraphs.length > 0 && (
                <div
                    className="static-detail-story-content"
                    data-story-language="EN"
                    dir="ltr"
                    lang="en"
                >
                    <StoryParagraphs paragraphs={englishParagraphs} />
                </div>
            )}

            {farsiParagraphs.length > 0 && (
                <div
                    className="static-detail-story-content is-farsi-text"
                    data-story-language="FA"
                    dir="rtl"
                    lang="fa"
                    hidden
                >
                    <StoryParagraphs paragraphs={farsiParagraphs} />
                </div>
            )}

            {farsiParagraphs.length > 0 && (
                <noscript>
                    <div
                        className="static-detail-story-noscript is-farsi-text"
                        dir="rtl"
                        lang="fa"
                    >
                        <h3>{title}</h3>
                        <StoryParagraphs paragraphs={farsiParagraphs} />
                    </div>
                </noscript>
            )}
        </section>
    );
};

const Gallery = ({ images = [], title }) => {
    if (!images.length) return null;

    return (
        <section className="static-detail-section static-detail-gallery-section">
            <header className="static-detail-section-heading">
                <h2>Gallery</h2>
            </header>
            <div className="static-detail-gallery">
                {images.map((image, index) => {
                    const normalizedImage =
                        typeof image === "string" ? { src: image } : image;
                    const fullImage =
                        normalizedImage.lightboxSrc ?? normalizedImage.src;

                    return (
                        <a
                            href={fullImage}
                            key={`${normalizedImage.src}-${index}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={normalizedImage.src}
                                alt={
                                    normalizedImage.alt ??
                                    `${title} gallery image ${index + 1}`
                                }
                                width={normalizedImage.width}
                                height={normalizedImage.height}
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

const Highlights = ({ features = [], title }) => {
    if (!features.length) return null;

    return (
        <section className="static-detail-section static-detail-highlights">
            <header className="static-detail-section-heading">
                <h2>{title ?? "Key details"}</h2>
            </header>
            <ul className="static-detail-feature-list">
                {features.map((feature) => (
                    <li key={feature}>
                        <span
                            className="static-detail-feature-icon"
                            aria-hidden="true"
                        >
                            <FaCheck />
                        </span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const StaticDetailPage = ({ page }) => {
    const { detail, item } = page;
    const Icon = page.pageType === "impact" ? item.icon : null;
    const primaryLinks = detail.links?.filter(({ url }) => url) ?? [];
    const relatedLinks = detail.hasRelatedLinks ? detail.relatedLinks : [];
    const storyTitle = detail.storyTitle ?? `${page.title} story`;
    const hasGallery = detail.galleryImages?.length > 0;
    const hasHighlights = detail.features?.length > 0;

    return (
        <div className={`static-detail-page is-${page.pageType}`}>
            <div className="static-detail-background" aria-hidden="true">
                <span />
                <span />
                <span />
            </div>

            <header className="static-detail-site-header">
                <div className="static-detail-brand">
                    <span className="static-detail-brand-avatar">
                        <img
                            src={aboutData.image.src}
                            alt=""
                            width={aboutData.image.width}
                            height={aboutData.image.height}
                        />
                    </span>
                    <span className="static-detail-brand-copy">
                        <strong>Ali Sadeghi</strong>
                        <small>Portfolio detail page</small>
                    </span>
                </div>
                <PortfolioLink
                    className="static-detail-header-button"
                    portfolioPath={page.portfolioPath}
                />
            </header>

            <main>
                <article>
                    <header className="static-detail-hero">
                        <div className="static-detail-hero-copy">
                            <nav aria-label="Breadcrumb">
                                <span>Portfolio</span>
                                <span aria-hidden="true">/</span>
                                <span>{page.sectionLabel}</span>
                            </nav>
                            <h1>{page.title}</h1>
                            {page.subtitle && (
                                <p className="static-detail-subtitle">
                                    {page.subtitle}
                                </p>
                            )}
                            <p className="static-detail-summary">
                                {detail.summary}
                            </p>

                            {primaryLinks.length > 0 && (
                                <div className="static-detail-actions">
                                    {primaryLinks.map((link) => (
                                        <a
                                            href={link.url}
                                            key={link.label}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {link.label}
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="static-detail-hero-media">
                            <div className="static-detail-hero-image-frame">
                                {Icon ? (
                                    <Icon aria-hidden="true" />
                                ) : page.image ? (
                                    <img
                                        src={page.image.src}
                                        alt={page.image.alt}
                                        width={page.image.width}
                                        height={page.image.height}
                                        decoding="async"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </header>

                    {(hasGallery || hasHighlights) && (
                        <div
                            className={`static-detail-overview${hasGallery && hasHighlights ? " has-two-sections" : ""}`}
                        >
                            <Gallery
                                images={detail.galleryImages}
                                title={page.title}
                            />
                            <Highlights
                                features={detail.features}
                                title={detail.featuresTitle}
                            />
                        </div>
                    )}

                    <Story
                        storyEN={detail.storyEN}
                        storyFA={detail.storyFA}
                        title={storyTitle}
                    />

                    <DetailLinks links={relatedLinks} />
                </article>
            </main>

            <footer className="static-detail-footer">
                <PortfolioLink portfolioPath={page.portfolioPath} />
            </footer>

            <script
                dangerouslySetInnerHTML={{ __html: LANGUAGE_TOGGLE_SCRIPT }}
            />
        </div>
    );
};

export default StaticDetailPage;
