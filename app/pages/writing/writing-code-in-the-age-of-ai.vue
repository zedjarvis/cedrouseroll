<script setup lang="ts">
import { CornerDownLeft, Clock, TextAlignStart } from "lucide-vue-next";

useSeoMeta({
  title: "Writing Code in the Age of AI by Cedrouseroll Omondi",
  description:
    "A personal reflection on balancing AI tools like Copilot with real developer thinking, learning, and problem solving.",
  ogTitle: "Writing Code in the Age of AI — Cedrouseroll Omondi",
  ogDescription:
    "A personal reflection on balancing AI tools like Copilot with real developer thinking, learning, and problem solving.",
  twitterCard: "summary_large_image",
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
        <time datetime="2026-02-14" class="tabular-nums"> FEB 14, 2026 </time>

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

    <!-- Content -->
    <main
      id="main"
      class="w-full flex flex-col mx-auto max-w-2xl gap-12 px-4 pb-16"
    >
      <article ref="articleRef" aria-labelledby="post-title">
        <header>
          <h1 id="post-title" class="text-4xl font-medium mb-8">
            Writing Code in the Age of AI.
          </h1>
        </header>

        <div
          class="text-muted-foreground text-base leading-relaxed flex flex-col gap-6"
        >
          <p>
            AI has changed how I write code. There’s no going back — only
            adapting and staying sharp.
          </p>

          <p>
            The first time I subscribed to GitHub Copilot in VS Code, I was
            impressed. Autocomplete felt magical. I was writing faster, jumping
            between files quickly, and my brain was always a step ahead.
          </p>

          <p>
            Until one day, I had a small issue. I was writing a simple function
            — just mapping through an array in JavaScript. Easy stuff.
          </p>

          <p>
            But Copilot wasn’t showing autocomplete suggestions. I tried
            prompting again. Still nothing. After a few minutes I realized my
            internet was down...
          </p>

          <p>
            What struck me wasn’t the outage. It was my reaction. Instead of
            finishing the function manually, I stopped coding and went to fix
            the internet. That’s when I noticed how quietly dependency can form.
          </p>

          <p>
            Since then, I’ve been thinking more about balance. AI is a real
            productivity boost, but it’s not always a speed boost. Without
            proper context it can slow you down, I've noticed that sometimes it
            will even try to reinvent solutions that solid libraries already
            solve very well. That’s only part of the story.
          </p>

          <p>
            For junior developers, I think this is even more important. AI can
            help you learn faster, but only if you still think. If you still ask
            why. If you still struggle a little. The struggle is where the
            understanding lives.
          </p>

          <p>
            Recently I decided to do a full coding session without using AI at
            all. No Copilot. No prompts. Just me, my IDE and docs for when I
            needed them.
          </p>

          <p>
            It took me back. I remembered the developer I used to be — a tad
            slower, but sharper. I felt the thrill again. The small satisfaction
            of solving something fully on my own.
          </p>

          <p>
            AI is here to stay, and I’m not planning to stop using it. But I’m
            still learning where it fits best. I want to keep my agility as an
            engineer while embracing AI for speed, performance ideas, research,
            and productivity.
          </p>

          <p>
            I’m still finding my balance between the two worlds. And honestly, I
            think that’s the new job.
          </p>
        </div>
      </article>

      <!-- More -->
      <section
        class="flex flex-col items-start gap-4 w-full"
        data-ignore-read
        aria-label="More writing"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="more" />
        </div>

        <div class="flex flex-col w-full">
          <NuxtLink
            to="/writing/hello-world"
            class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Hello World, estimated 2 minute read"
          >
            <div class="w-full flex items-center justify-between">
              <div
                class="flex flex-col md:grid md:grid-cols-12 w-full items-start md:items-center"
              >
                <div class="col-span-2">
                  <p
                    class="text-sm text-muted-foreground font-geist tabular-nums"
                  >
                    26/01/26
                  </p>
                </div>

                <div class="col-span-8">
                  <p>Hello World</p>
                </div>

                <div
                  class="col-span-2 flex gap-2 items-center justify-end text-sm text-muted-foreground"
                >
                  <Clock :size="15" aria-hidden="true" />
                  <span class="tabular-nums">2</span>
                  <span aria-hidden="true">m</span>
                  <span class="sr-only">minutes</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
