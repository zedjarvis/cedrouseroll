<script setup lang="ts">
import { CornerDownLeft, Clock, TextAlignStart } from "lucide-vue-next";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl.replace(/\/$/, "");
const canonicalUrl = `${siteUrl}/writing/hello-world`;
const ogImageUrl = `${siteUrl}/og.png`;

useSeoMeta({
  title: "Hello World by Cedrouseroll Omondi",
  description:
    "A short intro post on writing, learning, and building as a software engineer.",
  ogTitle: "Hello World — Cedrouseroll Omondi",
  ogDescription:
    "A short intro post on writing, learning, and building as a software engineer.",
  ogType: "article",
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogImageAlt: "Cedrouseroll Omondi portfolio preview",
  twitterCard: "summary_large_image",
  twitterTitle: "Hello World — Cedrouseroll Omondi",
  twitterDescription:
    "A short intro post on writing, learning, and building as a software engineer.",
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
        "@type": "BlogPosting",
        headline: "Hello World",
        description:
          "A short intro post on writing, learning, and building as a software engineer.",
        datePublished: "2026-01-26",
        dateModified: "2026-01-26",
        author: {
          "@type": "Person",
          name: "Cedrouseroll Omondi",
          url: siteUrl,
        },
        mainEntityOfPage: canonicalUrl,
        image: [ogImageUrl],
        publisher: {
          "@type": "Person",
          name: "Cedrouseroll Omondi",
          url: siteUrl,
        },
      }),
    },
  ],
});

const articleRef = ref<HTMLElement | null>(null);

const { wordCount, readTime, computeFromEl } = useReadStats({
  wpm: 200,
  ignoreSelectors: ["[data-ignore-read]"],
});

onMounted(async () => {
  await nextTick();
  computeFromEl(articleRef.value);
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full bg-background min-h-[85vh] text-foreground"
  >
    <!-- Header -->
    <header class="flex flex-col gap-8 w-full max-w-2xl py-10 px-4">
      <nav aria-label="Back navigation">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          <CornerDownLeft :size="15" aria-hidden="true" />
          <span class="text-xs tracking-wide">BACK</span>
        </NuxtLink>
      </nav>

      <div
        class="flex justify-between text-sm font-geist text-muted-foreground"
      >
        <!-- Use semantic <time> -->
        <time datetime="2026-01-26" class="tabular-nums"> JAN 26, 2026 </time>

        <!-- Read stats -->
        <div class="flex gap-6 items-center">
          <div
            class="flex gap-2 items-center"
            aria-label="Estimated reading time"
          >
            <Clock :size="15" aria-hidden="true" />
            <span class="tabular-nums">{{ readTime }}</span>
            <span aria-hidden="true">m</span>
            <span class="sr-only">minutes</span>
          </div>

          <div class="flex gap-2 items-center" aria-label="Word count">
            <TextAlignStart :size="15" aria-hidden="true" />
            <span class="tabular-nums">{{ wordCount }}</span>
            <span aria-hidden="true">words</span>
            <span class="sr-only">words</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main
      id="main"
      class="w-full flex flex-col mx-auto max-w-2xl gap-12 px-4 pb-16"
    >
      <article ref="articleRef" aria-labelledby="post-title">
        <header>
          <h1 id="post-title" class="text-4xl font-medium mb-8">
            Hello world.
          </h1>
        </header>

        <div
          class="text-muted-foreground text-base leading-relaxed flex flex-col gap-6"
        >
          <p>I’ve always wanted to write.</p>

          <p>
            Not in a “one day I’ll write a book” kind of way, but in the quieter
            sense — the feeling that thoughts pile up faster than I give them
            space to breathe. Writing has always felt like the missing outlet.
          </p>

          <p>
            For a long time, I told myself I didn’t have much to say. That I
            needed to be more experienced, more polished, more certain. But the
            most interesting part of any journey is rarely the destination —
            it’s the middle.
          </p>

          <p>This blog is my attempt to document that middle.</p>

          <p>
            As I continue growing as a software developer, I’m constantly
            learning — sometimes through clean wins, other times through quiet
            failures. Both matter. Both teach.
          </p>

          <p>
            I’m particularly interested in the overlap between design and
            engineering. Where performance isn’t an afterthought, where
            interfaces feel intentional, and where systems are built to last.
          </p>

          <p>
            This space isn’t about perfection. It’s about progress. About
            slowing down enough to reflect, write, and share along the way. If
            you’re also learning, building, or trying to make sense of this
            craft, I hope you’ll find something here that resonates.
          </p>
        </div>
      </article>

    </main>
  </div>
</template>
