import { defineComponent } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ExperienceSection from "~/components/ExperienceSection.vue";
import SectionDescription from "~/components/SectionDescription.vue";
import TestimonialSection from "~/components/TestimonialSection.vue";
import VentureSection from "~/components/VentureSection.vue";
import WritingSection from "~/components/WritingSection.vue";

const SectionTitleStub = defineComponent({
  props: { text: { type: String, required: true } },
  template: "<h2>{{ text }}</h2>",
});

const SectionDescriptionStub = defineComponent({
  props: { text: { type: String, required: true } },
  template: "<p>{{ text }}</p>",
});

const NuxtLinkStub = defineComponent({
  props: { to: { type: String, default: "" } },
  template: '<a :href="to"><slot /></a>',
});

const IconStub = defineComponent({
  template: "<span />",
});

describe("content sections", () => {
  it("renders SectionDescription with the configured element", async () => {
    const wrapper = await mountSuspended(SectionDescription, {
      props: {
        id: "summary",
        as: "span",
        text: "Concise supporting copy",
      },
    });

    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.attributes("id")).toBe("summary");
    expect(wrapper.text()).toContain("Concise supporting copy");
  });

  it("renders the experience timeline and CV link", async () => {
    const wrapper = await mountSuspended(ExperienceSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
          SectionDescription: SectionDescriptionStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Lead Engineer at");
    expect(wrapper.text()).toContain("Full-Stack Engineer at");
    expect(wrapper.text()).toContain("Software Developer at");
    expect(
      wrapper.find('a[href="/cedrouseroll_omondi_fullstack_developer_cv.pdf"]').exists(),
    ).toBe(true);
  });

  it("renders linked ventures", async () => {
    const wrapper = await mountSuspended(VentureSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
          NuxtLink: NuxtLinkStub,
          ArrowUpRight: IconStub,
        },
      },
    });

    expect(wrapper.text()).toContain("SchoolBooks Accounting");
    expect(wrapper.text()).toContain("Nu-dge");
    expect(wrapper.find('a[href="https://www.schoolbooks.ke"]').exists()).toBe(
      true,
    );
    expect(wrapper.find('a[href="https://nu-dge.vercel.app"]').exists()).toBe(
      true,
    );
  });

  it("renders the published writing list only", async () => {
    const wrapper = await mountSuspended(WritingSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
          NuxtLink: NuxtLinkStub,
          Clock: IconStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.find('a[href="/writing/hello-world"]').exists()).toBe(true);
    expect(wrapper.text()).not.toContain("Writing Code in the Age of AI");
  });

  it("renders the testimonial content", async () => {
    const wrapper = await mountSuspended(TestimonialSection, {
      global: {
        stubs: {
          SectionTitle: SectionTitleStub,
        },
      },
    });

    expect(wrapper.text()).toContain("ChatGPT");
    expect(wrapper.text()).toContain("OpenAI");
    expect(wrapper.text()).toContain("strong product intuition");
  });
});
