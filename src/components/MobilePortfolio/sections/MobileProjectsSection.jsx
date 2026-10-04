import { HiArrowUpRight } from "react-icons/hi2";

import { getShelfItemId } from "../../../utils/getShelfItemId";
import MobileReveal from "../components/MobileReveal";
import MobileSectionHeading from "../components/MobileSectionHeading";
import useActiveProject from "../hooks/useActiveProject";
import { CARD_INSTRUCTION } from "../mobilePortfolioConfig";

const MobileProjectsSection = ({ items, onItemOpen, section }) => {
    const { activeProjectIndex, projectCardRefs, projectRailRef } =
        useActiveProject(items.length);

    return (
        <MobileReveal>
            <section
                className="mobile-section mobile-projects"
                id="mobile-projects"
            >
                <MobileSectionHeading
                    title="Featured projects"
                    copy={CARD_INSTRUCTION}
                />

                <div className="mobile-project-rail" ref={projectRailRef}>
                    {items.map((item, index) => (
                        <button
                            className={`mobile-project-card${index === 0 ? " is-featured" : ""}`}
                            key={getShelfItemId(item)}
                            type="button"
                            ref={(element) => {
                                projectCardRefs.current[index] = element;
                            }}
                            onClick={() => onItemOpen(section, item)}
                        >
                            <img
                                src={item.image}
                                alt=""
                                width={item.imageWidth}
                                height={item.imageHeight}
                                loading={index < 2 ? "eager" : "lazy"}
                                decoding="async"
                            />
                            <span className="mobile-project-card-copy">
                                <small>
                                    {String(index + 1).padStart(2, "0")}
                                </small>
                                <strong>{item.title}</strong>
                                <span>{item.meta}</span>
                                <i>
                                    Explore project{" "}
                                    <HiArrowUpRight aria-hidden="true" />
                                </i>
                            </span>
                        </button>
                    ))}
                </div>

                <div
                    className="mobile-project-pagination"
                    aria-label={`Project ${activeProjectIndex + 1} of ${items.length}`}
                    aria-live="polite"
                >
                    <span className="mobile-project-pagination-label">
                        Swipe
                    </span>
                    <span
                        className="mobile-project-pagination-track"
                        aria-hidden="true"
                    >
                        <span
                            style={{
                                width: `${((activeProjectIndex + 1) / items.length) * 100}%`,
                            }}
                        />
                    </span>
                    <span className="mobile-project-pagination-count">
                        <strong>
                            {String(activeProjectIndex + 1).padStart(2, "0")}
                        </strong>
                        <span>/</span>
                        {String(items.length).padStart(2, "0")}
                    </span>
                </div>
            </section>
        </MobileReveal>
    );
};

export default MobileProjectsSection;
