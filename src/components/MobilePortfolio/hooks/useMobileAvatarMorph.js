import { useEffect, useState } from "react";

const NAVIGATION_PROPERTIES = [
    "--mobile-avatar-progress",
    "--mobile-nav-avatar-space",
    "--mobile-nav-github-space",
    "--mobile-nav-github-width",
    "--mobile-nav-github-gap",
    "--mobile-nav-github-label-width",
    "--mobile-nav-github-label-opacity",
    "--mobile-nav-github-label-shift",
];

const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);

const interpolate = (start, end, progress) => start + (end - start) * progress;

const clearNavigationProgress = (navigation) => {
    NAVIGATION_PROPERTIES.forEach((property) =>
        navigation.style.removeProperty(property),
    );
};

const setNavigationProgress = (navigation, progress) => {
    navigation.style.setProperty(
        "--mobile-avatar-progress",
        progress.toFixed(4),
    );
    navigation.style.setProperty(
        "--mobile-nav-avatar-space",
        `${interpolate(0, 3.4, progress)}rem`,
    );
    navigation.style.setProperty(
        "--mobile-nav-github-space",
        `${interpolate(7.45, 3.2, progress)}rem`,
    );
    navigation.style.setProperty(
        "--mobile-nav-github-width",
        `${interpolate(6.8, 2.5, progress)}rem`,
    );
    navigation.style.setProperty(
        "--mobile-nav-github-gap",
        `${interpolate(0.45, 0, progress)}rem`,
    );
    navigation.style.setProperty(
        "--mobile-nav-github-label-width",
        `${interpolate(4.2, 0, progress)}rem`,
    );
    navigation.style.setProperty(
        "--mobile-nav-github-label-opacity",
        (1 - progress).toFixed(4),
    );
    navigation.style.setProperty(
        "--mobile-nav-github-label-shift",
        `${interpolate(0, 0.25, progress)}rem`,
    );
};

const setAvatarProgress = (avatar, source, target, progress) => {
    const sourceBounds = source.getBoundingClientRect();
    const targetBounds = target.getBoundingClientRect();
    const left = interpolate(sourceBounds.left, targetBounds.left, progress);
    const top = interpolate(sourceBounds.top, targetBounds.top, progress);
    const size = interpolate(sourceBounds.width, targetBounds.width, progress);
    const sourceRadius =
        Number.parseFloat(
            window.getComputedStyle(source).borderTopLeftRadius,
        ) || sourceBounds.width * 0.2;
    const radius = interpolate(sourceRadius, targetBounds.width / 2, progress);

    avatar.style.width = `${size}px`;
    avatar.style.height = `${size}px`;
    avatar.style.borderRadius = `${radius}px`;
    avatar.style.borderColor = `rgba(108, 188, 255, ${interpolate(0, 0.38, progress)})`;
    avatar.style.boxShadow = `0 ${interpolate(13.6, 7.2, progress)}px ${interpolate(32, 19.2, progress)}px rgba(0, 0, 0, ${interpolate(0.3, 0.24, progress)}), 0 0 0 ${interpolate(0, 2.9, progress)}px rgba(22, 136, 255, ${interpolate(0, 0.12, progress)})`;
    avatar.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    avatar.style.setProperty(
        "--mobile-avatar-image-scale",
        interpolate(1.13, 1.05, progress).toFixed(3),
    );
};

const useMobileAvatarMorph = ({
    avatarMorphRef,
    heroAvatarRef,
    navigationRef,
    navigationTargetRef,
    view,
}) => {
    const [isAvatarDocked, setIsAvatarDocked] = useState(false);

    useEffect(() => {
        if (view === "build-story") return undefined;

        const avatar = avatarMorphRef.current;
        const source = heroAvatarRef.current;
        const target = navigationTargetRef.current;
        const navigation = navigationRef.current;

        if (!avatar || !source || !target || !navigation) return undefined;

        const mobileViewport = window.matchMedia("(max-width: 899px)");
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        let animationFrame;

        const updateAvatar = () => {
            if (!mobileViewport.matches) {
                avatar.classList.remove("is-ready");
                source.classList.remove("has-morph");
                clearNavigationProgress(navigation);
                setIsAvatarDocked(false);
                return;
            }

            const sourceBounds = source.getBoundingClientRect();
            const targetBounds = target.getBoundingClientRect();

            if (!sourceBounds.width || !targetBounds.width) return;

            const scrollPosition = Math.max(window.scrollY, 0);
            const sourceDocumentTop = sourceBounds.top + scrollPosition;
            const transitionStart = 8;
            const transitionEnd = Math.max(
                transitionStart + 120,
                sourceDocumentTop +
                    sourceBounds.height * 0.75 -
                    targetBounds.top,
            );
            const rawProgress = clamp(
                (scrollPosition - transitionStart) /
                    (transitionEnd - transitionStart),
                0,
                1,
            );
            const progress = reducedMotion.matches
                ? Number(rawProgress >= 0.5)
                : rawProgress * rawProgress * (3 - 2 * rawProgress);

            setAvatarProgress(avatar, source, target, progress);
            setNavigationProgress(navigation, progress);
            setIsAvatarDocked((currentValue) => {
                const nextValue = progress >= 0.8;
                return currentValue === nextValue ? currentValue : nextValue;
            });

            avatar.classList.add("is-ready");
            source.classList.add("has-morph");
        };

        const requestAvatarUpdate = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(updateAvatar);
        };

        requestAvatarUpdate();
        window.addEventListener("scroll", requestAvatarUpdate, {
            passive: true,
        });
        window.addEventListener("resize", requestAvatarUpdate);
        reducedMotion.addEventListener?.("change", requestAvatarUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("scroll", requestAvatarUpdate);
            window.removeEventListener("resize", requestAvatarUpdate);
            reducedMotion.removeEventListener?.("change", requestAvatarUpdate);
            source.classList.remove("has-morph");
            clearNavigationProgress(navigation);
        };
    }, [
        avatarMorphRef,
        heroAvatarRef,
        navigationRef,
        navigationTargetRef,
        view,
    ]);

    return isAvatarDocked;
};

export default useMobileAvatarMorph;
