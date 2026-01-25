<script setup lang="ts">
type StackItem = {
  title: string;
  src: string;
};

const stack: StackItem[] = [
  { title: "Figma", src: "/images/figma.svg" },
  { title: "Next.js", src: "/images/nextjs.svg" },
  { title: "Nuxt", src: "/images/nuxt.svg" },
  { title: "Tailwind CSS", src: "/images/tailwindcss.svg" },
  { title: "NestJS", src: "/images/nestjs.svg" },
  { title: "TypeScript", src: "/images/typescript.svg" },
  { title: "Go", src: "/images/go.svg" },
  { title: "Python", src: "/images/python.svg" },
  // { title: "Laravel", src: "/images/laravel.svg" },
  { title: "OpenAI / ChatGPT", src: "/images/gpt.svg" },
  { title: "PostgreSQL", src: "/images/postgresql.svg" },
  { title: "Redis", src: "/images/redis.svg" },
];
</script>

<template>
  <section id="stack" class="flex flex-col justify-center items-center w-full">
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div class="flex flex-col gap-4 w-full">
        <SectionTitle text="Stack" />
      </div>

      <TooltipProvider>
        <div class="flex flex-wrap items-center gap-5">
          <Tooltip v-for="item in stack" :key="item.title">
            <TooltipTrigger as-child>
              <NuxtImg
                :src="item.src"
                :alt="item.title"
                class="h-10 w-auto cursor-default transition-transform duration-300 ease-out transform-gpu hover:scale-110"
              />
            </TooltipTrigger>
            <TooltipContent>
              {{ item.title }}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  </section>
</template>
