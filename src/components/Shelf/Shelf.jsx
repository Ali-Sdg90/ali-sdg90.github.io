import { useCallback, useEffect, useRef, useState } from "react";
import { shelfSections } from "../../data/shelfSections";

const Shelf = () => {
    const scrollerRefs = useRef([]);
    const dragState = useRef(null);
    const scrollFrame = useRef(null);
    const autoScrollFrame = useRef(null);
    const autoScrollPositions = useRef([]);
    const activeDragIndexRef = useRef(null);
    const scrollStateRef = useRef({});
    const [activeDragIndex, setActiveDragIndex] = useState(null);
    const [scrollState, setScrollState] = useState({});

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
    }, [updateScrollState]);

    useEffect(() => {
        shelfSections.forEach((_, index) => {
            const scroller = scrollerRefs.current[index];
            const firstSet = scroller?.querySelector(".shelf-card-set");

            if (shelfSections[index].autoScrollSpeed <= 0) {
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

            shelfSections.forEach((_, index) => {
                if (
                    activeDragIndexRef.current === index ||
                    shelfSections[index].autoScrollSpeed <= 0
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
                    shelfSections[index].autoScrollSpeed * deltaSeconds;

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
    }, [updateScrollState]);

    const handlePointerDown = (event, index) => {
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
    };

    const handlePointerMove = (event) => {
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
    };

    const stopDragging = (event) => {
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
    };

    return (
        <section className="shelf-wrapper" aria-label="Portfolio shelf">
            <div
                className="shelf-container"
                style={{ perspective: "900px", perspectiveOrigin: "0% 55%" }}
            >
                {shelfSections.map((section, index) => (
                    <div
                        className="shelf-section"
                        id={section.id}
                        key={section.label}
                        style={{
                            top: `${shelfSections[index].rowTop}`,
                            transform: `rotateX(0deg) rotateY(${shelfSections[index].rotation.y}deg) rotateZ(${shelfSections[index].rotation.z}deg)`,
                        }}
                    >
                        <div className="shelf-section-name">
                            {section.label}
                        </div>

                        <div
                            className={[
                                "shelf-section-content",
                                scrollState[index]?.canScrollLeft
                                    ? "has-left-fade"
                                    : "",
                                scrollState[index]?.canScrollRight
                                    ? "has-right-fade"
                                    : "",
                                activeDragIndex === index ? "is-dragging" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div
                                className="shelf-card-track"
                                ref={(element) => {
                                    scrollerRefs.current[index] = element;
                                }}
                                onPointerDown={(event) =>
                                    handlePointerDown(event, index)
                                }
                                onPointerMove={handlePointerMove}
                                onPointerUp={stopDragging}
                                onPointerCancel={stopDragging}
                                onScroll={() =>
                                    scheduleScrollStateUpdate(index)
                                }
                            >
                                {Array.from({
                                    length:
                                        shelfSections[index].autoScrollSpeed > 0
                                            ? 2
                                            : 1,
                                }).map((_, copyIndex) => (
                                    <div
                                        aria-hidden={copyIndex === 1}
                                        className="shelf-card-set"
                                        key={`${section.label}-${copyIndex}`}
                                    >
                                        {section.items.map((item) => (
                                            <article
                                                className="shelf-card"
                                                key={`${copyIndex}-${item.title}-${item.meta}`}
                                            >
                                                <strong>{item.title}</strong>
                                                <span>{item.meta}</span>
                                            </article>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Shelf;
