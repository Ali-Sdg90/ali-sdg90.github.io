import ShelfCardTrack from "./ShelfCardTrack";

const SHELF_REFERENCE_WIDTH = 1536;

const resolveShelfShadowValue = (shadowValue) => {
    if (!shadowValue) return undefined;

    return shadowValue.replace(/shelf-cqw\((-?\d*\.?\d+)\)/g, (_, pixels) => {
        const cqwValue = (Number(pixels) / SHELF_REFERENCE_WIDTH) * 100;

        return `${cqwValue}cqw`;
    });
};

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
    selectedCareerId,
    onCareerSelect,
}) => {
    const cardShadow = resolveShelfShadowValue(section.cardShadow);

    return (
        <div
            className={`shelf-section shelf-section-${section.id}`}
            id={section.id}
            style={{
                ...(cardShadow
                    ? { "--shelf-card-row-shadow": cardShadow }
                    : {}),
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
                    selectedCareerId={selectedCareerId}
                    onCareerSelect={onCareerSelect}
                />
            </div>
        </div>
    );
};

export default ShelfSection;
