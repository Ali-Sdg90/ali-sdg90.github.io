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

    test("keeps repeated cards out of the tab order while preserving their links", () => {
        const onSelect = vi.fn();
        render(
            <ShelfCard
                {...baseProps}
                isAccessible={false}
                onSelect={onSelect}
            />,
        );
        const card = screen.getByRole("link", {
            hidden: true,
            name: /project title/i,
        });

        expect(card).toHaveAttribute("href", "/projects/project-title/");
        expect(card).toHaveAttribute("tabindex", "-1");
        expect(card).toHaveAttribute("draggable", "false");

        fireEvent.click(card);

        expect(onSelect).toHaveBeenCalledWith({
            itemId: "project-title",
            sectionId: "projects",
        });
    });

    test("leaves control-click navigation to the browser for repeated cards", () => {
        const onSelect = vi.fn();

        render(
            <ShelfCard
                {...baseProps}
                isAccessible={false}
                onSelect={onSelect}
            />,
        );

        const card = screen.getByRole("link", {
            hidden: true,
            name: /project title/i,
        });
        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            ctrlKey: true,
        });

        card.addEventListener("click", (event) => event.preventDefault(), {
            once: true,
        });
        card.dispatchEvent(clickEvent);

        expect(onSelect).not.toHaveBeenCalled();
    });
});
