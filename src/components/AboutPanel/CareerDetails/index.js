import csiLogo from "../../../assets/images/thumbnails/career/csi_logo.jpg";
import dpaLogo from "../../../assets/images/thumbnails/career/dpa_logo.jpg";
import melkRadarLogo from "../../../assets/images/thumbnails/career/melkradar_logo.jpg";
import settleitLogo from "../../../assets/images/thumbnails/career/settleitgpt_logo.jpg";
import CsInternshipDetail from "./CsInternshipDetail";
import DpaDetail from "./DpaDetail";
import MelkRadarDetail from "./MelkRadarDetail";
import SettleitGptDetail from "./SettleitGptDetail";

export const careerDetailModules = {
    "cs-internship": {
        title: "CS Internship",
        subtitle: "Technical Mentor & System Designer",
        image: {
            src: csiLogo,
            alt: "CS Internship logo",
            width: 512,
            height: 512,
            zoom: 1,
        },
        tags: ["Mentorship", "Systems", "Automation"],
        Component: CsInternshipDetail,
    },
    melkradar: {
        title: "MelkRadar",
        subtitle: "Front-End Developer & Reviewer",
        image: {
            src: melkRadarLogo,
            alt: "MelkRadar logo",
            width: 512,
            height: 512,
            zoom: 1,
        },
        tags: ["React", "Review", "Product UI"],
        Component: MelkRadarDetail,
    },
    "dadeh-pardazi-azmoudeh-karan": {
        title: "Dadeh Pardazi Azmoudeh Karan",
        subtitle: "React Developer",
        image: {
            src: dpaLogo,
            alt: "Dadeh Pardazi Azmoudeh Karan logo",
            width: 512,
            height: 512,
            zoom: 1,
        },
        tags: ["React", "Features", "Maintenance"],
        Component: DpaDetail,
    },
    settleitgpt: {
        title: "SettleitGPT",
        subtitle: "React Native Developer",
        image: {
            src: settleitLogo,
            alt: "SettleitGPT logo",
            width: 512,
            height: 512,
            zoom: 1,
        },
        tags: ["React Native", "AI", "Mobile"],
        Component: SettleitGptDetail,
    },
};
