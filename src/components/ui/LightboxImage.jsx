import { lazy, Suspense, useRef, useState } from "react";

const ImageLightbox = lazy(() => import("./ImageLightbox"));

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
    const [measuredImageSize, setMeasuredImageSize] = useState(null);
    const buttonRef = useRef(null);
    const hasImageError = imageError?.src === image.src;
    const fallbackText = getFallbackText(image);
    const hasExplicitSize = image.width && image.height;
    const hasMeasuredSize = measuredImageSize?.src === image.src;
    const lightboxImage =
        hasExplicitSize || !hasMeasuredSize
            ? image
            : {
                  ...image,
                  width: measuredImageSize.width,
                  height: measuredImageSize.height,
              };

    const openLightbox = () => {
        if (!hasExplicitSize) {
            const thumbnail = buttonRef.current?.querySelector("img");
            const { naturalWidth, naturalHeight } = thumbnail ?? {};

            if (naturalWidth && naturalHeight) {
                setMeasuredImageSize({
                    src: image.src,
                    width: naturalWidth,
                    height: naturalHeight,
                });
            }
        }

        setIsLightboxOpen(true);
    };

    return (
        <>
            <button
                className={buttonClassName}
                type="button"
                ref={buttonRef}
                aria-label={`Preview ${image.alt}`}
                onClick={openLightbox}
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
                                width={image.width}
                                height={image.height}
                                {...imageProps}
                                onLoad={(event) => {
                                    imageProps?.onLoad?.(event);

                                    const { naturalWidth, naturalHeight } =
                                        event.currentTarget;

                                    if (naturalWidth && naturalHeight) {
                                        setMeasuredImageSize({
                                            src: image.src,
                                            width: naturalWidth,
                                            height: naturalHeight,
                                        });
                                    }
                                }}
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
                <Suspense fallback={null}>
                    <ImageLightbox
                        image={lightboxImage}
                        onClose={() => setIsLightboxOpen(false)}
                    />
                </Suspense>
            )}
        </>
    );
};

export default LightboxImage;
