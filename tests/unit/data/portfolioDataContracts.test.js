import { describe, expect, test } from "vitest";

import { getShelfItemDetailModule } from "../../../src/components/AboutPanel/ShelfItemDetails";
import { getAboutProjectById } from "../../../src/data/aboutSection/aboutProjectData";
import { projectGalleryImages } from "../../../src/data/aboutSection/projectGalleryData";
import { shelfSections } from "../../../src/data/portfolio/shelfSections";
import { getShelfItemId } from "../../../src/utils/getShelfItemId";

const allShelfItems = shelfSections.flatMap((section) =>
    section.items.map((item) => ({ item, section })),
);

describe("portfolio data contracts", () => {
    test("keeps section and item identifiers globally unique", () => {
        const sectionIds = shelfSections.map(({ id }) => id);
        const itemIds = allShelfItems.map(({ item }) => getShelfItemId(item));

        expect(new Set(sectionIds).size).toBe(sectionIds.length);
        expect(new Set(itemIds).size).toBe(itemIds.length);
    });

    test("keeps every shelf entry renderable with essential content", () => {
        for (const section of shelfSections) {
            expect(section.id).toBeTruthy();
            expect(section.label).toBeTruthy();
            expect(section.items.length).toBeGreaterThan(0);

            for (const item of section.items) {
                expect(getShelfItemId(item)).toBeTruthy();
                expect(item.title).toBeTruthy();
            }
        }
    });

    test("resolves every shelf entry into a complete detail module", () => {
        for (const selection of allShelfItems) {
            const detailModule = getShelfItemDetailModule(selection);

            expect(detailModule?.title).toBeTruthy();
            expect(detailModule?.image?.src).toBeTruthy();
            expect(detailModule?.image?.alt).toBeTruthy();
            expect(detailModule?.Component).toBeTypeOf("function");
        }
    });

    test("keeps featured project shelf entries connected to detail data", () => {
        const projectSection = shelfSections.find(
            ({ id }) => id === "projects",
        );

        for (const project of projectSection.items) {
            const detail = getAboutProjectById(getShelfItemId(project));

            expect(detail?.title).toBeTruthy();
            expect(detail?.storyEN).toBeTruthy();
            expect(detail?.storyFA).toBeTruthy();
        }
    });

    test("keeps gallery previews paired with accessible full-size media", () => {
        for (const [projectId, images] of Object.entries(
            projectGalleryImages,
        )) {
            expect(getAboutProjectById(projectId)).toBeTruthy();
            expect(images.length).toBeGreaterThan(0);

            for (const image of images) {
                expect(image.src).toBeTruthy();
                expect(image.lightboxSrc).toBeTruthy();
                expect(image.alt.trim().length).toBeGreaterThan(10);
                expect(image.width).toBeGreaterThan(0);
                expect(image.height).toBeGreaterThan(0);
                expect(image.lightboxWidth).toBeGreaterThan(0);
                expect(image.lightboxHeight).toBeGreaterThan(0);
            }
        }
    });
});
