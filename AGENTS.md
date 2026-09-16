# Repository Instructions

## Project context

- This repository contains Ali Sadeghi's personal, interactive portfolio.
- The application uses React 19, Vite 8, and SCSS and is deployed to GitHub Pages.
- Read `README.md` for the product structure and `LICENSE` before changing or reusing content.
- Most portfolio content lives in `src/data`; reusable UI lives in `src/components`.
- Files in `public` are copied to the production build as-is. Never edit generated files in `dist`.

## Setup and commands

- Use Node.js 20 or later and install dependencies with `npm ci`.
- Start local development with `npm run dev`.
- Use `npm run dev:debug` for the fixed localhost port expected by the VS Code debugger.
- Run `npm run check` after code or configuration changes. It checks formatting, linting, and the production build.
- For a narrowly scoped content edit, also run Prettier against the affected files before the full check.

## Change rules

- Keep changes tightly scoped and preserve existing behavior unless the request explicitly changes it.
- Preserve exact English and Persian copy, field order, labels, links, and media dimensions when they are outside the requested scope.
- Match the established tone when editing Persian content. Do not add em dashes to portfolio copy.
- Update data sources instead of hard-coding portfolio content into components.
- When adding or replacing project media, verify both thumbnail and large-image references and record the real image dimensions.
- Do not add a production dependency unless the task requires it.
- Preserve third-party copyright and license notices. The repository's custom `LICENSE` is not an open-source license.

## Visual and release checks

- For visual changes, inspect the rendered page at desktop and narrow viewport sizes and verify keyboard focus and reduced-motion behavior where relevant.
- Treat a successful build and a successful rendered review as separate checks.
- Use Conventional Commits for commit messages.
- Do not edit `CHANGELOG.md`, the package version, Git tags, or generated releases manually unless explicitly requested; semantic-release owns them.
- Do not commit or push changes unless explicitly requested.

## Code review rules

- Flag broken links, missing media, incorrect image dimensions, and thumbnail/lightbox mismatches.
- Flag changes that expose private information or add third-party assets without clear usage rights.
- Flag direct edits to `dist` or release artifacts instead of their source files.
