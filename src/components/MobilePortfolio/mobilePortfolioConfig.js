import { contactItems, socialItems } from "../../data/portfolio/profileLinks";
import { shelfSections } from "../../data/portfolio/shelfSections";

export const RESUME_URL = "/resume/ali-sadeghi-resume-en.pdf";
export const CARD_INSTRUCTION = "Tap a card to view its details.";

export const NAV_ITEMS = [
    { id: "mobile-projects", label: "Projects" },
    { id: "mobile-impact", label: "Impact" },
    { id: "mobile-stack", label: "Stack" },
    { id: "mobile-career", label: "Career" },
];

export const locationItem = contactItems.find(({ id }) => id === "location");
export const githubItem = contactItems.find(({ id }) => id === "github");
export const socialLinkItems = [
    ...contactItems.filter(({ id }) => id !== "location"),
    ...socialItems,
];

export const SHELF_SECTION_MAP = Object.fromEntries(
    shelfSections.map((section) => [section.id, section]),
);
