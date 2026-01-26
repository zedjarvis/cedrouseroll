<script setup lang="ts">
import { Clock } from "lucide-vue-next";
</script>

<template>
  <section id="writing" class="flex flex-col gap-6 w-full">
    <div
      class="w-full max-w-2xl mx-auto flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Writing" />
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div
            class="flex flex-col md:grid md:grid-cols-12 w-full items-start md:items-center"
          >
            <div class="col-span-2">
              <p class="text-sm text-muted-foreground font-geist tabular-nums">
                26/01/26
              </p>
            </div>
            <div class="col-span-8">
              <p>How to think like both a designer & engineer</p>
            </div>
            <div
              class="col-span-2 flex gap-2 items-center justify-end text-sm text-muted-foreground"
            >
              <Clock :size="15" /> <span>2</span> <span>m</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div
            class="flex flex-col md:grid md:grid-cols-12 w-full items-start md:items-center"
          >
            <div class="col-span-2">
              <p class="text-sm text-muted-foreground font-geist tabular-nums">
                26/01/26
              </p>
            </div>
            <div class="col-span-8">
              <p>How AI is changing my workflow</p>
            </div>
            <div
              class="col-span-2 flex gap-2 items-center justify-end text-sm text-muted-foreground"
            >
              <Clock :size="15" /> <span>2</span> <span>m</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div
            class="flex flex-col md:grid md:grid-cols-12 w-full items-start md:items-center"
          >
            <div class="col-span-2">
              <p class="text-sm text-muted-foreground font-geist tabular-nums">
                26/01/26
              </p>
            </div>
            <div class="col-span-8">
              <p>Hello World</p>
            </div>
            <div
              class="col-span-2 flex gap-2 items-center justify-end text-sm text-muted-foreground"
            >
              <Clock :size="15" /> <span>2</span> <span>m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
