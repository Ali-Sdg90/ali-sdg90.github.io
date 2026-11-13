import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import LightboxImage from "../../../src/components/ui/LightboxImage";

const images = [
    {
        src: "/first-thumb.webp",
        lightboxSrc: "/first-full.webp",
        alt: "First gallery image",
        width: 240,
        height: 160,
        lightboxWidth: 1200,
        lightboxHeight: 800,
    },
    {
        src: "/second-thumb.webp",
        lightboxSrc: "/second-full.webp",
        alt: "Second gallery image",
        width: 240,
        height: 160,
        lightboxWidth: 1200,
        lightboxHeight: 800,
    },
    {
        src: "/third-thumb.webp",
        lightboxSrc: "/third-full.webp",
        alt: "Third gallery image",
        width: 240,
        height: 160,
        lightboxWidth: 1200,
        lightboxHeight: 800,
    },
];

beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
        writable: true,
    });
});

describe("ImageLightbox gallery navigation", () => {
    test("moves between images and disables navigation at the boundaries", async () => {
        const onImageChange = vi.fn();

        render(
            <LightboxImage
                image={images[1]}
                images={images}
                imageIndex={1}
                onImageChange={onImageChange}
                buttonClassName="gallery-trigger"
                imageClassName="gallery-image"
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Preview Second gallery image",
            }),
        );

        const dialog = await screen.findByRole(
            "dialog",
            {
                name: "Second gallery image image preview",
            },
            { timeout: 3000 },
        );

        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveClass("has-navigation");

        const previousButton = screen.getByRole("button", {
            name: "Previous image",
        });
        const nextButton = screen.getByRole("button", {
            name: "Next image",
        });

        expect(
            previousButton.closest(".about-panel-lightbox-navigation-layer"),
        ).toBeInTheDocument();
        expect(
            previousButton.closest(".about-panel-lightbox-frame"),
        ).not.toBeInTheDocument();
        expect(previousButton).toBeEnabled();
        expect(nextButton).toBeEnabled();

        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(
                screen.getByRole("dialog", {
                    name: "Third gallery image image preview",
                }),
            ).toBeInTheDocument();
        });
        expect(nextButton).toBeDisabled();
        expect(onImageChange).toHaveBeenLastCalledWith(2, images[2]);

        fireEvent.keyDown(window, { key: "ArrowLeft" });
        fireEvent.keyDown(window, { key: "ArrowLeft" });

        await waitFor(() => {
            expect(
                screen.getByRole("dialog", {
                    name: "First gallery image image preview",
                }),
            ).toBeInTheDocument();
        });
        expect(previousButton).toBeDisabled();
        expect(nextButton).toBeEnabled();
    });

    test("does not render navigation controls for a single image", async () => {
        render(
            <LightboxImage
                image={images[0]}
                buttonClassName="gallery-trigger"
                imageClassName="gallery-image"
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Preview First gallery image",
            }),
        );

        const dialog = await screen.findByRole("dialog", {
            name: "First gallery image image preview",
        });

        expect(dialog).toBeInTheDocument();
        expect(dialog).not.toHaveClass("has-navigation");
        expect(
            screen.queryByRole("button", { name: "Previous image" }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Next image" }),
        ).not.toBeInTheDocument();
    });
});
