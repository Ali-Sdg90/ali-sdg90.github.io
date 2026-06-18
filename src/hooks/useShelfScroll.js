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

    const getLoopWidth = useCallback((scroller) => {
        const firstSet = scroller?.querySelector(".shelf-card-set");

        if (!scroller || !firstSet) {
            return 0;
        }

        const setGap = parseFloat(getComputedStyle(scroller).columnGap) || 0;

        return firstSet.offsetWidth + setGap;
    }, []);

    const normalizeScrollPosition = useCallback(
        (scroller, scrollLeft = scroller.scrollLeft, doRepeat = true) => {
            if (!doRepeat) {
                if (scrollLeft !== scroller.scrollLeft) {
                    scroller.scrollLeft = scrollLeft;
                }

                return scroller.scrollLeft;
            }

            const loopWidth = getLoopWidth(scroller);

            if (loopWidth <= 0) {
                return scrollLeft;
            }

            const minScrollLeft = loopWidth;
            const maxScrollLeft = loopWidth * 3;
            let nextScrollLeft = scrollLeft;

            while (nextScrollLeft < minScrollLeft) {
                nextScrollLeft += loopWidth;
            }

            while (nextScrollLeft >= maxScrollLeft) {
                nextScrollLeft -= loopWidth;
            }

            if (nextScrollLeft !== scroller.scrollLeft) {
                scroller.scrollLeft = nextScrollLeft;
            }

            return nextScrollLeft;
        },
        [getLoopWidth],
    );

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
            const loopWidth = getLoopWidth(scroller);

            if (!scroller || !section.doRepeat || loopWidth <= 0) {
                autoScrollPositions.current[index] = scroller?.scrollLeft ?? 0;
                updateScrollState(index);
                return;
            }

            autoScrollPositions.current[index] = loopWidth * 2;
            scroller.scrollLeft = autoScrollPositions.current[index];
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
                    !section.doRepeat ||
                    section.autoScrollSpeed <= 0
                ) {
                    return;
                }

                const scroller = scrollerRefs.current[index];
                if (!scroller) {
                    return;
                }

                const loopWidth = getLoopWidth(scroller);

                if (loopWidth <= 0) {
                    return;
                }

                autoScrollPositions.current[index] =
                    (autoScrollPositions.current[index] ??
                        scroller.scrollLeft) -
                    section.autoScrollSpeed * deltaSeconds;

                autoScrollPositions.current[index] = normalizeScrollPosition(
                    scroller,
                    autoScrollPositions.current[index],
                    section.doRepeat,
                );
            });

            autoScrollFrame.current = requestAnimationFrame(autoScroll);
        };

        autoScrollFrame.current = requestAnimationFrame(autoScroll);

        return () => {
            if (autoScrollFrame.current) {
                cancelAnimationFrame(autoScrollFrame.current);
            }
        };
    }, [
        getLoopWidth,
        normalizeScrollPosition,
        shelfSections,
        updateScrollState,
    ]);

    const handlePointerDown = useCallback(
        (event, index) => {
            if (event.button !== 0) {
                return;
            }

            const scroller = event.currentTarget;

            dragState.current = {
                doRepeat: shelfSections[index]?.doRepeat ?? false,
                index,
                pointerId: event.pointerId,
                scrollLeft: normalizeScrollPosition(
                    scroller,
                    scroller.scrollLeft,
                    shelfSections[index]?.doRepeat ?? false,
                ),
                startX: event.clientX,
            };

            activeDragIndexRef.current = index;
            setActiveDragIndex(index);
            scroller.setPointerCapture(event.pointerId);
        },
        [normalizeScrollPosition, shelfSections],
    );

    const handlePointerMove = useCallback(
        (event) => {
            const currentDragState = dragState.current;

            if (
                !currentDragState ||
                currentDragState.pointerId !== event.pointerId
            ) {
                return;
            }

            const scroller = event.currentTarget;
            const dragDistance = event.clientX - currentDragState.startX;
            const nextScrollLeft = normalizeScrollPosition(
                scroller,
                currentDragState.scrollLeft - dragDistance,
                currentDragState.doRepeat,
            );

            currentDragState.scrollLeft = nextScrollLeft;
            currentDragState.startX = event.clientX;
            autoScrollPositions.current[currentDragState.index] =
                nextScrollLeft;
            event.preventDefault();
        },
        [normalizeScrollPosition],
    );

    const handleSectionPointerEnter = useCallback((index) => {
        hoveredSectionIndexRef.current = index;
    }, []);

    const handleSectionPointerLeave = useCallback(
        (index) => {
            if (hoveredSectionIndexRef.current === index) {
                hoveredSectionIndexRef.current = null;
            }

            const scroller = scrollerRefs.current[index];

            if (scroller) {
                autoScrollPositions.current[index] = normalizeScrollPosition(
                    scroller,
                    scroller.scrollLeft,
                    shelfSections[index]?.doRepeat ?? false,
                );
            }
        },
        [normalizeScrollPosition, shelfSections],
    );

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
                normalizeScrollPosition(
                    event.currentTarget,
                    event.currentTarget.scrollLeft,
                    currentDragState.doRepeat,
                );
            dragState.current = null;
            activeDragIndexRef.current = null;
            setActiveDragIndex(null);
        },
        [normalizeScrollPosition, updateScrollState],
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
