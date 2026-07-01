import { useMemo, useState } from "react";

import DynamicBackground from "./components/DynamicBackground";
import AboutPanel from "./components/AboutPanel";
import Intro from "./components/Intro";
import MobileWipNotice from "./components/MobileWipNotice";
import Shelf from "./components/Shelf/Shelf";
import { shelfSections } from "./data/portfolio/shelfSections";
import { setDocumentTitle } from "./utils/setDocumentTitle";

setDocumentTitle();

const App = () => {
    const [selectedCareerId, setSelectedCareerId] = useState(null);

    const selectedCareerItem = useMemo(() => {
        const careerSection = shelfSections.find(
            (section) => section.id === "career-journey",
        );

        return (
            careerSection?.items.find((item) => item.id === selectedCareerId) ??
            null
        );
    }, [selectedCareerId]);

    const handleCareerSelect = (careerId) => {
        setSelectedCareerId((currentCareerId) =>
            currentCareerId === careerId ? null : careerId,
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
                            selectedCareerId={selectedCareerId}
                            onCareerSelect={handleCareerSelect}
                        />
                    </section>

                    <AboutPanel selectedCareerItem={selectedCareerItem} />
                </main>
            </div>

            {/* TEMPORARY: Mobile/tablet placeholder until responsive work begins. */}
            <MobileWipNotice />
        </>
    );
};

export default App;
