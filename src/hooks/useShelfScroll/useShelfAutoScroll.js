import { useEffect } from "react";
import { getLoopWidth } from "./scrollUtils";

const useShelfAutoScroll = ({
    shelfSections,
    scrollerRefs: scrollerRefsRef,
    autoScrollFrame: autoScrollFrameRef,
    autoScrollPositions: autoScrollPositionsRef,
    activeDragIndexRef,
    hoveredSectionIndexRef,
    selectedSectionIdRef,
    momentumFrames: momentumFramesRef,
    normalizeScrollPosition,
    updateScrollState,
}) => {
    useEffect(() => {
        shelfSections.forEach((section, index) => {
            const scroller = scrollerRefsRef.current[index];
            const loopWidth = getLoopWidth(scroller);

            if (!scroller || !section.doRepeat || loopWidth <= 0) {
                autoScrollPositionsRef.current[index] =
                    scroller?.scrollLeft ?? 0;
                updateScrollState(index);
                return;
            }

            autoScrollPositionsRef.current[index] = loopWidth * 2;
            scroller.scrollLeft = autoScrollPositionsRef.current[index];
            updateScrollState(index);
        });

        let previousTime = performance.now();

        const autoScroll = (currentTime) => {
            const deltaSeconds = (currentTime - previousTime) / 1000;

            previousTime = currentTime;

            shelfSections.forEach((section, index) => {
                if (
                    activeDragIndexRef.current === index ||
                    hoveredSectionIndexRef.current === index ||
                    selectedSectionIdRef.current === section.id ||
                    momentumFramesRef.current[index] ||
                    !section.doRepeat ||
                    section.autoScrollSpeed <= 0
                ) {
                    return;
                }

                const scroller = scrollerRefsRef.current[index];
                if (!scroller) {
                    return;
                }

                const loopWidth = getLoopWidth(scroller);

                if (loopWidth <= 0) {
                    return;
                }

                autoScrollPositionsRef.current[index] =
                    (autoScrollPositionsRef.current[index] ??
                        scroller.scrollLeft) -
                    section.autoScrollSpeed * deltaSeconds;

                autoScrollPositionsRef.current[index] = normalizeScrollPosition(
                    scroller,
                    autoScrollPositionsRef.current[index],
                    section.doRepeat,
                );
            });

            autoScrollFrameRef.current = requestAnimationFrame(autoScroll);
        };

        autoScrollFrameRef.current = requestAnimationFrame(autoScroll);

        return () => {
            if (autoScrollFrameRef.current) {
                cancelAnimationFrame(autoScrollFrameRef.current);
            }
        };
    }, [
        activeDragIndexRef,
        autoScrollFrameRef,
        autoScrollPositionsRef,
        hoveredSectionIndexRef,
        momentumFramesRef,
        normalizeScrollPosition,
        scrollerRefsRef,
        selectedSectionIdRef,
        shelfSections,
        updateScrollState,
    ]);
};

export default useShelfAutoScroll;
