import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

import { shelfSections } from "../../../src/data/portfolio/shelfSections";
import { getShelfItemId } from "../../../src/utils/getShelfItemId";
import usePortfolioHashNavigation from "../../../src/hooks/usePortfolioHashNavigation";

const firstProject = shelfSections.find((section) => section.id === "projects")
    .items[0];
const firstProjectId = getShelfItemId(firstProject);

describe("portfolio hash navigation", () => {
    beforeEach(() => {
        window.history.replaceState({}, "", "/");
    });

    test("starts on the shelf at the canonical home URL", () => {
        const { result } = renderHook(() => usePortfolioHashNavigation());

        expect(result.current.view).toBe("shelf");
        expect(result.current.selectedShelfItem).toBeNull();
        expect(window.location.pathname).toBe("/");
    });

    test("resolves a valid card deep link to its section and item", () => {
        window.history.replaceState({}, "", `/#${firstProjectId}`);

        const { result } = renderHook(() => usePortfolioHashNavigation());

        expect(result.current.selectedShelfItem).toEqual({
            sectionId: "projects",
            itemId: firstProjectId,
        });
    });

    test("normalizes the legacy shelf hash without changing the view", () => {
        window.history.replaceState({}, "", "/?source=legacy#shelf");

        const { result } = renderHook(() => usePortfolioHashNavigation());

        expect(result.current.view).toBe("shelf");
        expect(window.location.href).toContain("/?source=legacy");
        expect(window.location.hash).toBe("");
    });

    test("normalizes the legacy build-story hash to the canonical path", () => {
        window.history.replaceState(
            {},
            "",
            "/?source=legacy#how-i-built-my-portfolio",
        );

        const { result } = renderHook(() => usePortfolioHashNavigation());

        expect(result.current.view).toBe("build-story");
        expect(window.location.pathname).toBe("/how-i-built-my-portfolio/");
        expect(window.location.search).toBe("?source=legacy");
    });

    test("recovers an unknown hash back to the shelf home", () => {
        window.history.replaceState({}, "", "/#unknown-project");

        const { result } = renderHook(() => usePortfolioHashNavigation());

        expect(result.current.view).toBe("shelf");
        expect(result.current.selectedShelfItem).toBeNull();
        expect(window.location.hash).toBe("");
    });

    test("updates URLs and state through card, story, and shelf navigation", () => {
        const { result } = renderHook(() => usePortfolioHashNavigation());

        act(() => result.current.navigateToCard(firstProjectId));
        expect(window.location.hash).toBe(`#${firstProjectId}`);
        expect(result.current.selectedShelfItem?.itemId).toBe(firstProjectId);

        act(() => result.current.navigateToBuildStory());
        expect(window.location.pathname).toBe("/how-i-built-my-portfolio/");
        expect(result.current.view).toBe("build-story");

        act(() => result.current.navigateToShelf());
        expect(window.location.pathname).toBe("/");
        expect(result.current.view).toBe("shelf");
        expect(result.current.selectedShelfItem).toBeNull();
    });
});
