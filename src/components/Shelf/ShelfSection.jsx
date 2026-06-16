import ShelfCardTrack from "./ShelfCardTrack";

const ShelfSection = ({
    section,
    sectionIndex,
    scrollState,
    activeDragIndex,
    setScrollerRef,
    handlePointerDown,
    handlePointerMove,
    stopDragging,
    scheduleScrollStateUpdate,
}) => {
    return (
        <div
            className="shelf-section"
            id={section.id}
            style={{
                top: `${section.rowTop}`,
                transform: `rotateX(0deg) rotateY(${section.rotation.y}deg) rotateZ(${section.rotation.z}deg)`,
            }}
        >
            <div className="shelf-section-name">{section.label}</div>

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
