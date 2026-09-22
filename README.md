# Ali Sadeghi — Interactive Portfolio

> [!IMPORTANT]
> **Project under construction** — the core experience is available, while content, mobile support, and final refinements are still in active development.

![Ali Sadeghi's interactive portfolio interface](./src/assets/images/gallery-images/large-images/projects/portfolio/img1.png)

An interactive, shelf-inspired portfolio created to present my projects, technical experience, career journey, and the thinking behind the product itself.

This is not a conventional grid of project cards or a static résumé website. The interface is built around a three-dimensional digital shelf: each row represents a different part of my work, and every card opens a focused detail view without taking attention away from the main scene. The result is a personal portfolio that behaves more like a small interactive product than a collection of pages.

## The experience

The portfolio is organized into four data-driven collections:

- **Featured Projects** — selected software projects with summaries, technologies, media, source links, and live links where available.
- **Impact in Numbers** — measurable results and milestones from my work.
- **Tech Stack & Tools** — technologies and platforms I use across frontend development, automation, infrastructure, and AI-assisted workflows.
- **Career Journey** — a concise timeline of professional roles and experience.

Each collection has its own geometry and motion behavior while sharing a reusable shelf-row system. Cards can move continuously through the shelf, respond to dragging with momentum and friction, and preserve the perspective of the surrounding scene. Edge shadows and controlled acceleration keep the interaction readable instead of making it feel like a standard horizontal carousel.

Selecting a card transforms the default **About Me** panel into a contextual detail view. Depending on the item, that view can include:

- A concise overview and technology tags
- Longer project or career stories in English and Persian
- Image galleries with lightweight previews and high-resolution lightbox media
- Relevant repository, product, or external links
- An expandable reading mode for longer content

The interface also includes keyboard-accessible card activation, reduced-motion handling, subtle onboarding cues, custom scrolling behavior, and a set of restrained hidden details for visitors who explore beyond the primary interaction.

## How it was built

The project began with a rough sketch of a bookshelf as a visual metaphor: projects would be presented as objects with a place and identity, rather than identical tiles in a grid. That sketch became a three-dimensional shelf asset, refined in Photoshop and integrated into a dark, restrained neon environment. Perspective, shadows, floor reflections, and background gradients were tuned together so the shelf would feel embedded in the page instead of placed on top of it.

The most demanding part was making interactive content follow that visual perspective. Every row required its own dimensions, angle, movement speed, and card behavior. The final implementation separates those values from the rendering logic, allowing the shelf to be configured from data while a reusable component handles movement, drag physics, infinite circulation, and selection.

Scaling introduced another challenge. Shelf elements use container-query units so their proportions follow the shelf itself rather than the browser width alone. This keeps the scene visually coherent across desktop resolutions and browser zoom levels, while special handling protects the intended composition on unusually narrow or tall viewports.

The design process is also part of the finished experience. A page-peel interaction in the lower-right corner opens **How This Page Was Built**, a 26-chapter visual journal covering the original concept, rejected layouts, perspective experiments, interaction decisions, media optimization, privacy choices, and the final gallery system. The journal supports English and Persian content, keyboard navigation, a thumbnail rail, and motion-aware transitions.

## Technology

| Area               | Technology                          | Purpose                                                                               |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------------------- |
| Application        | React 19                            | Component architecture, state, and interactive UI                                     |
| Build tooling      | Vite 8                              | Local development and optimized production builds                                     |
| Styling            | SCSS                                | Component styles, perspective composition, responsive behavior, and visual effects    |
| Motion             | Framer Motion                       | Panel transitions, onboarding, gestures, and reduced-motion support                   |
| Page interaction   | Custom React and CSS page turn      | The page-peel entrance to the build journal                                           |
| Interface assets   | React Icons and custom media        | Consistent iconography, shelf content, and gallery presentation                       |
| Code quality       | ESLint, Prettier, Husky, Commitlint | Formatting, linting, and conventional commit enforcement                              |
| Release automation | semantic-release                    | Versioning, changelog generation, tags, and GitHub releases                           |
| Delivery           | GitHub Actions and GitHub Pages     | Builds, pull-request previews, releases, and deployment                               |
| Analytics          | Umami                               | Lightweight production analytics for meaningful interactions and build-story progress |

## Project structure

```text
src/
├── assets/                  # Interface artwork, thumbnails, and gallery media
├── components/
│   ├── AboutPanel/          # About and selected-card detail experience
│   ├── HowItWasBuilt/       # Build journal, navigation, and chapter gallery
│   ├── Intro/               # Profile introduction and primary links
│   ├── PortfolioReveal/     # Page-peel discovery interaction
│   ├── Shelf/               # Shelf rows, cards, movement, and selection
│   └── UI/                  # Shared interface components
├── data/
│   ├── aboutSection/        # Profile content
│   ├── howItWasBuilt/       # Bilingual build-story chapters
│   └── portfolio/           # Projects, metrics, tools, and career data
├── hooks/                   # Shelf behavior and analytics hooks
├── styles/                  # Global tokens and shared styles
└── utils/                   # Shared helpers
```

Content and presentation are intentionally separated. Most shelf entries, chapter text, media references, and row behavior can be changed in the data layer without rewriting the components that display them. This keeps a visually complex interface maintainable and makes future content additions predictable.

## Running locally

### Requirements

- Node.js 20 or later
- npm

### Setup

```bash
git clone https://github.com/Ali-Sdg90/ali-sdg90.github.io.git
cd ali-sdg90.github.io
npm install
npm run dev
```

Vite will print the local development address after the server starts. To expose the development server to another device on the same network, use:

```bash
npm run mobile
```

### Available scripts

| Command                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the Vite development server                      |
| `npm run mobile`       | Start Vite on the local network at port 5173           |
| `npm run build`        | Create an optimized production build                   |
| `npm run preview`      | Preview the production build locally                   |
| `npm run lint`         | Check the codebase with ESLint                         |
| `npm run lint:fix`     | Apply safe ESLint fixes                                |
| `npm run format`       | Format supported files with Prettier                   |
| `npm run format:check` | Verify formatting without changing files               |
| `npm run check`        | Run formatting checks, linting, and a production build |

## Quality, performance, and accessibility

The project treats polish as part of the implementation rather than a final visual pass. Current considerations include:

- Low-resolution thumbnails for the normal interface and higher-quality assets loaded for lightbox viewing
- Lazy media loading where appropriate to reduce unnecessary initial work
- Keyboard activation for interactive shelf cards and keyboard navigation in the build journal
- Visible focus states and semantic controls for primary interactions
- Reduced-motion behavior for visitors who prefer less animation
- Container-relative sizing to preserve composition without hard-coding the experience to one monitor
- Production-only Umami analytics, limited to understanding interactions and improving the experience
- Deliberate exclusion of private photographs and information belonging to other people

## Development and release workflow

Pre-commit hooks verify formatting and linting, while commit messages follow the Conventional Commits format. Pull requests receive isolated GitHub Pages previews so visual changes can be reviewed in a production-like environment.

Changes merged into `main` pass through the automated release workflow. When a release is warranted, semantic-release determines the next version, updates the changelog, creates the Git tag and GitHub release, and allows the production build to be deployed to GitHub Pages. The deployment also includes a fallback page for client-side navigation.

## Current development focus

The desktop experience and its central interactions are in place. Work is continuing in a few focused areas:

- Completing and reviewing project, career, and story content
- Building the dedicated mobile and tablet experience
- Refining edge cases across viewport sizes and browser zoom levels
- Continuing accessibility, performance, and image-delivery improvements
- Final visual and interaction quality assurance

Until the dedicated small-screen experience is complete, the portfolio is best viewed on a desktop or laptop display.

## License

Copyright © 2026 Ali Sadeghi. All rights reserved.

The repository is publicly available for viewing, personal study, and educational reference. Its source code, design, structure, written content, branding, résumé, photographs, and other assets may not be copied, redistributed, deployed, or used to create a substantially similar portfolio without prior written permission. See the [LICENSE](./LICENSE) file for the complete terms.
