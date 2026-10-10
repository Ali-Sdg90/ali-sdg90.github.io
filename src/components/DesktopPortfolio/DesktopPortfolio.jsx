import { useEffect, useState } from "react";

import AboutPanel from "../AboutPanel/AboutPanel";
import Intro from "../Intro/Intro";
import AppVersion from "../layout/AppVersion";
import DynamicBackground from "../layout/DynamicBackground";
import PortfolioOnboarding from "../PortfolioOnboarding/PortfolioOnboarding";
import PortfolioReveal from "../PortfolioReveal/PortfolioReveal";
import Shelf from "../Shelf/Shelf";
// import UnderConstructionBadge from "../UnderConstructionBadge/UnderConstructionBadge";
import { shouldShowPortfolioOnboarding } from "../../utils/portfolioOnboardingPreference";

const isSixteenTenDisplay = () => {
    if (typeof window === "undefined") return false;

    const displayRatio = window.screen.width / window.screen.height;

    return Math.abs(displayRatio - 16 / 10) <= 0.03;
};

const DesktopPortfolio = ({
    onBuildStoryOpen,
    onNavigateToShelf,
    onShelfItemSelect,
    selectedShelfItem,
    selectedShelfItemDetail,
    view,
}) => {
    const [aboutMePulse, setAboutMePulse] = useState(0);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(
        shouldShowPortfolioOnboarding,
    );
    const [hasSixteenTenDisplay, setHasSixteenTenDisplay] =
        useState(isSixteenTenDisplay);

    useEffect(() => {
        const updateDisplayRatio = () => {
            setHasSixteenTenDisplay(isSixteenTenDisplay());
        };

        window.addEventListener("resize", updateDisplayRatio);

        return () => window.removeEventListener("resize", updateDisplayRatio);
    }, []);

    const handleAboutMeSelect = () => {
        if (selectedShelfItem) {
            onNavigateToShelf();
            return;
        }

        setAboutMePulse((currentPulse) => currentPulse + 1);
    };

    return (
        <div className="desktop-portfolio">
            <PortfolioReveal
                isBuildStoryOpen={view === "build-story"}
                onBuildStoryOpen={onBuildStoryOpen}
                onBuildStoryClose={onNavigateToShelf}
            >
                {/* <UnderConstructionBadge /> */}
                <AppVersion />

                <div
                    className={`page-style${hasSixteenTenDisplay ? " is-16-10-display" : ""}`}
                >
                    <DynamicBackground />

                    <main
                        className={`portfolio-hero${isOnboardingOpen ? " is-onboarding-open" : ""}`}
                        aria-labelledby="hero-title"
                    >
                        <section className="hero-intro">
                            <Intro
                                isAboutMeActive={!selectedShelfItem}
                                onAboutMeSelect={handleAboutMeSelect}
                            />
                        </section>

                        <section
                            className="hero-shelf"
                            inert={isOnboardingOpen}
                        >
                            <Shelf
                                selectedShelfItem={selectedShelfItem}
                                onShelfItemSelect={onShelfItemSelect}
                            />
                        </section>

                        <AboutPanel
                            inert={isOnboardingOpen}
                            selectedShelfItem={selectedShelfItemDetail}
                            aboutMePulse={aboutMePulse}
                        />

                        <PortfolioOnboarding
                            isOpen={isOnboardingOpen}
                            onDismiss={() => setIsOnboardingOpen(false)}
                        />
                    </main>
                </div>
            </PortfolioReveal>
        </div>
    );
};

export default DesktopPortfolio;
