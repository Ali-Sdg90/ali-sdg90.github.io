import { HiOutlineSparkles } from "react-icons/hi2";

import desktopPreview from "../../../assets/images/global/desktop-preview.jpg";
import MobileReveal from "./MobileReveal";

const MobileDesktopPreview = () => (
    <MobileReveal className="mobile-desktop-preview-wrap">
        <section
            className="mobile-desktop-preview"
            aria-labelledby="desktop-preview-title"
        >
            <div className="mobile-desktop-preview-copy">
                <p>
                    <HiOutlineSparkles aria-hidden="true" /> Desktop-first
                    portfolio
                </p>
                <h2 id="desktop-preview-title">Best experienced on desktop</h2>
                <span>
                    A larger screen unlocks the interactive shelf, richer
                    motion, and the full project experience.
                </span>
            </div>
            <div className="mobile-desktop-preview-frame">
                <img
                    src={desktopPreview}
                    alt="Preview of Ali's original desktop portfolio experience"
                    width="1919"
                    height="904"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    </MobileReveal>
);

export default MobileDesktopPreview;
