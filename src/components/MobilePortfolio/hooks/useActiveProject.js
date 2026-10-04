import { useEffect, useRef, useState } from "react";

const useActiveProject = (projectCount) => {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const projectRailRef = useRef(null);
    const projectCardRefs = useRef([]);

    useEffect(() => {
        const rail = projectRailRef.current;
        if (!rail) return undefined;

        let animationFrame;

        const updateActiveProject = () => {
            const railBounds = rail.getBoundingClientRect();
            const railCenter = railBounds.left + railBounds.width / 2;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            projectCardRefs.current.forEach((card, index) => {
                if (!card) return;

                const cardBounds = card.getBoundingClientRect();
                const cardCenter = cardBounds.left + cardBounds.width / 2;
                const distance = Math.abs(cardCenter - railCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveProjectIndex((currentIndex) =>
                currentIndex === closestIndex ? currentIndex : closestIndex,
            );
        };

        const requestProjectUpdate = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(updateActiveProject);
        };

        requestProjectUpdate();
        rail.addEventListener("scroll", requestProjectUpdate, {
            passive: true,
        });
        window.addEventListener("resize", requestProjectUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            rail.removeEventListener("scroll", requestProjectUpdate);
            window.removeEventListener("resize", requestProjectUpdate);
        };
    }, [projectCount]);

    return { activeProjectIndex, projectCardRefs, projectRailRef };
};

export default useActiveProject;
