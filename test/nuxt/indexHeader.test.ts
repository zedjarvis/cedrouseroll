import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IndexHeader from "~/components/IndexHeader.vue";

describe("IndexHeader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-07T09:15:30.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts interval on mount and clears it on unmount", async () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    const wrapper = await mountSuspended(IndexHeader);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain("GMT+3");

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
});
