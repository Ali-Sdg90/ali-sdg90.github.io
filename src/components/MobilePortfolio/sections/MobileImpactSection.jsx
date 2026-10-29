import {
    getStaticDetailPagePath,
    handleStaticDetailLinkClick,
} from "../../../staticDetails/staticDetailRoutes";
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
                    const itemId = getShelfItemId(item);

                    return (
                        <a
                            href={getStaticDetailPagePath(section.id, itemId)}
                            key={itemId}
                            onClick={(event) =>
                                handleStaticDetailLinkClick(event, () =>
                                    onItemOpen(section, item),
                                )
                            }
                        >
                            <Icon aria-hidden="true" />
                            <strong>{item.title}</strong>
                            <span>{item.meta}</span>
                        </a>
                    );
                })}
            </div>
        </section>
    </MobileReveal>
);

export default MobileImpactSection;
