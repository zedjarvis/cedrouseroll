import { defineComponent } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CustomFooter from "~/components/CustomFooter.vue";

const { weatherState, weatherRuntime } = vi.hoisted(() => {
  return {
    weatherState: {
      weather: null as { temperature: number; windspeed: number } | null,
      loading: false,
    },
    weatherRuntime: {
      weatherRef: null as { value: { temperature: number; windspeed: number } | null } | null,
      loadingRef: null as { value: boolean } | null,
    },
  };
});

vi.mock("~/composables/useWeather", async () => {
  const { ref } = await import("vue");
  return {
    useWeather: () => {
      weatherRuntime.weatherRef = ref(weatherState.weather);
      weatherRuntime.loadingRef = ref(weatherState.loading);
      return {
        weather: weatherRuntime.weatherRef,
        loading: weatherRuntime.loadingRef,
      };
    },
  };
});

const mountFooter = () =>
  mountSuspended(CustomFooter, {
    global: {
      stubs: {
        NuxtLink: defineComponent({
          props: { to: String },
          template: '<a :href="to"><slot /></a>',
        }),
        MapPin: defineComponent({ template: "<span />" }),
        CloudSun: defineComponent({ template: "<span />" }),
        Wind: defineComponent({ template: "<span />" }),
      },
    },
  });

describe("CustomFooter", () => {
  beforeEach(() => {
    weatherState.weather = null;
    weatherState.loading = false;
    vi.restoreAllMocks();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: false,
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

  it("shows loading placeholders when weather is loading", async () => {
    weatherState.loading = true;
    const wrapper = await mountFooter();

    expect(wrapper.text()).toContain("--°C");
    expect(wrapper.text()).toContain("-- km/h");
    expect(wrapper.text()).not.toContain("Weather unavailable");
  });

  it("shows weather values when available", async () => {
    weatherState.weather = { temperature: 27, windspeed: 14 };
    const wrapper = await mountFooter();

    expect(wrapper.text()).toContain("27°C");
    expect(wrapper.text()).toContain("14 km/h");
  });

  it("shows fallback when weather is unavailable and not loading", async () => {
    const wrapper = await mountFooter();

    expect(wrapper.text()).toContain("Weather unavailable");
  });
});
