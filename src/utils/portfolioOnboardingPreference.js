const PORTFOLIO_ONBOARDING_DISMISSED_KEY = "portfolio-onboarding-dismissed";

export const shouldShowPortfolioOnboarding = () => {
    if (typeof window === "undefined") return true;

    try {
        return (
            window.localStorage.getItem(PORTFOLIO_ONBOARDING_DISMISSED_KEY) !==
            "true"
        );
    } catch {
        return true;
    }
};

export const rememberPortfolioOnboardingDismissal = () => {
    try {
        window.localStorage.setItem(PORTFOLIO_ONBOARDING_DISMISSED_KEY, "true");
    } catch {
        // Dismissing the tour should still work when browser storage is blocked.
    }
};
