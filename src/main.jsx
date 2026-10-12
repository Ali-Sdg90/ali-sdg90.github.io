import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./assets/scss/index.scss";

const basePath = import.meta.env.BASE_URL;
const portfolioPaths = new Set([basePath, `${basePath}index.html`]);
const isPortfolioPath = portfolioPaths.has(window.location.pathname);
const root = createRoot(document.getElementById("root"));

const renderNotFoundPage = async () => {
    const [{ default: NotFoundPage }] = await Promise.all([
        import("./notFound/NotFoundPage.jsx"),
        import("./notFound/notFound.scss"),
    ]);

    document.title = "404 | Page Not Found";
    document.querySelector('link[rel="canonical"]')?.remove();

    let robotsMeta = document.querySelector('meta[name="robots"]');

    if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.name = "robots";
        document.head.appendChild(robotsMeta);
    }

    robotsMeta.content = "noindex,follow";

    root.render(
        <StrictMode>
            <NotFoundPage />
        </StrictMode>,
    );
};

if (isPortfolioPath) {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    renderNotFoundPage();
}
