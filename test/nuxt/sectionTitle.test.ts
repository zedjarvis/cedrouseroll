import { mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SectionTitle from "~/components/SectionTitle.vue";

describe("SectionTitle", () => {
  beforeEach(() => {
    vi.stubGlobal("__NUXT_COLOR_MODE__", {
      preference: "light",
      value: "light",
      getColorScheme: () => "light",
      addColorScheme: vi.fn(),
      removeColorScheme: vi.fn(),
    });
  });

  it("renders text with default paragraph tag", async () => {
    const wrapper = await mountSuspended(SectionTitle, {
      props: { text: "Work" },
    });

    const el = wrapper.get("p");
    expect(el.text()).toBe("Work");
  });

  it("renders requested semantic tag and id", async () => {
    const wrapper = await mountSuspended(SectionTitle, {
      props: { text: "Contact", as: "h2", id: "contact-title" },
    });

    const el = wrapper.get("h2#contact-title");
    expect(el.text()).toBe("Contact");
  });
});
