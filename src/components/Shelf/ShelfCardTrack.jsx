import { Fragment } from "react";

import ShelfCard from "./ShelfCard";

const SHELF_REFERENCE_WIDTH = 1536;

const resolveShelfShadowValue = (shadowValue) => {
    if (!shadowValue) return undefined;

    return shadowValue.replace(/shelf-cqw\((-?\d*\.?\d+)\)/g, (_, pixels) => {
        const cqwValue = (Number(pixels) / SHELF_REFERENCE_WIDTH) * 100;

        return `${cqwValue}cqw`;
    });
};

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
    const cardShadow = resolveShelfShadowValue(section.cardShadow);

    return (
        <div
            className="shelf-card-track"
            style={
                cardShadow
                    ? {
                          "--shelf-card-row-shadow": cardShadow,
                      }
                    : undefined
            }
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
