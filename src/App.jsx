import { useEffect, useMemo, useState } from "react";

import AboutPanel from "./components/AboutPanel/AboutPanel";
import Intro from "./components/Intro/Intro";
import AppVersion from "./components/layout/AppVersion";
import DynamicBackground from "./components/layout/DynamicBackground";
import PortfolioReveal from "./components/PortfolioReveal/PortfolioReveal";
import Shelf from "./components/Shelf/Shelf";
import UnderConstructionBadge from "./components/UnderConstructionBadge/UnderConstructionBadge";
import { shelfSections } from "./data/portfolio/shelfSections";
import { getShelfItemId } from "./utils/getShelfItemId";
import { setDocumentTitle } from "./utils/setDocumentTitle";
import { trackUmamiEvent } from "./utils/analytics";

setDocumentTitle();

const isSixteenTenDisplay = () => {
    if (typeof window === "undefined") return false;

    const displayRatio = window.screen.width / window.screen.height;

    return Math.abs(displayRatio - 16 / 10) <= 0.03;
};

const App = () => {
    const [selectedShelfItem, setSelectedShelfItem] = useState(null);
    const [hasInteractedWithShelf, setHasInteractedWithShelf] = useState(false);
    const [aboutMePulse, setAboutMePulse] = useState(0);
    const [hasSixteenTenDisplay, setHasSixteenTenDisplay] =
        useState(isSixteenTenDisplay);

    useEffect(() => {
        const updateDisplayRatio = () => {
            setHasSixteenTenDisplay(isSixteenTenDisplay());
        };

        window.addEventListener("resize", updateDisplayRatio);

        return () => window.removeEventListener("resize", updateDisplayRatio);
    }, []);

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

    const revealMobileAboutPanel = () => {
        if (!window.matchMedia("(max-width: 899px)").matches) return;

        window.requestAnimationFrame(() => {
            const behavior = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
                ? "auto"
                : "smooth";

            document
                .getElementById("about-panel")
                ?.scrollIntoView({ behavior, block: "start" });
        });
    };

    const handleShelfItemSelect = ({ sectionId, itemId }) => {
        setHasInteractedWithShelf(true);

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

            revealMobileAboutPanel();
        }

        setSelectedShelfItem((currentItem) =>
            currentItem?.sectionId === sectionId &&
            currentItem?.itemId === itemId
                ? null
                : { sectionId, itemId },
        );
    };

    const handleAboutMeSelect = () => {
        setSelectedShelfItem((currentItem) =>
            currentItem ? null : currentItem,
        );

        if (!selectedShelfItem) {
            triggerAboutMePulse();
        }

        revealMobileAboutPanel();
    };

    const triggerAboutMePulse = () => {
        setAboutMePulse((currentPulse) => currentPulse + 1);
    };

    return (
        <PortfolioReveal>
            <UnderConstructionBadge />
            <AppVersion />

            <div
                className={`page-style${hasSixteenTenDisplay ? " is-16-10-display" : ""}`}
            >
                <DynamicBackground />

                <main className="portfolio-hero" aria-labelledby="hero-title">
                    <section className="hero-intro">
                        <Intro
                            isAboutMeActive={!selectedShelfItem}
                            onAboutMeSelect={handleAboutMeSelect}
                        />
                    </section>

                    <section className="hero-shelf">
                        <Shelf
                            hasInteracted={hasInteractedWithShelf}
                            selectedShelfItem={selectedShelfItem}
                            onShelfItemSelect={handleShelfItemSelect}
                        />
                    </section>

                    <AboutPanel
                        selectedShelfItem={selectedShelfItemDetail}
                        aboutMePulse={aboutMePulse}
                    />
                </main>
            </div>
        </PortfolioReveal>
    );
};

export default App;
