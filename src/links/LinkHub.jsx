import { HiArrowUpRight } from "react-icons/hi2";

import portfolioPreview from "../assets/images/site/readme-preview.webp";
import emojiSignature from "../assets/images/ui/emoji-signature.webp";
import DynamicBackground from "../components/layout/DynamicBackground";
import { aboutData } from "../data/portfolio/aboutData";
import { contactItems, socialItems } from "../data/portfolio/profileLinks";
import { trackUmamiEvent } from "../utils/analytics";

const portfolioHref = import.meta.env.BASE_URL;
const visibleProfileIds = [
    "github",
    "linkedin",
    "x",
    "telegram",
    "youtube",
    "instagram",
    "spotify",
    "email",
];
const profileLabels = {
    github: "GitHub",
    linkedin: "LinkedIn",
    x: "X / Twitter",
    telegram: "Telegram",
    youtube: "YouTube",
    instagram: "Instagram",
    spotify: "Spotify",
    email: "Email",
};

const profileItems = [...contactItems, ...socialItems];
const locationItem = profileItems.find((item) => item.id === "location");
const linkHubProfiles = visibleProfileIds.map((id) => {
    const profile = profileItems.find((item) => item.id === id);

    return {
        ...profile,
        label: profileLabels[id],
    };
});

const trackLink = (destination) => {
    trackUmamiEvent("link_hub_click", { destination });
};

const LinkHub = () => {
    const LocationIcon = locationItem.icon;

    return (
        <main className="link-hub-page">
            <DynamicBackground />

            <section className="link-hub-card" aria-labelledby="link-hub-title">
                <header className="link-hub-profile">
                    <div className="link-hub-avatar">
                        <div className="link-hub-avatar-crop">
                            <img
                                src={aboutData.image.src}
                                alt="Portrait of Ali Sadeghi"
                                width={aboutData.image.width}
                                height={aboutData.image.height}
                                fetchPriority="high"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 id="link-hub-title">Ali Sadeghi</h1>
                        <p className="link-hub-role">Software Engineer</p>
                        <p className="link-hub-location">
                            <LocationIcon aria-hidden="true" />
                            {locationItem.label}
                        </p>
                    </div>
                </header>

                <p className="link-hub-intro">
                    I love building polished software, useful tools, and
                    reliable systems. Crafted with care, curiosity, and{" "}
                    <a
                        href="https://youtu.be/8TycTsfTcY8"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open the hidden splash of love video on YouTube"
                        onClick={() => trackLink("splash_of_love")}
                    >
                        a splash of love.
                    </a>
                </p>

                <nav
                    className="link-hub-links"
                    aria-label="Profile and contact links"
                >
                    {linkHubProfiles.map(({ id, icon: Icon, label, href }) => (
                        <a
                            href={href}
                            key={id}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open Ali Sadeghi's ${label}`}
                            onClick={() => trackLink(id)}
                        >
                            <span>
                                <Icon aria-hidden="true" />
                                <strong>{label}</strong>
                            </span>
                            <HiArrowUpRight aria-hidden="true" />
                        </a>
                    ))}
                </nav>

                <a
                    className="link-hub-portfolio"
                    href={portfolioHref}
                    aria-label="Explore Ali Sadeghi's portfolio"
                    onClick={() => trackLink("portfolio")}
                >
                    <img
                        src={portfolioPreview}
                        alt="Preview of Ali Sadeghi's interactive portfolio"
                        width="1919"
                        height="908"
                        fetchPriority="high"
                    />
                    <span className="link-hub-portfolio-copy">
                        <span>
                            <strong>Explore My Portfolio</strong>
                            <small>
                                Projects, experiences &amp; things I've built.
                            </small>
                        </span>
                        <HiArrowUpRight aria-hidden="true" />
                    </span>
                </a>

                <footer>
                    <span>Build with care</span>
                    <img
                        src={emojiSignature}
                        alt=""
                        width="1024"
                        height="1024"
                        aria-hidden="true"
                    />
                </footer>
            </section>
        </main>
    );
};

export default LinkHub;
