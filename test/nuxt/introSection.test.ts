import { defineComponent, nextTick, ref } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IntroSection from "~/components/IntroSection.vue";

const { copyMock, clipboardState, clipboardRuntime, toastSuccess, toastError } =
  vi.hoisted(() => {
    const clipboardState = { supported: true };
    const clipboardRuntime = {
      copiedRef: null as { value: boolean } | null,
      isSupportedRef: null as { value: boolean } | null,
    };
    const copyMock = vi.fn(() => {
      clipboardRuntime.copiedRef!.value = true;
    });
    const toastSuccess = vi.fn();
    const toastError = vi.fn();

    return {
      copyMock,
      clipboardState,
      clipboardRuntime,
      toastSuccess,
      toastError,
    };
  });

mockNuxtImport("useClipboard", () => {
  return () => {
    clipboardRuntime.copiedRef = ref(false);
    clipboardRuntime.isSupportedRef = ref(clipboardState.supported);
    return {
      copy: copyMock,
      copied: clipboardRuntime.copiedRef,
      isSupported: clipboardRuntime.isSupportedRef,
    };
  };
});

vi.mock("vue-sonner", () => ({
  toast: {
    success: toastSuccess,
    error: toastError,
  },
}));

const mountIntro = () =>
  mountSuspended(IntroSection, {
    global: {
      stubs: {
        Button: defineComponent({
          template: '<button v-bind="$attrs"><slot /></button>',
        }),
        ClientOnly: defineComponent({
          template: '<div><slot /><slot name="fallback" /></div>',
        }),
        LinkPreview: defineComponent({
          template: '<a><slot /></a>',
        }),
      },
    },
  });

describe("IntroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clipboardState.supported = true;
    clipboardRuntime.copiedRef = null;
    clipboardRuntime.isSupportedRef = null;
  });

  it("copies email on button click and announces success", async () => {
    const wrapper = await mountIntro();

    await wrapper
      .get('button[aria-label="Copy email address omondicedo@gmail.com"]')
      .trigger("click");
    await nextTick();

    expect(copyMock).toHaveBeenCalledTimes(1);
    expect(toastSuccess).toHaveBeenCalledWith("Copied email", {
      position: "top-center",
      action: expect.objectContaining({ label: "Send Message" }),
    });
    expect(wrapper.text()).toContain("Email copied: omondicedo@gmail.com.");
  });

  it("shows unsupported message and error toast when clipboard is unavailable", async () => {
    clipboardState.supported = false;
    const wrapper = await mountIntro();

    await wrapper
      .get('button[aria-label="Copy email address omondicedo@gmail.com"]')
      .trigger("click");

    expect(copyMock).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith(
      "Clipboard not supported on this device",
      { position: "top-center" },
    );
    expect(wrapper.text()).toContain("Clipboard not supported on this device.");
  });

  it("responds to global c key and ignores ctrl+c", async () => {
    await mountIntro();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));
    const callsAfterPlainC = copyMock.mock.calls.length;
    expect(callsAfterPlainC).toBeGreaterThan(0);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "c", ctrlKey: true }),
    );
    expect(copyMock.mock.calls.length).toBe(callsAfterPlainC);
  });
});
