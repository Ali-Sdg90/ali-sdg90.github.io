import { Fragment } from "react";

import ShelfCard from "./ShelfCard";

const ShelfCardTrack = ({
    section,
    sectionIndex,
    setScrollerRef,
    handlePointerDown,
    handlePointerMove,
    stopDragging,
    scheduleScrollStateUpdate,
    selectedCareerId,
    onCareerSelect,
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
                    {section.items.map((item, itemIndex) => (
                        <Fragment
                            key={`${copyIndex}-${item.title}-${item.meta}`}
                        >
                            <ShelfCard
                                item={item}
                                cardHeight={section.cardHeight}
                                cardWidth={section.cardWidth}
                                sectionId={section.id}
                                isSelected={
                                    section.id === "career-journey" &&
                                    item.id === selectedCareerId
                                }
                                onSelect={
                                    section.id === "career-journey"
                                        ? onCareerSelect
                                        : undefined
                                }
                            />

                            {section.id === "career-journey" &&
                                itemIndex < section.items.length - 1 && (
                                    <span
                                        className="shelf-card-connector"
                                        aria-hidden="true"
                                    />
                                )}
                        </Fragment>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ShelfCardTrack;
