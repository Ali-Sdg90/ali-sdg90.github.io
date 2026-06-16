const ShelfCard = ({ item }) => {
    return (
        <article className="shelf-card">
            <strong>{item.title}</strong>
            <span>{item.meta}</span>
        </article>
    );
};

export default ShelfCard;
