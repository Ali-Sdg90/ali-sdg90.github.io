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
                    <HiOutlineSparkles aria-hidden="true" /> Desktop portfolio
                </p>
                <h2 id="desktop-preview-title">The original experience</h2>
                <span>Explore the interactive shelf on a larger screen.</span>
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
