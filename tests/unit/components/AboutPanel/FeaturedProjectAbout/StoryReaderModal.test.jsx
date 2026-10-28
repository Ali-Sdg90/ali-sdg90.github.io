import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, test, vi } from "vitest";

import StoryReaderModal from "../../../../../src/components/AboutPanel/FeaturedProjectAbout/StoryReaderModal";

const defaultProps = {
    initialLanguage: "EN",
    onClose: vi.fn(),
    storyEN: "English opening.\n\nEnglish ending.",
    storyFA: "شروع فارسی.\n\nپایان فارسی.",
    storySource: { collection: "projects", slug: "sample-project" },
    storyType: "projects",
    title: "Sample project",
};

describe("StoryReaderModal", () => {
    test("renders the English story with its accessible source link", () => {
        render(<StoryReaderModal {...defaultProps} />);

        expect(
            screen.getByRole("dialog", { name: "Sample project" }),
        ).toBeInTheDocument();
        expect(screen.getByText("English opening.")).toBeInTheDocument();
        expect(screen.getByText("English ending.")).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /view on github/i }),
        ).toHaveAttribute(
            "href",
            expect.stringContaining("/en/projects/sample-project.md"),
        );
        expect(document.body).toHaveStyle({ overflow: "hidden" });
    });

    test("switches an uncontrolled reader to the Persian story", async () => {
        const user = userEvent.setup();
        const onLanguageChange = vi.fn();

        render(
            <StoryReaderModal
                {...defaultProps}
                onLanguageChange={onLanguageChange}
            />,
        );
        await user.click(screen.getByRole("button", { name: "FA" }));

        expect(onLanguageChange).toHaveBeenCalledWith("FA");
        expect(screen.getByText("شروع فارسی.")).toBeInTheDocument();
        expect(
            screen.getByText("شروع فارسی.").closest("div[lang]"),
        ).toHaveAttribute("dir", "rtl");
        expect(
            screen.getByRole("link", { name: /view on github/i }),
        ).toHaveAttribute(
            "href",
            expect.stringContaining("/fa/projects/sample-project.md"),
        );
    });

    test("closes with Escape and restores focus after the exit transition", () => {
        vi.useFakeTimers();

        const Harness = () => {
            const [isOpen, setIsOpen] = useState(true);
            const triggerRef = useRef(null);

            return (
                <>
                    <button type="button" ref={triggerRef}>
                        Open story
                    </button>
                    {isOpen && (
                        <StoryReaderModal
                            {...defaultProps}
                            onClose={() => setIsOpen(false)}
                            returnFocusRef={triggerRef}
                        />
                    )}
                </>
            );
        };

        render(<Harness />);
        fireEvent.keyDown(window, { key: "Escape" });
        act(() => vi.advanceTimersByTime(220));

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Open story" }),
        ).toHaveFocus();
        expect(document.body).not.toHaveStyle({ overflow: "hidden" });

        vi.useRealTimers();
    });

    test("keeps keyboard focus inside the dialog", () => {
        render(<StoryReaderModal {...defaultProps} />);

        const closeButton = screen.getByRole("button", {
            name: "Close story",
        });
        const sourceLink = screen.getByRole("link", {
            name: /view on github/i,
        });

        sourceLink.focus();
        fireEvent.keyDown(window, { key: "Tab" });
        expect(closeButton).toHaveFocus();

        fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
        expect(sourceLink).toHaveFocus();
    });
});
