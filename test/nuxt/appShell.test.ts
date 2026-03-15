import { defineComponent, ref } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppRoot from "~/app.vue";
import HelloWorldPage from "~/pages/writing/hello-world.vue";
import DraftPage from "~/pages/writing/writing-code-in-the-age-of-ai.vue";

const {
  colorModeState,
  useHeadSpy,
  useSeoMetaSpy,
  computeFromElSpy,
} = vi.hoisted(() => ({
  colorModeState: { preference: "light" },
  useHeadSpy: vi.fn(),
  useSeoMetaSpy: vi.fn(),
  computeFromElSpy: vi.fn(),
}));

mockNuxtImport("useColorMode", () => {
  return () => colorModeState;
});

mockNuxtImport("useHead", () => useHeadSpy);
mockNuxtImport("useSeoMeta", () => useSeoMetaSpy);
mockNuxtImport("useRuntimeConfig", () => {
  return () => ({
    app: { baseURL: "/" },
    public: { siteUrl: "https://www.cedrouseroll.dev" },
  });
});
mockNuxtImport("useReadStats", () => {
  return () => ({
    wordCount: ref(120),
    readTime: ref(2),
    computeFromEl: computeFromElSpy,
  });
});

const AppStub = defineComponent({
  template: "<div><slot /></div>",
});

const LinkStub = defineComponent({
  props: { to: { type: String, default: "" } },
  template: '<a :href="to"><slot /></a>',
});

describe("app shell and pages", () => {
  beforeEach(() => {
    colorModeState.preference = "light";
    useHeadSpy.mockReset();
    useSeoMetaSpy.mockReset();
    computeFromElSpy.mockReset();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("forces dark mode at the app root and sets root html class", async () => {
    const wrapper = await mountSuspended(AppRoot, {
      global: {
        stubs: {
          Toaster: AppStub,
          NuxtRouteAnnouncer: AppStub,
          NuxtLoadingIndicator: AppStub,
          NuxtLayout: AppStub,
          NuxtPage: AppStub,
        },
      },
    });

    expect(colorModeState.preference).toBe("dark");
    expect(useHeadSpy).toHaveBeenCalledWith({
      htmlAttrs: {
        class: "dark",
      },
    });
    expect(wrapper.classes()).toContain("min-h-screen");
  });

  it("renders the published article and attaches article metadata", async () => {
    const wrapper = await mountSuspended(HelloWorldPage, {
      global: {
        stubs: {
          NuxtLink: LinkStub,
          CornerDownLeft: AppStub,
          Clock: AppStub,
          TextAlignStart: AppStub,
        },
      },
    });

    expect(computeFromElSpy).toHaveBeenCalledTimes(1);
    expect(useSeoMetaSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ogType: "article",
        ogUrl: "https://www.cedrouseroll.dev/writing/hello-world",
      }),
    );
    expect(useHeadSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        link: [
          {
            rel: "canonical",
            href: "https://www.cedrouseroll.dev/writing/hello-world",
          },
        ],
      }),
    );
    expect(wrapper.text()).toContain("Hello world.");
    expect(wrapper.text()).toContain("JAN 26, 2026");
    expect(wrapper.find('a[href="/"]').exists()).toBe(true);
  });

  it("renders the draft article with noindex metadata", async () => {
    const wrapper = await mountSuspended(DraftPage, {
      global: {
        stubs: {
          NuxtLink: LinkStub,
          CornerDownLeft: AppStub,
          Clock: AppStub,
          TextAlignStart: AppStub,
          SectionTitle: defineComponent({
            props: { text: { type: String, required: true } },
            template: "<h2>{{ text }}</h2>",
          }),
        },
      },
    });

    expect(computeFromElSpy).toHaveBeenCalledTimes(1);
    expect(useSeoMetaSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        robots: "noindex, nofollow",
        googlebot: "noindex, nofollow",
      }),
    );
    expect(useHeadSpy).toHaveBeenCalledWith({
      link: [
        {
          rel: "canonical",
          href: "https://www.cedrouseroll.dev/writing/writing-code-in-the-age-of-ai",
        },
      ],
    });
    expect(wrapper.text()).toContain("Writing Code in the Age of AI.");
    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.find('a[href="/writing/hello-world"]').exists()).toBe(true);
  });
});
