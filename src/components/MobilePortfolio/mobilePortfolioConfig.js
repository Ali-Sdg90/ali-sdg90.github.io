import { contactItems, socialItems } from "../../data/portfolio/profileLinks";
import { shelfSections } from "../../data/portfolio/shelfSections";
import { getShelfItemId } from "../../utils/getShelfItemId";

export const RESUME_URL = "/resume/ali-sadeghi-resume-en.pdf";
export const CARD_INSTRUCTION = "Tap a card to view its details.";

export const NAV_ITEMS = [
    { id: "mobile-projects", label: "Projects" },
    { id: "mobile-impact", label: "Impact" },
    { id: "mobile-stack", label: "Stack" },
    { id: "mobile-career", label: "Career" },
];

const MOBILE_SECTION_BY_SHELF_SECTION_ID = {
    projects: "mobile-projects",
    achievements: "mobile-impact",
    "tech-stack": "mobile-stack",
    "career-journey": "mobile-career",
};

export const MOBILE_SECTION_BY_ITEM_ID = Object.fromEntries(
    shelfSections.flatMap((section) => {
        const mobileSectionId = MOBILE_SECTION_BY_SHELF_SECTION_ID[section.id];

        if (!mobileSectionId) return [];

        return section.items.map((item) => [
            getShelfItemId(item),
            mobileSectionId,
        ]);
    }),
);

export const locationItem = contactItems.find(({ id }) => id === "location");
export const contactLinkItems = contactItems.filter(
    ({ id }) => id !== "location",
);
export const socialLinkItems = socialItems;

export const SHELF_SECTION_MAP = Object.fromEntries(
    shelfSections.map((section) => [section.id, section]),
);
