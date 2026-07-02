import { Fragment } from "react";

import { getShelfItemId } from "../../utils/getShelfItemId";
import ShelfCard from "./ShelfCard";

const ShelfCardTrack = ({
    section,
    sectionIndex,
    setScrollerRef,
    handlePointerDown,
    handlePointerMove,
    stopDragging,
    scheduleScrollStateUpdate,
    selectedShelfItem,
    onShelfItemSelect,
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
                    {section.items.map((item, itemIndex) => {
                        const itemId = getShelfItemId(item);

                        return (
                            <Fragment
                                key={`${copyIndex}-${itemId}-${item.meta ?? ""}`}
                            >
                                <ShelfCard
                                    item={item}
                                    itemId={itemId}
                                    cardHeight={section.cardHeight}
                                    cardWidth={section.cardWidth}
                                    sectionId={section.id}
                                    isSelected={
                                        selectedShelfItem?.sectionId ===
                                            section.id &&
                                        selectedShelfItem?.itemId === itemId
                                    }
                                    onSelect={onShelfItemSelect}
                                />

                                {section.id === "career-journey" &&
                                    itemIndex < section.items.length - 1 && (
                                        <span
                                            className="shelf-card-connector"
                                            aria-hidden="true"
                                        />
                                    )}
                            </Fragment>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ShelfCardTrack;
