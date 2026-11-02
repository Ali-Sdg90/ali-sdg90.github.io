import { Buffer } from "node:buffer";
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { renderToStaticMarkup } from "react-dom/server";

import App from "./App.jsx";
import LinkHub from "./links/LinkHub.jsx";
import BuildStoryStaticPage from "./staticPages/BuildStoryStaticPage.jsx";
import StaticDetailPage from "./staticDetails/StaticDetailPage.jsx";
import { getStaticDetailPages } from "./staticDetails/staticDetailPages.js";
import howItWasBuiltData from "./data/howItWasBuilt/howItWasBuiltData.js";

const prerenderReactTree = async (tree, label) => {
    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(new Error(`${label} prerender timed out.`)),
        10_000,
    );
    let renderError = null;

    try {
        const { prelude } = await prerenderToNodeStream(tree, {
            onError(error) {
                renderError ??= error;
            },
            signal: controller.signal,
        });
        const chunks = [];

        for await (const chunk of prelude) {
            chunks.push(chunk);
        }

        if (renderError) throw renderError;

        return Buffer.concat(chunks).toString("utf8");
    } finally {
        clearTimeout(timeout);
    }
};

export const render = () =>
    prerenderReactTree(
        <StrictMode>
            <App />
        </StrictMode>,
        "Portfolio",
    );

export const renderLinkHub = () =>
    prerenderReactTree(
        <StrictMode>
            <LinkHub />
        </StrictMode>,
        "Link Hub",
    );

export const renderBuildStoryFallback = () => ({
    chapterIds: howItWasBuiltData.chapters.map(({ id }) => id),
    html: renderToStaticMarkup(<BuildStoryStaticPage />),
});

export const renderStaticDetailPages = () => {
    const pages = getStaticDetailPages();

    return pages.map((page) => ({
        id: page.id,
        title: page.title,
        description: page.description,
        canonicalUrl: page.canonicalUrl,
        routePath: page.routePath,
        pagePath: page.pagePath,
        sectionId: page.sectionId,
        sectionLabel: page.sectionLabel,
        socialImage: page.socialImage,
        html: renderToStaticMarkup(<StaticDetailPage page={page} />),
    }));
};
