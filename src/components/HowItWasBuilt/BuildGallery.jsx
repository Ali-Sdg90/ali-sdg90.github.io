import { useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";

import GalleryInformation from "./GalleryInformation";
import GalleryMedia from "./GalleryMedia";
import ThumbnailRail from "./ThumbnailRail";
import useGalleryKeyboardNavigation from "./useGalleryKeyboardNavigation";

const BuildGallery = ({
    activeLanguage,
    chapters,
    isActive,
    onSelect,
    selectedIndex,
}) => {
    const prefersReducedMotion = useReducedMotion();
    const [hasInteracted, setHasInteracted] = useState(false);
    const shouldAnimateContent = hasInteracted && !prefersReducedMotion;
    const chapter = chapters[selectedIndex];
    const isFirst = selectedIndex === 0;
    const isLast = selectedIndex === chapters.length - 1;
    const handleSelect = useCallback(
        (index) => {
            setHasInteracted(true);
            onSelect(index);
        },
        [onSelect],
    );
    const selectPrevious = useCallback(
        () => handleSelect(selectedIndex - 1),
        [handleSelect, selectedIndex],
    );
    const selectNext = useCallback(
        () => handleSelect(selectedIndex + 1),
        [handleSelect, selectedIndex],
    );

    useGalleryKeyboardNavigation({
        isActive,
        isFirst,
        isLast,
        onNext: selectNext,
        onPrevious: selectPrevious,
    });

    return (
        <section
            className="build-gallery"
            aria-label="Portfolio build gallery"
            style={{ "--gallery-accent": chapter.accent }}
        >
            <div className="build-gallery__card">
                <div className="build-gallery__media-column">
                    <GalleryMedia
                        shouldAnimateContent={shouldAnimateContent}
                        chapter={chapter}
                        isFirst={isFirst}
                        isLast={isLast}
                        onNext={selectNext}
                        onPrevious={selectPrevious}
                    />
                    <div>
                        <ThumbnailRail
                            chapters={chapters}
                            selectedIndex={selectedIndex}
                            onSelect={handleSelect}
                        />
                    </div>
                </div>
                <GalleryInformation
                    activeLanguage={activeLanguage}
                    chapter={chapter}
                    shouldAnimateContent={shouldAnimateContent}
                    selectedIndex={selectedIndex}
                    total={chapters.length}
                />
            </div>
        </section>
    );
};

export default BuildGallery;
