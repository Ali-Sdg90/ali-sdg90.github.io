import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../assets/fonts/Geist/fonts.css";
import LinkHub from "./LinkHub";
import "./linkHub.scss";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <LinkHub />
    </StrictMode>,
);
