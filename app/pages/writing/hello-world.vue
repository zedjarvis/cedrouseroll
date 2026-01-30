<script setup lang="ts">
import { CornerDownLeft, Clock, TextAlignStart } from "lucide-vue-next";

useSeoMeta({
  title: "Hello World by Cedrouseroll Omondi",
});
/**
 * Blog content as plain text
 * (easy to move to markdown or CMS later)
 */
const content = `
I’ve always wanted to write.

Not in a “one day I’ll write a book” kind of way, but in the quieter sense —
the feeling that thoughts pile up faster than I give them space to breathe.
Writing has always felt like the missing outlet.

For a long time, I told myself I didn’t have much to say.
That I needed to be more experienced, more polished, more certain.
But the truth is, the most interesting part of any journey is rarely the destination.
It’s the middle — the confusion, the experiments, the lessons learned the hard way.

This blog is my attempt to document that middle.

As I continue growing as a software developer, I find myself constantly learning:
new tools, better patterns, sharper ways of thinking.
Some of these lessons come from building things that work.
Others come from things that break in ways I didn’t expect.

I’m especially drawn to the space where design and engineering overlap.
Where performance meets aesthetics.
Where good abstractions quietly improve user experience.
Where small decisions compound into systems that either empower or frustrate.

This won’t be a place for polished tutorials or definitive answers.
Instead, it’s a logbook — notes from the field.
Things I’m figuring out, ideas I’m testing, and perspectives that might change over time.

If you’re also learning, building, or trying to make sense of this craft,
I hope you’ll find something here that resonates.
`;

const WORDS_PER_MINUTE = 200;

const wordCount = computed(() => {
  return content.trim().split(/\s+/).length;
});

const readTime = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / WORDS_PER_MINUTE));
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full bg-background min-h-[85vh] text-foreground"
  >
    <!-- Header -->
    <header class="flex flex-col gap-8 w-full max-w-2xl py-10 px-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <CornerDownLeft :size="15" />
        <p class="text-xs tracking-wide">BACK</p>
      </NuxtLink>

      <div
        class="flex justify-between text-sm font-geist text-muted-foreground"
      >
        <p class="tabular-nums">JAN 26, 2026</p>

        <div class="flex gap-6 items-center">
          <div class="flex gap-2 items-center">
            <Clock :size="15" />
            <span class="tabular-nums">{{ readTime }}</span>
            <span>m</span>
          </div>

          <div class="flex gap-2 items-center">
            <TextAlignStart :size="15" />
            <span class="tabular-nums">{{ wordCount }}</span>
            <span>words</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="w-full flex flex-col mx-auto max-w-2xl gap-12 px-4 pb-16">
      <section>
        <h1 class="text-4xl font-medium mb-8">Hello world.</h1>

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
      </section>

      <!-- More -->
      <section class="flex flex-col items-start gap-4 w-full">
        <div class="flex-none whitespace-pre">
          <SectionTitle text="more" />
        </div>
      </section>
    </main>
  </div>
</template>
