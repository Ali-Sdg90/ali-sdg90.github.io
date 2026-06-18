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
    const setCount = section.doRepeat ? 5 : 1;
    const centerSetIndex = Math.floor(setCount / 2);

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
                    aria-hidden={copyIndex !== centerSetIndex}
                    className="shelf-card-set"
                    key={`${section.label}-${copyIndex}`}
                >
                    {section.items.map((item) => (
                        <ShelfCard
                            item={item}
                            cardHeight={section.cardHeight}
                            cardWidth={section.cardWidth}
                            key={`${copyIndex}-${item.title}-${item.meta}`}
                            sectionId={section.id}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ShelfCardTrack;
