import { aboutData } from "../../../data/portfolio/aboutData";
import { NAV_ITEMS } from "../mobilePortfolioConfig";

const MobileHeader = ({
    activeSection,
    avatarMorphRef,
    isAvatarDocked,
    navigationRef,
    navigationTarget,
    navigationTargetRef,
    onNavigate,
}) => (
    <>
        <header className="mobile-nav" ref={navigationRef}>
            <a
                className={`mobile-nav-brand${isAvatarDocked ? " is-docked" : ""}`}
                href="#mobile-top"
                ref={navigationTargetRef}
                aria-label="Back to top"
                aria-hidden={!isAvatarDocked}
                tabIndex={isAvatarDocked ? 0 : -1}
                onClick={(event) => onNavigate(event, "mobile-top")}
            />

            <nav aria-label="Portfolio sections">
                {NAV_ITEMS.map((item) => (
                    <a
                        className={[
                            activeSection === item.id ? "is-active" : "",
                            navigationTarget === item.id
                                ? "is-navigation-target"
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        href={`#${item.id}`}
                        key={item.id}
                        aria-current={
                            activeSection === item.id ? "location" : undefined
                        }
                        onClick={(event) => onNavigate(event, item.id)}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>

        <div
            className="mobile-avatar-morph"
            ref={avatarMorphRef}
            aria-hidden="true"
        >
            <img src={aboutData.image.src} alt="" />
        </div>
    </>
);

export default MobileHeader;
