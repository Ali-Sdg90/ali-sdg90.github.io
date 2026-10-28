// Shared DOM setup for the centralized unit and component test suite.
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
    cleanup();
    document.body.style.removeProperty("overflow");
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
});
