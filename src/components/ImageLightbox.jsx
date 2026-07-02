import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

const EXIT_ANIMATION_MS = 220;

const getFallbackText = (image) => {
    const sourceText = image.fallbackText ?? image.alt ?? "Image";

    return sourceText.trim().slice(0, 2).toUpperCase();
};

const ImageLightbox = ({ image, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
    const fallbackText = getFallbackText(image);

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

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return createPortal(
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
                <FaXmark aria-hidden="true" />
            </button>
            <div
                className="about-panel-lightbox-frame"
                style={{
                    "--lightbox-image-aspect-ratio": imageAspectRatio,
                }}
                onClick={(event) => event.stopPropagation()}
            >
                {hasImageError ? (
                    <div
                        className="about-panel-lightbox-image about-panel-lightbox-image-fallback"
                        aria-hidden="true"
                    >
                        {fallbackText}
                    </div>
                ) : (
                    <img
                        className="about-panel-lightbox-image"
                        src={image.src}
                        alt={image.alt}
                        onLoad={(event) => {
                            const { naturalWidth, naturalHeight } =
                                event.currentTarget;

                            if (naturalWidth && naturalHeight) {
                                setImageAspectRatio(
                                    naturalWidth / naturalHeight,
                                );
                            }
                        }}
                        onError={() => setHasImageError(true)}
                    />
                )}
            </div>
        </div>,
        document.body,
    );
};

export default ImageLightbox;
