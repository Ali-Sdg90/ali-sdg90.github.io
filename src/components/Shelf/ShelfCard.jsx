const ShelfCard = ({ item, cardHeight }) => {
    return (
        <article className="shelf-card" style={{ height: cardHeight }}>
            <strong>{item.title}</strong>
            <span>{item.meta}</span>
        </article>
    );
};

export default ShelfCard;
