import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import AskChatGPTSection from "../../../../../src/components/AboutPanel/FeaturedProjectAbout/AskChatGPTSection";
import { buildChatGPTPrompt } from "../../../../../src/components/AboutPanel/FeaturedProjectAbout/askChatGPT";
import { shelfSections } from "../../../../../src/data/portfolio/shelfSections";

const pageUrl = "https://ali-sdg.is-a.dev/projects/fabrexa-ai-ollama/";

describe("AskChatGPTSection", () => {
    test("opens ChatGPT with the approved project-page prompt", () => {
        render(
            <AskChatGPTSection
                item={{ id: "fabrexa-ai-ollama", title: "Fabrexa AI" }}
                section={{ id: "projects", label: "Featured Projects" }}
            />,
        );

        expect(
            screen.getByRole("heading", { name: "Ask ChatGPT" }),
        ).toBeInTheDocument();
        expect(
            screen.getByText("Get a summary or ask questions about this card."),
        ).toBeInTheDocument();

        const link = screen.getByRole("link", {
            name: "Ask ChatGPT about Fabrexa AI (opens in a new tab)",
        });
        const chatGPTUrl = new URL(link.getAttribute("href"));

        expect(chatGPTUrl.origin).toBe("https://chatgpt.com");
        expect(chatGPTUrl.searchParams.get("q")).toBe(
            [
                "Explore this project from Ali Sadeghi's portfolio: https://ali-sdg.is-a.dev/projects/fabrexa-ai-ollama/",
                "Summarize its background, technical decisions, challenges, and Ali's engineering experience. Use only information from the page, suggest 2–3 relevant follow-up questions, and say so if you cannot access it.",
            ].join("\n\n"),
        );
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(link).toHaveTextContent("Open in ChatGPT");
    });

    test.each([
        ["achievements", "Explore this achievement"],
        ["tech-stack", "Explore this technology"],
        ["career-journey", "Explore this career experience"],
    ])("builds a contextual prompt for %s cards", (sectionId, opening) => {
        const prompt = buildChatGPTPrompt({ pageUrl, sectionId });

        expect(prompt).toContain(opening);
        expect(prompt).toContain(pageUrl);
        expect(prompt).toContain("Use only information from the page");
        expect(prompt).toContain("suggest 2–3 relevant follow-up questions");
        expect(prompt).toContain("say so if you cannot access it");
    });

    test("renders for every visible shelf card", () => {
        const cardsWithoutChatGPT = shelfSections.flatMap((section) =>
            section.items
                .filter((item) => {
                    const html = renderToStaticMarkup(
                        <AskChatGPTSection item={item} section={section} />,
                    );

                    return !html.includes("featured-project-chatgpt");
                })
                .map((item) => `${section.id}:${item.id}`),
        );

        expect(cardsWithoutChatGPT).toEqual([]);
    });

    test("does not render for an item without a standalone page", () => {
        const { container } = render(
            <AskChatGPTSection
                item={{ id: "about-me", title: "About me" }}
                section={{ id: "about", label: "About" }}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
