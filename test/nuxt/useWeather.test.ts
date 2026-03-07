import { defineComponent, nextTick } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useWeather } from "~/composables/useWeather";

const TestWeatherConsumer = defineComponent({
  setup() {
    return useWeather();
  },
  template: "<div />",
});

describe("useWeather", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses fresh cached weather without fetching", async () => {
    localStorage.setItem(
      "footer-weather",
      JSON.stringify({
        timestamp: Date.now(),
        data: { temperature: 25, windspeed: 10, time: "2026-03-07T10:00" },
      }),
    );

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const wrapper = await mountSuspended(TestWeatherConsumer);
    await nextTick();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(wrapper.vm.weather).toEqual({
      temperature: 25,
      windspeed: 10,
      time: "2026-03-07T10:00",
    });
    expect(wrapper.vm.loading).toBe(false);
  });

  it("fetches and caches weather when cache is stale", async () => {
    vi.spyOn(Date, "now").mockReturnValue(2_000_000);
    localStorage.setItem(
      "footer-weather",
      JSON.stringify({
        timestamp: 1_000_000,
        data: { temperature: 1, windspeed: 1, time: "old" },
      }),
    );

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        current_weather: {
          temperature: 23.6,
          windspeed: 11.8,
          time: "2026-03-07T12:00",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const wrapper = await mountSuspended(TestWeatherConsumer);
    await nextTick();
    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.weather).toEqual({
      temperature: 24,
      windspeed: 12,
      time: "2026-03-07T12:00",
    });

    const cached = JSON.parse(localStorage.getItem("footer-weather") ?? "{}");
    expect(cached).toEqual({
      timestamp: 2_000_000,
      data: { temperature: 24, windspeed: 12, time: "2026-03-07T12:00" },
    });
    expect(wrapper.vm.loading).toBe(false);
  });

  it("handles fetch failures and ends loading state", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const wrapper = await mountSuspended(TestWeatherConsumer);
    await nextTick();
    await Promise.resolve();

    expect(wrapper.vm.weather).toBeNull();
    expect(wrapper.vm.loading).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith("Weather fetch failed");
  });
});
