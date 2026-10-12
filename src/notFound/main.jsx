import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../assets/fonts/Geist/fonts.css";
import NotFoundPage from "./NotFoundPage";
import "./notFound.scss";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <NotFoundPage />
    </StrictMode>,
);
