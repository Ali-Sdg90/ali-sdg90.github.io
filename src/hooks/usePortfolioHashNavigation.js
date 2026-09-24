import { useCallback, useEffect, useState } from "react";

import { shelfSections } from "../data/portfolio/shelfSections";
import { getShelfItemId } from "../utils/getShelfItemId";

const SHELF_HASH = "shelf";
const BUILD_STORY_HASH = "how-i-built-my-portfolio";

const shelfItemsById = new Map(
    shelfSections.flatMap((section) =>
        section.items.map((item) => [
            getShelfItemId(item),
            { sectionId: section.id, itemId: getShelfItemId(item) },
        ]),
    ),
);

const shelfNavigation = {
    view: "shelf",
    selectedShelfItem: null,
};

const readHash = () => {
    try {
        return decodeURIComponent(window.location.hash.slice(1));
    } catch {
        return "";
    }
};

const resolveNavigation = () => {
    const hash = readHash();

    // This is the only temporary Intro-page decision. When Intro is ready,
    // an empty hash can resolve to that view instead of replacing it here.
    if (!hash) {
        return { ...shelfNavigation, replacementHash: SHELF_HASH };
    }

    if (hash === SHELF_HASH) return shelfNavigation;

    if (hash === BUILD_STORY_HASH) {
        return {
            view: "build-story",
            selectedShelfItem: null,
        };
    }

    const selectedShelfItem = shelfItemsById.get(hash);

    if (selectedShelfItem) {
        return {
            view: "shelf",
            selectedShelfItem,
        };
    }

    return { ...shelfNavigation, replacementHash: SHELF_HASH };
};

const usePortfolioHashNavigation = () => {
    const [navigation, setNavigation] = useState(resolveNavigation);

    const syncNavigation = useCallback(() => {
        const nextNavigation = resolveNavigation();

        if (nextNavigation.replacementHash) {
            window.history.replaceState(
                window.history.state,
                "",
                `#${nextNavigation.replacementHash}`,
            );
        }

        setNavigation((currentNavigation) => ({
            view: nextNavigation.view,
            selectedShelfItem:
                nextNavigation.view === "build-story"
                    ? currentNavigation.selectedShelfItem
                    : nextNavigation.selectedShelfItem,
        }));
    }, []);

    useEffect(() => {
        const initialNavigation = resolveNavigation();

        if (initialNavigation.replacementHash) {
            window.history.replaceState(
                window.history.state,
                "",
                `#${initialNavigation.replacementHash}`,
            );
        }

        window.addEventListener("hashchange", syncNavigation);
        window.addEventListener("popstate", syncNavigation);

        return () => {
            window.removeEventListener("hashchange", syncNavigation);
            window.removeEventListener("popstate", syncNavigation);
        };
    }, [syncNavigation]);

    const navigateToHash = useCallback(
        (hash) => {
            if (readHash() === hash) {
                syncNavigation();
                return;
            }

            window.history.pushState(window.history.state, "", `#${hash}`);
            syncNavigation();
        },
        [syncNavigation],
    );

    return {
        ...navigation,
        navigateToShelf: useCallback(
            () => navigateToHash(SHELF_HASH),
            [navigateToHash],
        ),
        navigateToCard: useCallback(
            (itemId) => navigateToHash(itemId),
            [navigateToHash],
        ),
        navigateToBuildStory: useCallback(
            () => navigateToHash(BUILD_STORY_HASH),
            [navigateToHash],
        ),
    };
};

export default usePortfolioHashNavigation;
