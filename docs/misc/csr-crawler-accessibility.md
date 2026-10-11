### Issue: Portfolio Content Is Not Accessible to Non-JavaScript Crawlers

**Website:** https://ali-sdg.is-a.dev/

**Problem:**

The portfolio is built with React and Vite using Client-Side Rendering (CSR). The initial HTML response contains an essentially empty `<div id="root"></div>`, while the actual portfolio content (About Me, Projects, Career, Impacts, Tech Stack, etc.) is rendered dynamically through JavaScript.

During an external LLM-based website inspection, the crawler could identify the page title but failed to extract the actual page content. The information was only accessible through the GitHub repository and supplementary Markdown files.

**Why it matters:**

- LLM agents and crawlers that don't execute JavaScript cannot reliably understand the portfolio.
- Search engines that support JavaScript rendering may still process the content, but accessibility varies across crawlers.
- Project descriptions, professional experience, and achievements may be missed by AI-powered search and recruitment tools.

**Potential Solution:**

Investigate build-time Static Site Generation (SSG), prerendering, or generating semantic static HTML from the existing portfolio data.

The goal is to make meaningful content available in the initial HTML response (visible through View Page Source / Ctrl+U), without requiring JavaScript execution.

**Important Constraints:**

- Preserve the existing React/Vite architecture, interactive shelf, animations, and overall user experience.
- Avoid maintaining duplicate content manually; reuse the existing structured data.
- Consider the existing desktop/mobile rendering logic, hash-based navigation, and React hydration compatibility.
- Avoid hidden crawler-only content or cloaking.
- Keep the solution compatible with the current static hosting setup.
- Existing `llms.txt` and Markdown resources can remain as supplementary machine-readable sources.

**Acceptance Criteria:**

1. A crawler fetching the homepage without executing JavaScript can extract meaningful portfolio information.
2. The initial HTML contains semantic, structured content about the developer, projects, career, and achievements.
3. The interactive experience remains functional and visually unchanged.
4. Content remains synchronized with the existing portfolio data.
5. No hydration errors, duplicated visible content, or regressions in desktop/mobile behavior.
6. Verify the production build using raw HTTP responses, not only the browser's rendered DOM.

**Note:** The original inspection did not establish that bots were being blocked. The confirmed architectural concern is the lack of portfolio content in the initial CSR HTML.
