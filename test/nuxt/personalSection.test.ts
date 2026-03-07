import { defineComponent, nextTick } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import PersonalSection from "~/components/PersonalSection.vue";

const SectionTitleStub = defineComponent({
  props: { text: { type: String, required: true } },
  template: "<h2>{{ text }}</h2>",
});

const SectionDescriptionStub = defineComponent({
  props: { text: { type: String, required: true } },
  template: "<p>{{ text }}</p>",
});

describe("PersonalSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows iframe immediately when IntersectionObserver is unavailable", async () => {
    Reflect.deleteProperty(window, "IntersectionObserver");

    const wrapper = await mountSuspended(PersonalSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
          SectionDescription: SectionDescriptionStub,
        },
      },
    });

    expect(wrapper.find("#spotify-music").exists()).toBe(true);
    expect(wrapper.text()).not.toContain("Loading music");
  });

  it("lazy loads iframe once intersection occurs", async () => {
    let observedElement: Element | null = null;
    let callback: ((entries: Array<{ isIntersecting: boolean }>) => void) | null =
      null;
    const disconnect = vi.fn();

    class MockIntersectionObserver {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        callback = cb;
      }

      observe(el: Element) {
        observedElement = el;
      }

      disconnect = disconnect;
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as never);

    const wrapper = await mountSuspended(PersonalSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
          SectionDescription: SectionDescriptionStub,
        },
      },
    });

    expect(observedElement).not.toBeNull();
    expect(wrapper.find("#spotify-music").exists()).toBe(false);
    expect(wrapper.text()).toContain("Loading music");

    callback?.([{ isIntersecting: true }]);
    await nextTick();

    expect(wrapper.find("#spotify-music").exists()).toBe(true);
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
