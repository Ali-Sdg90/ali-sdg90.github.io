import { getShelfItemId } from "../../../utils/getShelfItemId";
import MobileReveal from "../components/MobileReveal";
import MobileSectionHeading from "../components/MobileSectionHeading";
import { CARD_INSTRUCTION } from "../mobilePortfolioConfig";

const MobileStackSection = ({ items, onItemOpen, section }) => (
    <MobileReveal>
        <section className="mobile-section mobile-stack" id="mobile-stack">
            <MobileSectionHeading title="Tech stack" copy={CARD_INSTRUCTION} />
            <div className="mobile-stack-cloud">
                {items.map((item) => (
                    <button
                        key={getShelfItemId(item)}
                        type="button"
                        onClick={() => onItemOpen(section, item)}
                    >
                        <img
                            src={item.image}
                            alt=""
                            width={item.imageWidth ?? 300}
                            height={item.imageHeight ?? 300}
                            loading="lazy"
                            decoding="async"
                        />
                        <span>{item.title}</span>
                    </button>
                ))}
            </div>
        </section>
    </MobileReveal>
);

export default MobileStackSection;
