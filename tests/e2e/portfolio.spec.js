import { expect, test } from "@playwright/test";

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 390, height: 844 };

const skipDesktopOnboarding = async (page) => {
    await page.addInitScript(() => {
        window.localStorage.setItem("portfolio-onboarding-dismissed", "true");
    });
};

test("desktop visitors can open a shelf project", async ({ page }) => {
    await page.setViewportSize(desktopViewport);
    await skipDesktopOnboarding(page);
    await page.goto("/");

    await expect(
        page.getByRole("region", { name: "Portfolio shelf" }),
    ).toBeVisible();

    const projectCard = page
        .getByRole("button")
        .filter({ hasText: "Ali's Portfolio" })
        .first();

    await projectCard.click();

    await expect(page).toHaveURL(/#alis-portfolio$/);
    await expect(
        page.locator("#about-panel-title", { hasText: "Ali's Portfolio" }),
    ).toBeVisible();
});

test("a desktop project deep link restores the selected detail", async ({
    page,
}) => {
    await page.setViewportSize(desktopViewport);
    await skipDesktopOnboarding(page);
    await page.goto("/#health-data-relay");

    await expect(page).toHaveURL(/#health-data-relay$/);
    await expect(
        page.locator("#about-panel-title", { hasText: "Health Data Relay" }),
    ).toBeVisible();
    await expect(
        page
            .getByRole("button")
            .filter({ hasText: "Health Data Relay" })
            .first(),
    ).toHaveAttribute("aria-pressed", "true");
});

test("the desktop story reader closes with Escape and restores focus", async ({
    page,
}) => {
    await page.setViewportSize(desktopViewport);
    await skipDesktopOnboarding(page);
    await page.goto("/#alis-portfolio");

    const storyTrigger = page.getByRole("button", {
        name: "Read full story",
    });
    await storyTrigger.click();

    await expect(
        page.getByRole("dialog", { name: "Ali's Portfolio" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(storyTrigger).toBeFocused();
});

test("mobile visitors can open and dismiss a project bottom sheet", async ({
    page,
}) => {
    await page.setViewportSize(mobileViewport);
    await page.goto("/");

    await page
        .getByRole("button")
        .filter({ hasText: "Ali's Portfolio" })
        .first()
        .click();

    await expect(
        page.getByRole("dialog", { name: "Ali's Portfolio" }),
    ).toBeVisible();
    await expect(page).toHaveURL(/#alis-portfolio$/);

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page).toHaveURL(/\/$/);
});

test("the build story route supports chapter navigation", async ({ page }) => {
    await page.setViewportSize(desktopViewport);
    await skipDesktopOnboarding(page);
    await page.goto("/how-i-built-my-portfolio/");

    await expect(
        page.getByRole("heading", {
            level: 1,
            name: "How My Portfolio Was Built",
        }),
    ).toBeVisible();
    await expect(
        page.getByRole("button", { name: "Show item 1", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "Next item" }).click();

    await expect(
        page.getByRole("button", { name: "Show item 2", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
});

test("the prerendered mobile portfolio remains readable without JavaScript", async ({
    browser,
}) => {
    const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: mobileViewport,
    });
    const page = await context.newPage();

    await page.goto("/");

    await expect(
        page.getByRole("heading", { level: 1, name: /Ali Sadeghi/i }),
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { level: 2, name: "Featured projects" }),
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { level: 2, name: "Career journey" }),
    ).toBeVisible();

    await context.close();
});
