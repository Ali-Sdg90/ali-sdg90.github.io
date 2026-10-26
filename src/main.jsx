import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { MOBILE_VIEWPORT_QUERY } from "./hooks/useMobileViewport";
import { isBuildStoryPath, isPortfolioHomePath } from "./utils/portfolioRoutes";

import "./assets/scss/index.scss";

const isPortfolioPath =
    isPortfolioHomePath(window.location.pathname) ||
    isBuildStoryPath(window.location.pathname);
const rootElement = document.getElementById("root");

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

    createRoot(rootElement).render(
        <StrictMode>
            <NotFoundPage />
        </StrictMode>,
    );
};

if (isPortfolioPath) {
    const app = (
        <StrictMode>
            <App />
        </StrictMode>
    );

    if (
        rootElement.hasChildNodes() &&
        window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
    ) {
        hydrateRoot(rootElement, app);
    } else {
        rootElement.replaceChildren();
        createRoot(rootElement).render(app);
    }
} else {
    renderNotFoundPage();
}
