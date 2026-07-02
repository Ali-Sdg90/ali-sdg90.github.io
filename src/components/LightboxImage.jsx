import { useState } from "react";

import ImageLightbox from "./ImageLightbox";

const getFallbackText = (image) => {
    const sourceText = image.fallbackText ?? image.alt ?? "Image";

    return sourceText.trim().slice(0, 2).toUpperCase();
};

const LightboxImage = ({
    image,
    buttonClassName,
    fallbackClassName,
    imageClassName,
    imageKey,
    imageProps,
    children,
}) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [imageError, setImageError] = useState(null);
    const hasImageError = imageError?.src === image.src;
    const fallbackText = getFallbackText(image);

    return (
        <>
            <button
                className={buttonClassName}
                type="button"
                aria-label={`Preview ${image.alt}`}
                onClick={() => setIsLightboxOpen(true)}
            >
                {children ?? (
                    <>
                        {hasImageError ? (
                            <span
                                className={
                                    fallbackClassName ??
                                    `${imageClassName} lightbox-image-fallback`
                                }
                                aria-hidden="true"
                            >
                                {fallbackText}
                            </span>
                        ) : (
                            <img
                                key={imageKey}
                                className={imageClassName}
                                src={image.src}
                                alt={image.alt}
                                {...imageProps}
                                onError={(event) => {
                                    imageProps?.onError?.(event);
                                    setImageError({ src: image.src });
                                }}
                            />
                        )}
                    </>
                )}
            </button>

            {isLightboxOpen && (
                <ImageLightbox
                    image={image}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </>
    );
};

export default LightboxImage;
