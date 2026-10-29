import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";

import { renderStaticDetailDocument } from "../../../scripts/static-detail-documents.mjs";
import StaticDetailPage from "../../../src/staticDetails/StaticDetailPage.jsx";
import {
    getStaticDetailPages,
    STATIC_DETAIL_ORIGIN,
} from "../../../src/staticDetails/staticDetailPages.js";
import {
    getStaticDetailPagePath,
    handleStaticDetailLinkClick,
} from "../../../src/staticDetails/staticDetailRoutes.js";
import { shelfSections } from "../../../src/data/portfolio/shelfSections.js";
import { getShelfItemId } from "../../../src/utils/getShelfItemId.js";

const getPage = (pages, id) => pages.find((page) => page.id === id);

describe("static portfolio detail pages", () => {
    test("creates one trailing-slash route for every visible shelf card", () => {
        const pages = getStaticDetailPages({ basePath: "/" });
        const visibleItemIds = shelfSections.flatMap(({ items }) =>
            items.map(getShelfItemId),
        );

        expect(pages).toHaveLength(visibleItemIds.length);
        expect(new Set(pages.map(({ id }) => id))).toEqual(
            new Set(visibleItemIds),
        );
        expect(new Set(pages.map(({ routePath }) => routePath))).toHaveProperty(
            "size",
            pages.length,
        );

        for (const page of pages) {
            expect(page.routePath).toMatch(
                /^(projects|impact|stack|career)\/[a-z0-9-]+\/$/,
            );
            expect(page.pagePath).toBe(`/${page.routePath}`);
            expect(page.canonicalUrl).toBe(
                `${STATIC_DETAIL_ORIGIN}/${page.routePath}`,
            );
            expect(page.portfolioPath).toBe("/");
            expect(page.interactivePath).toBe(`/#${page.id}`);
        }
    });

    test("keeps pages backed by current placeholder data in the generated set", () => {
        const pages = getStaticDetailPages({ basePath: "/" });

        expect(getPage(pages, "alis-portfolio")).toMatchObject({
            routePath: "projects/alis-portfolio/",
        });
        expect(getPage(pages, "javascript")).toMatchObject({
            routePath: "stack/javascript/",
        });
        expect(getPage(pages, "health-data-relay")).toMatchObject({
            routePath: "projects/health-data-relay/",
        });
    });

    test("keeps PR-preview navigation under the configured base path", () => {
        const pages = getStaticDetailPages({
            basePath: "/pr-preview/pr-42/",
        });
        const healthDataRelay = getPage(pages, "health-data-relay");

        expect(healthDataRelay.pagePath).toBe(
            "/pr-preview/pr-42/projects/health-data-relay/",
        );
        expect(healthDataRelay.interactivePath).toBe(
            "/pr-preview/pr-42/#health-data-relay",
        );
        expect(healthDataRelay.portfolioPath).toBe("/pr-preview/pr-42/");
        expect(healthDataRelay.canonicalUrl).toBe(
            "https://ali-sdg.is-a.dev/projects/health-data-relay/",
        );
        expect(healthDataRelay.socialImage.src).not.toContain("pr-preview");
    });

    test("uses the generated detail paths as progressive-enhancement card links", () => {
        const pages = getStaticDetailPages({ basePath: "/" });

        for (const page of pages) {
            expect(getStaticDetailPagePath(page.sectionId, page.id, "/")).toBe(
                page.pagePath,
            );
        }

        expect(
            getStaticDetailPagePath(
                "projects",
                "health-data-relay",
                "/pr-preview/pr-42/",
            ),
        ).toBe("/pr-preview/pr-42/projects/health-data-relay/");
    });

    test("intercepts ordinary card clicks but preserves modified link navigation", () => {
        const onInteractiveOpen = vi.fn();
        const preventDefault = vi.fn();

        handleStaticDetailLinkClick(
            {
                altKey: false,
                button: 0,
                ctrlKey: false,
                metaKey: false,
                preventDefault,
                shiftKey: false,
            },
            onInteractiveOpen,
        );

        expect(preventDefault).toHaveBeenCalledOnce();
        expect(onInteractiveOpen).toHaveBeenCalledOnce();

        handleStaticDetailLinkClick(
            {
                altKey: false,
                button: 0,
                ctrlKey: true,
                metaKey: false,
                preventDefault,
                shiftKey: false,
            },
            onInteractiveOpen,
        );

        expect(preventDefault).toHaveBeenCalledOnce();
        expect(onInteractiveOpen).toHaveBeenCalledOnce();
    });

    test("renders a linear detail page with the shared story language toggle", () => {
        const page = getPage(
            getStaticDetailPages({ basePath: "/" }),
            "health-data-relay",
        );
        const html = renderToStaticMarkup(<StaticDetailPage page={page} />);

        expect(html).toContain("<main>");
        expect(html).toContain("<h1>Health Data Relay</h1>");
        expect(html).toContain('href="/"');
        expect(html).not.toContain('href="/#health-data-relay"');
        expect(html).toContain('dir="rtl" lang="fa"');
        expect(html).toContain("Health Data Relay started from a very simple");
        expect(html).toContain("static-detail-gallery");
        expect(html).toContain("static-detail-hero-image-frame");
        expect(html).toContain("static-detail-brand-avatar");
        expect(html).toContain("Portfolio detail page");
        expect(html).not.toContain("Interactive Portfolio");
        expect(html).not.toContain("Selected views");
        expect(html).not.toContain("In my own words");
        expect(html).not.toContain("Explore further");
        expect(html).toContain("static-detail-feature-icon");
        expect(
            html.match(/class="static-detail-portfolio-button/g),
        ).toHaveLength(2);
        expect(html.match(/Go to Ali&#x27;s portfolio/g)).toHaveLength(2);
        expect(html).toContain("about-panel-language-toggle is-en-active");
        expect(html).toContain('data-story-language="EN"');
        expect(html).toContain('data-story-language="FA"');
        expect(html).toContain("<h2>Health Data Relay story</h2>");
        expect(html).not.toContain("data-story-title-language");
        expect(html).not.toContain("داستان فارسی");
        expect(html).toContain('setStoryLanguage(story, "EN")');
        expect(html).not.toContain("static-detail-more");
        expect(html).not.toContain("Technologies and tools");
    });

    test("does not render technology tag data on career pages", () => {
        const page = getPage(
            getStaticDetailPages({ basePath: "/" }),
            "cs-internship",
        );
        const html = renderToStaticMarkup(<StaticDetailPage page={page} />);

        expect(page.detail.tech.length).toBeGreaterThan(0);
        expect(html).not.toContain("Technologies and tools");
        expect(html).not.toContain("Built with");
        expect(html).not.toContain("Back to the interactive portfolio");
        expect(html.match(/Go to Ali&#x27;s portfolio/g)).toHaveLength(2);
        expect(html).not.toContain("Return to CS Internship");
    });

    test("writes indexable page-specific metadata for every card", () => {
        const pages = getStaticDetailPages({ basePath: "/" });
        const template = [
            "<html><head>",
            "<!-- static-detail-head -->",
            "</head><body>",
            "<!-- static-detail-body -->",
            "</body></html>",
        ].join("");
        const healthDocument = renderStaticDetailDocument(template, {
            ...getPage(pages, "health-data-relay"),
            html: "<main>Health Data Relay</main>",
        });
        const placeholderDocument = renderStaticDetailDocument(template, {
            ...getPage(pages, "alis-portfolio"),
            html: "<main>Ali's Portfolio</main>",
        });

        expect(healthDocument).toContain(
            '<meta name="robots" content="index,follow,max-image-preview:large"',
        );
        expect(healthDocument).toContain(
            '<link rel="canonical" href="https://ali-sdg.is-a.dev/projects/health-data-relay/"',
        );
        expect(healthDocument).toContain('type="application/ld+json"');
        expect(placeholderDocument).toContain(
            '<meta name="robots" content="index,follow,max-image-preview:large"',
        );
    });
});
