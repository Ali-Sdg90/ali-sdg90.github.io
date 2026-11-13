import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageLightboxNavigation = ({
    activeImageAlt,
    currentIndex,
    onNext,
    onPrevious,
    totalImages,
}) => {
    if (totalImages <= 1) return null;

    const canNavigatePrevious = currentIndex > 0;
    const canNavigateNext = currentIndex < totalImages - 1;

    return (
        <nav
            className="about-panel-lightbox-navigation-layer"
            aria-label="Image navigation"
            onClick={(event) => event.stopPropagation()}
        >
            <button
                className="about-panel-lightbox-navigation is-previous"
                type="button"
                aria-label="Previous image"
                title="Previous image"
                disabled={!canNavigatePrevious}
                onClick={onPrevious}
            >
                <FaChevronLeft aria-hidden="true" />
            </button>
            <button
                className="about-panel-lightbox-navigation is-next"
                type="button"
                aria-label="Next image"
                title="Next image"
                disabled={!canNavigateNext}
                onClick={onNext}
            >
                <FaChevronRight aria-hidden="true" />
            </button>
            <span
                className="about-panel-lightbox-announcement"
                aria-live="polite"
            >
                Image {currentIndex + 1} of {totalImages}: {activeImageAlt}
            </span>
        </nav>
    );
};

export default ImageLightboxNavigation;
