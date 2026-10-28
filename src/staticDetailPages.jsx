import { renderToStaticMarkup } from "react-dom/server";

import { getAboutCareerById } from "./data/aboutSection/aboutCareerData";
import { getAboutImpactById } from "./data/aboutSection/aboutImpactData";
import { getAboutProjectById } from "./data/aboutSection/aboutProjectData";
import { getAboutTechStackById } from "./data/aboutSection/aboutTechStackData";
import { shelfSections } from "./data/portfolio/shelfSections";
import { getShelfItemId } from "./utils/getShelfItemId";

const SITE_ORIGIN = "https://ali-sdg.is-a.dev";

const SECTION_TYPES = {
    projects: { path: "projects", label: "Featured Projects", getDetail: getAboutProjectById },
    achievements: { path: "impact", label: "Impact in Numbers", getDetail: getAboutImpactById },
    "tech-stack": { path: "stack", label: "Tech Stack & Tools", getDetail: getAboutTechStackById },
    "career-journey": { path: "career", label: "Career Journey", getDetail: getAboutCareerById },
};

const isMeaningful = (value) =>
    typeof value === "string" &&
    value.trim().length > 0 &&
    !/^(placeholder|coming soon|todo|tbd)\b/i.test(value.trim());

const visibleLinks = (links) =>
    (links ?? []).filter(
        (link) =>
            isMeaningful(link.label) &&
            typeof link.url === "string" &&
            /^https?:\/\//i.test(link.url),
    );

const storyParagraphs = (story) =>
    isMeaningful(story)
        ? story
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph) =>
                  paragraph
                      .replace(/^#{1,6}\s+/gm, "")
                      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                      .replace(/(\*\*|__|(?<!\w)\*|\*(?!\w)|`)/g, "")
                      .trim(),
              )
              .filter(Boolean)
        : [];

const pageTitle = (sectionId, item) =>
    sectionId === "achievements"
        ? [item.title, item.meta].filter(Boolean).join(" ")
        : item.title;

function StaticDetailDocument({ item, detail, section, sectionType, pageUrl, basePath, indexable }) {
    const title = pageTitle(section.id, item);
    const summary = isMeaningful(detail?.summary)
        ? detail.summary
        : item.meta || sectionType.label;
    const features = (detail?.features ?? []).filter(isMeaningful);
    const links = visibleLinks(detail?.links);
    const relatedLinks = visibleLinks(detail?.relatedLinks);
    const paragraphs = storyParagraphs(detail?.storyEN);
    const tags = (detail?.tech ?? []).filter(isMeaningful);
    const image = detail?.image || item.image;
    const gallery = (detail?.galleryImages ?? []).slice(0, 4);
    const interactiveUrl = basePath + "#" + encodeURIComponent(getShelfItemId(item));
    const description = String(summary).slice(0, 230);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title} | Ali Sadeghi</title>
                <meta name="description" content={description} />
                <meta name="robots" content={indexable ? "index,follow,max-image-preview:large" : "noindex,follow"} />
                <link rel="canonical" href={pageUrl} />
                <link rel="icon" href={basePath + "favicon-128.webp"} type="image/webp" />
                <link rel="stylesheet" href={basePath + "static-detail.css"} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title + " | Ali Sadeghi"} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={pageUrl} />
                {image && <meta property="og:image" content={new URL(image, SITE_ORIGIN).href} />}
            </head>
            <body>
                <div className="static-page">
                    <header className="site-header">
                        <a className="brand" href={basePath}>Ali Sadeghi</a>
                        <a className="header-link" href={basePath}>Portfolio home ↗</a>
                    </header>
                    <main id="main-content">
                        <article>
                            <div className="intro">
                                <p className="eyebrow">{sectionType.label}</p>
                                <h1>{title}</h1>
                                <p className="lead">{summary}</p>
                                {(item.year || detail?.year) && (
                                    <p className="year">{item.year || detail.year}</p>
                                )}
                            </div>
                            {image && (
                                <figure className="hero-image">
                                    <img src={image} alt={title + " preview"} loading="eager" />
                                </figure>
                            )}
                            {tags.length > 0 && (
                                <section className="detail-section" aria-labelledby="tech-heading">
                                    <h2 id="tech-heading">Technologies & tools</h2>
                                    <ul className="tags">
                                        {tags.map((tag) => <li key={tag}>{tag}</li>)}
                                    </ul>
                                </section>
                            )}
                            {features.length > 0 && (
                                <section className="detail-section" aria-labelledby="features-heading">
                                    <h2 id="features-heading">{detail?.featuresTitle || "Highlights"}</h2>
                                    <ul className="features">
                                        {features.map((feature) => <li key={feature}>{feature}</li>)}
                                    </ul>
                                </section>
                            )}
                            {gallery.length > 0 && (
                                <section className="detail-section" aria-labelledby="gallery-heading">
                                    <h2 id="gallery-heading">Gallery</h2>
                                    <div className="gallery">
                                        {gallery.map((entry, index) => {
                                            const imageItem = typeof entry === "string" ? { src: entry } : entry;
                                            return (
                                                <img
                                                    key={imageItem.src + index}
                                                    src={imageItem.src}
                                                    alt={imageItem.alt || title + " screenshot " + (index + 1)}
                                                    loading="lazy"
                                                    width={imageItem.width}
                                                    height={imageItem.height}
                                                />
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                            {paragraphs.length > 0 && (
                                <section className="detail-section" aria-labelledby="story-heading">
                                    <h2 id="story-heading">The story</h2>
                                    <div className="story">
                                        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                    </div>
                                </section>
                            )}
                            {(links.length > 0 || relatedLinks.length > 0) && (
                                <section className="detail-section" aria-labelledby="links-heading">
                                    <h2 id="links-heading">Explore further</h2>
                                    <ul className="related-links">
                                        {[...links, ...relatedLinks].map((link, index) => (
                                            <li key={index}>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    <strong>{link.label}</strong>
                                                    {isMeaningful(link.text) && <span>{link.text}</span>}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </article>
                    </main>
                    <footer className="page-footer">
                        <p>Interested in how this fits into my work?</p>
                        <a className="interactive-link" href={interactiveUrl}>
                            Explore {title} in my interactive portfolio ↗
                        </a>
                        <small>© 2026 Ali Sadeghi. Made with care.</small>
                    </footer>
                </div>
            </body>
        </html>
    );
}

export function renderDetailPages() {
    const basePath = import.meta.env.BASE_URL;
    const pages = [];

    for (const section of shelfSections) {
        const sectionType = SECTION_TYPES[section.id];
        if (!sectionType) continue;

        for (const item of section.items) {
            const itemId = getShelfItemId(item);
            const detail = sectionType.getDetail(itemId);
            const path = sectionType.path + "/" + itemId + "/";
            const pageUrl = SITE_ORIGIN + basePath + path;
            const indexable =
                isMeaningful(detail?.summary) &&
                detail.summary.trim().length >= 45 &&
                (detail?.features ?? []).some(isMeaningful);

            pages.push({
                path,
                url: pageUrl,
                indexable,
                html: renderToStaticMarkup(
                    <StaticDetailDocument
                        item={item}
                        detail={detail}
                        section={section}
                        sectionType={sectionType}
                        pageUrl={pageUrl}
                        basePath={basePath}
                        indexable={indexable}
                    />,
                ),
            });
        }
    }

    return pages;
}
