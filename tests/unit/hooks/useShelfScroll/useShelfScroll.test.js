import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useShelfScroll from "../../../../src/hooks/useShelfScroll";

const shelfSections = [
    {
        autoScrollSpeed: 0,
        doRepeat: false,
        id: "projects",
    },
];

const createScroller = () => {
    const scroller = document.createElement("div");

    Object.defineProperties(scroller, {
        clientWidth: { configurable: true, value: 400 },
        scrollWidth: { configurable: true, value: 800 },
    });
    scroller.hasPointerCapture = vi.fn(() => false);
    scroller.releasePointerCapture = vi.fn();
    scroller.setPointerCapture = vi.fn();

    return scroller;
};

const addRepeatedCardSet = (scroller, width = 300) => {
    const cardSet = document.createElement("div");

    cardSet.className = "shelf-card-set";
    scroller.style.columnGap = "20px";
    Object.defineProperty(cardSet, "offsetWidth", {
        configurable: true,
        value: width,
    });
    scroller.appendChild(cardSet);
};

describe("useShelfScroll", () => {
    test("suppresses the synthetic click produced after a real shelf drag", () => {
        const { result } = renderHook(() =>
            useShelfScroll(shelfSections, undefined),
        );
        const scroller = createScroller();
        const preventMoveDefault = vi.fn();

        act(() => {
            result.current.setScrollerRef(0, scroller);
            result.current.handlePointerDown(
                {
                    button: 0,
                    clientX: 100,
                    currentTarget: scroller,
                    pointerId: 1,
                },
                0,
            );
            result.current.handlePointerMove({
                clientX: 90,
                currentTarget: scroller,
                pointerId: 1,
                preventDefault: preventMoveDefault,
            });
            result.current.stopDragging({
                currentTarget: scroller,
                pointerId: 1,
            });
        });

        const preventClickDefault = vi.fn();
        const stopPropagation = vi.fn();

        act(() => {
            result.current.handleClickCapture({
                preventDefault: preventClickDefault,
                stopPropagation,
            });
        });

        expect(preventMoveDefault).toHaveBeenCalledOnce();
        expect(preventClickDefault).toHaveBeenCalledOnce();
        expect(stopPropagation).toHaveBeenCalledOnce();
    });

    test("does not suppress a click when the pointer never became a drag", () => {
        const { result } = renderHook(() =>
            useShelfScroll(shelfSections, undefined),
        );
        const scroller = createScroller();

        act(() => {
            result.current.setScrollerRef(0, scroller);
            result.current.handlePointerDown(
                {
                    button: 0,
                    clientX: 100,
                    currentTarget: scroller,
                    pointerId: 1,
                },
                0,
            );
            result.current.stopDragging({
                currentTarget: scroller,
                pointerId: 1,
            });
        });

        const preventDefault = vi.fn();
        const stopPropagation = vi.fn();

        act(() => {
            result.current.handleClickCapture({
                preventDefault,
                stopPropagation,
            });
        });

        expect(preventDefault).not.toHaveBeenCalled();
        expect(stopPropagation).not.toHaveBeenCalled();
    });

    test("keeps the measured loop width cached until the viewport resizes", () => {
        const repeatedSections = [
            {
                autoScrollSpeed: 16,
                doRepeat: true,
                id: "achievements",
            },
        ];
        const { result } = renderHook(() =>
            useShelfScroll(repeatedSections, undefined),
        );
        const scroller = createScroller();
        const computedStyleSpy = vi.spyOn(window, "getComputedStyle");

        addRepeatedCardSet(scroller);

        act(() => {
            result.current.setScrollerRef(0, scroller);
            result.current.handlePointerDown(
                {
                    button: 0,
                    clientX: 100,
                    currentTarget: scroller,
                    pointerId: 1,
                },
                0,
            );
            result.current.handlePointerMove({
                clientX: 90,
                currentTarget: scroller,
                pointerId: 1,
                preventDefault: vi.fn(),
            });
        });

        expect(computedStyleSpy).toHaveBeenCalledOnce();

        act(() => {
            window.dispatchEvent(new Event("resize"));
        });

        expect(computedStyleSpy).toHaveBeenCalledTimes(2);
        computedStyleSpy.mockRestore();
    });
});
