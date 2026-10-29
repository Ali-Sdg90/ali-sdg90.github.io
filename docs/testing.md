# Testing Strategy

This project uses a deliberately focused automated test suite. The goal is to
protect the portfolio's important behavior without coupling tests to visual
implementation details, animation timing, or CSS class structure that may
change during normal design work.

The suite contains **50 core test cases**:

- **41 unit and component tests** run by Vitest in JSDOM and Node.
- **9 end-to-end tests** run by Playwright in Chromium.

All test code is kept outside the application source tree:

```text
tests/
├── unit/   # Unit and component tests, mirroring relevant src areas
├── e2e/    # Playwright browser journeys
└── setup/  # Shared test-environment setup
```

## What the suite protects

### Route contracts (4 tests)

`tests/unit/utils/portfolioRoutes.test.js` verifies the supported homepage and build
story URL forms. It also ensures unrelated paths are not mistaken for portfolio
routes.

### Onboarding preference (4 tests)

`tests/unit/utils/portfolioOnboardingPreference.test.js` covers the first visit,
remembered dismissal, persistence, and browsers where local storage is blocked.

### Infinite shelf scrolling (5 tests)

`tests/unit/hooks/useShelfScroll/scrollUtils.test.js` verifies loop-width
calculation, non-repeating behavior, and normalization on both sides of the safe
repeated range.

### Page-turn geometry (5 tests)

`tests/unit/components/PortfolioReveal/pageTurnGeometry.test.js` protects the
cubic path endpoints and midpoint, normal page-turn output, boundary coordinates,
and finite transforms at rest.

### Hash navigation and deep links (6 tests)

`tests/unit/hooks/usePortfolioHashNavigation.test.js` covers the shelf home,
project deep links, legacy URL normalization, the canonical build-story route,
invalid hash recovery, and navigation between cards, the story, and the shelf.

### Portfolio data contracts (5 tests)

`tests/unit/data/portfolioDataContracts.test.js` checks unique identifiers,
essential shelf content, detail-module resolution, the connection between
featured cards and project details, and valid thumbnail/full-size gallery pairs
with dimensions and alt text.

### Static detail pages (8 tests)

`tests/unit/staticDetails/` protects the 41-card route inventory, retained source
placeholders, base-path-safe URLs for PR previews, progressive card links,
static HTML structure, omitted technology-tag sections, and indexable metadata.

### Story Reader behavior (4 tests)

`tests/unit/components/AboutPanel/FeaturedProjectAbout/StoryReaderModal.test.jsx`
verifies English content and source links, Persian language switching, Escape
close behavior and focus restoration, body scroll locking, and keyboard focus
containment.

### Browser journeys (9 tests)

`tests/e2e/portfolio.spec.js` exercises the production build through these user
journeys:

1. A desktop visitor opens a project from the shelf.
2. A desktop project deep link restores the selected detail.
3. The desktop Story Reader closes with Escape and restores focus.
4. A mobile visitor opens and dismisses a project bottom sheet.
5. The build-story route loads directly and supports chapter navigation.
6. The prerendered mobile portfolio and its detail links remain useful with
   JavaScript disabled.
7. All 41 sitemap detail routes return complete, indexable HTML.
8. The mobile prerender hydrates and keeps its card interactions without runtime
   errors.
9. A static detail story switches between English and Persian without changing
   its section title.

## Local commands

Install dependencies and the Chromium binary once:

```bash
npm ci
npx playwright install chromium
```

Run the unit and component suite:

```bash
npm run test
```

Run Vitest in watch mode while developing:

```bash
npm run test:watch
```

Run formatting, linting, unit/component tests, and the production build:

```bash
npm run check
```

Playwright tests use the generated `dist` directory, so build before running
them locally:

```bash
npm run build
npm run test:e2e
```

## CI pipeline

The GitHub Actions workflow uses the following gates:

```text
build (format + lint + unit/component tests + production build)
  |
  +--> e2e (download the build artifact + Playwright)
         |
         +--> preview (pull requests only)
         |
         +--> release (main only)
                |
                +--> deploy (only when Semantic Release creates a release)
```

The `build` job uploads the production `dist` artifact. The `e2e` job downloads
and tests that exact artifact. Pull-request previews and releases require both
jobs to succeed. Deployment keeps the existing release-driven behavior and only
runs when Semantic Release reports that a new release was created.

## Test design rules

- Test observable behavior and stable contracts rather than implementation
  details.
- Add a regression test when fixing a meaningful bug.
- Add tests for new routing, accessibility, data, or interaction contracts.
- Keep exact animation appearance, responsive polish, and visual fidelity in
  rendered browser review rather than brittle DOM snapshots.
- Do not pursue coverage percentages at the expense of meaningful scenarios.
- Keep end-to-end tests limited to critical cross-component journeys so the CI
  pipeline remains reliable and fast.
