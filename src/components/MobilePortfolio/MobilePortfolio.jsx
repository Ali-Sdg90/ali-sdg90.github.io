import { lazy, Suspense, useEffect, useRef, useState } from "react";

// import UnderConstructionBadge from "../UnderConstructionBadge/UnderConstructionBadge";
import MobileBottomSheet from "./MobileBottomSheet";
import MobileBuildStoryEntry from "./components/MobileBuildStoryEntry";
import MobileDesktopPreview from "./components/MobileDesktopPreview";
import MobileFooter from "./components/MobileFooter";
import MobileHeader from "./components/MobileHeader";
import MobileHero from "./components/MobileHero";
import useActiveMobileSection from "./hooks/useActiveMobileSection";
import useMobileAvatarMorph from "./hooks/useMobileAvatarMorph";
import {
    MOBILE_SECTION_BY_ITEM_ID,
    SHELF_SECTION_MAP,
} from "./mobilePortfolioConfig";
import MobileCareerSection from "./sections/MobileCareerSection";
import MobileImpactSection from "./sections/MobileImpactSection";
import MobileProjectsSection from "./sections/MobileProjectsSection";
import MobileStackSection from "./sections/MobileStackSection";
import { trackUmamiEvent } from "../../utils/analytics";
import { getShelfItemId } from "../../utils/getShelfItemId";

const HowItWasBuilt = lazy(() => import("../HowItWasBuilt"));

const MobilePortfolio = ({
    onBuildStoryClose,
    onBuildStoryOpen,
    onShelfItemClose,
    onShelfItemSelect,
    selectedShelfItem,
    view,
}) => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [hasOpenedMobileItem, setHasOpenedMobileItem] = useState(false);
    const [navigationTarget, setNavigationTarget] = useState(null);
    const [initialMobileDeepLink] = useState(() => {
        if (
            typeof window === "undefined" ||
            !window.matchMedia("(max-width: 899px)").matches ||
            view !== "shelf" ||
            !selectedShelfItem
        ) {
            return null;
        }

        const itemId = getShelfItemId(selectedShelfItem.item);
        const sectionId = MOBILE_SECTION_BY_ITEM_ID[itemId];

        return sectionId ? { itemId, sectionId } : null;
    });
    const buildStoryRef = useRef(null);
    const buildStoryReturnRef = useRef(null);
    const avatarMorphRef = useRef(null);
    const heroAvatarRef = useRef(null);
    const mobileNavRef = useRef(null);
    const navBrandRef = useRef(null);
    const [activeSection, setActiveSection] = useActiveMobileSection(
        view,
        mobileNavRef,
        setNavigationTarget,
    );
    const isAvatarDocked = useMobileAvatarMorph({
        avatarMorphRef,
        heroAvatarRef,
        navigationTargetRef: navBrandRef,
        view,
    });
    const isInitialMobileSelection =
        !hasOpenedMobileItem &&
        initialMobileDeepLink?.itemId ===
            (selectedShelfItem ? getShelfItemId(selectedShelfItem.item) : null);
    const selectedContent = isAboutOpen
        ? { type: "about" }
        : isInitialMobileSelection
          ? null
          : selectedShelfItem;

    useEffect(() => {
        if (view !== "build-story") return;
        buildStoryRef.current?.scrollTo({ top: 0 });
    }, [view]);

    useEffect(() => {
        if (!initialMobileDeepLink) return;

        onShelfItemClose();
        document
            .getElementById(initialMobileDeepLink.sectionId)
            ?.scrollIntoView({ behavior: "auto", block: "start" });
    }, [initialMobileDeepLink, onShelfItemClose]);

    const openItem = (section, item) => {
        setIsAboutOpen(false);
        setHasOpenedMobileItem(true);
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
        setNavigationTarget(
            sectionId === "mobile-top" || sectionId === activeSection
                ? null
                : sectionId,
        );
        if (sectionId === "mobile-top") setActiveSection(null);
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
                <Suspense fallback={null}>
                    <HowItWasBuilt
                        ref={buildStoryRef}
                        isActive
                        returnButtonRef={buildStoryReturnRef}
                        onReturn={onBuildStoryClose}
                    />
                </Suspense>
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
                navigationTarget={navigationTarget}
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
