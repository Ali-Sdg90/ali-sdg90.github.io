import { HiOutlineArrowUpRight } from "react-icons/hi2";

import { getShelfItemId } from "../../../utils/getShelfItemId";
import MobileReveal from "../components/MobileReveal";
import MobileSectionHeading from "../components/MobileSectionHeading";
import { CARD_INSTRUCTION } from "../mobilePortfolioConfig";

const MobileCareerSection = ({ items, onItemOpen, section }) => (
    <MobileReveal>
        <section className="mobile-section mobile-career" id="mobile-career">
            <MobileSectionHeading
                title="Career journey"
                copy={CARD_INSTRUCTION}
            />
            <ol className="mobile-career-timeline">
                {items.map((item, index) => (
                    <li key={getShelfItemId(item)}>
                        <span className="mobile-career-marker">
                            {index + 1}
                        </span>
                        <button
                            type="button"
                            onClick={() => onItemOpen(section, item)}
                        >
                            <img
                                src={item.image}
                                alt=""
                                width="300"
                                height="300"
                                loading="lazy"
                            />
                            <span>
                                <small>{item.year}</small>
                                <strong>{item.title}</strong>
                                <span>{item.meta}</span>
                            </span>
                            <HiOutlineArrowUpRight aria-hidden="true" />
                        </button>
                    </li>
                ))}
            </ol>
        </section>
    </MobileReveal>
);

export default MobileCareerSection;
