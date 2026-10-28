import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function generateDetailPages(renderDetailPages, outputDirectory) {
    const pages = renderDetailPages();
    const sitemapPath = path.join(outputDirectory, "sitemap.xml");
    let sitemap = await readFile(sitemapPath, "utf8");

    if (!sitemap.includes("</urlset>")) {
        throw new Error("The sitemap is missing the closing urlset tag.");
    }

    const sitemapEntries = [];
    const paths = new Set();

    for (const page of pages) {
        if (!/^(projects|impact|stack|career)\/[a-z0-9-]+\/$/.test(page.path)) {
            throw new Error("Invalid static detail page path: " + page.path);
        }
        if (paths.has(page.path)) {
            throw new Error("Duplicate static detail page path: " + page.path);
        }
        paths.add(page.path);

        const pageDirectory = path.join(outputDirectory, page.path);
        const destination = path.join(pageDirectory, "index.html");
        try {
            await access(destination);
            throw new Error("Refusing to overwrite an existing page: " + page.path);
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
        }

        await mkdir(pageDirectory, { recursive: true });
        const document = page.html.startsWith("<!DOCTYPE")
            ? page.html
            : "<!doctype html>\n" + page.html;
        await writeFile(destination, document);

        if (page.indexable && !sitemap.includes("<loc>" + page.url + "</loc>")) {
            sitemapEntries.push("    <url>\n        <loc>" + page.url + "</loc>\n    </url>");
        }
    }

    if (sitemapEntries.length > 0) {
        sitemap = sitemap.replace(
            "</urlset>",
            sitemapEntries.join("\n") + "\n</urlset>",
        );
        await writeFile(sitemapPath, sitemap);
    }

    console.log(
        "Generated " +
            pages.length +
            " static detail pages (" +
            sitemapEntries.length +
            " indexable URLs added to sitemap).",
    );
}
