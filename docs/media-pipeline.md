# Media Pipeline

This document describes how original portfolio images become optimized assets
used by React, static detail pages, the build story, and documentation.

## Directory contract

```text
image-sources/        Original inputs for optimized application media
scripts/image-config.mjs
                      Presets and path-based processing rules
scripts/optimize-images.mjs
                      Sharp-based optimizer and cache handling
src/assets/images/   Generated application assets imported by source code
public/              Static files copied to the production build as-is
dist/                Generated production output, never edited directly
```

Keep the relative directory structure under `image-sources` aligned with
`src/assets/images`. The optimizer creates output directories when needed.

## Supported inputs

The optimizer accepts:

- JPEG
- PNG
- SVG
- WebP

For responsive content that needs generated variants, prefer a non-WebP source.
An existing WebP source is copied byte-for-byte to the same relative output path
and old `.thumb`, `.full`, or `.display` variants are removed. This behavior is
intentional for already-prepared assets.

## Processing modes

Rules are evaluated in order from `scripts/image-config.mjs`.

### Responsive

Used by project covers, galleries, technology logos, career media, and the
profile image.

It creates:

- `<name>.thumb.webp`: fixed preset dimensions, center-cropped with `cover`
- `<name>.full.webp`: lossless WebP at the original source dimensions

The default thumbnail quality is 82 unless the preset overrides it.

### Build story

Used by `image-sources/build-story/**`.

It creates:

- `<name>.thumb.webp`: `260 x 160`, center-cropped, quality 74
- `<name>.display.webp`: contained within `1920 x 1200`, never enlarged,
  quality 97

Build-story media intentionally uses `display` rather than `full` because its
large images are bounded for the journal and lightbox.

### Single output

Used by `site/**` and `ui/**`.

For non-WebP inputs it creates one lossless `<name>.webp` at the original
dimensions. It does not create responsive variants.

## Current presets

| Content         | Source pattern          | Thumbnail size      | Additional output             |
| --------------- | ----------------------- | ------------------- | ----------------------------- |
| About profile   | `profile/**`            | `480 x 480`         | Original-size lossless `full` |
| Project cover   | `projects/*/cover.*`    | `480 x 480`         | Original-size lossless `full` |
| Project gallery | `projects/*/gallery/**` | `285 x 232`         | Original-size lossless `full` |
| Technology logo | `tech-stack/**`         | `128 x 128`         | Original-size lossless `full` |
| Career cover    | `career/**`             | `128 x 128`         | Original-size lossless `full` |
| Career gallery  | `career/*/gallery/**`   | `285 x 232`         | Original-size lossless `full` |
| Build story     | `build-story/**`        | `260 x 160`         | Maximum `1920 x 1200` display |
| Site and UI     | `site/**`, `ui/**`      | Original dimensions | Single lossless WebP          |

The career gallery rule appears before the broader career rule so gallery
images receive the gallery preset.

## Running the pipeline

Run image processing directly with:

```bash
npm run image:opt
```

`npm run build` also runs it automatically through the `prebuild` lifecycle.
`npm run generate:ssg` deliberately skips image optimization and should be used
only when the generated assets are already current.

The command prints:

- Number of source images
- Processed files
- Cache hits skipped
- Failed files
- Total processing time

Any source without a matching rule is reported as a failure and makes the
command exit unsuccessfully.

## Cache and regeneration

The optimizer stores SHA-256 processing fingerprints in:

```text
node_modules/.cache/portfolio-image-optimizer.json
```

The fingerprint includes the source bytes and relevant processing
configuration. A file is regenerated when:

- Its source changes
- Its matching preset or processing behavior changes
- Its cache entry is missing or outdated
- Its generated dimensions or WebP format are invalid

The cache is disposable. Removing `node_modules` causes a safe full validation
and regeneration on the next run.

Outputs are written through temporary files and renamed into place to avoid
leaving partially written assets after an interrupted conversion.

## Adding or replacing media

1. Choose the destination based on the content type.
2. Add the original file under `image-sources` with a stable lowercase name.
3. Confirm that an existing rule matches its relative path.
4. Run `npm run image:opt`.
5. Inspect the summary and confirm zero failures.
6. Import the generated file from `src/assets/images`.
7. Record the real output dimensions in the relevant data object.
8. Add useful alt text based on what the image communicates.
9. For gallery or lightbox media, verify both preview and large-image imports.
10. Run `npm run check`.

If a new media category does not match an existing rule, add the narrowest
appropriate rule and preset to `scripts/image-config.mjs`. Place specific rules
before broader patterns.

## Dimension rules

Do not infer full-size dimensions from the thumbnail preset. Responsive
thumbnails have fixed dimensions, while full-size assets retain the original
source dimensions.

Gallery objects record both sets explicitly:

```text
src             -> thumbnail import
lightboxSrc     -> full or display import
width           -> thumbnail width
height          -> thumbnail height
lightboxWidth   -> full/display width
lightboxHeight  -> full/display height
```

These dimensions reserve layout space before images load and are part of the
portfolio data contract. Incorrect values can cause layout shifts, distorted
placeholders, or a mismatch between a thumbnail and its lightbox image.

## Quality and cropping

- Thumbnails use `fit: cover` and center positioning, so their edges may be
  cropped.
- Full responsive assets are lossless and retain their source dimensions.
- Build-story display images use `fit: inside` and retain their aspect ratio.
- Single-output site and UI assets retain their original dimensions.

If automatic center cropping hides important content, adjust the source framing
instead of hand-editing the generated output. A deliberate pipeline-level
position option should be introduced only when several assets need it.

## Public and documentation assets

Files in `public` bypass the optimizer and are copied to `dist` unchanged.
Place files there only when they need a stable public URL, such as favicons,
resume files, `robots.txt`, or `sitemap.xml`.

README images currently come from generated site assets in
`src/assets/images/site/`. Keep their source files in `image-sources/site/` and
preserve the exact paths referenced by README.

## Safety and review checklist

- Do not edit `dist` or `dist-ssr`.
- Do not hand-edit files under `src/assets/images` when a source counterpart
  belongs in `image-sources`.
- Preserve third-party copyright, logo, and font notices.
- Do not add private screenshots, credentials, access tokens, personal data, or
  confidential product information.
- Confirm permission to publish third-party imagery.
- Verify thumbnail/full-size pairing, real dimensions, alt text, and cropping.
- Review file size before adding unusually large source or README assets.
- Run `npm run check` after the final media and data wiring changes.

The automated pipeline verifies format and dimensions. It does not establish
that a crop looks good, a screenshot is safe to publish, or an image is legally
usable. Those remain manual review responsibilities.
