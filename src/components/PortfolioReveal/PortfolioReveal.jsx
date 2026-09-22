import { flushSync } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import HowItWasBuilt from "../HowItWasBuilt";
import { trackUmamiEvent } from "../../utils/analytics";
import { getPageTurnGeometry, pointOnCubicPath } from "./pageTurnGeometry";

const DEFAULT_FOLD = 28;
const HOVER_FOLD = 72;
const HOVER_DURATION_MS = 340;
const PEEL_DURATION_MS = 1380;
const RETURN_DURATION_MS = 1380;
const ONBOARDING_DELAY_MS = 10_000;
const ONBOARDING_REPEAT_DELAY_MS = 8_000;
const ONBOARDING_DURATION_MS = 2500;

const easeInOutCubic = (value) =>
    value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

const easeOutCubic = (value) => 1 - (1 - value) ** 3;

const PortfolioReveal = ({ children }) => {
    const turnRef = useRef(null);
    const topRef = useRef(null);
    const underRef = useRef(null);
    const backRef = useRef(null);
    const creaseRef = useRef(null);
    const returnButtonRef = useRef(null);
    const triggerRef = useRef(null);
    const buildStoryRef = useRef(null);
    const animationFrameRef = useRef(null);
    const foldAnimationFrameRef = useRef(null);
    const onboardingDelayRef = useRef(null);
    const onboardingEndRef = useRef(null);
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const hasInteractedRef = useRef(false);
    const isAnimatingRef = useRef(false);
    const isOpenRef = useRef(false);
    const progressRef = useRef(0);
    const foldRef = useRef(DEFAULT_FOLD);
    const pathStartFoldRef = useRef(DEFAULT_FOLD);
    const pathModeRef = useRef("open");
    const [isOpen, setIsOpen] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(false);
    const [hasOpenedBuildStory, setHasOpenedBuildStory] = useState(false);

    const renderPosition = useCallback((position, clipTop = true) => {
        const { width, height } = dimensionsRef.current;
        if (!width || !height) return;

        const geometry = getPageTurnGeometry(width, height, position);
        topRef.current.style.clipPath = clipTop ? geometry.topClip : "none";
        underRef.current.style.clipPath = clipTop
            ? "polygon(0 0, 0 0, 0 0)"
            : geometry.underClip;
        backRef.current.style.clipPath = geometry.backClip;
        backRef.current.style.transform = geometry.backTransform;
        creaseRef.current.style.height = `${geometry.creaseLength}px`;
        creaseRef.current.style.transform =
            `translate(${geometry.creaseX}px, ${geometry.creaseY}px) ` +
            `rotate(${geometry.creaseAngle}deg) translate(-120%, -50%)`;
    }, []);

    const renderProgress = useCallback(
        (progress) => {
            const { width, height } = dimensionsRef.current;
            if (!width || !height) return;

            const points =
                pathModeRef.current === "return"
                    ? [
                          { x: -width * 1.15, y: -height * 1.15 },
                          { x: -width * 0.28, y: -height * 0.3 },
                          { x: width * 0.62, y: height * 0.65 },
                          {
                              x: width - DEFAULT_FOLD,
                              y: height - DEFAULT_FOLD,
                          },
                      ]
                    : [
                          {
                              x: width - pathStartFoldRef.current,
                              y: height - pathStartFoldRef.current,
                          },
                          { x: width * 0.66, y: height * 0.68 },
                          { x: -width * 0.08, y: -height * 0.04 },
                          { x: -width * 1.15, y: -height * 1.15 },
                      ];

            renderPosition(pointOnCubicPath(points, progress));
            progressRef.current = progress;
        },
        [renderPosition],
    );

    const animateFoldTo = useCallback(
        (targetDistance) => {
            if (isAnimatingRef.current || isOpenRef.current) return;

            cancelAnimationFrame(foldAnimationFrameRef.current);
            const startDistance = foldRef.current;
            const startTime = performance.now();

            const tick = (now) => {
                if (isAnimatingRef.current || isOpenRef.current) return;

                const elapsed = Math.min(
                    (now - startTime) / HOVER_DURATION_MS,
                    1,
                );
                const distance =
                    startDistance +
                    (targetDistance - startDistance) * easeOutCubic(elapsed);
                const { width, height } = dimensionsRef.current;

                foldRef.current = distance;
                renderPosition(
                    { x: width - distance, y: height - distance },
                    Math.abs(distance - DEFAULT_FOLD) > 0.1,
                );

                if (elapsed < 1) {
                    foldAnimationFrameRef.current = requestAnimationFrame(tick);
                } else {
                    foldAnimationFrameRef.current = null;
                }
            };

            foldAnimationFrameRef.current = requestAnimationFrame(tick);
        },
        [renderPosition],
    );

    const registerInteraction = useCallback(() => {
        if (hasInteractedRef.current) return;

        hasInteractedRef.current = true;
        clearTimeout(onboardingDelayRef.current);
        clearTimeout(onboardingEndRef.current);
        setIsOnboarding(false);
    }, []);

    const beginTurn = useCallback(() => {
        cancelAnimationFrame(foldAnimationFrameRef.current);
        isAnimatingRef.current = true;
    }, []);

    const finishTurn = useCallback(() => {
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
    }, []);

    const openPage = useCallback(() => {
        if (isOpenRef.current || isAnimatingRef.current) return;

        trackUmamiEvent("build_story_open", { entry_point: "page_peel" });
        // Mount the underneath page before the first visible turn frame.
        if (!hasOpenedBuildStory) flushSync(() => setHasOpenedBuildStory(true));
        setIsReturning(false);
        buildStoryRef.current?.scrollTo({ top: 0 });
        triggerRef.current.hidden = true;
        pathModeRef.current = "open";
        pathStartFoldRef.current = foldRef.current;
        renderProgress(0);

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reducedMotion) {
            renderProgress(1);
            isOpenRef.current = true;
            setIsOpen(true);
            requestAnimationFrame(() => returnButtonRef.current?.focus());
            return;
        }

        beginTurn();
        const startTime = performance.now();
        const tick = (now) => {
            const elapsed = Math.min((now - startTime) / PEEL_DURATION_MS, 1);
            renderProgress(easeInOutCubic(elapsed));

            if (elapsed < 1) {
                animationFrameRef.current = requestAnimationFrame(tick);
                return;
            }

            finishTurn();
            isOpenRef.current = true;
            setIsOpen(true);
            returnButtonRef.current?.focus();
        };
        animationFrameRef.current = requestAnimationFrame(tick);
    }, [beginTurn, finishTurn, hasOpenedBuildStory, renderProgress]);

    const closePage = useCallback(() => {
        if (!isOpenRef.current || isAnimatingRef.current) return;

        setIsReturning(true);
        cancelAnimationFrame(foldAnimationFrameRef.current);

        const finishClose = () => {
            finishTurn();
            isOpenRef.current = false;
            foldRef.current = DEFAULT_FOLD;
            pathStartFoldRef.current = DEFAULT_FOLD;
            pathModeRef.current = "open";
            renderProgress(0);
            const { width, height } = dimensionsRef.current;
            renderPosition(
                { x: width - DEFAULT_FOLD, y: height - DEFAULT_FOLD },
                false,
            );
            setIsOpen(false);
            setIsReturning(false);
            buildStoryRef.current?.scrollTo({ top: 0 });
            triggerRef.current.hidden = false;
            requestAnimationFrame(() => triggerRef.current?.focus());
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finishClose();
            return;
        }

        pathModeRef.current = "return";
        renderProgress(0);
        beginTurn();
        const startTime = performance.now();
        const tick = (now) => {
            const elapsed = Math.min((now - startTime) / RETURN_DURATION_MS, 1);
            renderProgress(easeOutCubic(elapsed));

            if (elapsed < 1) {
                animationFrameRef.current = requestAnimationFrame(tick);
                return;
            }

            finishClose();
        };
        animationFrameRef.current = requestAnimationFrame(tick);
    }, [beginTurn, finishTurn, renderPosition, renderProgress]);

    useEffect(() => {
        const element = turnRef.current;
        if (!element) return undefined;

        const updateDimensions = () => {
            const width = element.clientWidth;
            const height = element.clientHeight;
            if (
                width === dimensionsRef.current.width &&
                height === dimensionsRef.current.height
            ) {
                return;
            }

            dimensionsRef.current = { width, height };
            if (isOpenRef.current) {
                renderProgress(1);
            } else if (
                pathModeRef.current === "open" &&
                !isAnimatingRef.current
            ) {
                renderPosition(
                    { x: width - foldRef.current, y: height - foldRef.current },
                    Math.abs(foldRef.current - DEFAULT_FOLD) > 0.1,
                );
            } else {
                renderProgress(progressRef.current);
            }
        };

        updateDimensions();
        let resizeFrame;
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(updateDimensions);
        });
        resizeObserver.observe(element);

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            cancelAnimationFrame(foldAnimationFrameRef.current);
            cancelAnimationFrame(resizeFrame);
            resizeObserver.disconnect();
        };
    }, [renderPosition, renderProgress]);

    useEffect(() => {
        if (hasOpenedBuildStory) return undefined;
        if (window.matchMedia("(max-width: 899px)").matches) return undefined;

        // Prepare the journal during idle time so its first render cannot flash
        // into view halfway through an interaction.
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(
                () => setHasOpenedBuildStory(true),
                { timeout: 4000 },
            );
            return () => window.cancelIdleCallback(id);
        }

        const id = window.setTimeout(() => setHasOpenedBuildStory(true), 2000);
        return () => clearTimeout(id);
    }, [hasOpenedBuildStory]);

    useEffect(() => {
        let isDisposed = false;

        const scheduleOnboarding = (delay = ONBOARDING_DELAY_MS) => {
            onboardingDelayRef.current = window.setTimeout(() => {
                if (
                    isDisposed ||
                    hasInteractedRef.current ||
                    isOpenRef.current
                ) {
                    return;
                }

                setIsOnboarding(true);
                animateFoldTo(HOVER_FOLD);
                onboardingEndRef.current = window.setTimeout(() => {
                    if (
                        isDisposed ||
                        hasInteractedRef.current ||
                        isOpenRef.current
                    ) {
                        return;
                    }

                    setIsOnboarding(false);
                    animateFoldTo(DEFAULT_FOLD);
                    scheduleOnboarding(ONBOARDING_REPEAT_DELAY_MS);
                }, ONBOARDING_DURATION_MS);
            }, delay);
        };

        scheduleOnboarding();
        return () => {
            isDisposed = true;
            clearTimeout(onboardingDelayRef.current);
            clearTimeout(onboardingEndRef.current);
        };
    }, [animateFoldTo]);

    const isStoryActive = isOpen && !isReturning;

    return (
        <div className={`page-turn-shell${isOpen ? " is-open" : ""}`}>
            <div className="page-turn" ref={turnRef}>
                <div
                    className="page-turn-bottom"
                    aria-hidden={!isStoryActive}
                    inert={isStoryActive ? undefined : true}
                >
                    {hasOpenedBuildStory && (
                        <HowItWasBuilt
                            ref={buildStoryRef}
                            isActive={isStoryActive}
                            returnButtonRef={returnButtonRef}
                            onReturn={closePage}
                        />
                    )}
                </div>
                <div
                    className="page-turn-top"
                    ref={topRef}
                    aria-hidden={isOpen}
                    inert={isOpen ? true : undefined}
                >
                    <div className="page-turn-content">{children}</div>
                </div>
                <div
                    className="page-turn-underfold"
                    ref={underRef}
                    aria-hidden="true"
                />
                <div
                    className="page-turn-back"
                    ref={backRef}
                    aria-hidden="true"
                />
                <div
                    className="page-turn-crease-line"
                    ref={creaseRef}
                    aria-hidden="true"
                />
            </div>

            <button
                className={`page-turn-trigger${isOnboarding ? " is-onboarding" : ""}`}
                type="button"
                ref={triggerRef}
                aria-label="Reveal how this portfolio was built"
                aria-expanded={isOpen}
                onPointerEnter={() => {
                    registerInteraction();
                    animateFoldTo(HOVER_FOLD);
                }}
                onPointerLeave={() => animateFoldTo(DEFAULT_FOLD)}
                onClick={() => {
                    registerInteraction();
                    openPage();
                }}
            >
                <span className="page-turn-trigger__hint">
                    See how my portfolio was built
                </span>
            </button>
        </div>
    );
};

export default PortfolioReveal;
