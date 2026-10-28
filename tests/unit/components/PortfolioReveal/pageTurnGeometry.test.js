import { describe, expect, test } from "vitest";

import {
    getPageTurnGeometry,
    pointOnCubicPath,
} from "../../../../src/components/PortfolioReveal/pageTurnGeometry";

const curve = [
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 0 },
];

describe("page-turn geometry", () => {
    test("keeps cubic path endpoints anchored", () => {
        expect(pointOnCubicPath(curve, 0)).toEqual(curve[0]);
        expect(pointOnCubicPath(curve, 1)).toEqual(curve[3]);
    });

    test("interpolates the expected cubic midpoint", () => {
        expect(pointOnCubicPath(curve, 0.5)).toEqual({ x: 50, y: 75 });
    });

    test("produces usable clip paths and crease data for a normal drag", () => {
        const geometry = getPageTurnGeometry(800, 600, {
            x: 520,
            y: 360,
        });

        expect(geometry.topClip).toMatch(/^polygon\(/);
        expect(geometry.underClip).toMatch(/^polygon\(/);
        expect(geometry.backClip).toMatch(/^polygon\(/);
        expect(geometry.creaseLength).toBeGreaterThan(0);
        expect(Number.isFinite(geometry.creaseAngle)).toBe(true);
    });

    test("keeps the transform finite at the fully turned corner", () => {
        const geometry = getPageTurnGeometry(800, 600, { x: 0, y: 0 });

        expect(geometry.backTransform).not.toContain("NaN");
        expect(geometry.backTransform).not.toContain("Infinity");
        expect(geometry.creaseX).toBeGreaterThanOrEqual(0);
        expect(geometry.creaseY).toBeGreaterThanOrEqual(0);
    });

    test("collapses safely instead of returning invalid polygons at rest", () => {
        const geometry = getPageTurnGeometry(800, 600, {
            x: 800,
            y: 600,
        });

        expect(geometry.topClip).toMatch(/^polygon\(/);
        expect(geometry.underClip).toMatch(/^polygon\(/);
        expect(geometry.backTransform).not.toContain("NaN");
        expect(geometry.creaseLength).toBe(0);
    });
});
