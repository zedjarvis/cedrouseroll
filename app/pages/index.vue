<script setup lang="ts">
import { GradualBlur } from "~/components/ui/gradual-blur";

definePageMeta({ name: "Index" });

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const canonicalUrl = `${siteUrl}/`;
const ogImageUrl = `${siteUrl}/og.png`;

useSeoMeta({
  title: "Cedrouseroll Omondi — Software Engineer",
  description:
    "Software engineer building secure systems, performant user interfaces, and reliable API infrastructure.",
  ogTitle: "Cedrouseroll Omondi — Software Engineer",
  ogDescription:
    "Selected work, writing, and experience focused on performance, accessibility, and product delivery.",
  ogType: "website",
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogImageAlt: "Cedrouseroll Omondi portfolio preview",
  twitterCard: "summary_large_image",
  twitterTitle: "Cedrouseroll Omondi — Software Engineer",
  twitterDescription:
    "Selected work, writing, and experience focused on performance, accessibility, and product delivery.",
  twitterImage: ogImageUrl,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
});

const contactEl = ref<HTMLElement | null>(null);
const showBlur = ref(true);
const reduceMotion = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Reduced motion users generally shouldn't get dynamic visual effects
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // If we can't observe, just keep blur off to avoid unnecessary UI work.
  if (
    !contactEl.value ||
    !("IntersectionObserver" in window) ||
    reduceMotion.value
  ) {
    showBlur.value = false;
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      showBlur.value = !entry?.isIntersecting;
    },
    {
      root: null,
      threshold: 0.1,
      // Start fading earlier so it doesn't pop at the exact moment contact appears
      rootMargin: "0px 0px -10% 0px",
    },
  );

  observer.observe(contactEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-background text-foreground">
    <!-- Skip link (keyboard + SR users) -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:shadow"
    >
      Skip to content
    </a>

    <!-- Header landmark -->
    <header class="w-full flex justify-center">
      <IndexHeader />
    </header>

    <!-- Main landmark -->
    <main id="main" class="w-full flex-1">
      <div class="w-full relative flex flex-col gap-10 pb-16 h-full">
        <!-- Above the fold: keep eager -->
        <IntroSection />

        <!-- Below the fold: lazy-load to reduce initial JS + hydration cost -->
        <LazyWorkSection />
        <LazyExperienceSection />
        <LazyTestimonialSection />
        <LazyStackSection />
        <LazyVentureSection />
        <LazyWritingSection />
        <LazyPersonalSection />

        <!-- Contact -->
        <div ref="contactEl">
          <LazyContactSection />
        </div>
      </div>
    </main>

    <!-- Gradual blur (disabled for reduced motion; also disabled once contact is visible) -->
    <div
      v-if="showBlur"
      class="fixed bottom-0 left-0 z-10 w-full pointer-events-none"
      aria-hidden="true"
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="4rem"
        :strength="2.5"
        :div-count="5"
        curve="ease-in-out"
        :exponential="true"
        :opacity="1"
      />
    </div>
  </div>
</template>
