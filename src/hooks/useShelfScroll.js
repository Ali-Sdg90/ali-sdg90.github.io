import { useCallback, useEffect, useRef, useState } from "react";

const useShelfScroll = (shelfSections) => {
    const scrollerRefs = useRef([]);
    const dragState = useRef(null);
    const scrollFrame = useRef(null);
    const autoScrollFrame = useRef(null);
    const autoScrollPositions = useRef([]);
    const activeDragIndexRef = useRef(null);
    const hoveredSectionIndexRef = useRef(null);
    const scrollStateRef = useRef({});
    const [activeDragIndex, setActiveDragIndex] = useState(null);
    const [scrollState, setScrollState] = useState({});

    const setScrollerRef = useCallback((index, element) => {
        scrollerRefs.current[index] = element;
    }, []);

    const updateScrollState = useCallback((index) => {
        const scroller = scrollerRefs.current[index];

        if (!scroller) {
            return;
        }

        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
        const nextScrollState = {
            canScrollLeft: scroller.scrollLeft > 1,
            canScrollRight: scroller.scrollLeft < maxScrollLeft - 1,
        };
        const previousScrollState = scrollStateRef.current[index];

        if (
            previousScrollState?.canScrollLeft ===
                nextScrollState.canScrollLeft &&
            previousScrollState?.canScrollRight ===
                nextScrollState.canScrollRight
        ) {
            return;
        }

        scrollStateRef.current = {
            ...scrollStateRef.current,
            [index]: nextScrollState,
        };

        setScrollState((current) => ({
            ...current,
            [index]: nextScrollState,
        }));
    }, []);

    const scheduleScrollStateUpdate = useCallback(
        (index) => {
            if (scrollFrame.current) {
                cancelAnimationFrame(scrollFrame.current);
            }

            scrollFrame.current = requestAnimationFrame(() => {
                updateScrollState(index);
                scrollFrame.current = null;
            });
        },
        [updateScrollState],
    );

    useEffect(() => {
        const updateAllScrollStates = () => {
            shelfSections.forEach((_, index) => updateScrollState(index));
        };

        updateAllScrollStates();
        window.addEventListener("resize", updateAllScrollStates);

        return () => {
            window.removeEventListener("resize", updateAllScrollStates);

            if (scrollFrame.current) {
                cancelAnimationFrame(scrollFrame.current);
            }
        };
    }, [shelfSections, updateScrollState]);

    useEffect(() => {
        shelfSections.forEach((section, index) => {
            const scroller = scrollerRefs.current[index];
            const firstSet = scroller?.querySelector(".shelf-card-set");

            if (section.autoScrollSpeed <= 0) {
                autoScrollPositions.current[index] = scroller?.scrollLeft ?? 0;
                updateScrollState(index);
                return;
            }

            if (scroller && firstSet) {
                const setGap =
                    parseFloat(getComputedStyle(scroller).columnGap) || 0;

                autoScrollPositions.current[index] =
                    firstSet.offsetWidth + setGap;
                scroller.scrollLeft = autoScrollPositions.current[index];
                updateScrollState(index);
            }
        });

        let previousTime = performance.now();

        const autoScroll = (currentTime) => {
            const deltaSeconds = (currentTime - previousTime) / 1000;

            previousTime = currentTime;

            shelfSections.forEach((section, index) => {
                if (
                    activeDragIndexRef.current === index ||
                    hoveredSectionIndexRef.current === index ||
                    section.autoScrollSpeed <= 0
                ) {
                    return;
                }

                const scroller = scrollerRefs.current[index];
                const firstSet = scroller?.querySelector(".shelf-card-set");

                if (!scroller || !firstSet) {
                    return;
                }

                const setGap =
                    parseFloat(getComputedStyle(scroller).columnGap) || 0;
                const loopWidth = firstSet.offsetWidth + setGap;

                if (loopWidth <= scroller.clientWidth) {
                    return;
                }

                autoScrollPositions.current[index] =
                    (autoScrollPositions.current[index] ??
                        scroller.scrollLeft) -
                    section.autoScrollSpeed * deltaSeconds;

                if (autoScrollPositions.current[index] <= 0) {
                    autoScrollPositions.current[index] += loopWidth;
                }

                scroller.scrollLeft = autoScrollPositions.current[index];
            });

            autoScrollFrame.current = requestAnimationFrame(autoScroll);
        };

        autoScrollFrame.current = requestAnimationFrame(autoScroll);

        return () => {
            if (autoScrollFrame.current) {
                cancelAnimationFrame(autoScrollFrame.current);
            }
        };
    }, [shelfSections, updateScrollState]);

    const handlePointerDown = useCallback((event, index) => {
        if (event.button !== 0) {
            return;
        }

        const scroller = event.currentTarget;

        dragState.current = {
            index,
            pointerId: event.pointerId,
            scrollLeft: scroller.scrollLeft,
            startX: event.clientX,
        };

        activeDragIndexRef.current = index;
        setActiveDragIndex(index);
        scroller.setPointerCapture(event.pointerId);
    }, []);

    const handlePointerMove = useCallback((event) => {
        const currentDragState = dragState.current;

        if (
            !currentDragState ||
            currentDragState.pointerId !== event.pointerId
        ) {
            return;
        }

        const scroller = event.currentTarget;
        const dragDistance = event.clientX - currentDragState.startX;

        scroller.scrollLeft = currentDragState.scrollLeft - dragDistance;
        autoScrollPositions.current[currentDragState.index] =
            scroller.scrollLeft;
        event.preventDefault();
    }, []);

    const handleSectionPointerEnter = useCallback((index) => {
        hoveredSectionIndexRef.current = index;
    }, []);

    const handleSectionPointerLeave = useCallback((index) => {
        if (hoveredSectionIndexRef.current === index) {
            hoveredSectionIndexRef.current = null;
        }

        const scroller = scrollerRefs.current[index];

        if (scroller) {
            autoScrollPositions.current[index] = scroller.scrollLeft;
        }
    }, []);

    const stopDragging = useCallback(
        (event) => {
            const currentDragState = dragState.current;

            if (
                !currentDragState ||
                currentDragState.pointerId !== event.pointerId
            ) {
                return;
            }

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }

            updateScrollState(currentDragState.index);
            autoScrollPositions.current[currentDragState.index] =
                event.currentTarget.scrollLeft;
            dragState.current = null;
            activeDragIndexRef.current = null;
            setActiveDragIndex(null);
        },
        [updateScrollState],
    );

    return {
        scrollState,
        activeDragIndex,
        setScrollerRef,
        handlePointerDown,
        handlePointerMove,
        handleSectionPointerEnter,
        handleSectionPointerLeave,
        stopDragging,
        scheduleScrollStateUpdate,
    };
};

export default useShelfScroll;
