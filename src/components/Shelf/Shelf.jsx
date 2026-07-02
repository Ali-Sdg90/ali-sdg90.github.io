import { shelfSections } from "../../data/portfolio/shelfSections";
import useShelfScroll from "../../hooks/useShelfScroll";
import ShelfSection from "./ShelfSection";

const Shelf = ({ selectedShelfItem, onShelfItemSelect }) => {
    const {
        scrollState,
        activeDragIndex,
        setScrollerRef,
        handlePointerDown,
        handlePointerMove,
        handleSectionPointerEnter,
        handleSectionPointerLeave,
        stopDragging,
        scheduleScrollStateUpdate,
    } = useShelfScroll(shelfSections, selectedShelfItem?.sectionId);

    return (
        <section className="shelf-wrapper" aria-label="Portfolio shelf">
            <div
                className="shelf-container"
                style={{
                    perspective: "58.59cqw",
                    perspectiveOrigin: "0% 55%",
                }}
            >
                {shelfSections.map((section, index) => (
                    <ShelfSection
                        activeDragIndex={activeDragIndex}
                        handlePointerDown={handlePointerDown}
                        handlePointerMove={handlePointerMove}
                        handleSectionPointerEnter={handleSectionPointerEnter}
                        handleSectionPointerLeave={handleSectionPointerLeave}
                        key={section.label}
                        scheduleScrollStateUpdate={scheduleScrollStateUpdate}
                        scrollState={scrollState}
                        section={section}
                        sectionIndex={index}
                        selectedShelfItem={selectedShelfItem}
                        setScrollerRef={setScrollerRef}
                        stopDragging={stopDragging}
                        onShelfItemSelect={onShelfItemSelect}
                    />
                ))}
            </div>
        </section>
    );
};

export default Shelf;
