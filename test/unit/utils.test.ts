import { describe, expect, it } from "vitest";
import { cn } from "../../app/lib/utils";

describe("cn", () => {
  it("merges tailwind class conflicts", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm");
  });

  it("supports clsx-style conditional inputs", () => {
    expect(cn("base", ["rounded", false && "hidden"], { block: true })).toBe(
      "base rounded block",
    );
  });
});
