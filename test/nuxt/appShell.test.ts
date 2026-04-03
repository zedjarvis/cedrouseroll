import { defineComponent, ref } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppRoot from "~/app.vue";
import IndexPage from "~/pages/index.vue";
import HelloWorldPage from "~/pages/writing/hello-world.vue";
import DraftPage from "~/pages/writing/writing-code-in-the-age-of-ai.vue";

const {
  colorModeState,
  useHeadSpy,
  useSeoMetaSpy,
  computeFromElSpy,
} = vi.hoisted(() => ({
  colorModeState: { preference: "system", value: "light" },
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
    public: {
      siteUrl: "https://www.cedrouseroll.dev",
      supabase: {
        url: "https://example.supabase.co",
        key: "test-publishable-key",
        cookieOptions: {},
        cookiePrefix: "sb-test",
        useSsrCookies: false,
        clientOptions: {
          global: {},
        },
      },
    },
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
    colorModeState.preference = "system";
    colorModeState.value = "light";
    useHeadSpy.mockReset();
    useSeoMetaSpy.mockReset();
    computeFromElSpy.mockReset();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("respects system mode at the app root and syncs theme-color", async () => {
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

    expect(colorModeState.preference).toBe("system");
    expect(useHeadSpy).toHaveBeenCalledTimes(1);
    const headConfig = useHeadSpy.mock.calls[0]?.[0];
    expect(typeof headConfig).toBe("function");
    expect(headConfig()).toEqual({
      meta: [{ name: "theme-color", content: "#f6f2e9" }],
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

  it("attaches homepage seo metadata and structured data", async () => {
    class IntersectionObserverMock {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      constructor(
        _callback?: IntersectionObserverCallback,
        _options?: IntersectionObserverInit,
      ) {}
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query.includes("prefers-reduced-motion") ? false : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );

    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: {
          GradualBlur: AppStub,
          IndexHeader: AppStub,
          IntroSection: AppStub,
          WorkSection: AppStub,
          ExperienceSection: AppStub,
          TestimonialSection: AppStub,
          StackSection: AppStub,
          VentureSection: AppStub,
          WritingSection: AppStub,
          PersonalSection: AppStub,
          ContactSection: AppStub,
          LazyWorkSection: AppStub,
          LazyExperienceSection: AppStub,
          LazyTestimonialSection: AppStub,
          LazyStackSection: AppStub,
          LazyVentureSection: AppStub,
          LazyWritingSection: AppStub,
          LazyPersonalSection: AppStub,
          LazyContactSection: AppStub,
        },
      },
    });

    expect(useSeoMetaSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title:
          "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
        ogUrl: "https://www.cedrouseroll.dev/",
      }),
    );
    expect(useHeadSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        link: [
          { rel: "canonical", href: "https://www.cedrouseroll.dev/" },
        ],
        script: expect.arrayContaining([
          expect.objectContaining({ type: "application/ld+json" }),
        ]),
      }),
    );
    const structuredData = useHeadSpy.mock.calls
      .flatMap(([arg]) => (typeof arg === "function" ? [] : (arg.script ?? [])))
      .map((entry) => entry.children);
    expect(structuredData.join(" ")).toContain(
      "Featured software engineering projects",
    );
    expect(wrapper.find("#main").exists()).toBe(true);
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
