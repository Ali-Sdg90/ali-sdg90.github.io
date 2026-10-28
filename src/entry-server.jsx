import { Buffer } from "node:buffer";
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";

import App from "./App.jsx";

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

export { renderDetailPages } from "./staticDetailPages.jsx";
