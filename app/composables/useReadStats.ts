// composables/useReadStats.ts
export function useReadStats(options?: {
  wpm?: number;
  // extra words to ignore that aren't part of the article (e.g., "more", nav, etc.)
  ignoreSelectors?: string[];
}) {
  const wpm = options?.wpm ?? 200;

  const wordCount = ref(0);
  const readTime = computed(() =>
    Math.max(1, Math.ceil(wordCount.value / wpm)),
  );

  function countWordsFromText(text: string) {
    // Normalize whitespace and count “word-like” tokens.
    // Keeps it simple and robust for prose.
    const cleaned = text.replace(/\s+/g, " ").trim();

    if (!cleaned) return 0;
    return cleaned.split(" ").length;
  }

  function computeFromEl(el: HTMLElement | null) {
    if (!el) return;

    // Optionally remove text from certain subtrees
    if (options?.ignoreSelectors?.length) {
      const clone = el.cloneNode(true) as HTMLElement;
      for (const sel of options.ignoreSelectors) {
        clone.querySelectorAll(sel).forEach((n) => n.remove());
      }
      wordCount.value = countWordsFromText(clone.textContent ?? "");
      return;
    }

    wordCount.value = countWordsFromText(el.textContent ?? "");
  }

  return { wordCount, readTime, computeFromEl };
}
