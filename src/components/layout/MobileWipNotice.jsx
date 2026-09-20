import { FaGithub } from "react-icons/fa";
import { HiArrowDownTray, HiArrowUpRight } from "react-icons/hi2";

import { version as appVersion } from "../../../package.json";
import mobileWipArtwork from "../../assets/images/global/bgg-2.png";
import { PROJECT_REPOSITORY_URL } from "../UnderConstructionBadge/constants";

const MobileWipNotice = () => (
    <main className="mobile-wip" aria-labelledby="mobile-wip-title">
        <div className="mobile-wip-content">
            <header className="mobile-wip-header">
                <p className="mobile-wip-eyebrow">
                    <span aria-hidden="true" />
                    Mobile version in progress
                </p>

                <span className="mobile-wip-version">
                    Latest&nbsp;·&nbsp;v{appVersion}
                </span>
            </header>

            <div className="mobile-wip-artwork" aria-hidden="true">
                <span className="mobile-wip-artwork__halo" />
                <img src={mobileWipArtwork} alt="" />
            </div>

            <section className="mobile-wip-message">
                <h1 id="mobile-wip-title">
                    The mobile experience is still cooking.
                </h1>
                <p>
                    <strong>
                        I’m working on a mobile experience that does the desktop
                        version justice. For now, the full portfolio is best
                        viewed on a larger screen.
                    </strong>
                </p>
            </section>

            <div className="mobile-wip-actions">
                <a
                    className="mobile-wip-action"
                    href={PROJECT_REPOSITORY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub aria-hidden="true" />
                    <span>View project on GitHub</span>
                    <HiArrowUpRight aria-hidden="true" />
                </a>

                <a
                    className="mobile-wip-action"
                    href="/resume/ali-sadeghi-resume-en.pdf"
                    download="Ali-Sadeghi-Resume.pdf"
                >
                    <HiArrowDownTray aria-hidden="true" />
                    <span>Download my resume</span>
                    <HiArrowUpRight aria-hidden="true" />
                </a>
            </div>
        </div>
    </main>
);

export default MobileWipNotice;
