import ShelfCard from "./ShelfCard";

const ShelfCardTrack = ({
    section,
    sectionIndex,
    setScrollerRef,
    handlePointerDown,
    handlePointerMove,
    stopDragging,
    scheduleScrollStateUpdate,
}) => {
    const setCount = section.autoScrollSpeed > 0 ? 2 : 1;

    return (
        <div
            className="shelf-card-track"
            ref={(element) => {
                setScrollerRef(sectionIndex, element);
            }}
            onPointerDown={(event) => handlePointerDown(event, sectionIndex)}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onScroll={() => scheduleScrollStateUpdate(sectionIndex)}
        >
            {Array.from({ length: setCount }).map((_, copyIndex) => (
                <div
                    aria-hidden={copyIndex === 1}
                    className="shelf-card-set"
                    key={`${section.label}-${copyIndex}`}
                >
                    {section.items.map((item) => (
                        <ShelfCard
                            item={item}
                            key={`${copyIndex}-${item.title}-${item.meta}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ShelfCardTrack;
