import {
    getStaticDetailPagePath,
    handleStaticDetailLinkClick,
} from "../../staticDetails/staticDetailRoutes";
import ShelfCardImage from "./ShelfCardImage";

const ShelfCard = ({
    item,
    itemId,
    cardHeight,
    cardWidth,
    sectionId,
    isAccessible = true,
    isSelected = false,
    onSelect,
}) => {
    const staticDetailPath = getStaticDetailPagePath(sectionId, itemId);
    const CardElement = isAccessible ? "a" : "article";

    const handleSelect = () => {
        onSelect?.({ sectionId, itemId });
    };

    const handleClick = (event) => {
        handleStaticDetailLinkClick(event, handleSelect);
    };

    const handleKeyDown = (event) => {
        if (event.key !== " ") return;

        event.preventDefault();
        handleSelect();
    };

    if (sectionId === "career-journey") {
        return (
            <CardElement
                className={[
                    "shelf-card",
                    "shelf-card-career-journey",
                    isSelected ? "is-selected" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                href={isAccessible ? staticDetailPath : undefined}
                aria-current={isAccessible && isSelected ? "true" : undefined}
                onClick={isAccessible ? handleClick : undefined}
                onKeyDown={isAccessible ? handleKeyDown : undefined}
                style={{ flexBasis: cardWidth, height: cardHeight }}
            >
                <div className="shelf-card-career-year">{item.year}</div>

                <div className="shelf-card-career-details">
                    <div className="shelf-card-career-company">
                        <ShelfCardImage item={item} />
                        <strong>{item.company ?? item.title}</strong>
                    </div>

                    <p>{item.meta}</p>
                </div>
            </CardElement>
        );
    }

    const hasMediaSlot = sectionId === "projects" || sectionId === "tech-stack";
    const shouldShowImage = hasMediaSlot || item.image;
    const cardClassName = [
        "shelf-card",
        `shelf-card-${sectionId}`,
        isSelected ? "is-selected" : "",
    ]
        .filter(Boolean)
        .join(" ");
    const Icon = item.icon;

    return (
        <CardElement
            className={cardClassName}
            href={isAccessible ? staticDetailPath : undefined}
            aria-current={isAccessible && isSelected ? "true" : undefined}
            onClick={isAccessible ? handleClick : undefined}
            onKeyDown={isAccessible ? handleKeyDown : undefined}
            style={{ flexBasis: cardWidth, height: cardHeight }}
        >
            {shouldShowImage && <ShelfCardImage item={item} />}
            {sectionId === "achievements" && Icon && (
                <Icon
                    className="shelf-card-achievement-icon"
                    aria-hidden="true"
                />
            )}
            <div className="shelf-card-copy">
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
            </div>
        </CardElement>
    );
};

export default ShelfCard;
