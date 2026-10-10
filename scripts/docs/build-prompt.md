Implement a production-ready image optimization pipeline for this portfolio using Node.js and Sharp.

The project structure and `scripts/image-config.mjs` already exist. Inspect the existing files and directory structure before making changes.

## 1. Files and directories

- Input: `image-sources/`
- Output: `src/assets/images/`
- Script: `scripts/optimize-images.mjs`
- Configuration: `scripts/image-config.mjs`

All source images are PNG files.

Recursively scan `image-sources/` and process images sequentially, one at a time, in a deterministic order.

Preserve the exact relative directory structure in the output directory.

## 2. Image outputs

Generate exactly two WebP files for every source PNG.

**Thumbnail — `filename.thumb.webp`**
- Dimensions determined by the matching preset from `image-config.mjs`.
- Use Sharp with `fit: "cover"` and `position: "centre"`.
- Use lossy WebP with `quality: 82`.
- Crop and resize to the exact configured dimensions.
- Preserve transparency where applicable.

**Full — `filename.full.webp`**
- Use WebP with `lossless: true`.
- Preserve the source image's original dimensions, aspect ratio, and pixel quality.
- Never resize or crop.
- Preserve transparency.

Never copy original PNG files into the output directory.

Example:

Input:
`image-sources/projects/example/gallery/screenshot.png`

Outputs:
- `src/assets/images/projects/example/gallery/screenshot.thumb.webp`
- `src/assets/images/projects/example/gallery/screenshot.full.webp`

## 3. Configuration

Import and use the existing `presets` and `rules` exports from `scripts/image-config.mjs`.

- Match image paths against the configured glob patterns.
- Use the matching rule to select the thumbnail preset.
- Normalize paths for cross-platform compatibility, including Windows.
- Validate preset dimensions and rule references.
- Do not hardcode folder names or dimensions inside the processing logic.
- Do not duplicate configuration values.
- If an image matches no rule, report its path clearly instead of silently skipping it.
- Inspect the actual source directories and ensure every PNG is covered by a valid rule. Extend the configuration only when necessary, without changing existing preset dimensions.

## 4. Incremental processing

Avoid unnecessary image conversions.

- Process new or modified source images.
- Regenerate missing output files.
- Regenerate affected images when their processing configuration changes.
- Skip unchanged images with valid existing outputs.
- Re-running the script without changes should not rewrite output files.

Keep the incremental mechanism simple and reliable. No database or unnecessary dependencies.

## 5. Safety and reliability

- Use Node.js ESM and async filesystem APIs.
- Use Sharp for image processing.
- Resolve project paths reliably, independently of the current working directory.
- Create missing output directories automatically.
- Never modify or delete original source images.
- Never delete unrelated files from the output directory.
- Handle conversion errors gracefully and identify the affected file.
- Avoid leaving incomplete output files after failed conversions.
- Avoid unnecessary abstractions or overengineering.

## 6. CLI and npm integration

Add the following npm script without removing or modifying unrelated scripts:

`"image:opt": "node scripts/optimize-images.mjs"`

The pipeline must run using:

`npm run image:opt`

Also integrate it into the existing build workflow so image optimization runs before the Vite production build.

Preserve the existing build behavior and any existing prebuild tasks.

Image processing must happen entirely in Node.js during development/build, never in the browser.

## 7. Console output

Provide clean, readable CLI output.

Include:
- Number of source images discovered.
- Number processed.
- Number skipped.
- Number failed.
- Total execution time.
- Clear error messages with file paths.

Avoid excessive logging.

## 8. Dependencies

Use Sharp and only the additional dependencies genuinely necessary.

Prefer built-in Node.js APIs whenever possible.

Do not introduce a large image-processing framework.

## 9. Verification

After implementation:

1. Install any required dependencies.
2. Run `npm run image:opt`.
3. Verify that both WebP variants are generated correctly.
4. Verify directory structure preservation.
5. Verify thumbnail dimensions against their presets.
6. Verify full-size images retain their original dimensions.
7. Run the command again and verify unchanged images are skipped.
8. Run the existing production build and ensure it succeeds.

Do not make unrelated changes to existing React components, application data, or image imports.

## Goal

Create a clean, maintainable, deterministic image optimization pipeline that can eventually be extracted into a standalone npm CLI package.

Keep the implementation focused, straightforward, and appropriate for a personal portfolio. Follow the repository's existing conventions and `AGENTS.md` instructions.
