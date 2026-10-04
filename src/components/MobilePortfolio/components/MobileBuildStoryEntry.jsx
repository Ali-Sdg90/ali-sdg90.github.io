import { HiArrowRight } from "react-icons/hi2";

import MobileReveal from "./MobileReveal";

const MobileBuildStoryEntry = ({ onOpen }) => (
    <MobileReveal>
        <section
            className="mobile-build-entry"
            aria-labelledby="mobile-build-entry-title"
        >
            <h2 id="mobile-build-entry-title">
                Curious how my portfolio came together?
            </h2>
            <span>
                Walk through the sketches, experiments, rejected ideas, and
                details behind the shelf.
            </span>
            <button type="button" onClick={onOpen}>
                How my portfolio was built <HiArrowRight aria-hidden="true" />
            </button>
        </section>
    </MobileReveal>
);

export default MobileBuildStoryEntry;
