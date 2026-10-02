## Mobile Portfolio Direction

The mobile version should **not be a compressed copy of the desktop shelf experience**.

Instead, it should reinterpret the same visual language into a layout designed specifically for touch and vertical scrolling.

### Core approach

- Use the finalized **Intro page content** as the top section of the mobile experience.
- Keep the mobile layout vertically scrollable.
- Replace the large 3D desktop shelf with multiple independent **horizontal shelf rows**:
    - Featured Projects
    - Impact in Numbers
    - Tech Stack
    - Career Journey
- Each row should support natural horizontal swipe, momentum, and `scroll-snap`.
- Show part of the next card so users immediately understand that the row is swipeable.
- Preserve the visual identity of the desktop shelf through shelf edges, shadows, glow, depth, and subtle perspective — without recreating the full desktop scene.
- The shelf should become a **design language**, rather than one large object.

### Card details

Tapping a card should open a dedicated **full-screen mobile detail view** instead of the desktop side panel.

This view can reuse the existing project, career, impact, tech-stack, gallery, tags, links, language, and content data, while using a mobile-specific presentation.

Possible structure:

- Back navigation
- Image / visual
- Title and subtitle
- Tags
- Description / story
- Gallery
- Relevant links and actions

The same mobile detail shell can be reused for:

- About Me
- Projects
- Impact items
- Tech Stack items
- Career entries

### About Me

On mobile, About Me should also open as a dedicated full-screen detail page rather than a fixed side panel.

It can be slightly more personal than the desktop version and may include small signals about Ali outside of software, such as interests, hobbies, and values, without turning into a large separate lifestyle section.

### Architecture idea

```text
DesktopPortfolio
├── Intro
├── Shelf
└── AboutPanel

MobilePortfolio
├── MobileIntro
├── MobileShelfSection × 4
└── MobileDetailView
```

Reuse the existing data layer and detail content wherever possible, but keep the mobile presentation independent from the desktop shelf implementation.

### Important design principle

The mobile version should feel unmistakably like the same portfolio, but it should **not feel like the desktop layout was forced into a narrow screen**.

Desktop = one immersive shelf scene.

Mobile = a vertical journey made of smaller swipeable shelf sections.
