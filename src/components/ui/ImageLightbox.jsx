import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    FaDownload,
    FaMagnifyingGlassMinus,
    FaMagnifyingGlassPlus,
    FaRotateLeft,
    FaXmark,
} from "react-icons/fa6";

import ImageLightboxNavigation from "./ImageLightboxNavigation";
import "../../assets/scss/components/about-panel/_about-panel-lightbox.scss";

const EXIT_ANIMATION_MS = 220;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

const getImageAspectRatio = (image) => {
    const width = image.lightboxWidth ?? image.width;
    const height = image.lightboxHeight ?? image.height;

    return width && height ? width / height : 16 / 9;
};

const slideVariants = {
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? "16%" : "-16%",
    }),
    center: {
        opacity: 1,
        x: "0%",
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? "-16%" : "16%",
    }),
};

const getDistance = (firstPoint, secondPoint) =>
    Math.hypot(secondPoint.x - firstPoint.x, secondPoint.y - firstPoint.y);

const getMidpoint = (firstPoint, secondPoint) => ({
    x: (firstPoint.x + secondPoint.x) / 2,
    y: (firstPoint.y + secondPoint.y) / 2,
});

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

const ImageLightbox = ({
    image,
    images,
    initialIndex = 0,
    onClose,
    onImageChange,
}) => {
    const galleryImages = useMemo(
        () => (images?.length ? images : [image]),
        [image, images],
    );
    const safeInitialIndex = Math.min(
        galleryImages.length - 1,
        Math.max(0, initialIndex),
    );
    const prefersReducedMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(safeInitialIndex);
    const [navigationDirection, setNavigationDirection] = useState(1);
    const [isClosing, setIsClosing] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(() =>
        getImageAspectRatio(galleryImages[safeInitialIndex]),
    );
    const viewportRef = useRef(null);
    const lastPointerPositionRef = useRef(null);
    const activeTouchPointersRef = useRef(new Map());
    const pinchGestureRef = useRef(null);
    const zoomRef = useRef(MIN_ZOOM);
    const offsetRef = useRef({ x: 0, y: 0 });
    const activeIndexRef = useRef(safeInitialIndex);
    const preloadedSourcesRef = useRef(
        new Set([
            galleryImages[safeInitialIndex].lightboxSrc ??
                galleryImages[safeInitialIndex].src,
        ]),
    );
    const activeImage = galleryImages[activeIndex];
    const fallbackText = getFallbackText(activeImage);
    const lightboxSrc = activeImage.lightboxSrc ?? activeImage.src;
    const canPan = zoom > MIN_ZOOM;
    const downloadName = getDownloadName(activeImage, lightboxSrc);
    const canNavigatePrevious = activeIndex > 0;
    const canNavigateNext = activeIndex < galleryImages.length - 1;

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
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    const clampOffset = useCallback(
        (nextOffset, nextZoom) => {
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
        [imageAspectRatio],
    );

    const updateView = useCallback(
        (nextZoom, nextOffset) => {
            const clampedZoom = Math.min(
                MAX_ZOOM,
                Math.max(MIN_ZOOM, nextZoom),
            );
            const clampedOffset = clampOffset(nextOffset, clampedZoom);

            zoomRef.current = clampedZoom;
            offsetRef.current = clampedOffset;
            setZoom(clampedZoom);
            setOffset(clampedOffset);
        },
        [clampOffset],
    );

    useEffect(() => {
        const handleResize = () => {
            updateView(zoomRef.current, offsetRef.current);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [updateView]);

    const updateZoom = (nextZoom) => {
        const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));

        updateView(clampedZoom, offsetRef.current);
    };

    const resetView = useCallback(() => {
        zoomRef.current = MIN_ZOOM;
        offsetRef.current = { x: 0, y: 0 };
        setZoom(MIN_ZOOM);
        setOffset({ x: 0, y: 0 });
        setIsPanning(false);
        lastPointerPositionRef.current = null;
        activeTouchPointersRef.current.clear();
        pinchGestureRef.current = null;
    }, []);

    const navigateTo = useCallback(
        (nextIndex) => {
            if (
                isClosing ||
                nextIndex < 0 ||
                nextIndex >= galleryImages.length ||
                nextIndex === activeIndex
            ) {
                return;
            }

            const nextImage = galleryImages[nextIndex];

            resetView();
            setNavigationDirection(nextIndex > activeIndex ? 1 : -1);
            setHasImageError(false);
            setIsImageLoaded(false);
            setImageAspectRatio(getImageAspectRatio(nextImage));
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            onImageChange?.(nextIndex, nextImage);
        },
        [activeIndex, galleryImages, isClosing, onImageChange, resetView],
    );

    const navigatePrevious = useCallback(() => {
        navigateTo(activeIndex - 1);
    }, [activeIndex, navigateTo]);

    const navigateNext = useCallback(() => {
        navigateTo(activeIndex + 1);
    }, [activeIndex, navigateTo]);

    useEffect(() => {
        if (isClosing) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                requestClose();
                return;
            }

            if (event.key === "ArrowLeft" && canNavigatePrevious) {
                event.preventDefault();
                navigatePrevious();
            }

            if (event.key === "ArrowRight" && canNavigateNext) {
                event.preventDefault();
                navigateNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        canNavigateNext,
        canNavigatePrevious,
        isClosing,
        navigateNext,
        navigatePrevious,
        requestClose,
    ]);

    useEffect(() => {
        const neighborImages = [
            galleryImages[activeIndex - 1],
            galleryImages[activeIndex + 1],
        ].filter(Boolean);

        for (const neighborImage of neighborImages) {
            const source = neighborImage.lightboxSrc ?? neighborImage.src;

            if (preloadedSourcesRef.current.has(source)) continue;

            preloadedSourcesRef.current.add(source);
            const preloadImage = new window.Image();
            preloadImage.decoding = "async";
            preloadImage.fetchPriority = "low";
            preloadImage.src = source;
        }
    }, [activeIndex, galleryImages]);

    const startPinchGesture = () => {
        const viewport = viewportRef.current;
        const touchPoints = Array.from(
            activeTouchPointersRef.current.values(),
        ).slice(0, 2);

        if (!viewport || touchPoints.length < 2) {
            pinchGestureRef.current = null;
            return;
        }

        const [firstPoint, secondPoint] = touchPoints;
        const rect = viewport.getBoundingClientRect();
        const midpoint = getMidpoint(firstPoint, secondPoint);
        const localMidpoint = {
            x: midpoint.x - rect.left,
            y: midpoint.y - rect.top,
        };
        const currentZoom = zoomRef.current;
        const currentOffset = offsetRef.current;

        pinchGestureRef.current = {
            pointerIds: [firstPoint.id, secondPoint.id],
            startDistance: Math.max(1, getDistance(firstPoint, secondPoint)),
            startZoom: currentZoom,
            contentPoint: {
                x:
                    (localMidpoint.x - rect.width / 2 - currentOffset.x) /
                    currentZoom,
                y:
                    (localMidpoint.y - rect.height / 2 - currentOffset.y) /
                    currentZoom,
            },
        };
        lastPointerPositionRef.current = null;
        setIsPanning(true);
    };

    const handlePointerDown = (event) => {
        if (event.pointerType === "touch") {
            if (!isImageLoaded || hasImageError) return;

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            activeTouchPointersRef.current.set(event.pointerId, {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
            });

            if (activeTouchPointersRef.current.size >= 2) {
                startPinchGesture();
            } else {
                lastPointerPositionRef.current = {
                    id: event.pointerId,
                    x: event.clientX,
                    y: event.clientY,
                };
                setIsPanning(zoomRef.current > MIN_ZOOM);
            }

            return;
        }

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
        if (event.pointerType === "touch") {
            if (!activeTouchPointersRef.current.has(event.pointerId)) return;

            event.preventDefault();
            activeTouchPointersRef.current.set(event.pointerId, {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
            });

            if (activeTouchPointersRef.current.size >= 2) {
                const pinchGesture = pinchGestureRef.current;

                if (
                    !pinchGesture ||
                    pinchGesture.pointerIds.some(
                        (pointerId) =>
                            !activeTouchPointersRef.current.has(pointerId),
                    )
                ) {
                    startPinchGesture();
                    return;
                }

                const [firstPoint, secondPoint] = pinchGesture.pointerIds.map(
                    (pointerId) =>
                        activeTouchPointersRef.current.get(pointerId),
                );
                const viewport = viewportRef.current;

                if (!viewport) return;

                const rect = viewport.getBoundingClientRect();
                const midpoint = getMidpoint(firstPoint, secondPoint);
                const localMidpoint = {
                    x: midpoint.x - rect.left,
                    y: midpoint.y - rect.top,
                };
                const nextZoom =
                    pinchGesture.startZoom *
                    (getDistance(firstPoint, secondPoint) /
                        pinchGesture.startDistance);
                const clampedZoom = Math.min(
                    MAX_ZOOM,
                    Math.max(MIN_ZOOM, nextZoom),
                );

                updateView(clampedZoom, {
                    x:
                        localMidpoint.x -
                        rect.width / 2 -
                        pinchGesture.contentPoint.x * clampedZoom,
                    y:
                        localMidpoint.y -
                        rect.height / 2 -
                        pinchGesture.contentPoint.y * clampedZoom,
                });
                return;
            }

            if (!lastPointerPositionRef.current) {
                lastPointerPositionRef.current = {
                    id: event.pointerId,
                    x: event.clientX,
                    y: event.clientY,
                };
                return;
            }

            const deltaX = event.clientX - lastPointerPositionRef.current.x;
            const deltaY = event.clientY - lastPointerPositionRef.current.y;

            lastPointerPositionRef.current = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
            };

            if (zoomRef.current > MIN_ZOOM) {
                setIsPanning(true);
                updateView(zoomRef.current, {
                    x: offsetRef.current.x + deltaX,
                    y: offsetRef.current.y + deltaY,
                });
            }

            return;
        }

        if (!isPanning || !lastPointerPositionRef.current) return;

        const deltaX = event.clientX - lastPointerPositionRef.current.x;
        const deltaY = event.clientY - lastPointerPositionRef.current.y;

        lastPointerPositionRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        updateView(zoomRef.current, {
            x: offsetRef.current.x + deltaX,
            y: offsetRef.current.y + deltaY,
        });
    };

    const stopPanning = (event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (event.pointerType === "touch") {
            activeTouchPointersRef.current.delete(event.pointerId);

            if (activeTouchPointersRef.current.size >= 2) {
                startPinchGesture();
                return;
            }

            pinchGestureRef.current = null;

            if (activeTouchPointersRef.current.size === 1) {
                const [remainingPoint] =
                    activeTouchPointersRef.current.values();

                lastPointerPositionRef.current = remainingPoint;
                setIsPanning(zoomRef.current > MIN_ZOOM);
                return;
            }

            lastPointerPositionRef.current = null;
            setIsPanning(false);
            return;
        }

        if (!isPanning) return;

        lastPointerPositionRef.current = null;
        setIsPanning(false);
    };

    return createPortal(
        <div
            className={[
                "about-panel-lightbox",
                galleryImages.length > 1 ? "has-navigation" : "",
                isClosing ? "is-closing" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeImage.alt} image preview`}
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
                    "--lightbox-image-inverse-aspect-ratio":
                        1 / imageAspectRatio,
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
                    <AnimatePresence
                        initial={false}
                        custom={navigationDirection}
                    >
                        <motion.div
                            className={[
                                "about-panel-lightbox-slide",
                                isImageLoaded ? "is-image-loaded" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            key={`${activeIndex}-${lightboxSrc}`}
                            custom={navigationDirection}
                            variants={
                                prefersReducedMotion ? undefined : slideVariants
                            }
                            initial={
                                prefersReducedMotion
                                    ? { opacity: 0, x: "0%" }
                                    : "enter"
                            }
                            animate={
                                prefersReducedMotion
                                    ? { opacity: 1, x: "0%" }
                                    : "center"
                            }
                            exit={
                                prefersReducedMotion
                                    ? { opacity: 0, x: "0%" }
                                    : "exit"
                            }
                            transition={{
                                duration: prefersReducedMotion ? 0.12 : 0.34,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
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
                                        alt={activeImage.alt}
                                        width={
                                            activeImage.lightboxWidth ??
                                            activeImage.width
                                        }
                                        height={
                                            activeImage.lightboxHeight ??
                                            activeImage.height
                                        }
                                        draggable="false"
                                        onLoad={(event) => {
                                            if (
                                                activeIndexRef.current !==
                                                activeIndex
                                            ) {
                                                return;
                                            }

                                            const {
                                                naturalWidth,
                                                naturalHeight,
                                            } = event.currentTarget;

                                            if (naturalWidth && naturalHeight) {
                                                setImageAspectRatio(
                                                    naturalWidth /
                                                        naturalHeight,
                                                );
                                            }

                                            setIsImageLoaded(true);
                                        }}
                                        onError={() => {
                                            if (
                                                activeIndexRef.current ===
                                                activeIndex
                                            ) {
                                                setHasImageError(true);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
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
            <ImageLightboxNavigation
                activeImageAlt={activeImage.alt}
                currentIndex={activeIndex}
                onNext={navigateNext}
                onPrevious={navigatePrevious}
                totalImages={galleryImages.length}
            />
        </div>,
        document.body,
    );
};

export default ImageLightbox;
