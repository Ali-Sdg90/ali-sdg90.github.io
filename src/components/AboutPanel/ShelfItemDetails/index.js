import placeholderImage from "../../../assets/images/global/placeholder.jpg";
import { getAboutCareerById } from "../../../data/aboutSection/aboutCareerData";
import { getAboutImpactById } from "../../../data/aboutSection/aboutImpactData";
import { getAboutProjectById } from "../../../data/aboutSection/aboutProjectData";
import { getAboutTechStackById } from "../../../data/aboutSection/aboutTechStackData";
import FeaturedProjectAbout from "../FeaturedProjectAbout";

const sectionSubtitles = {
    projects: "Project detail placeholder",
    achievements: "Impact detail placeholder",
    "tech-stack": "Technology detail placeholder",
    "career-journey": "Career detail placeholder",
};

const getGenericImage = (item, section, lightboxSrc) => {
    if (item.image) {
        return {
            src: item.image,
            lightboxSrc,
            alt: `${item.title} logo`,
            width: item.imageWidth ?? 300,
            height: item.imageHeight ?? 300,
            lightboxWidth: lightboxSrc ? 600 : undefined,
            lightboxHeight: lightboxSrc ? 600 : undefined,
            zoom: 1,
        };
    }

    return {
        src: placeholderImage,
        alt: `${section.label} placeholder`,
        width: 500,
        height: 500,
        zoom: 1,
    };
};

export const getShelfItemDetailModule = ({ item, section }) => {
    if (!item || !section) return null;

    if (section.id === "projects") {
        const projectDetail = getAboutProjectById(item.id);
        const imageSource = projectDetail?.image ?? item.image;

        return {
            title: projectDetail?.title ?? item.title,
            subtitle: projectDetail
                ? `${projectDetail.subtitle} · ${projectDetail.year}`
                : "Project details coming soon",
            image: {
                src: imageSource ?? placeholderImage,
                lightboxSrc: projectDetail?.lightboxImage,
                alt: `${projectDetail?.title ?? item.title} project preview`,
                width:
                    projectDetail?.imageWidth ??
                    item.imageWidth ??
                    (imageSource ? 1280 : 500),
                height:
                    projectDetail?.imageHeight ??
                    item.imageHeight ??
                    (imageSource ? 720 : 500),
                lightboxWidth: projectDetail?.lightboxWidth,
                lightboxHeight: projectDetail?.lightboxHeight,
                zoom: 1,
            },
            tags: [],
            detail: projectDetail,
            detailVariant: "featured",
            Component: FeaturedProjectAbout,
        };
    }

    if (section.id === "career-journey") {
        const careerDetail = getAboutCareerById(item.id);

        return {
            title: careerDetail?.title ?? item.title,
            subtitle: [item.meta, item.year].filter(Boolean).join(" · "),
            image: getGenericImage(item, section, careerDetail?.lightboxImage),
            tags: [],
            detail: careerDetail,
            detailVariant: "compact",
            Component: FeaturedProjectAbout,
        };
    }

    if (section.id === "achievements") {
        const impactDetail = getAboutImpactById(item.id);

        return {
            title: `${item.title} ${item.meta}`,
            subtitle: "",
            image: getGenericImage(item, section),
            tags: [],
            detail: impactDetail,
            detailVariant: "compact",
            Component: FeaturedProjectAbout,
        };
    }

    if (section.id === "tech-stack") {
        const techDetail = getAboutTechStackById(item.id);

        return {
            title: techDetail?.title ?? item.title,
            subtitle: "",
            image: getGenericImage(item, section, techDetail?.lightboxImage),
            tags: [],
            detail: techDetail,
            detailVariant: "compact",
            Component: FeaturedProjectAbout,
        };
    }

    return {
        title: item.title,
        subtitle: sectionSubtitles[section.id] ?? `${section.label} detail`,
        image: getGenericImage(item, section),
        tags: [],
        detail: null,
        detailVariant: "compact",
        Component: FeaturedProjectAbout,
    };
};
