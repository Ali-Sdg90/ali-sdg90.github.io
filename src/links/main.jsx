import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "../assets/fonts/Geist/fonts.css";
import LinkHub from "./LinkHub";
import "./linkHub.scss";

const rootElement = document.getElementById("root");
const app = (
    <StrictMode>
        <LinkHub />
    </StrictMode>
);

if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
} else {
    createRoot(rootElement).render(app);
}
