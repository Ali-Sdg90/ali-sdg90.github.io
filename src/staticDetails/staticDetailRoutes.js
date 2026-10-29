export const STATIC_DETAIL_ROUTE_SEGMENTS = Object.freeze({
    projects: "projects",
    achievements: "impact",
    "tech-stack": "stack",
    "career-journey": "career",
});

export const normalizeStaticDetailBasePath = (basePath) => {
    const withLeadingSlash = basePath.startsWith("/")
        ? basePath
        : `/${basePath}`;

    return withLeadingSlash.endsWith("/")
        ? withLeadingSlash
        : `${withLeadingSlash}/`;
};

export const getStaticDetailRoutePath = (sectionId, itemId) => {
    const routeSegment = STATIC_DETAIL_ROUTE_SEGMENTS[sectionId];

    return routeSegment && itemId ? `${routeSegment}/${itemId}/` : null;
};

export const getStaticDetailPagePath = (
    sectionId,
    itemId,
    basePath = import.meta.env.BASE_URL,
) => {
    const routePath = getStaticDetailRoutePath(sectionId, itemId);

    return routePath
        ? `${normalizeStaticDetailBasePath(basePath)}${routePath}`
        : undefined;
};

export const handleStaticDetailLinkClick = (event, onInteractiveOpen) => {
    const isModifiedClick =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey;

    if (isModifiedClick) return;

    event.preventDefault();
    onInteractiveOpen();
};
