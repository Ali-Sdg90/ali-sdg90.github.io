import { beforeEach, describe, expect, test, vi } from "vitest";

import {
    rememberPortfolioOnboardingDismissal,
    shouldShowPortfolioOnboarding,
} from "../../../src/utils/portfolioOnboardingPreference";

describe("portfolio onboarding preference", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test("shows onboarding for a first-time visitor", () => {
        expect(shouldShowPortfolioOnboarding()).toBe(true);
    });

    test("keeps onboarding hidden after a remembered dismissal", () => {
        window.localStorage.setItem("portfolio-onboarding-dismissed", "true");

        expect(shouldShowPortfolioOnboarding()).toBe(false);
    });

    test("persists a dismissal for later visits", () => {
        rememberPortfolioOnboardingDismissal();

        expect(
            window.localStorage.getItem("portfolio-onboarding-dismissed"),
        ).toBe("true");
    });

    test("remains usable when browser storage is blocked", () => {
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new Error("Storage blocked");
        });
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new Error("Storage blocked");
        });

        expect(shouldShowPortfolioOnboarding()).toBe(true);
        expect(() => rememberPortfolioOnboardingDismissal()).not.toThrow();
    });
});
