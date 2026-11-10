import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import FeaturedProjectAbout from "../../../../../src/components/AboutPanel/FeaturedProjectAbout/FeaturedProjectAbout";

const renderProjectDetail = (isStoryWip) =>
    renderToStaticMarkup(
        <FeaturedProjectAbout
            activeLanguage="EN"
            detail={{
                id: "sample-project",
                is_story_wip: isStoryWip,
                storyEN: "Placeholder",
                storyFA: "Placeholder",
                summary: "Project summary",
                title: "Sample project",
            }}
            isExpanded
            item={{ id: "sample-project", title: "Sample project" }}
            section={{ id: "projects", label: "Featured Projects" }}
        />,
    );

describe("FeaturedProjectAbout", () => {
    test("hides unfinished stories in the shared shelf and mobile detail view", () => {
        const html = renderProjectDetail(true);

        expect(html).not.toContain("featured-project-story");
        expect(html).not.toContain("Placeholder");
    });

    test("shows stories after their work-in-progress flag is cleared", () => {
        const html = renderProjectDetail(false);

        expect(html).toContain("featured-project-story");
        expect(html).toContain("Placeholder");
    });
});
