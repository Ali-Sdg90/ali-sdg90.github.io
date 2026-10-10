import { forwardRef, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import howItWasBuiltData from "../../data/howItWasBuilt/howItWasBuiltData";
import BuildGallery from "./BuildGallery";
import StoryClosing from "./StoryClosing";
import StoryHeader from "./StoryHeader";
import StoryHero from "./StoryHero";
import useBuildStoryAnalytics from "../../hooks/useBuildStoryAnalytics";
import "../../assets/scss/components/how-it-was-built/index.scss";

const HowItWasBuilt = forwardRef(function HowItWasBuilt(
    { isActive, onReturn, returnButtonRef },
    scrollContainerRef,
) {
    const prefersReducedMotion = useReducedMotion();
    const [activeLanguage, setActiveLanguage] = useState("fa");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { page, chapters } = howItWasBuiltData;
    const completionElementRef = useRef(null);
    const { finishSession } = useBuildStoryAnalytics({
        chapters,
        completionElementRef,
        isActive,
        scrollContainerRef,
        selectedIndex,
    });

    const handleReturn = () => {
        finishSession("return_to_portfolio");
        onReturn();
    };

    return (
        <section
            className={`build-story${isActive ? " is-active" : ""}`}
            aria-labelledby="build-title"
            ref={scrollContainerRef}
        >
            <div className="build-story__ambient" aria-hidden="true" />

            <StoryHeader
                activeLanguage={activeLanguage}
                onLanguageChange={setActiveLanguage}
                onReturn={handleReturn}
                portfolioLabel={page.portfolioLabel}
                returnButtonRef={returnButtonRef}
            />

            <StoryHero
                prefersReducedMotion={prefersReducedMotion}
                subtitle={page.subtitle}
                title={page.title}
            />

            <BuildGallery
                key={
                    isActive ? "build-gallery-active" : "build-gallery-inactive"
                }
                activeLanguage={activeLanguage}
                chapters={chapters}
                isActive={isActive}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
            />

            <StoryClosing
                completionElementRef={completionElementRef}
                key={
                    isActive ? "story-closing-active" : "story-closing-inactive"
                }
                prefersReducedMotion={prefersReducedMotion}
            />
        </section>
    );
});

export default HowItWasBuilt;
