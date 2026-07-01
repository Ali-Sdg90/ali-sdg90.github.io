import ShelfCardImage from "./ShelfCardImage";

const ShelfCard = ({
    item,
    cardHeight,
    cardWidth,
    sectionId,
    isSelected = false,
    onSelect,
}) => {
    if (sectionId === "career-journey") {
        const handleKeyDown = (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();
            onSelect?.(item.id);
        };

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
                onClick={() => onSelect?.(item.id)}
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
    const cardClassName = `shelf-card shelf-card-${sectionId}`;
    const Icon = item.icon;

    return (
        <article
            className={cardClassName}
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
        </article>
    );
};

export default ShelfCard;
