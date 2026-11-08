import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import StaticDetailPageLink from "../../../src/components/ui/StaticDetailPageLink.jsx";

describe("StaticDetailPageLink", () => {
    test("links a card to its standalone detail page", () => {
        render(
            <StaticDetailPageLink
                item={{ id: "azure-devops", title: "Azure DevOps" }}
                section={{ id: "tech-stack" }}
            />,
        );

        const link = screen.getByRole("link", {
            name: "Open as a standalone page Azure DevOps",
        });

        expect(link).toHaveAttribute("href", "/stack/azure-devops/");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noreferrer");
        expect(link).toHaveTextContent("Open as a standalone page");
    });

    test("does not render without a standalone route", () => {
        const { container } = render(
            <StaticDetailPageLink
                item={{ id: "about-me", title: "About me" }}
                section={{ id: "about" }}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
