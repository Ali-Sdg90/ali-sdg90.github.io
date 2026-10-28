import { describe, expect, test } from "vitest";

import {
    getLoopWidth,
    normalizeScrollPosition,
} from "../../../../src/hooks/useShelfScroll/scrollUtils";

const createScroller = ({ gap = 20, scrollLeft = 0, width = 300 } = {}) => {
    const scroller = document.createElement("div");
    const cardSet = document.createElement("div");

    cardSet.className = "shelf-card-set";
    scroller.style.columnGap = `${gap}px`;
    scroller.scrollLeft = scrollLeft;
    Object.defineProperty(cardSet, "offsetWidth", {
        configurable: true,
        value: width,
    });
    scroller.appendChild(cardSet);

    return scroller;
};

describe("infinite shelf scroll utilities", () => {
    test("returns zero when the repeated card set is unavailable", () => {
        expect(getLoopWidth(null)).toBe(0);
        expect(getLoopWidth(document.createElement("div"))).toBe(0);
    });

    test("calculates one complete loop including the layout gap", () => {
        expect(getLoopWidth(createScroller({ gap: 24, width: 420 }))).toBe(444);
    });

    test("preserves an explicit position when repetition is disabled", () => {
        const scroller = createScroller({ scrollLeft: 320 });

        expect(normalizeScrollPosition(scroller, 125, false)).toBe(125);
        expect(scroller.scrollLeft).toBe(125);
    });

    test("wraps positions below the safe repeated range", () => {
        const scroller = createScroller({ gap: 0, width: 300 });

        expect(normalizeScrollPosition(scroller, -25)).toBe(575);
        expect(scroller.scrollLeft).toBe(575);
    });

    test("wraps positions beyond the safe repeated range", () => {
        const scroller = createScroller({ gap: 0, width: 300 });

        expect(normalizeScrollPosition(scroller, 925)).toBe(625);
        expect(scroller.scrollLeft).toBe(625);
    });
});
