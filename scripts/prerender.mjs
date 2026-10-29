import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { renderStaticDetailDocument } from "./static-detail-documents.mjs";

const projectRoot = process.cwd();
const clientOutputPath = path.join(projectRoot, "dist", "index.html");
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

try {
    const [
        { render, renderStaticDetailPages },
        clientHtml,
        staticDetailTemplate,
    ] = await Promise.all([
        import(pathToFileURL(serverEntryPath).href),
        readFile(clientOutputPath, "utf8"),
        readFile(staticDetailTemplatePath, "utf8"),
    ]);
    const [appHtml, staticDetailPages] = await Promise.all([
        render(),
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

    const prerenderedHtml = clientHtml.replace(
        rootMarker,
        `<div id="root">${appHtml}</div>`,
    );

    await Promise.all([
        writeFile(clientOutputPath, prerenderedHtml),
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
    console.log(
        `Generated ${staticDetailPages.length} static portfolio detail pages.`,
    );
} finally {
    await rm(serverOutputDirectory, { force: true, recursive: true });
}
