import { useCallback, useEffect, useRef, useState } from "react";
import { DRAG, VELOCITY_SMOOTHING } from "./constants";
import { getLoopWidth, normalizeScrollPosition } from "./scrollUtils";
import useShelfAutoScroll from "./useShelfAutoScroll";
import useShelfMomentum from "./useShelfMomentum";

const useShelfScroll = (shelfSections, selectedSectionId) => {
    const scrollerRefs = useRef([]);
    const dragState = useRef(null);
    const scrollFrame = useRef(null);
    const autoScrollFrame = useRef(null);
    const momentumFrames = useRef({});
    const autoScrollPositions = useRef([]);
    const loopWidths = useRef([]);
    const activeDragIndexRef = useRef(null);
    const hoveredSectionIndexRef = useRef(null);
    const selectedSectionIdRef = useRef(selectedSectionId);
    const scrollStateRef = useRef({});
    const suppressClickRef = useRef(false);
    const suppressClickResetTimerRef = useRef(null);
    const [activeDragIndex, setActiveDragIndex] = useState(null);
    const [scrollState, setScrollState] = useState({});

    const setScrollerRef = useCallback((index, element) => {
        scrollerRefs.current[index] = element;
        loopWidths.current[index] = getLoopWidth(element);
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

    const { startMomentum, stopMomentum } = useShelfMomentum({
        momentumFrames,
        autoScrollPositions,
        loopWidths,
        normalizeScrollPosition,
        updateScrollState,
    });

    useEffect(() => {
        selectedSectionIdRef.current = selectedSectionId;
    }, [selectedSectionId]);

    useEffect(
        () => () => {
            if (suppressClickResetTimerRef.current) {
                clearTimeout(suppressClickResetTimerRef.current);
            }
        },
        [],
    );

    useEffect(() => {
        const updateAllScrollStates = () => {
            shelfSections.forEach((_, index) => updateScrollState(index));
        };

        const handleResize = () => {
            shelfSections.forEach((_, index) => {
                loopWidths.current[index] = getLoopWidth(
                    scrollerRefs.current[index],
                );
                updateScrollState(index);
            });
        };

        updateAllScrollStates();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            if (scrollFrame.current) {
                cancelAnimationFrame(scrollFrame.current);
            }
        };
    }, [shelfSections, updateScrollState]);

    useShelfAutoScroll({
        shelfSections,
        scrollerRefs,
        loopWidths,
        autoScrollFrame,
        autoScrollPositions,
        activeDragIndexRef,
        hoveredSectionIndexRef,
        selectedSectionIdRef,
        momentumFrames,
        normalizeScrollPosition,
        updateScrollState,
    });

    const handlePointerDown = useCallback(
        (event, index) => {
            if (event.button !== 0) {
                return;
            }

            const scroller = event.currentTarget;
            const now = performance.now();
            const section = shelfSections[index];

            stopMomentum(index);

            dragState.current = {
                defaultVelocity:
                    section?.doRepeat && section?.autoScrollSpeed > 0
                        ? -section.autoScrollSpeed
                        : 0,
                doRepeat: section?.doRepeat ?? false,
                hasDragged: false,
                index,
                initialX: event.clientX,
                lastX: event.clientX,
                lastTime: now,
                pointerId: event.pointerId,
                scrollLeft: normalizeScrollPosition(
                    scroller,
                    scroller.scrollLeft,
                    section?.doRepeat ?? false,
                    loopWidths.current[index],
                ),
                startX: event.clientX,
                velocity: 0,
            };
        },
        [shelfSections, stopMomentum],
    );

    const handlePointerMove = useCallback((event) => {
        const currentDragState = dragState.current;

        if (
            !currentDragState ||
            currentDragState.pointerId !== event.pointerId
        ) {
            return;
        }

        const scroller = event.currentTarget;
        const now = performance.now();
        const totalDragDistance = event.clientX - currentDragState.initialX;

        if (
            !currentDragState.hasDragged &&
            Math.abs(totalDragDistance) < DRAG.startDistance
        ) {
            return;
        }

        if (!currentDragState.hasDragged) {
            currentDragState.hasDragged = true;
            activeDragIndexRef.current = currentDragState.index;
            setActiveDragIndex(currentDragState.index);

            if (!scroller.hasPointerCapture(event.pointerId)) {
                scroller.setPointerCapture(event.pointerId);
            }
        }

        const dragDistance = event.clientX - currentDragState.startX;
        const frameDistance = event.clientX - currentDragState.lastX;
        const deltaSeconds = Math.max(
            (now - currentDragState.lastTime) / 1000,
            DRAG.minDeltaSeconds,
        );
        const instantVelocity = -frameDistance / deltaSeconds;
        const nextScrollLeft = normalizeScrollPosition(
            scroller,
            currentDragState.scrollLeft - dragDistance,
            currentDragState.doRepeat,
            loopWidths.current[currentDragState.index],
        );

        currentDragState.scrollLeft = nextScrollLeft;
        currentDragState.startX = event.clientX;
        currentDragState.lastX = event.clientX;
        currentDragState.lastTime = now;
        currentDragState.velocity =
            currentDragState.velocity * VELOCITY_SMOOTHING.previousWeight +
            instantVelocity * VELOCITY_SMOOTHING.instantWeight;
        autoScrollPositions.current[currentDragState.index] = nextScrollLeft;
        event.preventDefault();
    }, []);

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
                    loopWidths.current[index],
                );
            }
        },
        [shelfSections],
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
                    loopWidths.current[currentDragState.index],
                );

            if (currentDragState.hasDragged) {
                suppressClickRef.current = true;
                clearTimeout(suppressClickResetTimerRef.current);
                suppressClickResetTimerRef.current = setTimeout(() => {
                    suppressClickRef.current = false;
                    suppressClickResetTimerRef.current = null;
                }, 0);
                startMomentum(event.currentTarget, currentDragState);
            }

            dragState.current = null;
            activeDragIndexRef.current = null;
            setActiveDragIndex(null);
        },
        [startMomentum, updateScrollState],
    );

    const handleClickCapture = useCallback((event) => {
        if (!suppressClickRef.current) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
        clearTimeout(suppressClickResetTimerRef.current);
        suppressClickResetTimerRef.current = null;
    }, []);

    return {
        scrollState,
        activeDragIndex,
        setScrollerRef,
        handlePointerDown,
        handlePointerMove,
        handleSectionPointerEnter,
        handleSectionPointerLeave,
        handleClickCapture,
        stopDragging,
        scheduleScrollStateUpdate,
    };
};

export default useShelfScroll;
