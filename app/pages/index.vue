<script setup lang="ts">
import { GradualBlur } from "~/components/ui/gradual-blur";

definePageMeta({ name: "Index" });

useSeoMeta({
  title: "Cedrouseroll Omondi - Software Engineer",
});

const contactRef = useTemplateRef("contactRef");
const showBlur = ref(true);

onMounted(() => {
  if (!contactRef.value) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Hide blur once contact is visible
      showBlur.value = !entry.isIntersecting;
    },
    {
      root: null,
      threshold: 0.1, // trigger as soon as contact enters view
    },
  );

  observer.observe(contactRef.value);

  onBeforeUnmount(() => observer.disconnect());
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full min-h-screen bg-background text-foreground"
  >
    <!-- Header -->
    <IndexHeader />

    <!-- Main -->
    <main class="w-full overflow-hidden">
      <div
        class="w-full relative flex flex-col gap-10 pb-16 h-full overflow-y-auto"
      >
        <!-- 👉 INTRO -->
        <IntroSection />

        <!-- 👉 PROJECTS -->
        <WorkSection />

        <!-- 👉 EXPERIENCE -->
        <ExperienceSection />

        <!-- 👉 TESTIMONIALS -->
        <TestimonialSection />

        <!-- 👉 STACK -->
        <StackSection />

        <!-- 👉 VENTURES -->
        <VentureSection />

        <!-- 👉 WRITING -->
        <WritingSection />

        <!-- 👉 PERSONAL -->
        <PersonalSection />

        <!-- 👉 CONTACT -->
        <div ref="contactRef">
          <ContactSection />
        </div>
      </div>
      <!-- gradual blur -->
    </main>
    <div
      v-if="showBlur"
      class="fixed bottom-0 left-0 w-full pointer-events-none z-10"
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="4rem"
        :strength="3"
        :div-count="5"
        curve="bezier"
        :exponential="true"
        :opacity="1"
      />
    </div>
  </div>
</template>
