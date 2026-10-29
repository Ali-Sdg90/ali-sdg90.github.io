import { Buffer } from "node:buffer";
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { renderToStaticMarkup } from "react-dom/server";

import App from "./App.jsx";
import StaticDetailPage from "./staticDetails/StaticDetailPage.jsx";
import { getStaticDetailPages } from "./staticDetails/staticDetailPages.js";

export const render = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(new Error("Portfolio prerender timed out.")),
        10_000,
    );
    let renderError = null;

    try {
        const { prelude } = await prerenderToNodeStream(
            <StrictMode>
                <App />
            </StrictMode>,
            {
                onError(error) {
                    renderError ??= error;
                },
                signal: controller.signal,
            },
        );
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
