const HOME_METADATA = {
    title: "Ali Sadeghi | Portfolio",
    description: "Ali Sadeghi's interactive portfolio and resume website.",
    canonicalUrl: "https://ali-sdg.is-a.dev/",
};

const BUILD_STORY_METADATA = {
    title: "How My Portfolio Was Built | Ali Sadeghi",
    description:
        "A 26-chapter visual story about the design and engineering process behind Ali Sadeghi's interactive portfolio.",
    canonicalUrl: "https://ali-sdg.is-a.dev/how-i-built-my-portfolio/",
};

export function setPageMetadata(isBuildStory) {
    const metadata = isBuildStory ? BUILD_STORY_METADATA : HOME_METADATA;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    document.title = import.meta.env.DEV
        ? `Local | ${metadata.title}`
        : metadata.title;

    if (description) description.content = metadata.description;
    if (canonical) canonical.href = metadata.canonicalUrl;
}
