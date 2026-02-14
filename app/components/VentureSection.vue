<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

type Venture = {
  id: string;
  name: string;
  tagline: string;
  href?: string; // if present => link row
  iconType: "letter" | "image";
  letter?: string;
  letterBg?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const ventures: Venture[] = [
  {
    id: "schoolbooks",
    name: "SchoolBooks Accounting",
    tagline: "Smart Accounting and Admin for Schools",
    href: "https://www.schoolbooks.ke",
    iconType: "letter",
    letter: "S",
    letterBg: "#248567",
  },
  {
    id: "nudge",
    name: "Nu-dge",
    tagline: "AI project manager for my everyday tasks",
    href: "https://www.schoolbooks.ke",
    iconType: "image",
    imageSrc: "/images/nu.png",
    imageAlt: "Nu-dge logo",
  },
];
</script>

<template>
  <section
    id="ventures"
    class="flex flex-col gap-6 w-full"
    aria-labelledby="ventures-title"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <header
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="ventures-title" text="Ventures" />
        </div>
      </header>
    </div>

    <ul class="flex flex-col w-full" role="list" aria-label="Ventures">
      <li v-for="v in ventures" :key="v.id">
        <!-- Link row -->
        <NuxtLink
          v-if="v.href"
          external
          target="_blank"
          rel="noopener noreferrer"
          :to="v.href"
          class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :aria-label="`${v.name} (opens in a new tab)`"
        >
          <div
            class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
          >
            <div class="flex gap-4 items-center">
              <div>
                <span
                  v-if="v.iconType === 'letter'"
                  class="h-10 w-10 inline-flex text-2xl text-white font-semibold rounded-lg items-center justify-center"
                  :style="{ backgroundColor: v.letterBg }"
                  aria-hidden="true"
                >
                  {{ v.letter }}
                </span>

                <img
                  v-else
                  :src="v.imageSrc!"
                  class="h-10 w-10 rounded-lg"
                  :alt="v.imageAlt ?? ''"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex flex-col justify-between">
                <p class="text-foreground md:text-lg">{{ v.name }}</p>
                <p class="text-sm text-muted-foreground">{{ v.tagline }}</p>
              </div>
            </div>

            <div class="text-muted-foreground" aria-hidden="true">
              <ArrowUpRight :size="24" />
            </div>
          </div>
        </NuxtLink>

        <!-- Non-link row (keeps same layout, but removes "click" affordance) -->
        <div v-else class="flex justify-center py-2" aria-label="Venture">
          <div
            class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
          >
            <div class="flex gap-4 items-center">
              <div>
                <img
                  v-if="v.iconType === 'image'"
                  :src="v.imageSrc!"
                  class="h-10 w-10 rounded-lg"
                  :alt="v.imageAlt ?? ''"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  v-else
                  class="h-10 w-10 inline-flex text-2xl text-white font-semibold rounded-lg items-center justify-center"
                  :style="{ backgroundColor: v.letterBg }"
                  aria-hidden="true"
                >
                  {{ v.letter }}
                </span>
              </div>

              <div class="flex flex-col justify-between">
                <p class="text-foreground md:text-lg">{{ v.name }}</p>
                <p class="text-sm text-muted-foreground">{{ v.tagline }}</p>
              </div>
            </div>

            <!-- Remove the arrow because it implies navigation -->
            <div class="text-muted-foreground" aria-hidden="true">
              <!-- keep spacing consistent without implying click -->
              <span class="inline-block w-6" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
