import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IndexHeader from "~/components/IndexHeader.vue";

const { colorModeState, colorModeGlobalState } = vi.hoisted(() => ({
  colorModeState: { preference: "dark", value: "dark" },
  colorModeGlobalState: {
    preference: "dark",
    value: "dark",
    getColorScheme: () => "dark",
    addColorScheme: vi.fn(),
    removeColorScheme: vi.fn(),
  },
}));

mockNuxtImport("useColorMode", () => {
  return () => colorModeState;
});

describe("IndexHeader", () => {
  beforeEach(() => {
    colorModeState.preference = "dark";
    colorModeState.value = "dark";
    colorModeGlobalState.preference = "dark";
    colorModeGlobalState.value = "dark";
    vi.stubGlobal("__NUXT_COLOR_MODE__", colorModeGlobalState);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-07T09:15:30.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("starts interval on mount and clears it on unmount", async () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    const wrapper = await mountSuspended(IndexHeader);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain("GMT+3");
    expect(wrapper.get('button[type="button"]').attributes("aria-label")).toContain(
      "Current theme: dark",
    );

    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it("stops when hidden and restarts when visible", async () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    const wrapper = await mountSuspended(IndexHeader);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);

    wrapper.unmount();
  });

  it("toggles from dark to light", async () => {
    const wrapper = await mountSuspended(IndexHeader);

    await wrapper.get('button[type="button"]').trigger("click");

    expect(colorModeState.preference).toBe("light");
  });
});
