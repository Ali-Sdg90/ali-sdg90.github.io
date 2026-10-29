const HEAD_MARKER = "<!-- static-detail-head -->";
const BODY_MARKER = "<!-- static-detail-body -->";

const escapeHtml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const serializeJsonLd = (value) =>
    JSON.stringify(value).replaceAll("<", "\\u003c");

const replaceRequiredMarker = (template, marker, replacement) => {
    if (!template.includes(marker)) {
        throw new Error(`Static detail template is missing ${marker}.`);
    }

    return template.replace(marker, replacement);
};

const renderStaticDetailHead = (page) => {
    const seoTitle = `${page.title} | Ali Sadeghi`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${page.canonicalUrl}#webpage`,
        url: page.canonicalUrl,
        name: page.title,
        description: page.description,
        inLanguage: ["en", "fa"],
        isPartOf: {
            "@id": "https://ali-sdg.is-a.dev/#website",
        },
        about: {
            "@type": "CreativeWork",
            name: page.title,
            description: page.description,
            image: page.socialImage.src,
            author: {
                "@type": "Person",
                "@id": "https://ali-sdg.is-a.dev/#person",
                name: "Ali Sadeghi",
            },
        },
    };

    return [
        `<title>${escapeHtml(seoTitle)}</title>`,
        `<meta name="description" content="${escapeHtml(page.description)}" />`,
        '<meta name="author" content="Ali Sadeghi" />',
        '<meta name="robots" content="index,follow,max-image-preview:large" />',
        '<meta name="theme-color" content="#070b12" />',
        `<link rel="canonical" href="${escapeHtml(page.canonicalUrl)}" />`,
        '<meta property="og:type" content="article" />',
        '<meta property="og:locale" content="en_US" />',
        '<meta property="og:site_name" content="Ali Sadeghi | Portfolio" />',
        `<meta property="og:title" content="${escapeHtml(seoTitle)}" />`,
        `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
        `<meta property="og:url" content="${escapeHtml(page.canonicalUrl)}" />`,
        `<meta property="og:image" content="${escapeHtml(page.socialImage.src)}" />`,
        `<meta property="og:image:alt" content="${escapeHtml(page.socialImage.alt)}" />`,
        `<meta property="og:image:width" content="${escapeHtml(page.socialImage.width)}" />`,
        `<meta property="og:image:height" content="${escapeHtml(page.socialImage.height)}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        '<meta name="twitter:creator" content="@Ali_Sdg90" />',
        `<meta name="twitter:title" content="${escapeHtml(seoTitle)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
        `<meta name="twitter:image" content="${escapeHtml(page.socialImage.src)}" />`,
        `<meta name="twitter:image:alt" content="${escapeHtml(page.socialImage.alt)}" />`,
        `<script type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`,
    ].join("\n        ");
};

export const renderStaticDetailDocument = (template, page) => {
    const withHead = replaceRequiredMarker(
        template,
        HEAD_MARKER,
        renderStaticDetailHead(page),
    );

    return replaceRequiredMarker(withHead, BODY_MARKER, page.html);
};
