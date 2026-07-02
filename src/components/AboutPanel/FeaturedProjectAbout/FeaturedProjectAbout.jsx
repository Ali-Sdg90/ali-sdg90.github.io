import {
    FaArrowUpRightFromSquare,
    FaCheck,
    FaGithub,
    FaImages,
    FaLayerGroup,
    FaListCheck,
    FaPenNib,
} from "react-icons/fa6";

import LightboxImage from "../../LightboxImage";

const sectionIcons = {
    features: FaListCheck,
    gallery: FaImages,
    story: FaPenNib,
};

const ProjectLinks = ({ links = [] }) => {
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
                            <Icon aria-hidden="true" />
                            <span>{link.label}</span>
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
                    >
                        <Icon aria-hidden="true" />
                        <span>{link.label}</span>
                    </a>
                );
            })}
        </div>
    );
};

const TechChips = ({ tech = [] }) => {
    if (!tech.length) return null;

    return (
        <ul className="featured-project-tech" aria-label="Tech stack">
            {tech.map((techItem) => (
                <li key={techItem}>{techItem}</li>
            ))}
        </ul>
    );
};

const DetailSectionTitle = ({ children, type }) => {
    const Icon = sectionIcons[type] ?? FaLayerGroup;

    return (
        <h3 className="featured-project-section-title">
            <Icon aria-hidden="true" />
            <span>{children}</span>
        </h3>
    );
};

const FeaturesCard = ({ features = [] }) => {
    if (!features.length) return null;

    return (
        <section className="featured-project-card">
            <DetailSectionTitle type="features">Features</DetailSectionTitle>
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

const ProjectGallery = ({ images = [], title }) => {
    if (!images.length) return null;

    return (
        <section className="featured-project-section">
            <DetailSectionTitle type="gallery">Gallery</DetailSectionTitle>
            <div className="featured-project-gallery">
                {images.map((imageSrc, imageIndex) => (
                    <LightboxImage
                        image={{
                            src: imageSrc,
                            alt: `${title} gallery ${imageIndex + 1}`,
                        }}
                        key={imageSrc}
                        buttonClassName="featured-project-gallery-button"
                        fallbackClassName="featured-project-gallery-image featured-project-gallery-image-fallback"
                        imageClassName="featured-project-gallery-image"
                        imageProps={{
                            loading: "lazy",
                            decoding: "async",
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

const ProjectStory = ({ story }) => {
    const paragraphs = story
        ?.split("\n\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    if (!paragraphs?.length) return null;

    return (
        <section className="featured-project-section">
            <DetailSectionTitle type="story">Story</DetailSectionTitle>
            <div className="featured-project-story">
                {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
        </section>
    );
};

const FeaturedProjectAbout = ({ detail }) => {
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

    return (
        <div className="featured-project-about">
            <p className="featured-project-summary">{detail.summary}</p>
            <ProjectLinks links={detail.links} />
            <TechChips tech={detail.tech} />
            <FeaturesCard features={detail.features} />
            <ProjectGallery
                images={detail.galleryImages}
                title={detail.title}
            />
            <ProjectStory story={detail.story} />
        </div>
    );
};

export default FeaturedProjectAbout;
