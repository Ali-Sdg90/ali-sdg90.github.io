import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const clientOutputPath = path.join(projectRoot, "dist", "index.html");
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
    const [{ render }, clientHtml] = await Promise.all([
        import(pathToFileURL(serverEntryPath).href),
        readFile(clientOutputPath, "utf8"),
    ]);
    const appHtml = await render();

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

    const prerenderedHtml = clientHtml.replace(
        rootMarker,
        `<div id="root">${appHtml}</div>`,
    );

    await writeFile(clientOutputPath, prerenderedHtml);
    console.log("Prerendered the mobile portfolio into dist/index.html.");
} finally {
    await rm(serverOutputDirectory, { force: true, recursive: true });
}
