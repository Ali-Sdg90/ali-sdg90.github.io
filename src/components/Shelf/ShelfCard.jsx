import ShelfCardImage from "./ShelfCardImage";

const ShelfCard = ({ item, cardHeight, cardWidth, sectionId }) => {
    const hasMediaSlot =
        sectionId === "projects" ||
        sectionId === "tech-stack" ||
        sectionId === "career-journey";
    const shouldShowImage = hasMediaSlot || item.image;
    const cardClassName = `shelf-card shelf-card-${sectionId}`;

    return (
        <article
            className={cardClassName}
            style={{ flexBasis: cardWidth, height: cardHeight }}
        >
            {shouldShowImage && <ShelfCardImage item={item} />}
            <div className="shelf-card-copy">
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
            </div>
        </article>
    );
};

export default ShelfCard;
