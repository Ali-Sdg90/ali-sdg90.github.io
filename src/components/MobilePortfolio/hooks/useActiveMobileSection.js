import { useEffect, useState } from "react";

import { NAV_ITEMS } from "../mobilePortfolioConfig";

const useActiveMobileSection = (view, navigationRef, setNavigationTarget) => {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (view === "build-story") return undefined;

        let animationFrame;

        const updateActiveSection = () => {
            const activationLine =
                (navigationRef.current?.offsetHeight ?? 0) +
                window.innerHeight * 0.24;
            let nextSection = null;

            NAV_ITEMS.forEach(({ id }) => {
                const section = document.getElementById(id);

                if (section?.getBoundingClientRect().top <= activationLine) {
                    nextSection = id;
                }
            });

            setActiveSection((currentSection) =>
                currentSection === nextSection ? currentSection : nextSection,
            );
            setNavigationTarget((currentTarget) =>
                currentTarget === nextSection ? null : currentTarget,
            );
        };

        const requestSectionUpdate = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(updateActiveSection);
        };

        requestSectionUpdate();
        window.addEventListener("scroll", requestSectionUpdate, {
            passive: true,
        });
        window.addEventListener("resize", requestSectionUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("scroll", requestSectionUpdate);
            window.removeEventListener("resize", requestSectionUpdate);
        };
    }, [navigationRef, setNavigationTarget, view]);

    return [activeSection, setActiveSection];
};

export default useActiveMobileSection;
