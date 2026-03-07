import { defineComponent, ref } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WorkSection from "~/components/WorkSection.vue";

const { breakpointState } = vi.hoisted(() => {
  return { breakpointState: { isMobile: false } };
});

mockNuxtImport("useBreakpoints", () => {
  return () => ({
    smaller: () => ref(breakpointState.isMobile),
  });
});

const mountWork = () =>
  mountSuspended(WorkSection, {
    global: {
      stubs: {
        SectionTitle: defineComponent({
          props: { text: String },
          template: "<h2>{{ text }}</h2>",
        }),
        SectionDescription: defineComponent({
          props: { text: String },
          template: "<p>{{ text }}</p>",
        }),
        ClientOnly: defineComponent({
          template: "<div><slot /></div>",
        }),
        DotGrid: defineComponent({
          template: '<div data-testid="dot-grid" />',
        }),
        Maximize: defineComponent({
          template: "<span />",
        }),
        SquareArrowOutUpRight: defineComponent({
          template: "<span />",
        }),
        NuxtImg: defineComponent({
          props: { src: String, alt: String },
          template: '<img :src="src" :alt="alt" />',
        }),
        NuxtLink: defineComponent({
          props: { to: String },
          template: '<a :href="to"><slot /></a>',
        }),
        AnimatedModal: defineComponent({
          props: { open: { type: Boolean, default: false } },
          emits: ["update:open"],
          template: '<div><slot v-if="open" /></div>',
        }),
        AnimatedModalBody: defineComponent({
          template: "<div><slot /></div>",
        }),
      },
    },
  });

describe("WorkSection", () => {
  beforeEach(() => {
    localStorage.clear();
    breakpointState.isMobile = false;
    vi.restoreAllMocks();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query.includes("min-width"),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );
  });

  it("loads persisted offsets on mount and applies translate style", async () => {
    localStorage.setItem(
      "work:dragOffsets:v1",
      JSON.stringify({ sb: { x: 9, y: -4 } }),
    );

    const wrapper = await mountWork();
    const firstCard = wrapper.get('[role="group"]');

    expect(firstCard.attributes("style")).toContain("translate3d(9px, -4px, 0)");
  });

  it("resets card position on Escape and persists reset offset", async () => {
    localStorage.setItem(
      "work:dragOffsets:v1",
      JSON.stringify({ sb: { x: 10, y: 5 } }),
    );

    const wrapper = await mountWork();
    const firstCard = wrapper.get('[role="group"]');

    await firstCard.trigger("keydown", { key: "Escape" });

    expect(firstCard.attributes("style")).toContain("translate3d(0px, 0px, 0)");
    const persisted = JSON.parse(localStorage.getItem("work:dragOffsets:v1") ?? "{}");
    expect(persisted.sb).toEqual({ x: 0, y: 0 });
  });

  it("opens modal with active project details when preview button is clicked", async () => {
    const wrapper = await mountWork();

    const previewBtn = wrapper.get('button[aria-label^="Open preview for"]');
    await previewBtn.trigger("click");

    expect(wrapper.text()).toContain(
      "An all-in-one, user-first, AI-enabled platform designed to simplify school accounting and management.",
    );
    expect(wrapper.find('a[href="https://www.schoolbooks.ke"]').exists()).toBe(true);
  });
});
