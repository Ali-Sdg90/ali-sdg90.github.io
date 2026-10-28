import { describe, expect, test } from "vitest";

import {
    buildStoryPath,
    isBuildStoryPath,
    isPortfolioHomePath,
    portfolioHomePath,
} from "../../../src/utils/portfolioRoutes";

describe("portfolio route contracts", () => {
    test("accepts the canonical portfolio path and its index document", () => {
        expect(isPortfolioHomePath(portfolioHomePath)).toBe(true);
        expect(isPortfolioHomePath(`${portfolioHomePath}index.html`)).toBe(
            true,
        );
    });

    test("rejects unrelated paths as the portfolio home", () => {
        expect(isPortfolioHomePath("/links/")).toBe(false);
        expect(isPortfolioHomePath("/missing/")).toBe(false);
    });

    test("accepts every supported build-story URL form", () => {
        expect(isBuildStoryPath(buildStoryPath)).toBe(true);
        expect(isBuildStoryPath(buildStoryPath.slice(0, -1))).toBe(true);
        expect(isBuildStoryPath(`${buildStoryPath}index.html`)).toBe(true);
    });

    test("rejects unrelated paths as the build story", () => {
        expect(isBuildStoryPath(portfolioHomePath)).toBe(false);
        expect(isBuildStoryPath("/how-i-built-something-else/")).toBe(false);
    });
});
