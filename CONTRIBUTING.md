# Contributing

Thanks for taking the time to contribute to my portfolio ❤️

## Before you start

This is a personal, source-available portfolio. Contributions are welcome, but
the repository's custom license still applies to its code, design, written
content, branding, and assets.

For a bug or a small improvement, please open an issue or submit a focused pull
request. For larger changes, open an issue first so the direction can be agreed
on before implementation.

## Local setup

Use Node.js 20.19 or newer.

```bash
npm ci
npm run dev
```

## Making changes

- Keep changes focused and preserve existing behavior outside the requested
  scope.
- Follow the existing React, SCSS, naming, data, and content conventions.
- Preserve copyright, license, attribution, and personal-content boundaries.
- Add or update tests when changing important logic or interactions.

## Checks

Run the main project checks before opening a pull request:

```bash
npm run check
```

For changes affecting important browser interactions, also run:

```bash
npm run build
npm run test:e2e
```

## Commits and pull requests

Use Conventional Commits, for example:

```text
feat: add a new portfolio interaction
fix: correct project deep-link navigation
test: add coverage for the story reader
docs: clarify local setup instructions
```

In the pull request, explain what changed, why it changed, and how it was
verified. Include screenshots when the change affects the rendered interface.
