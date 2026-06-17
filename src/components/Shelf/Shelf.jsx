import { shelfSections } from "../../data/portfolio/shelfSections";
import useShelfScroll from "../../hooks/useShelfScroll";
import ShelfSection from "./ShelfSection";

const Shelf = () => {
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
    } = useShelfScroll(shelfSections);

    return (
        <section className="shelf-wrapper" aria-label="Portfolio shelf">
            <div
                className="shelf-container"
                style={{ perspective: "900px", perspectiveOrigin: "0% 55%" }}
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
                        setScrollerRef={setScrollerRef}
                        stopDragging={stopDragging}
                    />
                ))}
            </div>
        </section>
    );
};

export default Shelf;
