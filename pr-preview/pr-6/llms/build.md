# How the Portfolio Was Built

This page is the concise technical summary of all 34 slides in the portfolio's visual build journal. The complete bilingual story documents roughly four months of work through early sketches, rejected ideas, design decisions, engineering challenges, and final refinements.

[Read all 34 slides in the complete visual story](https://ali-sdg.is-a.dev/how-i-built-my-portfolio/)

## From idea to visual direction

Ali wanted a personal hub that felt more expressive than a conventional portfolio. The project began with a simple bookshelf sketch in Microsoft Paint, followed by design exploration with ChatGPT. The final shelf artwork was developed through image generation and refined in Photoshop so its lighting, shadow, reflection, and background would blend into one scene.

## Building the shelf experience

The portfolio was implemented with React 19, Vite 8, SCSS, and Framer Motion. Matching interactive cards to the shelf's perspective required custom dimensions, rotations, depth, speed, and movement behavior for each row. Container query units tie the interface to the shelf's size so the composition remains stable across screens and zoom levels. Dragging, momentum, friction, infinite rows, and edge shadows make the shelf feel like a physical part of the scene.

Instead of opening several movable modals, selecting a card reuses the main About area as a focused detail panel. The content is data-driven, allowing projects, impact figures, technologies, and career entries to share one interaction system while keeping their own layouts and stories.

## Content, imagery, and privacy

Each card can expand into structured details, galleries, related links, and stories written in English and Persian. During development, Ali removed community photos and non-public information from the galleries, choosing to show his own work without exposing other people.

The image workflow separates lightweight thumbnails from higher-quality lightbox assets. An automated Sharp pipeline prepares optimized WebP files from source images, reducing initial transfer size while preserving detailed versions for intentional viewing.

## A separate mobile experience

Shrinking the desktop shelf technically worked, but it was uncomfortable to use on a phone. The mobile portfolio was therefore designed as a separate composition with touch-friendly horizontal collections, focused sections, and bottom sheets for card details. It keeps the desktop version's content, colors, and identity without forcing the same layout onto a smaller screen.

## Performance and final refinements

Desktop and mobile rendering were separated, expensive visual effects were reduced where appropriate, and image delivery was optimized. During the documented optimization pass, the Lighthouse performance score improved from 76 to 98 on desktop and from 53 to 85 on mobile. Keyboard support and reduced-motion behavior were also added to the build journal and key interactions.

The completed project also includes a guided first-visit introduction, a custom page-peel entry into the build story, shareable navigation, a personal links page, and an animated 404 page. GitHub Actions, semantic-release, and GitHub Pages handle validation, releases, previews, and deployment.
