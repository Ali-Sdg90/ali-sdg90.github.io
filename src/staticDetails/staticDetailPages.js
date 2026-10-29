import { aboutCareerData } from "../data/aboutSection/aboutCareerData";
import { aboutImpactData } from "../data/aboutSection/aboutImpactData";
import { aboutProjectData } from "../data/aboutSection/aboutProjectData";
import { aboutTechStackData } from "../data/aboutSection/aboutTechStackData";
import { shelfSections } from "../data/portfolio/shelfSections";
import { getShelfItemId } from "../utils/getShelfItemId";
import {
    getStaticDetailRoutePath,
    normalizeStaticDetailBasePath,
} from "./staticDetailRoutes";

export const STATIC_DETAIL_ORIGIN = "https://ali-sdg.is-a.dev";

export const STATIC_DETAIL_SECTION_CONFIG = {
    projects: {
        pageType: "project",
    },
    achievements: {
        pageType: "impact",
    },
    "tech-stack": {
        pageType: "stack",
    },
    "career-journey": {
        pageType: "career",
    },
};

const detailDataBySectionId = {
    projects: aboutProjectData,
    achievements: aboutImpactData,
    "tech-stack": aboutTechStackData,
    "career-journey": aboutCareerData,
};

const getPageTitle = ({ detail, item, section }) => {
    if (section.id === "achievements") {
        return `${item.title} ${item.meta}`;
    }

    return detail.title ?? item.title;
};

const getPageSubtitle = ({ detail, item, section }) => {
    if (section.id === "projects") {
        return [detail.subtitle, detail.year].filter(Boolean).join(" · ");
    }

    if (section.id === "career-journey") {
        return [item.meta, item.year].filter(Boolean).join(" · ");
    }

    return detail.subtitle ?? "";
};

const getPageImage = ({ detail, item, section }) => {
    if (section.id === "achievements") return null;

    const source =
        detail.lightboxImage ?? detail.image ?? item.image ?? undefined;

    if (!source) return null;

    const isProject = section.id === "projects";

    return {
        src: source,
        alt: `${detail.title ?? item.title} ${isProject ? "project preview" : "logo"}`,
        width: isProject
            ? (detail.lightboxWidth ?? detail.imageWidth ?? item.imageWidth)
            : (detail.lightboxWidth ?? item.imageWidth ?? 600),
        height: isProject
            ? (detail.lightboxHeight ?? detail.imageHeight ?? item.imageHeight)
            : (detail.lightboxHeight ?? item.imageHeight ?? 600),
    };
};

const createSeoDescription = (summary, maximumLength = 160) => {
    if (summary.length <= maximumLength) return summary;

    const shortened = summary.slice(0, maximumLength - 1);
    const lastSpace = shortened.lastIndexOf(" ");

    return `${shortened.slice(0, Math.max(lastSpace, maximumLength - 24))}…`;
};

const removeBasePath = (url, basePath) => {
    if (!url || /^(?:[a-z]+:)?\/\//i.test(url)) return url;

    const normalizedBasePath = normalizeStaticDetailBasePath(basePath);
    const withoutBase = url.startsWith(normalizedBasePath)
        ? url.slice(normalizedBasePath.length)
        : url.replace(/^\//, "");

    return `/${withoutBase}`;
};

const createCanonicalAssetUrl = (url, basePath) => {
    const productionPath = removeBasePath(url, basePath);

    return productionPath
        ? new URL(productionPath, STATIC_DETAIL_ORIGIN).href
        : `${STATIC_DETAIL_ORIGIN}/desktop-preview.webp`;
};

export const getStaticDetailPages = ({
    basePath = import.meta.env.BASE_URL,
} = {}) => {
    const normalizedBasePath = normalizeStaticDetailBasePath(basePath);
    const pages = shelfSections.flatMap((section) => {
        const sectionConfig = STATIC_DETAIL_SECTION_CONFIG[section.id];
        const sectionDetails = detailDataBySectionId[section.id];

        if (!sectionConfig || !sectionDetails) return [];

        return section.items.flatMap((item) => {
            const itemId = getShelfItemId(item);
            const detail = sectionDetails[itemId];

            if (!detail) return [];

            const routePath = getStaticDetailRoutePath(section.id, itemId);
            const pagePath = `${normalizedBasePath}${routePath}`;
            const canonicalUrl = new URL(routePath, `${STATIC_DETAIL_ORIGIN}/`)
                .href;
            const title = getPageTitle({ detail, item, section });
            const subtitle = getPageSubtitle({ detail, item, section });
            const image = getPageImage({ detail, item, section });
            const descriptionSource =
                detail.summary ||
                item.meta ||
                detail.subtitle ||
                `${title} in Ali Sadeghi's portfolio.`;

            return [
                {
                    id: itemId,
                    title,
                    subtitle,
                    description: createSeoDescription(descriptionSource),
                    canonicalUrl,
                    routePath,
                    pagePath,
                    portfolioPath: normalizedBasePath,
                    interactivePath: `${normalizedBasePath}#${itemId}`,
                    sectionId: section.id,
                    sectionLabel: section.label,
                    pageType: sectionConfig.pageType,
                    image,
                    socialImage: {
                        src: createCanonicalAssetUrl(image?.src, basePath),
                        alt:
                            image?.alt ??
                            "Desktop preview of Ali Sadeghi's interactive portfolio",
                        width: image?.width ?? 845,
                        height: image?.height ?? 400,
                    },
                    item,
                    detail,
                },
            ];
        });
    });

    return pages;
};
