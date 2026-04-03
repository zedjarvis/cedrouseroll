<script setup lang="ts">
import { Clock } from "lucide-vue-next";

type Post = {
  id: string;
  title: string;
  to: string; // internal route
  dateLabel: string; // keep your short display format e.g. 26/01/26
  minutes: number;
};

const posts: Post[] = [
  {
    id: "hello-world",
    title: "Hello World",
    to: "/writing/hello-world",
    dateLabel: "26/01/26",
    minutes: 1,
  },
  // {
  //   id: "writing-code-in-the-age-of-ai",
  //   title: "Writing Code in the Age of AI",
  //   to: "/writing/writing-code-in-the-age-of-ai",
  //   dateLabel: "14/02/26",
  //   minutes: 2,
  // },
];
</script>

<template>
  <section
    id="writing"
    class="flex flex-col gap-6 w-full"
    aria-labelledby="writing-title"
  >
    <div
      class="w-full max-w-2xl mx-auto flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <header
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="writing-title" text="Writing" />
        </div>
      </header>
    </div>

    <div class="flex flex-col w-full">
      <ul role="list" aria-label="Writing posts">
        <li v-for="post in posts" :key="post.id">
          <NuxtLink
            :to="post.to"
            class="flex justify-center py-2 transition-all duration-200 ease-out hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="`${post.title}, ${post.minutes} minute read`"
          >
            <div
              class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
            >
              <div
                class="flex flex-col md:grid md:grid-cols-12 w-full items-start md:items-center"
              >
                <div class="col-span-2">
                  <p
                    class="text-sm text-muted-foreground font-geist tabular-nums"
                  >
                    {{ post.dateLabel }}
                  </p>
                </div>

                <div class="col-span-8">
                  <p>{{ post.title }}</p>
                </div>

                <div
                  class="col-span-2 flex gap-2 items-center justify-end text-sm text-muted-foreground"
                >
                  <Clock :size="15" aria-hidden="true" />
                  <span class="tabular-nums">{{ post.minutes }}</span>
                  <span aria-hidden="true">m</span>
                  <span class="sr-only">minutes</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <!-- Optional: tiny empty state, still short -->
      <p
        v-if="posts.length === 0"
        class="w-full mx-auto max-w-2xl px-4 text-sm text-muted-foreground"
      >
        No posts yet.
      </p>
    </div>
  </section>
</template>
