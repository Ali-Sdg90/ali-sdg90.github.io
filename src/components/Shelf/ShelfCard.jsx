import ShelfCardImage from "./ShelfCardImage";

const ShelfCard = ({ item, cardHeight, cardWidth, sectionId }) => {
    if (sectionId === "career-journey") {
        return (
            <article
                className="shelf-card shelf-card-career-journey"
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
            </article>
        );
    }

    const hasMediaSlot = sectionId === "projects" || sectionId === "tech-stack";
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
