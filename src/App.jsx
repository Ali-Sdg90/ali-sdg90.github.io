import { useMemo, useState } from "react";

import DynamicBackground from "./components/DynamicBackground";
import AboutPanel from "./components/AboutPanel";
import Intro from "./components/Intro";
import MobileWipNotice from "./components/MobileWipNotice";
import Shelf from "./components/Shelf/Shelf";
import { shelfSections } from "./data/portfolio/shelfSections";
import { getShelfItemId } from "./utils/getShelfItemId";
import { setDocumentTitle } from "./utils/setDocumentTitle";

setDocumentTitle();

const App = () => {
    const [selectedShelfItem, setSelectedShelfItem] = useState(null);

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
        setSelectedShelfItem((currentItem) =>
            currentItem?.sectionId === sectionId &&
            currentItem?.itemId === itemId
                ? null
                : { sectionId, itemId },
        );
    };

    return (
        <>
            {/* TEMPORARY: Remove this wrapper class with the mobile WIP gate. */}
            <div className="page-style desktop-experience">
                <DynamicBackground />

                <main className="portfolio-hero" aria-labelledby="hero-title">
                    <section className="hero-intro">
                        <Intro />
                    </section>

                    <section className="hero-shelf">
                        <Shelf
                            selectedShelfItem={selectedShelfItem}
                            onShelfItemSelect={handleShelfItemSelect}
                        />
                    </section>

                    <AboutPanel selectedShelfItem={selectedShelfItemDetail} />
                </main>
            </div>

            {/* TEMPORARY: Mobile/tablet placeholder until responsive work begins. */}
            <MobileWipNotice />
        </>
    );
};

export default App;
