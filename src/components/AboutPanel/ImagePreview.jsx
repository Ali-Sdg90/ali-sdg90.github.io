import { useCallback, useEffect, useState } from "react";

const EXIT_ANIMATION_MS = 220;

const ImagePreview = ({ image, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const requestClose = useCallback(() => {
        setIsClosing(true);
    }, []);

    useEffect(() => {
        if (!isClosing) return undefined;

        const closeTimer = window.setTimeout(onClose, EXIT_ANIMATION_MS);

        return () => {
            window.clearTimeout(closeTimer);
        };
    }, [isClosing, onClose]);

    useEffect(() => {
        if (isClosing) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                requestClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isClosing, requestClose]);

    return (
        <div
            className={["about-panel-lightbox", isClosing ? "is-closing" : ""]
                .filter(Boolean)
                .join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label={`${image.alt} image preview`}
            onClick={requestClose}
        >
            <button
                className="about-panel-lightbox-close"
                type="button"
                aria-label="Close image preview"
                onClick={requestClose}
            >
                x
            </button>
            <div
                className="about-panel-lightbox-frame"
                onClick={(event) => event.stopPropagation()}
            >
                <img
                    className="about-panel-lightbox-image"
                    src={image.src}
                    alt={image.alt}
                />
            </div>
        </div>
    );
};

export default ImagePreview;
