import { useRef, useState } from "react";
import {
    FaArrowUpRightFromSquare,
    FaBookOpen,
    FaCheck,
    FaFileLines,
    FaGithub,
    FaImages,
    FaLayerGroup,
    FaListCheck,
    FaLink,
    FaPenNib,
} from "react-icons/fa6";

import LightboxImage from "../../ui/LightboxImage";
import StoryReaderModal from "./StoryReaderModal";
import { trackUmamiEvent } from "../../../utils/analytics";

const sectionIcons = {
    description: FaFileLines,
    features: FaListCheck,
    gallery: FaImages,
    story: FaPenNib,
    relatedLinks: FaLink,
};

const getLinkType = (label = "") =>
    label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "") || "link";

const trackProjectLinkClick = ({ link, placement, project }) => {
    if (!project) return;

    trackUmamiEvent("project_link_click", {
        project_id: project.id,
        project_name: project.title,
        link_type: getLinkType(link.label),
        link_name: link.label,
        placement,
    });
};

const ProjectLinks = ({ links = [], project }) => {
    const visibleLinks = links.filter((link) => link.label);

    if (!visibleLinks.length) return null;

    return (
        <div className="featured-project-links" aria-label="Project links">
            {visibleLinks.map((link) => {
                const Icon = link.label.toLowerCase().includes("github")
                    ? FaGithub
                    : FaArrowUpRightFromSquare;
                const isDisabled = !link.url;

                if (isDisabled) {
                    return (
                        <button
                            className="featured-project-link is-disabled"
                            key={link.label}
                            type="button"
                            disabled
                        >
                            <span className="featured-project-link-content">
                                <Icon aria-hidden="true" />
                                <span>{link.label}</span>
                            </span>
                        </button>
                    );
                }

                return (
                    <a
                        className="featured-project-link"
                        href={link.url}
                        key={link.label}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                            trackProjectLinkClick({
                                link,
                                placement: "primary",
                                project,
                            })
                        }
                    >
                        <span className="featured-project-link-content">
                            <Icon aria-hidden="true" />
                            <span>{link.label}</span>
                        </span>
                    </a>
                );
            })}
        </div>
    );
};

// const TechChips = ({ tech = [] }) => {
//     if (!tech.length) return null;

//     return (
//         <ul className="featured-project-tech" aria-label="Tech stack">
//             {tech.map((techItem) => (
//                 <li key={techItem}>{techItem}</li>
//             ))}
//         </ul>
//     );
// };

const DetailSectionTitle = ({ children, type }) => {
    const Icon = sectionIcons[type] ?? FaLayerGroup;

    return (
        <h3 className="featured-project-section-title">
            <Icon aria-hidden="true" />
            <span>{children}</span>
        </h3>
    );
};

const FeaturesCard = ({ features = [], title = "Features" }) => {
    if (!features.length) return null;

    return (
        <section className="featured-project-card">
            <DetailSectionTitle type="features">{title}</DetailSectionTitle>
            <ul className="featured-project-features">
                {features.map((feature) => (
                    <li key={feature}>
                        <span className="featured-project-feature-icon">
                            <FaCheck aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const DetailGallery = ({ columns = 3, images = [], title }) => {
    if (!images.length) return null;

    const galleryColumns = Math.min(3, Math.max(1, columns));

    return (
        <section className="featured-project-section">
            <DetailSectionTitle type="gallery">Gallery</DetailSectionTitle>
            <div
                className="featured-project-gallery"
                style={{ "--gallery-columns": galleryColumns }}
            >
                {images.map((image, imageIndex) => {
                    const galleryImage =
                        typeof image === "string" ? { src: image } : image;

                    return (
                        <LightboxImage
                            image={{
                                ...galleryImage,
                                alt:
                                    galleryImage.alt ??
                                    `${title} gallery ${imageIndex + 1}`,
                            }}
                            key={galleryImage.src}
                            buttonClassName="featured-project-gallery-button"
                            fallbackClassName="featured-project-gallery-image featured-project-gallery-image-fallback"
                            imageClassName="featured-project-gallery-image"
                            imageProps={{
                                loading: "lazy",
                                decoding: "async",
                            }}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const ProjectStory = ({
    activeLanguage,
    languageToggle,
    storySource,
    storyType,
    storyEN,
    storyFA,
    subjectTitle,
    title = "Story",
    titleFA,
    isImpactStory = false,
}) => {
    const [isReaderOpen, setIsReaderOpen] = useState(false);
    const readerTriggerRef = useRef(null);
    const isFarsi = activeLanguage === "FA" && storyFA;
    const visibleStory = isFarsi ? storyFA : storyEN;
    const visibleTitle = isFarsi ? (titleFA ?? title) : title;
    const paragraphs = visibleStory
        ?.split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    if (!paragraphs?.length) return null;

    return (
        <section
            className={[
                "featured-project-section",
                isImpactStory ? "is-impact-story" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="featured-project-story-header">
                <DetailSectionTitle type="story">
                    {visibleTitle}
                </DetailSectionTitle>
                {languageToggle}
            </div>
            <div
                className={[
                    "featured-project-story",
                    isFarsi ? "is-farsi-text" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                dir={isFarsi ? "rtl" : undefined}
                lang={isFarsi ? "fa" : undefined}
            >
                <div className="featured-project-story-content is-clamped">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <button
                className="featured-project-story-toggle"
                type="button"
                aria-haspopup="dialog"
                onClick={() => setIsReaderOpen(true)}
                ref={readerTriggerRef}
            >
                <span>Read full story</span>
                <FaBookOpen aria-hidden="true" />
            </button>

            {isReaderOpen && (
                <StoryReaderModal
                    initialLanguage={isFarsi ? "FA" : "EN"}
                    isImpactStory={isImpactStory}
                    onClose={() => setIsReaderOpen(false)}
                    returnFocusRef={readerTriggerRef}
                    storyEN={storyEN}
                    storyFA={storyFA}
                    storySource={storySource}
                    storyType={storyType}
                    title={subjectTitle}
                />
            )}
        </section>
    );
};

const RelatedLinks = ({ links = [], project }) => {
    const visibleLinks = links.filter(
        (link) => link.label || link.text || link.url,
    );

    if (!visibleLinks.length) return null;

    return (
        <section className="featured-project-section">
            <DetailSectionTitle type="relatedLinks">
                Related links
            </DetailSectionTitle>
            <ul className="featured-project-related-links">
                {visibleLinks.map((link, index) => {
                    const content = (
                        <>
                            <span className="featured-project-related-link-copy">
                                <span className="featured-project-related-link-label">
                                    {link.label}
                                </span>
                                <span className="featured-project-related-link-text">
                                    {link.text}
                                </span>
                            </span>
                            <FaArrowUpRightFromSquare aria-hidden="true" />
                        </>
                    );

                    return (
                        <li key={`${link.label}-${index}`}>
                            {link.url ? (
                                <a
                                    className="featured-project-related-link"
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={link.text}
                                    onClick={() =>
                                        trackProjectLinkClick({
                                            link,
                                            placement: "related",
                                            project,
                                        })
                                    }
                                >
                                    {content}
                                </a>
                            ) : (
                                <div className="featured-project-related-link is-disabled">
                                    {content}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

const FeaturedProjectAbout = ({
    activeLanguage,
    detail,
    isExpanded,
    item,
    languageToggle,
    section,
}) => {
    if (!detail) {
        return (
            <div className="featured-project-about">
                <p className="featured-project-summary">
                    Project detail content is being prepared for this shelf
                    item.
                </p>
            </div>
        );
    }

    const shouldHideSummary = section?.id === "tech-stack";
    const project =
        section?.id === "projects" ? { id: item.id, title: item.title } : null;
    const isImpactDetail = section?.id === "achievements";
    const summary = detail.summary;

    return (
        <div className="featured-project-about">
            {!shouldHideSummary && summary && (
                <section className="featured-project-description">
                    {isExpanded && (
                        <DetailSectionTitle type="description">
                            Description
                        </DetailSectionTitle>
                    )}
                    <p className="featured-project-summary">{summary}</p>
                </section>
            )}
            <ProjectLinks links={detail.links} project={project} />
            {/* <TechChips tech={detail.tech} /> */}
            <DetailGallery
                columns={detail.galleryColumns}
                images={detail.galleryImages}
                title={detail.title}
            />
            <FeaturesCard
                features={detail.features}
                title={detail.featuresTitle}
            />
            <ProjectStory
                activeLanguage={activeLanguage}
                languageToggle={languageToggle}
                storySource={detail.storySource}
                storyType={
                    section?.id === "projects"
                        ? "projects"
                        : section?.id === "career-journey"
                          ? "career"
                          : "default"
                }
                storyEN={detail.storyEN}
                storyFA={detail.storyFA}
                subjectTitle={
                    isImpactDetail
                        ? `${item.title} ${item.meta}`
                        : (detail.title ?? item.title)
                }
                title={detail.storyTitle}
                titleFA={detail.storyTitleFA}
                isImpactStory={isImpactDetail}
            />
            {detail.hasRelatedLinks && (
                <RelatedLinks links={detail.relatedLinks} project={project} />
            )}
        </div>
    );
};

export default FeaturedProjectAbout;
