import { describe, expect, it } from "vitest";
import { useReadStats } from "~/composables/useReadStats";

describe("useReadStats", () => {
  it("counts words and computes default read time", () => {
    const { wordCount, readTime, computeFromEl } = useReadStats();
    const el = document.createElement("article");
    el.textContent = " one   two\nthree   four ";

    computeFromEl(el);

    expect(wordCount.value).toBe(4);
    expect(readTime.value).toBe(1);
  });

  it("respects custom words-per-minute option", () => {
    const { readTime, computeFromEl } = useReadStats({ wpm: 100 });
    const el = document.createElement("article");
    el.textContent = Array.from({ length: 250 }, (_, i) => `w${i}`).join(" ");

    computeFromEl(el);

    expect(readTime.value).toBe(3);
  });

  it("excludes ignored selector text", () => {
    const { wordCount, computeFromEl } = useReadStats({
      ignoreSelectors: [".ignore", "[data-ignore]"],
    });

    const el = document.createElement("article");
    el.innerHTML = `
      <p>main copy words</p>
      <aside class="ignore">do not count these words</aside>
      <div data-ignore>and not these either</div>
    `;

    computeFromEl(el);

    expect(wordCount.value).toBe(3);
  });

  it("ignores null element input", () => {
    const { wordCount, computeFromEl } = useReadStats();

    computeFromEl(null);

    expect(wordCount.value).toBe(0);
  });
});
