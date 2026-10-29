import { expect, test } from "@playwright/test";

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 390, height: 844 };

const detailRoutePattern = /^\/(projects|impact|stack|career)\/[^/]+\/$/;

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
        .getByRole("link")
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
        page.getByRole("link").filter({ hasText: "Health Data Relay" }).first(),
    ).toHaveAttribute("aria-current", "true");
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
    await page.waitForLoadState("networkidle");

    await page
        .getByRole("link")
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

    const projectLink = page
        .getByRole("link")
        .filter({ hasText: "Health Data Relay" })
        .first();

    await expect(projectLink).toHaveAttribute(
        "href",
        "/projects/health-data-relay/",
    );
    await projectLink.click();

    await expect(page).toHaveURL(/\/projects\/health-data-relay\/$/);
    await expect(
        page.getByRole("heading", { level: 1, name: "Health Data Relay" }),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText(
        "A privacy-focused Android app",
    );

    await context.close();
});

test("all generated detail routes return complete indexable HTML", async ({
    request,
}) => {
    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.status()).toBe(200);

    const sitemap = await sitemapResponse.text();
    const detailPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(([, location]) => new URL(location).pathname)
        .filter((pathname) => detailRoutePattern.test(pathname));

    expect(detailPaths).toHaveLength(41);
    expect(new Set(detailPaths).size).toBe(41);

    for (const pathname of detailPaths) {
        const response = await request.get(pathname);
        expect(response.status(), pathname).toBe(200);

        const html = await response.text();
        expect(html, pathname).toMatch(/<html lang="en">/);
        expect(html, pathname).toMatch(/<h1>[^<]+<\/h1>/);
        expect(html, pathname).toMatch(
            /<meta name="robots" content="index,\s*follow,\s*max-image-preview:large" \/>/,
        );
        expect(html, pathname).toContain(
            `<link rel="canonical" href="https://ali-sdg.is-a.dev${pathname}" />`,
        );
        expect(html, pathname).toContain(
            `<meta property="og:url" content="https://ali-sdg.is-a.dev${pathname}" />`,
        );
        expect(html, pathname).toContain('<script type="application/ld+json">');
    }
});

test("mobile prerendered markup hydrates without runtime errors", async ({
    page,
}) => {
    const runtimeErrors = [];

    page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    await page.setViewportSize(mobileViewport);
    await page.goto("/");
    await expect(
        page.getByRole("heading", { level: 2, name: "Featured projects" }),
    ).toBeVisible();
    await page.waitForLoadState("networkidle");

    const projectLink = page
        .getByRole("link")
        .filter({ hasText: "Health Data Relay" })
        .first();
    await projectLink.click();

    await expect(page).toHaveURL(/#health-data-relay$/);
    await expect(
        page.getByRole("dialog", { name: "Health Data Relay" }),
    ).toBeVisible();
    expect(runtimeErrors).toEqual([]);
});

test("a static detail story switches language without changing its title", async ({
    page,
}) => {
    await page.goto("/projects/health-data-relay/");

    const story = page.locator("[data-static-story]");
    const storyTitle = story.getByRole("heading", { name: /story$/i });
    const initialTitle = await storyTitle.textContent();

    await expect(storyTitle).toBeVisible();
    await expect(story.locator('[data-story-language="EN"]')).toBeVisible();
    await expect(story.locator('[data-story-language="FA"]')).toBeHidden();

    await story.getByRole("button", { name: "FA" }).click();

    await expect(storyTitle).toHaveText(initialTitle);
    await expect(story.locator('[data-story-language="EN"]')).toBeHidden();
    await expect(story.locator('[data-story-language="FA"]')).toBeVisible();
});
