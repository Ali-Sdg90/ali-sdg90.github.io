# Content Authoring

This guide explains how portfolio content is added and maintained without
duplicating it across desktop, mobile, and static pages.

## Content model

The portfolio has four shelf collections:

| Collection | Shelf section ID | Card data          | Detail data             | Story folder                  | Static route      |
| ---------- | ---------------- | ------------------ | ----------------------- | ----------------------------- | ----------------- |
| Projects   | `projects`       | `shelfSections.js` | `aboutProjectData.js`   | `stories/{en,fa}/projects/`   | `/projects/<id>/` |
| Impact     | `achievements`   | `shelfSections.js` | `aboutImpactData.js`    | `stories/{en,fa}/impact/`     | `/impact/<id>/`   |
| Technology | `tech-stack`     | `shelfSections.js` | `aboutTechStackData.js` | `stories/{en,fa}/tech-stack/` | `/stack/<id>/`    |
| Career     | `career-journey` | `shelfSections.js` | `aboutCareerData.js`    | `stories/{en,fa}/career/`     | `/career/<id>/`   |

The shelf record controls ordering and compact card content. The detail record
controls the About panel, mobile bottom sheet, and generated static page. Both
records must use the same stable ID.

## Identifier rules

Use an explicit lowercase kebab-case `id`, for example
`health-data-relay`. Do not rely on the fallback ID generated from titles.

An ID is part of several public and internal contracts:

- Homepage hash navigation
- Static detail route
- Detail-data object key
- English and Persian story filenames
- Gallery-data key
- Sitemap entry
- Tests and analytics values

Changing an existing ID is a route migration, not a copy edit. Update every
reference and consider preserving the old public URL before renaming it.

## Shared writing rules

- Preserve the established professional and personal tone.
- Keep factual claims, dates, metrics, links, and technology names verifiable.
- Keep English and Persian stories aligned in meaning without forcing literal
  sentence-by-sentence translation.
- Do not add em dashes to portfolio copy.
- Use an empty line between story paragraphs.
- Story files are imported as raw text. Markdown headings, lists, emphasis, and
  links are not parsed by the current story renderer and would appear as text.
- Avoid manual line breaks inside a paragraph unless the visible break is
  intentional.
- Keep link labels consistent with existing records. Common examples are
  `GitHub Repository`, `Company Website`, and `LinkedIn Post`.

## Adding a featured project

1. Add the original cover and gallery files under:

    ```text
    image-sources/projects/<project-id>/
    image-sources/projects/<project-id>/gallery/
    ```

2. Run `npm run image:opt` and verify the generated cover and gallery variants.
3. Import the cover thumbnail and add the project to the `items` array under
   `id: "projects"` in `src/data/portfolio/shelfSections.js`.
4. If the project has gallery images, map every thumbnail/full-size pair in
   `src/data/aboutSection/projectGalleryData.js`. Record accurate dimensions
   and meaningful alt text.
5. Create matching story files:

    ```text
    src/data/stories/en/projects/<project-id>.md
    src/data/stories/fa/projects/<project-id>.md
    ```

6. Import both stories and add the detail record to
   `src/data/aboutSection/aboutProjectData.js`.
7. Add the generated static route to `public/sitemap.xml`.
8. Update `public/llms/projects.md` when the public project inventory or facts
   change.

A complete project detail record normally contains:

- `id`, `title`, `subtitle`, and `year`
- Thumbnail and full-size cover imports
- Accurate cover dimensions
- A concise `summary`
- Primary `links`
- A `tech` list and feature list
- `galleryImages`
- `storyEN`, `storyFA`, and matching `storySource`
- `hasRelatedLinks` and structured `relatedLinks`

## Adding an impact item

1. Add a compact record under the `achievements` shelf section. It needs a
   stable ID, the displayed metric in `title`, supporting `meta`, and an icon.
2. Create matching stories under `stories/{en,fa}/impact/`.
3. Add the full record to `aboutImpactData.js` using the same ID.
4. Add `/impact/<id>/` to the sitemap.
5. Update `public/llms/impact.md` if the published metric or explanation changes.

Impact records use `title` for the value, `subtitle` for the full label, and
`summary` for the short explanation. Keep the metric consistent across the
shelf, detail data, story, static page, resume references, and LLM summary.

## Adding a technology or tool

1. Add the original logo under `image-sources/tech-stack/`.
2. Run the image optimizer to create the thumbnail and full-size logo.
3. Add the thumbnail-backed card under the `tech-stack` shelf section.
4. Create matching stories under `stories/{en,fa}/tech-stack/`.
5. Add the full record, including `lightboxImage`, to
   `aboutTechStackData.js`.
6. Add `/stack/<id>/` to the sitemap.
7. Update `public/llms/stack.md` when the public technology summary changes.

Technology entries should describe actual experience rather than a generic
definition of the tool.

## Adding a career item

1. Add the original cover and optional gallery media under
   `image-sources/career/<career-id>/`.
2. Run the image optimizer and import the generated assets.
3. Add the role to the `career-journey` shelf section with `company`, `meta`,
   and `year`.
4. Create matching stories under `stories/{en,fa}/career/`.
5. Add the full record and any gallery mappings to `aboutCareerData.js`.
6. Add `/career/<id>/` to the sitemap.
7. Update `public/llms/experience.md` when the role or its public facts change.

Use year ranges for longer multi-year roles. A month range is appropriate when
the role starts and ends within one year and the extra precision clarifies its
duration.

## Updating About Me and profile links

`src/data/portfolio/aboutData.js` owns the About Me image, bilingual paragraphs,
and tags. Keep the Persian and English sections aligned in meaning and preserve
the image's thumbnail, lightbox, dimensions, alt text, and zoom metadata.

`src/data/portfolio/profileLinks.js` is the shared source for contact and social
destinations. Reuse it instead of duplicating profile URLs in React components.
When contact or profile facts change, also review:

- The links page metadata and JSON-LD in `links/index.html`
- Homepage metadata and JSON-LD in `index.html`
- `public/llms/about.md` and `public/llms.txt`
- `SECURITY.md` if the private reporting address changes

## Updating the build story

The complete bilingual visual journal lives in
`src/data/howItWasBuilt/howItWasBuiltData.js`. Every chapter uses a stable
`history-##` ID and contains English and Persian translations plus its media
metadata and accent styling.

Build-story originals belong under `image-sources/build-story/`. Each image is
wired through its generated `.thumb.webp` and `.display.webp` assets, with the
original source retained for intentional downloads where configured.

When adding, removing, or reordering a chapter:

1. Keep chapter IDs unique and ordered.
2. Keep the English and Persian title and description together in the chapter.
3. Record meaningful alt text and real display/lightbox dimensions.
4. Update the documented chapter count in README, entry metadata, and
   `public/llms/build.md` when it changes.
5. Recheck direct navigation, previous/next controls, keyboard behavior, and
   reduced-motion behavior when the chapter structure changes.

## Detail-data conventions

Common detail fields have distinct responsibilities:

| Field                | Purpose                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `summary`            | Short factual overview and the primary source for static-page descriptions  |
| `featuresTitle`      | Heading tailored to the collection, such as `Focus Areas` or `What I Built` |
| `features`           | Scannable evidence or responsibilities                                      |
| `tech`               | Technologies or capability tags where the view supports them                |
| `galleryImages`      | Ordered visual evidence with exact dimensions and alt text                  |
| `storyTitle`         | Display heading for the long-form story                                     |
| `storyEN`, `storyFA` | Imported and trimmed raw story content                                      |
| `storySource`        | Collection and slug used to link back to the source Markdown                |
| `relatedLinks`       | Secondary references with `label`, `text`, and `url`                        |

Set `hasRelatedLinks` consistently with the actual array. Do not keep placeholder
links, inaccessible evidence, or invented URLs.

## Images and dimensions

Every content image must have:

- A generated asset imported from `src/assets/images/`
- Meaningful alt text that describes the image's purpose or content
- The real rendered-source dimensions recorded in its data object
- A matching thumbnail and full-size reference when the lightbox is available

Do not copy output files directly into `src/assets/images`. Add or replace the
source under `image-sources` and let the image pipeline create the application
assets. See [Media Pipeline](./media-pipeline.md).

## Machine-readable summaries

The files under `public/llms/` are concise public summaries for agents and
non-visual readers. They are not generated from application data, so update the
relevant file whenever a public project, metric, role, technology summary, or
build description changes.

`public/llms.txt` is the index and should remain concise. Do not duplicate every
story into it.

## Validation checklist

Before considering a content change complete:

1. Confirm shelf and detail IDs match.
2. Confirm English and Persian story files exist and are imported.
3. Confirm thumbnail and full-size media references are paired correctly.
4. Verify every recorded width and height against the real generated file.
5. Check links, labels, dates, metrics, and exact product names.
6. Keep `public/sitemap.xml` and the relevant `public/llms/` summary aligned.
7. Run Prettier on the affected source and content files.
8. Run the full project gate:

    ```bash
    npm run check
    ```

9. Run `npm run test:e2e` after rebuilding when routes, navigation, static
   pages, or important interactions change.

The data-contract and static-detail tests protect IDs, required detail data,
gallery pairs, routes, metadata, and generated page structure. They do not
verify editorial accuracy or visual quality, so those still require a manual
review when relevant.
