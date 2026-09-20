import { motion } from "framer-motion";

import { APPLE_EASE } from "./motionConfig";

const formatCount = (count) => String(count).padStart(2, "0");

const GalleryInformation = ({
    activeLanguage,
    chapter,
    shouldAnimateContent,
    selectedIndex,
    total,
}) => {
    const isFarsi = activeLanguage === "fa";
    const copy = chapter.translations[activeLanguage];

    return (
        <motion.div
            className={`build-gallery__information${isFarsi ? " is-farsi is-farsi-text" : ""}`}
            key={`${chapter.id}-${activeLanguage}`}
            initial={shouldAnimateContent ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            dir={isFarsi ? "rtl" : "ltr"}
        >
            <span className="build-gallery__accent" aria-hidden="true" />
            <p className="build-gallery__count" dir="ltr">
                <strong>{formatCount(selectedIndex + 1)}</strong>
                <span> / {formatCount(total)}</span>
            </p>
            <h2>{copy.title}</h2>
            <p className="build-gallery__description">{copy.description}</p>
        </motion.div>
    );
};

export default GalleryInformation;
