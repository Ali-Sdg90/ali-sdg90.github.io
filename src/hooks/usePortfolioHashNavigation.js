import { useCallback, useEffect, useState } from "react";

import { shelfSections } from "../data/portfolio/shelfSections";
import { getShelfItemId } from "../utils/getShelfItemId";
import {
    buildStoryPath,
    isBuildStoryPath,
    portfolioHomePath,
} from "../utils/portfolioRoutes";

const LEGACY_SHELF_HASH = "shelf";
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

const withCurrentSearch = (path) => `${path}${window.location.search}`;

const resolveNavigation = () => {
    const hash = readHash();

    if (isBuildStoryPath(window.location.pathname)) {
        return {
            view: "build-story",
            selectedShelfItem: null,
            replacementUrl:
                window.location.pathname === buildStoryPath && !hash
                    ? null
                    : withCurrentSearch(buildStoryPath),
        };
    }

    if (!hash) {
        return {
            ...shelfNavigation,
            replacementUrl:
                window.location.pathname === portfolioHomePath
                    ? null
                    : withCurrentSearch(portfolioHomePath),
        };
    }

    if (hash === LEGACY_SHELF_HASH) {
        return {
            ...shelfNavigation,
            replacementUrl: withCurrentSearch(portfolioHomePath),
        };
    }

    if (hash === BUILD_STORY_HASH) {
        return {
            view: "build-story",
            selectedShelfItem: null,
            replacementUrl: withCurrentSearch(buildStoryPath),
        };
    }

    const selectedShelfItem = shelfItemsById.get(hash);

    if (selectedShelfItem) {
        return {
            view: "shelf",
            selectedShelfItem,
        };
    }

    return {
        ...shelfNavigation,
        replacementUrl: withCurrentSearch(portfolioHomePath),
    };
};

const replaceNavigationUrl = (replacementUrl) => {
    if (!replacementUrl) return;

    window.history.replaceState(window.history.state, "", replacementUrl);
};

const usePortfolioHashNavigation = () => {
    const [navigation, setNavigation] = useState(resolveNavigation);

    const syncNavigation = useCallback(() => {
        const nextNavigation = resolveNavigation();

        replaceNavigationUrl(nextNavigation.replacementUrl);

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

        replaceNavigationUrl(initialNavigation.replacementUrl);

        window.addEventListener("hashchange", syncNavigation);
        window.addEventListener("popstate", syncNavigation);

        return () => {
            window.removeEventListener("hashchange", syncNavigation);
            window.removeEventListener("popstate", syncNavigation);
        };
    }, [syncNavigation]);

    const navigateToUrl = useCallback(
        (url) => {
            const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

            if (currentUrl === url) {
                syncNavigation();
                return;
            }

            window.history.pushState(window.history.state, "", url);
            syncNavigation();
        },
        [syncNavigation],
    );

    return {
        ...navigation,
        navigateToShelf: useCallback(
            () => navigateToUrl(withCurrentSearch(portfolioHomePath)),
            [navigateToUrl],
        ),
        navigateToCard: useCallback(
            (itemId) =>
                navigateToUrl(
                    `${withCurrentSearch(portfolioHomePath)}#${itemId}`,
                ),
            [navigateToUrl],
        ),
        navigateToBuildStory: useCallback(
            () => navigateToUrl(withCurrentSearch(buildStoryPath)),
            [navigateToUrl],
        ),
    };
};

export default usePortfolioHashNavigation;
