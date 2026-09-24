import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    FaDownload,
    FaMagnifyingGlassMinus,
    FaMagnifyingGlassPlus,
    FaRotateLeft,
    FaXmark,
} from "react-icons/fa6";

const EXIT_ANIMATION_MS = 220;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

const getDownloadName = (image, source) => {
    if (image.downloadName) return image.downloadName;

    const extension = source.match(/\.([a-z0-9]+)(?:[?#]|$)/i)?.[1] ?? "jpg";
    const baseName = (image.alt ?? "portfolio-image")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${baseName || "portfolio-image"}.${extension}`;
};

const getFallbackText = (image) => {
    const sourceText = image.fallbackText ?? image.alt ?? "Image";

    return sourceText.trim().slice(0, 2).toUpperCase();
};

const ImageLightbox = ({ image, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(
        image.width && image.height ? image.width / image.height : 16 / 9,
    );
    const viewportRef = useRef(null);
    const lastPointerPositionRef = useRef(null);
    const fallbackText = getFallbackText(image);
    const lightboxSrc = image.lightboxSrc ?? image.src;
    const canPan = zoom > MIN_ZOOM;
    const downloadName = getDownloadName(image, lightboxSrc);

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

    const clampOffset = useCallback(
        (nextOffset, nextZoom = zoom) => {
            const viewport = viewportRef.current;

            if (!viewport || nextZoom <= MIN_ZOOM) {
                return { x: 0, y: 0 };
            }

            const viewportWidth = viewport.clientWidth;
            const viewportHeight = viewport.clientHeight;
            const viewportAspectRatio = viewportWidth / viewportHeight;
            const fitWidth =
                imageAspectRatio > viewportAspectRatio
                    ? viewportWidth
                    : viewportHeight * imageAspectRatio;
            const fitHeight =
                imageAspectRatio > viewportAspectRatio
                    ? viewportWidth / imageAspectRatio
                    : viewportHeight;
            const maxX = Math.max(0, (fitWidth * nextZoom - viewportWidth) / 2);
            const maxY = Math.max(
                0,
                (fitHeight * nextZoom - viewportHeight) / 2,
            );

            return {
                x: Math.min(maxX, Math.max(-maxX, nextOffset.x)),
                y: Math.min(maxY, Math.max(-maxY, nextOffset.y)),
            };
        },
        [imageAspectRatio, zoom],
    );

    const updateZoom = (nextZoom) => {
        const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));

        setZoom(clampedZoom);
        setOffset((currentOffset) => clampOffset(currentOffset, clampedZoom));
    };

    const resetView = () => {
        setZoom(MIN_ZOOM);
        setOffset({ x: 0, y: 0 });
        setIsPanning(false);
        lastPointerPositionRef.current = null;
    };

    const handlePointerDown = (event) => {
        if (!canPan || event.pointerType !== "mouse" || event.button !== 0) {
            return;
        }

        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        lastPointerPositionRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        setIsPanning(true);
    };

    const handlePointerMove = (event) => {
        if (!isPanning || !lastPointerPositionRef.current) return;

        const deltaX = event.clientX - lastPointerPositionRef.current.x;
        const deltaY = event.clientY - lastPointerPositionRef.current.y;

        lastPointerPositionRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        setOffset((currentOffset) =>
            clampOffset(
                {
                    x: currentOffset.x + deltaX,
                    y: currentOffset.y + deltaY,
                },
                zoom,
            ),
        );
    };

    const stopPanning = (event) => {
        if (!isPanning) return;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        lastPointerPositionRef.current = null;
        setIsPanning(false);
    };

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
                className={[
                    "about-panel-lightbox-frame",
                    isImageLoaded ? "is-image-loaded" : "is-image-loading",
                ].join(" ")}
                style={{
                    "--lightbox-image-aspect-ratio": imageAspectRatio,
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    ref={viewportRef}
                    className={[
                        "about-panel-lightbox-viewport",
                        canPan ? "can-pan" : "",
                        isPanning ? "is-panning" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={stopPanning}
                    onPointerCancel={stopPanning}
                >
                    {!hasImageError && !isImageLoaded && (
                        <div
                            className="about-panel-lightbox-loader"
                            role="status"
                            aria-label="Loading high-resolution image"
                        >
                            <span className="about-panel-lightbox-loader-ring" />
                            <span className="about-panel-lightbox-loader-text">
                                Loading high-resolution image
                            </span>
                        </div>
                    )}
                    <div
                        className="about-panel-lightbox-image-transform"
                        style={{
                            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                        }}
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
                                src={lightboxSrc}
                                alt={image.alt}
                                width={image.lightboxWidth ?? image.width}
                                height={image.lightboxHeight ?? image.height}
                                draggable="false"
                                onLoad={(event) => {
                                    const { naturalWidth, naturalHeight } =
                                        event.currentTarget;

                                    if (naturalWidth && naturalHeight) {
                                        setImageAspectRatio(
                                            naturalWidth / naturalHeight,
                                        );
                                    }

                                    setIsImageLoaded(true);
                                }}
                                onError={() => setHasImageError(true)}
                            />
                        )}
                    </div>
                </div>
                {isImageLoaded && !hasImageError && (
                    <div
                        className="about-panel-lightbox-toolbar"
                        role="toolbar"
                        aria-label="Image controls"
                    >
                        <button
                            type="button"
                            aria-label="Zoom out"
                            title="Zoom out"
                            disabled={zoom <= MIN_ZOOM}
                            onClick={() => updateZoom(zoom - ZOOM_STEP)}
                        >
                            <FaMagnifyingGlassMinus aria-hidden="true" />
                        </button>
                        <output
                            className="about-panel-lightbox-zoom-value"
                            aria-label={`Zoom ${Math.round(zoom * 100)} percent`}
                        >
                            {Math.round(zoom * 100)}%
                        </output>
                        <button
                            type="button"
                            aria-label="Zoom in"
                            title="Zoom in"
                            disabled={zoom >= MAX_ZOOM}
                            onClick={() => updateZoom(zoom + ZOOM_STEP)}
                        >
                            <FaMagnifyingGlassPlus aria-hidden="true" />
                        </button>
                        <span
                            className="about-panel-lightbox-toolbar-divider"
                            aria-hidden="true"
                        />
                        <button
                            type="button"
                            aria-label="Reset image view"
                            title="Reset"
                            disabled={
                                zoom === MIN_ZOOM &&
                                offset.x === 0 &&
                                offset.y === 0
                            }
                            onClick={resetView}
                        >
                            <FaRotateLeft aria-hidden="true" />
                        </button>
                        <a
                            href={lightboxSrc}
                            download={downloadName}
                            aria-label="Download image"
                            title="Download"
                        >
                            <FaDownload aria-hidden="true" />
                        </a>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};

export default ImageLightbox;
