import { useEffect, useRef } from "react";

import useThumbnailMomentum from "./useThumbnailMomentum";

const ThumbnailRail = ({
    chapters,
    onSelect,
    selectedIndex,
    shouldLoadImages,
}) => {
    const thumbnailRefs = useRef([]);
    const {
        railRef,
        suppressClickRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerEnd,
        stopMomentum,
    } = useThumbnailMomentum();

    useEffect(() => {
        stopMomentum();
        const rail = railRef.current;
        const thumbnail = thumbnailRefs.current[selectedIndex];

        if (!rail || !thumbnail) return;

        const centeredPosition =
            thumbnail.offsetLeft -
            (rail.clientWidth - thumbnail.offsetWidth) / 2;
        const maximumPosition = rail.scrollWidth - rail.clientWidth;

        rail.scrollTo({
            left: Math.max(0, Math.min(centeredPosition, maximumPosition)),
            behavior: "smooth",
        });
    }, [railRef, selectedIndex, stopMomentum]);

    return (
        <div
            className="build-gallery__thumbnail-rail"
            ref={railRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
        >
            {chapters.map((chapter, index) => (
                <button
                    className={`build-gallery__thumbnail${selectedIndex === index ? " is-active" : ""}`}
                    type="button"
                    aria-label={`Show item ${index + 1}`}
                    aria-pressed={selectedIndex === index}
                    key={chapter.id}
                    ref={(element) => {
                        thumbnailRefs.current[index] = element;
                    }}
                    onClick={() => {
                        if (!suppressClickRef.current) onSelect(index);
                    }}
                >
                    {shouldLoadImages ? (
                        <img
                            src={chapter.image.src}
                            alt=""
                            width={chapter.image.width}
                            height={chapter.image.height}
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                        />
                    ) : null}
                </button>
            ))}
        </div>
    );
};

export default ThumbnailRail;
