import placeholderImage from "../../../assets/images/global/placeholder.jpg";
import { getAboutProjectById } from "../../../data/aboutSection/aboutProjectData";
import { careerDetailModules } from "../CareerDetails";
import FeaturedProjectAbout from "../FeaturedProjectAbout";
import GenericShelfItemDetail from "./GenericShelfItemDetail";

const sectionTags = {
    projects: ["Project", "Case Study", "Build Notes"],
    achievements: ["Impact", "Evidence", "Context"],
    "tech-stack": ["Tooling", "Stack", "Usage"],
};

const sectionSubtitles = {
    projects: "Project detail placeholder",
    achievements: "Impact detail placeholder",
    "tech-stack": "Technology detail placeholder",
};

const getGenericImage = (item, section) => {
    if (item.image) {
        return {
            src: item.image,
            alt: `${item.title} logo`,
            width: 512,
            height: 512,
            zoom: 1,
        };
    }

    return {
        src: placeholderImage,
        alt: `${section.label} placeholder`,
        width: 1024,
        height: 1024,
        zoom: 1,
    };
};

export const getShelfItemDetailModule = ({ item, section }) => {
    if (!item || !section) return null;

    if (section.id === "projects") {
        const projectDetail = getAboutProjectById(item.id);

        return {
            title: projectDetail?.title ?? item.title,
            subtitle: projectDetail
                ? `${projectDetail.subtitle} · ${projectDetail.year}`
                : "Project details coming soon",
            image: {
                src: projectDetail?.image ?? item.image ?? placeholderImage,
                alt: `${projectDetail?.title ?? item.title} project preview`,
                width: 1280,
                height: 720,
                zoom: 1,
            },
            tags: [],
            detail: projectDetail,
            Component: FeaturedProjectAbout,
        };
    }

    if (section.id === "career-journey") {
        return careerDetailModules[item.id] ?? null;
    }

    return {
        title: item.title,
        subtitle: sectionSubtitles[section.id] ?? `${section.label} detail`,
        image: getGenericImage(item, section),
        tags: sectionTags[section.id] ?? [section.label, "Details", "Notes"],
        Component: GenericShelfItemDetail,
    };
};
