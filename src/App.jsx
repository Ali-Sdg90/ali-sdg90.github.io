import { lazy, Suspense, useMemo } from "react";

// import MobileWipNotice from "./components/layout/MobileWipNotice";
import { shelfSections } from "./data/portfolio/shelfSections";
import useMobileViewport from "./hooks/useMobileViewport";
import usePortfolioHashNavigation from "./hooks/usePortfolioHashNavigation";
import { trackUmamiEvent } from "./utils/analytics";
import { getShelfItemId } from "./utils/getShelfItemId";
import { setDocumentTitle } from "./utils/setDocumentTitle";

const DesktopPortfolio = lazy(
    () => import("./components/DesktopPortfolio/DesktopPortfolio"),
);
const MobilePortfolio = lazy(
    () => import("./components/MobilePortfolio/MobilePortfolio"),
);

setDocumentTitle();

const App = () => {
    const {
        view,
        selectedShelfItem,
        navigateToShelf,
        navigateToCard,
        navigateToBuildStory,
    } = usePortfolioHashNavigation();
    const isMobileViewport = useMobileViewport();

    const selectedShelfItemDetail = useMemo(() => {
        if (!selectedShelfItem) return null;

        const section = shelfSections.find(
            (sectionItem) => sectionItem.id === selectedShelfItem.sectionId,
        );
        const item = section?.items.find(
            (sectionItem) =>
                getShelfItemId(sectionItem) === selectedShelfItem.itemId,
        );

        return item && section ? { item, section } : null;
    }, [selectedShelfItem]);

    const handleShelfItemSelect = ({ sectionId, itemId }) => {
        const isClosingSelectedItem =
            selectedShelfItem?.sectionId === sectionId &&
            selectedShelfItem?.itemId === itemId;

        if (!isClosingSelectedItem) {
            const section = shelfSections.find(
                (sectionItem) => sectionItem.id === sectionId,
            );
            const item = section?.items.find(
                (sectionItem) => getShelfItemId(sectionItem) === itemId,
            );

            if (section && item) {
                trackUmamiEvent("shelf_card_open", {
                    section_id: section.id,
                    section_name: section.label,
                    item_id: itemId,
                    item_name: item.title,
                });
            }
        }

        if (isClosingSelectedItem) {
            navigateToShelf();
        } else {
            navigateToCard(itemId);
        }
    };

    if (isMobileViewport) {
        return (
            <Suspense fallback={null}>
                {/* <MobileWipNotice /> */}
                <MobilePortfolio
                    view={view}
                    selectedShelfItem={selectedShelfItemDetail}
                    onShelfItemSelect={handleShelfItemSelect}
                    onShelfItemClose={navigateToShelf}
                    onBuildStoryOpen={navigateToBuildStory}
                    onBuildStoryClose={navigateToShelf}
                />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={null}>
            <DesktopPortfolio
                view={view}
                selectedShelfItem={selectedShelfItem}
                selectedShelfItemDetail={selectedShelfItemDetail}
                onShelfItemSelect={handleShelfItemSelect}
                onBuildStoryOpen={navigateToBuildStory}
                onNavigateToShelf={navigateToShelf}
            />
        </Suspense>
    );
};

export default App;
