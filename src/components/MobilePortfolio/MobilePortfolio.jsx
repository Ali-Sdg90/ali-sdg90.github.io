import { useEffect, useRef, useState } from "react";

import HowItWasBuilt from "../HowItWasBuilt";
// import UnderConstructionBadge from "../UnderConstructionBadge/UnderConstructionBadge";
import MobileBottomSheet from "./MobileBottomSheet";
import MobileBuildStoryEntry from "./components/MobileBuildStoryEntry";
import MobileDesktopPreview from "./components/MobileDesktopPreview";
import MobileFooter from "./components/MobileFooter";
import MobileHeader from "./components/MobileHeader";
import MobileHero from "./components/MobileHero";
import useActiveMobileSection from "./hooks/useActiveMobileSection";
import useMobileAvatarMorph from "./hooks/useMobileAvatarMorph";
import { SHELF_SECTION_MAP } from "./mobilePortfolioConfig";
import MobileCareerSection from "./sections/MobileCareerSection";
import MobileImpactSection from "./sections/MobileImpactSection";
import MobileProjectsSection from "./sections/MobileProjectsSection";
import MobileStackSection from "./sections/MobileStackSection";
import { trackUmamiEvent } from "../../utils/analytics";
import { getShelfItemId } from "../../utils/getShelfItemId";

const MobilePortfolio = ({
    onBuildStoryClose,
    onBuildStoryOpen,
    onShelfItemClose,
    onShelfItemSelect,
    selectedShelfItem,
    view,
}) => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const buildStoryRef = useRef(null);
    const buildStoryReturnRef = useRef(null);
    const avatarMorphRef = useRef(null);
    const heroAvatarRef = useRef(null);
    const mobileNavRef = useRef(null);
    const navBrandRef = useRef(null);
    const [activeSection, setActiveSection] = useActiveMobileSection(
        view,
        mobileNavRef,
    );
    const isAvatarDocked = useMobileAvatarMorph({
        avatarMorphRef,
        heroAvatarRef,
        navigationRef: mobileNavRef,
        navigationTargetRef: navBrandRef,
        view,
    });
    const selectedContent = isAboutOpen ? { type: "about" } : selectedShelfItem;

    useEffect(() => {
        if (view !== "build-story") return;
        buildStoryRef.current?.scrollTo({ top: 0 });
    }, [view]);

    const openItem = (section, item) => {
        setIsAboutOpen(false);
        onShelfItemSelect({
            sectionId: section.id,
            itemId: getShelfItemId(item),
        });
    };

    const closeSheet = () => {
        if (isAboutOpen) {
            setIsAboutOpen(false);
            return;
        }
        onShelfItemClose();
    };

    const openBuildStory = () => {
        trackUmamiEvent("build_story_open", {
            entry_point: "mobile_portfolio",
        });
        onBuildStoryOpen();
    };

    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        setActiveSection(sectionId === "mobile-top" ? null : sectionId);
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            block: "start",
        });
    };

    if (view === "build-story") {
        return (
            <div className="mobile-build-story">
                <HowItWasBuilt
                    ref={buildStoryRef}
                    isActive
                    returnButtonRef={buildStoryReturnRef}
                    onReturn={onBuildStoryClose}
                />
            </div>
        );
    }

    return (
        <div className="mobile-portfolio">
            {/* <UnderConstructionBadge /> */}

            <MobileHeader
                activeSection={activeSection}
                avatarMorphRef={avatarMorphRef}
                isAvatarDocked={isAvatarDocked}
                navigationRef={mobileNavRef}
                navigationTargetRef={navBrandRef}
                onNavigate={scrollToSection}
            />

            <main id="mobile-top">
                <MobileHero
                    avatarRef={heroAvatarRef}
                    onAboutOpen={() => setIsAboutOpen(true)}
                />
                <MobileDesktopPreview />
                <MobileProjectsSection
                    section={SHELF_SECTION_MAP.projects}
                    items={SHELF_SECTION_MAP.projects.items}
                    onItemOpen={openItem}
                />
                <MobileImpactSection
                    section={SHELF_SECTION_MAP.achievements}
                    items={SHELF_SECTION_MAP.achievements.items}
                    onItemOpen={openItem}
                />
                <MobileStackSection
                    section={SHELF_SECTION_MAP["tech-stack"]}
                    items={SHELF_SECTION_MAP["tech-stack"].items}
                    onItemOpen={openItem}
                />
                <MobileCareerSection
                    section={SHELF_SECTION_MAP["career-journey"]}
                    items={SHELF_SECTION_MAP["career-journey"].items}
                    onItemOpen={openItem}
                />
                <MobileBuildStoryEntry onOpen={openBuildStory} />
                <MobileFooter />
            </main>

            <MobileBottomSheet content={selectedContent} onClose={closeSheet} />
        </div>
    );
};

export default MobilePortfolio;
