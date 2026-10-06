import { aboutData } from "../../../data/portfolio/aboutData";
import {
    contactLinkItems,
    locationItem,
    RESUME_URL,
    socialLinkItems,
} from "../mobilePortfolioConfig";

const LocationIcon = locationItem?.icon;

const MobileHero = ({ avatarRef, onAboutOpen }) => (
    <section className="mobile-hero" aria-labelledby="mobile-hero-title">
        <div className="mobile-hero-glow" aria-hidden="true" />

        <div className="mobile-hero-introduction">
            <div className="mobile-hero-heading">
                <p className="mobile-hero-kicker" aria-label="Hey there!">
                    <span>Hey there!</span>
                    <span
                        className="mobile-hero-greeting-hand"
                        aria-hidden="true"
                    >
                        {"\u{1F44B}"}
                    </span>
                </p>
                <h1 id="mobile-hero-title">
                    I&apos;m <em>Ali</em>
                    <br />
                    Sadeghi
                </h1>
            </div>
            <div className="mobile-hero-avatar" ref={avatarRef}>
                <img
                    src={aboutData.image.src}
                    alt={aboutData.image.alt}
                    width={aboutData.image.width}
                    height={aboutData.image.height}
                />
            </div>
        </div>

        <p className="mobile-hero-role">Software Engineer</p>
        <p className="mobile-hero-copy">
            <span>
                I love building polished software, useful tools, <br /> and
                reliable systems.
            </span>
            <span>
                Crafted with care, curiosity, and{" "}
                <a
                    href="https://youtu.be/8TycTsfTcY8"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    a splash of love.
                </a>
            </span>
        </p>

        <div className="mobile-hero-actions">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                View resume
            </a>
            <button type="button" onClick={onAboutOpen}>
                About me
            </button>
        </div>

        <div className="mobile-hero-contact">
            {locationItem && LocationIcon && (
                <a
                    className="mobile-hero-location-link"
                    href={locationItem.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    <LocationIcon aria-hidden="true" />
                    <span>{locationItem.label}</span>
                </a>
            )}
            <div className="mobile-hero-links">
                <div
                    className="mobile-hero-link-group"
                    role="group"
                    aria-label="Contact links"
                >
                    <span>Connect</span>
                    <div>
                        {contactLinkItems.map(
                            ({ id, icon: Icon, label, href }) => (
                                <a
                                    href={href}
                                    key={id}
                                    aria-label={label}
                                    title={label}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            ),
                        )}
                    </div>
                </div>
                <div
                    className="mobile-hero-link-group"
                    role="group"
                    aria-label="Social links"
                >
                    <span>Socials</span>
                    <div>
                        {socialLinkItems.map(
                            ({ id, icon: Icon, label, href }) => (
                                <a
                                    href={href}
                                    key={id}
                                    aria-label={label}
                                    title={label}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default MobileHero;
