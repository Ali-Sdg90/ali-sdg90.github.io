import ShelfCardTrack from "./ShelfCardTrack";

const ShelfSection = ({
    section,
    sectionIndex,
    scrollState,
    activeDragIndex,
    setScrollerRef,
    handlePointerDown,
    handlePointerMove,
    handleSectionPointerEnter,
    handleSectionPointerLeave,
    stopDragging,
    scheduleScrollStateUpdate,
}) => {
    return (
        <div
            className={`shelf-section shelf-section-${section.id}`}
            id={section.id}
            style={{
                top: `${section.rowTop}`,
                transform: `rotateX(0deg) rotateY(${section.rotation.y}deg) rotateZ(${section.rotation.z}deg)`,
            }}
        >
            <div
                className="shelf-section-name"
                style={
                    section.titleCardHeight
                        ? { minHeight: section.titleCardHeight }
                        : undefined
                }
            >
                {section.label}
            </div>

            <div
                className={[
                    "shelf-section-content",
                    scrollState[sectionIndex]?.canScrollLeft
                        ? "has-left-fade"
                        : "",
                    scrollState[sectionIndex]?.canScrollRight
                        ? "has-right-fade"
                        : "",
                    activeDragIndex === sectionIndex ? "is-dragging" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                onPointerEnter={() => handleSectionPointerEnter(sectionIndex)}
                onPointerLeave={() => handleSectionPointerLeave(sectionIndex)}
            >
                <ShelfCardTrack
                    section={section}
                    sectionIndex={sectionIndex}
                    setScrollerRef={setScrollerRef}
                    handlePointerDown={handlePointerDown}
                    handlePointerMove={handlePointerMove}
                    stopDragging={stopDragging}
                    scheduleScrollStateUpdate={scheduleScrollStateUpdate}
                />
            </div>
        </div>
    );
};

export default ShelfSection;
