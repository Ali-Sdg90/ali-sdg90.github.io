import { useEffect, useRef, useState } from "react";
import { HiSparkles } from "react-icons/hi2";

const ONBOARDING_EXIT_DURATION_MS = 760;

const PortfolioOnboarding = ({ isOpen, onDismiss }) => {
    const dismissButtonRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!isOpen) return undefined;

        const focusFrame = window.requestAnimationFrame(() => {
            dismissButtonRef.current?.focus({ preventScroll: true });
        });

        return () => window.cancelAnimationFrame(focusFrame);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) return undefined;

        const unmountTimer = window.setTimeout(
            () => setShouldRender(false),
            ONBOARDING_EXIT_DURATION_MS,
        );

        return () => window.clearTimeout(unmountTimer);
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <section
            className={[
                "portfolio-onboarding",
                isOpen ? "is-open" : "is-dismissed",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-onboarding-title"
            aria-hidden={!isOpen}
            inert={!isOpen}
        >
            <header className="portfolio-onboarding__header">
                <span
                    className="portfolio-onboarding__header-line"
                    aria-hidden="true"
                />
                <HiSparkles
                    className="portfolio-onboarding__header-icon"
                    aria-hidden="true"
                />
                <h2 id="portfolio-onboarding-title">Quick tour</h2>
                <span
                    className="portfolio-onboarding__header-line"
                    aria-hidden="true"
                />
            </header>

            <div className="portfolio-onboarding__target portfolio-onboarding__target--shelf">
                <article className="portfolio-onboarding__tip">
                    <span className="portfolio-onboarding__number">1</span>
                    <div className="portfolio-onboarding__tip-copy">
                        <h3>Choose a card</h3>
                        <p>
                            Select any project or section card to open its
                            details and explore the work behind it.
                        </p>
                    </div>
                </article>
            </div>

            <div className="portfolio-onboarding__target portfolio-onboarding__target--about">
                <article className="portfolio-onboarding__tip">
                    <span className="portfolio-onboarding__number">2</span>
                    <div className="portfolio-onboarding__tip-copy">
                        <h3>See details here</h3>
                        <p>
                            The selected card or a short introduction about me
                            appears in this panel. Use the side handle to expand
                            it.
                        </p>
                    </div>
                </article>
            </div>

            <button
                className="portfolio-onboarding__dismiss"
                type="button"
                disabled={!isOpen}
                ref={dismissButtonRef}
                onClick={onDismiss}
            >
                Got it
            </button>
        </section>
    );
};

export default PortfolioOnboarding;
