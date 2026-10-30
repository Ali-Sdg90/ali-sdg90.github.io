import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ShelfCard from "../../../../src/components/Shelf/ShelfCard.jsx";

const baseProps = {
    cardHeight: "120px",
    cardWidth: "180px",
    item: {
        imageWidth: 300,
        imageHeight: 300,
        meta: "Project meta",
        title: "Project title",
    },
    itemId: "project-title",
    sectionId: "projects",
};

describe("ShelfCard", () => {
    test("keeps the progressive-enhancement link from becoming natively draggable", () => {
        const onSelect = vi.fn();

        render(<ShelfCard {...baseProps} onSelect={onSelect} />);

        const card = screen.getByRole("link", { name: /project title/i });
        const dragStartEvent = new Event("dragstart", {
            bubbles: true,
            cancelable: true,
        });

        expect(card).toHaveAttribute("draggable", "false");
        expect(card.dispatchEvent(dragStartEvent)).toBe(false);
        expect(dragStartEvent.defaultPrevented).toBe(true);

        fireEvent.click(card);

        expect(onSelect).toHaveBeenCalledWith({
            itemId: "project-title",
            sectionId: "projects",
        });
    });

    test("selects visible repeated cards without turning them into links", () => {
        const onSelect = vi.fn();
        const { container } = render(
            <ShelfCard
                {...baseProps}
                isAccessible={false}
                onSelect={onSelect}
            />,
        );
        const card = container.querySelector(".shelf-card");

        expect(card).toBeInstanceOf(HTMLElement);
        expect(card.tagName).toBe("ARTICLE");
        expect(card).not.toHaveAttribute("href");

        fireEvent.click(card);

        expect(onSelect).toHaveBeenCalledWith({
            itemId: "project-title",
            sectionId: "projects",
        });
    });
});
