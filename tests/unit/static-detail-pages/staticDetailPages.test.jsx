import { describe, expect, it } from "vitest";

import { renderDetailPages } from "../../../src/staticDetailPages";

describe("static detail page generation", () => {
    const pages = renderDetailPages();

    it("creates a unique standalone HTML document for every shelf item", () => {
        const paths = pages.map((page) => page.path);

        expect(paths.length).toBeGreaterThan(30);
        expect(new Set(paths).size).toBe(paths.length);
        expect(pages.every((page) => page.html.includes("<html"))).toBe(true);
    });

    it("includes Health Data Relay content and a link to its interactive card", () => {
        const healthPage = pages.find(
            (page) => page.path === "projects/health-data-relay/",
        );

        expect(healthPage).toBeDefined();
        expect(healthPage.indexable).toBe(true);
        expect(healthPage.html).toContain("Health Data Relay");
        expect(healthPage.html).toContain("Health Connect");
        expect(healthPage.html).toContain("/#health-data-relay");
        expect(healthPage.html).toContain("static-detail.css");
        expect(healthPage.html).toContain(
            'rel="canonical" href="https://ali-sdg.is-a.dev/projects/health-data-relay/"',
        );
    });

    it("does not mark placeholder content as indexable", () => {
        const placeholderPage = pages.find(
            (page) => page.path === "stack/javascript/",
        );

        expect(placeholderPage).toBeDefined();
        expect(placeholderPage.indexable).toBe(false);
        expect(placeholderPage.html).toContain("noindex,follow");
    });
});
