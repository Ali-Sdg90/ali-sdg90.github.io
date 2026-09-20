import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import LightboxImage from "../ui/LightboxImage";
import { APPLE_EASE } from "./motionConfig";

const GalleryMedia = ({
    chapter,
    isFirst,
    isLast,
    onNext,
    onPrevious,
    shouldAnimateContent,
}) => (
    <div className="build-gallery__media">
        <LightboxImage
            image={chapter.image}
            imageKey={chapter.id}
            buttonClassName="build-gallery__image-button"
        >
            <motion.img
                src={chapter.image.src}
                alt={chapter.image.alt}
                width={chapter.image.width}
                height={chapter.image.height}
                key={chapter.id}
                decoding="async"
                initial={
                    shouldAnimateContent ? { opacity: 0, scale: 1.025 } : false
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: APPLE_EASE }}
            />
        </LightboxImage>

        <button
            className="build-gallery__image-nav is-previous"
            type="button"
            aria-label="Previous item"
            disabled={isFirst}
            onClick={onPrevious}
        >
            <FaChevronLeft aria-hidden="true" />
        </button>
        <button
            className="build-gallery__image-nav is-next"
            type="button"
            aria-label="Next item"
            disabled={isLast}
            onClick={onNext}
        >
            <FaChevronRight aria-hidden="true" />
        </button>
    </div>
);

export default GalleryMedia;
