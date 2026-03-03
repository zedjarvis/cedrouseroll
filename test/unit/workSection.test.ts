import { describe, expect, it } from "vitest";
import {
  clampOffset,
  createOffsetMap,
  getKeyboardStep,
  isWorkCardControlKey,
} from "../../app/lib/workSection";

describe("workSection helpers", () => {
  it("creates a default offset map", () => {
    expect(createOffsetMap(["a", "b"])).toEqual({
      a: { x: 0, y: 0 },
      b: { x: 0, y: 0 },
    });
  });

  it("clamps offset within bounds", () => {
    expect(
      clampOffset(
        { x: 40, y: -20 },
        { minX: -10, maxX: 10, minY: -5, maxY: 30 },
      ),
    ).toEqual({ x: 10, y: -5 });
  });

  it("returns larger keyboard step when shift is pressed", () => {
    expect(getKeyboardStep(false)).toBe(4);
    expect(getKeyboardStep(true)).toBe(12);
  });

  it("recognizes control keys used for work cards", () => {
    expect(isWorkCardControlKey("ArrowLeft")).toBe(true);
    expect(isWorkCardControlKey("Escape")).toBe(true);
    expect(isWorkCardControlKey("Tab")).toBe(false);
  });
});
