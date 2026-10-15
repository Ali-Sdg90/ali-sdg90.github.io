import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { isBuildStoryPath, isPortfolioHomePath } from "./utils/portfolioRoutes";

import "./assets/scss/index.scss";

const isPortfolioPath =
    isPortfolioHomePath(window.location.pathname) ||
    isBuildStoryPath(window.location.pathname);
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
