<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
</script>

<template>
  <section id="ventures" class="flex flex-col gap-6 w-full">
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Ventures" />
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-1"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex gap-4 items-center">
            <div>
              <span
                class="bg-[#248567] h-10 w-10 inline-flex text-2xl text-white font-semibold rounded-lg items-center justify-center"
              >
                S
              </span>
            </div>
            <div class="flex flex-col justify-between">
              <p class="text-foreground md:text-lg">SchoolBooks Accounting</p>
              <p class="text-sm text-muted-foreground">
                Smart Accounting and Admin for Schools
              </p>
            </div>
          </div>

          <div class="text-muted-foreground">
            <ArrowUpRight :size="24" />
          </div>
        </div>
      </div>
      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex gap-4 items-center">
            <div>
              <NuxtImg
                src="/images/nu.png"
                class="h-10 w-10 rounded-lg"
                alt="Nudge logo"
              />
            </div>
            <div class="flex flex-col justify-between">
              <p class="text-foreground md:text-lg">Nu.dge</p>
              <p class="text-sm text-muted-foreground">
                Ai Project manager for my everyday tasks
              </p>
            </div>
          </div>

          <div class="text-muted-foreground">
            <ArrowUpRight :size="24" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
