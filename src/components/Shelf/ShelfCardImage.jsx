import { useState } from "react";

const ShelfCardImage = ({ item }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const fallbackText = item.title.trim().slice(0, 2).toUpperCase();

    if (!item.image || hasError) {
        return (
            <div className="shelf-card-image-fallback" aria-hidden="true">
                {fallbackText}
            </div>
        );
    }

    return (
        <div className="shelf-card-image-wrap">
            {!isLoaded && <div className="shelf-card-image-loading" />}

            <img
                src={item.image}
                alt={`${item.title} preview`}
                loading="lazy"
                decoding="async"
                draggable="false"
                onDragStart={(event) => event.preventDefault()}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`shelf-card-image ${isLoaded ? "loaded" : ""}`}
            />
        </div>
    );
};

export default ShelfCardImage;
