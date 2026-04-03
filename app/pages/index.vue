<script setup lang="ts">
import { GradualBlur } from "~/components/ui/gradual-blur";

definePageMeta({ name: "Index" });

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const canonicalUrl = `${siteUrl}/`;
const ogImageUrl = `${siteUrl}/og.png`;

useSeoMeta({
  title: "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
  description:
    "Cedrouseroll Omondi is a full-stack software engineer in Nairobi, Kenya building SaaS platforms, secure APIs, internal tools, and high-performance web products for startups and growing teams.",
  ogTitle: "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
  ogDescription:
    "Full-stack software engineer in Nairobi building scalable SaaS products, secure APIs, fast frontends, and reliable product systems.",
  ogType: "website",
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogImageAlt: "Cedrouseroll Omondi portfolio preview",
  twitterCard: "summary_large_image",
  twitterTitle:
    "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
  twitterDescription:
    "Full-stack software engineer in Nairobi building scalable SaaS products, secure APIs, fast frontends, and reliable product systems.",
  twitterImage: ogImageUrl,
  twitterImageAlt: "Cedrouseroll Omondi portfolio preview",
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
        url: canonicalUrl,
        description:
          "Portfolio of Cedrouseroll Omondi, a full-stack software engineer in Nairobi, Kenya building SaaS products, APIs, internal tools, and performant web experiences.",
        mainEntity: {
          "@type": "Person",
          name: "Cedrouseroll Omondi",
          url: canonicalUrl,
          image: `${siteUrl}/images/ced.jpeg`,
          jobTitle: "Full-Stack Software Engineer",
          description:
            "Full-stack software engineer in Nairobi, Kenya building SaaS platforms, internal tools, secure APIs, and accessible product experiences.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
          knowsAbout: [
            "Full-stack software development",
            "Software engineering",
            "API development",
            "SaaS product development",
            "Vue.js",
            "Nuxt",
            "Laravel",
            "Product engineering",
            "Performance optimization",
            "Accessibility",
          ],
          sameAs: [
            "https://github.com/zedjarvis",
            "https://www.linkedin.com/in/cedrouseroll-omondi-44b119252",
          ],
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Featured software engineering projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "SchoolBooks Accounting",
            url: "https://www.schoolbooks.ke",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Haft Studio",
            url: "https://haftstudio-website.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Meskith Studio",
            url: "http://meskith.com",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Vue 3 Compare Image",
            url: "https://vue3-compare-image.vercel.app",
          },
        ],
      }),
    },
  ],
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
