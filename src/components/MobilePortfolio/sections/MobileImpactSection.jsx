import { getShelfItemId } from "../../../utils/getShelfItemId";
import MobileReveal from "../components/MobileReveal";
import MobileSectionHeading from "../components/MobileSectionHeading";
import { CARD_INSTRUCTION } from "../mobilePortfolioConfig";

const MobileImpactSection = ({ items, onItemOpen, section }) => (
    <MobileReveal>
        <section className="mobile-section mobile-impact" id="mobile-impact">
            <MobileSectionHeading
                title="Impact in numbers"
                copy={CARD_INSTRUCTION}
            />
            <div className="mobile-impact-grid">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={getShelfItemId(item)}
                            type="button"
                            onClick={() => onItemOpen(section, item)}
                        >
                            <Icon aria-hidden="true" />
                            <strong>{item.title}</strong>
                            <span>{item.meta}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    </MobileReveal>
);

export default MobileImpactSection;
