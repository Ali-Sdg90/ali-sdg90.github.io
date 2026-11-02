# Static Site Generation Architecture

This document explains how Static Site Generation works in Ali Sadeghi's
portfolio, which pages are generated at build time, and how the generated HTML
becomes the interactive mobile and desktop experiences.

## What SSG means in this project

The portfolio is hosted as static files on GitHub Pages. There is no Node.js or
React server running in production.

React server rendering is used only during the production build. It converts
the shared React application and portfolio data into HTML files before
deployment. Those files, styles, scripts, images, and other public assets are
then served directly by GitHub Pages.

The project combines three rendering models:

| Model     | Where it runs                       | Purpose                                                                                                      |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| SSG       | During `npm run build`              | Produces the homepage, Link Hub, complete bilingual build story, and 41 standalone card pages                |
| Hydration | In mobile and Link Hub browsers     | Attaches React behavior to matching prerendered markup                                                       |
| CSR       | In desktop and build-story browsers | Renders the desktop shelf and replaces the complete build-story fallback with the chapter-by-chapter gallery |

The temporary SSR bundle is a build tool for SSG. It is not deployed as a
server application.

## Generated routes and browser behavior

| Route                        | Build output                                                | Browser behavior                                                   |
| ---------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| `/`                          | Mobile portfolio HTML is prerendered into `dist/index.html` | Mobile hydrates it; desktop replaces it with the shelf application |
| `/projects/<id>/`            | Standalone static detail page                               | Works without React hydration                                      |
| `/impact/<id>/`              | Standalone static detail page                               | Works without React hydration                                      |
| `/stack/<id>/`               | Standalone static detail page                               | Works without React hydration                                      |
| `/career/<id>/`              | Standalone static detail page                               | Works without React hydration                                      |
| `/how-i-built-my-portfolio/` | All 34 chapters, images, and English and Persian stories    | React replaces the linear fallback with the interactive gallery    |
| `/links`                     | Complete Link Hub content                                   | React hydrates the matching Link Hub                               |
| `/404.html`                  | Independent client entry                                    | React renders the noindex 404 experience                           |

The main content of every indexable portfolio route is present in its generated
HTML. The 404 remains a client entry because it is intentionally excluded from
search indexing.

## Source-of-truth model

SSG does not maintain a second copy of portfolio content. The interactive and
static views read the same modules:

```text
src/data/portfolio/shelfSections.js
    -> card order, IDs, labels, and compact metadata

src/data/aboutSection/aboutProjectData.js
src/data/aboutSection/aboutImpactData.js
src/data/aboutSection/aboutTechStackData.js
src/data/aboutSection/aboutCareerData.js
    -> complete detail content

src/data/stories/{en,fa}/
    -> bilingual story text imported by the detail modules

src/data/howItWasBuilt/howItWasBuiltData.js
    -> build-story chapter order, images, and bilingual copy

src/data/portfolio/profileLinks.js
    -> Link Hub destinations and labels
```

`src/staticDetails/staticDetailPages.js` joins every visible shelf item with
the detail record that has the same ID. This shared-data boundary prevents the
static pages from becoming crawler-only copies or drifting away from the React
experience.

## Complete build lifecycle

The production command is:

```bash
npm run build
```

The npm `prebuild` lifecycle first runs image optimization. The `build` script
then runs the SSG pipeline:

```text
npm run image:opt
vite build
vite build --ssr src/entry-server.jsx --outDir dist-ssr
node scripts/prerender.mjs
```

### 1. Image preparation

`npm run image:opt` processes original media from `image-sources/` and updates
the generated assets under `src/assets/images/`.

This step belongs to the full production build but is separate from HTML
generation. `npm run generate:ssg` skips image optimization when the generated
media is already current.

### 2. Client build

The first `vite build` uses the HTML inputs declared in `vite.config.js` and
creates the browser-ready files under `dist`:

- HTML entry documents
- Hashed JavaScript chunks
- Compiled CSS
- Imported image and font assets
- Files copied from `public`

At this stage, the homepage, Link Hub, and build-story documents still contain
the marker:

```html
<div id="root"></div>
```

The client build also emits `dist/static-detail-template.html`. It is a
temporary template with explicit markers for page-specific metadata and static
detail markup.

### 3. Temporary React server build

The second Vite command builds `src/entry-server.jsx` for the server
environment:

```bash
vite build --ssr src/entry-server.jsx --outDir dist-ssr
```

This produces `dist-ssr/entry-server.js` and its server-side chunks. The bundle
exports four build-time functions:

- `render()` for the homepage
- `renderLinkHub()` for the Link Hub
- `renderBuildStoryFallback()` for the complete linear build story
- `renderStaticDetailPages()` for all card detail pages

The server bundle exists only long enough for the next build step.

### 4. Homepage prerender

`render()` calls React 19's `prerenderToNodeStream` with the normal `<App />`
tree.

`useMobileViewport` returns `true` from its server snapshot, so the server build
always chooses the mobile portfolio. This makes the output deterministic and
avoids depending on browser-only viewport APIs during SSG.

The streamed React result is collected into one HTML string. It contains the
mobile hero, Projects, Impact, Tech Stack, Career, and real links to the static
card routes.

### 5. Link Hub prerender

`renderLinkHub()` uses the normal `LinkHub` component and
`prerenderToNodeStream`. Its output contains the heading, profile information,
social links, and portfolio link that the browser later hydrates. The static
and interactive versions therefore use the same component and data.

### 6. Complete build-story fallback

`renderBuildStoryFallback()` renders `BuildStoryStaticPage` from the same
`howItWasBuiltData` module used by the interactive gallery. It produces a
semantic ordered list containing all 34 chapters. Every chapter contains its
image plus both English and Persian titles and story text.

This linear page is visible and usable without JavaScript. It is not hidden or
served only to crawlers. When JavaScript runs, `src/main.jsx` replaces it with
the existing chapter-by-chapter gallery because that interface has a different
DOM structure and cannot hydrate the complete linear document.

### 7. Static detail generation

`renderStaticDetailPages()` obtains the route inventory from
`getStaticDetailPages()` and renders every card through
`renderToStaticMarkup`.

The current inventory is:

- 11 project pages
- 9 impact pages
- 17 technology pages
- 4 career pages
- 41 pages in total

Each result includes the information needed to build its final document:

- Route and canonical URL
- Title and description
- Section and page type
- Social image metadata
- Semantic React markup
- English and Persian story content
- Related links and gallery media where available

`scripts/static-detail-documents.mjs` inserts page-specific metadata and the
rendered body into `static-detail-template.html`. The result is written to the
matching `dist/<section>/<id>/index.html` path.

These pages do not hydrate a React application. Their English and Persian story
toggle uses a small inline script included in the static markup.

### 8. Final document writing

`scripts/prerender.mjs` imports the temporary server bundle and reads the
client-built documents and detail template. Before writing output, it verifies
that:

- The empty homepage root marker exists.
- All four portfolio sections are present in the server-rendered HTML.
- The Link Hub contains its required profile and navigation content.
- The build story contains both languages and every one of the 34 chapter IDs.
- Static detail generation covers all four collections.
- Every generated detail page is linked from the prerendered cards.

The script then replaces the empty homepage marker:

```html
<div id="root"></div>
```

with:

```html
<div id="root">...prerendered mobile portfolio...</div>
```

The same root injection is applied to the Link Hub. The build-story root also
receives `data-prerender-mode="replace"`, which tells the browser entry to swap
the complete linear page for the interactive gallery after JavaScript loads.

The script writes all static detail documents, removes the temporary detail
template, and deletes `dist-ssr` in a `finally` block. The server build
therefore never becomes part of the deployed site.

## Resulting output model

A simplified final build looks like this:

```text
dist/
|-- index.html
|-- how-i-built-my-portfolio/
|   `-- index.html
|-- links/
|   `-- index.html
|-- 404.html
|-- projects/
|   `-- <project-id>/index.html
|-- impact/
|   `-- <impact-id>/index.html
|-- stack/
|   `-- <technology-id>/index.html
|-- career/
|   `-- <career-id>/index.html
|-- assets/
|   `-- hashed scripts, styles, images, and fonts
|-- robots.txt
|-- sitemap.xml
`-- llms.txt and llms/
```

Only `dist` is deployed. Source modules and the `image-sources` directory are
not copied as source directories, although assets explicitly imported from
them, such as downloadable build-story originals, can be emitted into
`dist/assets`. The temporary `dist-ssr` directory is never deployed.

## Runtime behavior after SSG

The generated homepage is useful before JavaScript runs. Once the browser loads
`src/main.jsx` from the built client bundle, it chooses one of two paths.

### Mobile viewport

When the root already has prerendered children and the viewport matches
`(max-width: 899px)`, React calls `hydrateRoot`.

Hydration preserves the existing mobile HTML and connects it to React state,
event handlers, navigation, bottom sheets, and other interactions. The server
snapshot and first client snapshot must describe the same mobile tree to avoid
a hydration mismatch.

### Desktop viewport

The prerendered HTML is a mobile tree, so desktop cannot hydrate it into the
different shelf structure. Above `899px`, `src/main.jsx` deliberately:

1. Calls `rootElement.replaceChildren()`.
2. Creates a fresh React root with `createRoot`.
3. Client-renders `DesktopPortfolio`.

Desktop visitors briefly receive meaningful static HTML from the network, but
the browser replaces it with the dedicated interactive shelf as soon as the
client application starts.

### Link Hub

`src/links/main.jsx` hydrates the prerendered `LinkHub` tree. If an unprocessed
development document has an empty root, it falls back to `createRoot`.

### Build story

The generated build-story document starts with all 34 bilingual chapters.
`src/main.jsx` detects `data-prerender-mode="replace"`, clears that fallback,
and mounts the normal interactive build-story route. This keeps the full story
crawlable while preserving the existing focused one-chapter interface for
JavaScript users.

### JavaScript disabled

Without JavaScript, the prerendered mobile homepage and Link Hub remain usable,
and the complete bilingual build story remains readable. Homepage card links
navigate to the standalone detail pages. This is the progressive-enhancement
and crawler-accessibility fallback.

## Pull request preview support

Vite reads `VITE_BASE` to support previews deployed below paths such as:

```text
/pr-preview/pr-42/
```

Generated assets, portfolio links, and interactive return paths use the preview
base. Production canonical URLs remain rooted at `https://ali-sdg.is-a.dev/` so
preview paths are not presented as canonical content.

## Adding or changing generated content

When a shelf card is added, removed, or renamed:

1. Update `shelfSections.js`.
2. Add or update the matching record in the correct `about*Data.js` module.
3. Keep the ID stable across card data, detail data, story filenames, hashes,
   and routes.
4. Add both English and Persian story files when the item has a story.
5. Add the corresponding route to `public/sitemap.xml`.
6. Update the relevant `public/llms/` summary.
7. Run the full build and tests.

The generated page itself must never be edited in `dist`. It will be recreated
from source data on the next build.

## Commands and verification

Run the complete project gate:

```bash
npm run check
```

Run only the client build, server build, and HTML generation:

```bash
npm run generate:ssg
```

Inspect the raw generated homepage:

```bash
rg -n "mobile-portfolio|Featured projects|Impact in numbers|Tech stack|Career journey" dist/index.html
```

Confirm that static card links are present:

```bash
rg -n 'href="/(projects|impact|stack|career)/' dist/index.html
```

Confirm that the Link Hub and all build-story chapters are present:

```bash
rg -n "link-hub-page|Explore My Portfolio" dist/links/index.html
rg -n 'build-story-static__chapter|lang="en"|lang="fa"' dist/how-i-built-my-portfolio/index.html
```

Run browser-level contracts after routing, hydration, or generated-page
changes:

```bash
npm run build
npm run test:e2e
```

The automated suite protects:

- Route and ID contracts
- Complete detail-data resolution
- Static metadata and semantic page structure
- Sitemap coverage for all 41 generated routes
- No-JavaScript homepage navigation
- No-JavaScript Link Hub content
- All 34 English and Persian build-story chapters in generated HTML
- Mobile hydration without runtime errors
- Base-path behavior in pull request previews

## Boundaries and limitations

- SSG guarantees generated HTML, not a particular Google Search snippet.
- A successful build does not prove that the deployed site has been recrawled.
- The desktop shelf is intentionally CSR because it does not match the mobile
  prerendered tree.
- Static detail pages contain shared content but not the complete interactive
  shelf behavior.
- Visual correctness still requires rendered review when a change affects
  layout, images, or responsive behavior.

See [Architecture](./architecture.md) for the wider application and delivery
model, [Content Authoring](./content-authoring.md) for shared-data protocols, and
[Testing Strategy](./testing.md) for the complete test inventory.
