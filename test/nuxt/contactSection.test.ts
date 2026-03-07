import { defineComponent } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactSection from "~/components/ContactSection.vue";

const { insertMock, fromMock, supabaseClient, toastSuccess, toastError } =
  vi.hoisted(() => {
    const insertMock = vi.fn();
    const fromMock = vi.fn(() => ({ insert: insertMock }));
    const supabaseClient = { from: fromMock };
    const toastSuccess = vi.fn();
    const toastError = vi.fn();

    return { insertMock, fromMock, supabaseClient, toastSuccess, toastError };
  });

mockNuxtImport("useSupabaseClient", () => {
  return () => supabaseClient;
});

vi.mock("vue-sonner", () => ({
  toast: {
    success: toastSuccess,
    error: toastError,
  },
}));

const InputStub = defineComponent({
  props: { modelValue: { type: String, default: "" } },
  emits: ["update:modelValue"],
  template:
    '<input v-bind="$attrs" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
});

const TextareaStub = defineComponent({
  props: { modelValue: { type: String, default: "" } },
  emits: ["update:modelValue"],
  template:
    '<textarea v-bind="$attrs" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)"></textarea>',
});

const mountContactSection = () =>
  mountSuspended(ContactSection, {
    global: {
      stubs: {
        SectionTitle: { template: "<h2><slot /></h2>" },
        SectionDescription: { template: "<p><slot /></p>" },
        NuxtLink: { template: "<a><slot /></a>" },
        Input: InputStub,
        Textarea: TextareaStub,
        Field: { template: "<div><slot /></div>" },
        FieldError: { template: "<p><slot /></p>" },
        Button: { template: "<button v-bind=\"$attrs\"><slot /></button>" },
      },
    },
  });

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insertMock.mockResolvedValue({ error: null });
    fromMock.mockReturnValue({ insert: insertMock });
  });

  it("does not submit invalid form and shows field errors", async () => {
    const wrapper = await mountContactSection();

    await wrapper.get("form").trigger("submit");

    expect(fromMock).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Name is required");
    expect(wrapper.text()).toContain("Please enter a valid email");
    expect(wrapper.text()).toContain("Message is required");
  });

  it("submits valid payload, shows success toast, and resets form", async () => {
    const wrapper = await mountContactSection();

    await wrapper.get("#name").setValue("  Ced  ");
    await wrapper.get("#email").setValue("  ced@example.com  ");
    await wrapper.get("#message").setValue("  Hello there  ");

    await wrapper.get("form").trigger("submit");
    await flushPromises();

    expect(fromMock).toHaveBeenCalledWith("Contacts");
    expect(insertMock).toHaveBeenCalledWith({
      name: "Ced",
      email: "ced@example.com",
      message: "Hello there",
    });
    expect(toastSuccess).toHaveBeenCalledWith("Message sent successfully", {
      position: "top-center",
    });

    expect((wrapper.get("#name").element as HTMLInputElement).value).toBe("");
    expect((wrapper.get("#email").element as HTMLInputElement).value).toBe("");
    expect((wrapper.get("#message").element as HTMLTextAreaElement).value).toBe(
      "",
    );
  });

  it("shows error toast when supabase insert fails", async () => {
    insertMock.mockResolvedValueOnce({ error: { message: "boom" } });
    const wrapper = await mountContactSection();

    await wrapper.get("#name").setValue("Ced");
    await wrapper.get("#email").setValue("ced@example.com");
    await wrapper.get("#message").setValue("Hi");

    await wrapper.get("form").trigger("submit");
    await flushPromises();

    expect(toastError).toHaveBeenCalledWith(
      "Failed to send message. Please try again.",
      { position: "top-center" },
    );
    expect(toastSuccess).not.toHaveBeenCalled();
    expect((wrapper.get("#name").element as HTMLInputElement).value).toBe("Ced");
  });

  it("submits on Ctrl/Cmd + Enter in message field", async () => {
    const wrapper = await mountContactSection();

    await wrapper.get("#name").setValue("Ced");
    await wrapper.get("#email").setValue("ced@example.com");
    await wrapper.get("#message").setValue("Hi");

    await wrapper.get("#message").trigger("keydown", {
      key: "Enter",
      ctrlKey: true,
    });
    await flushPromises();

    expect(insertMock).toHaveBeenCalledTimes(1);
  });
});
