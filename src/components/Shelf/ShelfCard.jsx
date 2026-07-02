import ShelfCardImage from "./ShelfCardImage";

const ShelfCard = ({
    item,
    itemId,
    cardHeight,
    cardWidth,
    sectionId,
    isSelected = false,
    onSelect,
}) => {
    const handleSelect = () => {
        onSelect?.({ sectionId, itemId });
    };

    const handleKeyDown = (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        event.preventDefault();
        handleSelect();
    };

    if (sectionId === "career-journey") {
        return (
            <article
                aria-pressed={isSelected}
                className={[
                    "shelf-card",
                    "shelf-card-career-journey",
                    isSelected ? "is-selected" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                onClick={handleSelect}
                onKeyDown={handleKeyDown}
                role="button"
                style={{ flexBasis: cardWidth, height: cardHeight }}
                tabIndex={0}
            >
                <div className="shelf-card-career-year">{item.year}</div>

                <div className="shelf-card-career-details">
                    <div className="shelf-card-career-company">
                        <ShelfCardImage item={item} />
                        <strong>{item.company ?? item.title}</strong>
                    </div>

                    <p>{item.meta}</p>
                </div>
            </article>
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
        <article
            aria-pressed={isSelected}
            className={cardClassName}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            role="button"
            style={{ flexBasis: cardWidth, height: cardHeight }}
            tabIndex={0}
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
        </article>
    );
};

export default ShelfCard;
