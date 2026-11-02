import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { renderStaticDetailDocument } from "./static-detail-documents.mjs";

const projectRoot = process.cwd();
const clientOutputPath = path.join(projectRoot, "dist", "index.html");
const linkHubOutputPath = path.join(projectRoot, "dist", "links", "index.html");
const buildStoryOutputPath = path.join(
    projectRoot,
    "dist",
    "how-i-built-my-portfolio",
    "index.html",
);
const staticDetailTemplatePath = path.join(
    projectRoot,
    "dist",
    "static-detail-template.html",
);
const serverOutputDirectory = path.join(projectRoot, "dist-ssr");
const serverEntryPath = path.join(serverOutputDirectory, "entry-server.js");
const rootMarker = '<div id="root"></div>';
const requiredContent = [
    'class="mobile-portfolio"',
    "Featured projects",
    "Impact in numbers",
    "Tech stack",
    "Career journey",
];
const requiredLinkHubContent = [
    'class="link-hub-page"',
    "Ali Sadeghi",
    "GitHub",
    "LinkedIn",
    "Explore My Portfolio",
];

const injectRoot = (document, html, attributes = "") => {
    if (!document.includes(rootMarker)) {
        throw new Error("Could not find the empty root in a client document.");
    }

    return document.replace(
        rootMarker,
        `<div id="root"${attributes}>${html}</div>`,
    );
};

try {
    const [
        {
            render,
            renderBuildStoryFallback,
            renderLinkHub,
            renderStaticDetailPages,
        },
        clientHtml,
        linkHubClientHtml,
        buildStoryClientHtml,
        staticDetailTemplate,
    ] = await Promise.all([
        import(pathToFileURL(serverEntryPath).href),
        readFile(clientOutputPath, "utf8"),
        readFile(linkHubOutputPath, "utf8"),
        readFile(buildStoryOutputPath, "utf8"),
        readFile(staticDetailTemplatePath, "utf8"),
    ]);
    const [appHtml, linkHubHtml, buildStoryFallback, staticDetailPages] =
        await Promise.all([
            render(),
            renderLinkHub(),
            Promise.resolve(renderBuildStoryFallback()),
            Promise.resolve(renderStaticDetailPages()),
        ]);

    if (!clientHtml.includes(rootMarker)) {
        throw new Error(
            "Could not find the empty portfolio root in dist/index.html.",
        );
    }

    const missingContent = requiredContent.filter(
        (content) => !appHtml.includes(content),
    );

    if (missingContent.length > 0) {
        throw new Error(
            `The prerendered portfolio is missing: ${missingContent.join(", ")}`,
        );
    }

    const missingLinkHubContent = requiredLinkHubContent.filter(
        (content) => !linkHubHtml.includes(content),
    );

    if (missingLinkHubContent.length > 0) {
        throw new Error(
            `The prerendered Link Hub is missing: ${missingLinkHubContent.join(", ")}`,
        );
    }

    if (
        buildStoryFallback.chapterIds.length === 0 ||
        !buildStoryFallback.html.includes('lang="en"') ||
        !buildStoryFallback.html.includes('lang="fa"')
    ) {
        throw new Error(
            "The prerendered build story is missing bilingual chapter content.",
        );
    }

    const missingBuildStoryChapters = buildStoryFallback.chapterIds.filter(
        (chapterId) =>
            !buildStoryFallback.html.includes(`id="chapter-${chapterId}"`),
    );

    if (missingBuildStoryChapters.length > 0) {
        throw new Error(
            `The prerendered build story is missing chapters: ${missingBuildStoryChapters.join(", ")}`,
        );
    }

    const generatedSections = new Set(
        staticDetailPages.map(({ sectionId }) => sectionId),
    );

    if (staticDetailPages.length === 0 || generatedSections.size !== 4) {
        throw new Error(
            "Static detail generation did not cover all four shelf sections.",
        );
    }

    const unlinkedStaticDetailPages = staticDetailPages.filter(
        ({ pagePath }) => !appHtml.includes(`href="${pagePath}"`),
    );

    if (unlinkedStaticDetailPages.length > 0) {
        throw new Error(
            `Prerendered cards are missing static links for: ${unlinkedStaticDetailPages
                .map(({ pagePath }) => pagePath)
                .join(", ")}`,
        );
    }

    const prerenderedHtml = injectRoot(clientHtml, appHtml);
    const prerenderedLinkHubHtml = injectRoot(linkHubClientHtml, linkHubHtml);
    const prerenderedBuildStoryHtml = injectRoot(
        buildStoryClientHtml,
        buildStoryFallback.html,
        ' data-prerender-mode="replace"',
    );

    await Promise.all([
        writeFile(clientOutputPath, prerenderedHtml),
        writeFile(linkHubOutputPath, prerenderedLinkHubHtml),
        writeFile(buildStoryOutputPath, prerenderedBuildStoryHtml),
        ...staticDetailPages.map(async (page) => {
            const outputDirectory = path.join(
                projectRoot,
                "dist",
                page.routePath,
            );

            await mkdir(outputDirectory, { recursive: true });
            await writeFile(
                path.join(outputDirectory, "index.html"),
                renderStaticDetailDocument(staticDetailTemplate, page),
            );
        }),
    ]);

    await rm(staticDetailTemplatePath, { force: true });
    console.log("Prerendered the mobile portfolio into dist/index.html.");
    console.log("Prerendered the Link Hub into dist/links/index.html.");
    console.log(
        `Prerendered ${buildStoryFallback.chapterIds.length} bilingual build-story chapters.`,
    );
    console.log(
        `Generated ${staticDetailPages.length} static portfolio detail pages.`,
    );
} finally {
    await rm(serverOutputDirectory, { force: true, recursive: true });
}
