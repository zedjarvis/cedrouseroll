<script setup lang="ts">
type StackItem = {
  title: string;
  src: string;
  width?: number;
  height?: number;
};

const stack: StackItem[] = [
  { title: "Figma", src: "/images/figma.svg", width: 40, height: 40 },
  { title: "Next.js", src: "/images/nextjs.svg", width: 40, height: 40 },
  { title: "Nuxt", src: "/images/nuxt.svg", width: 40, height: 40 },
  {
    title: "Tailwind CSS",
    src: "/images/tailwindcss.svg",
    width: 40,
    height: 40,
  },
  { title: "NestJS", src: "/images/nestjs.svg", width: 40, height: 40 },
  { title: "TypeScript", src: "/images/typescript.svg", width: 40, height: 40 },
  { title: "Go", src: "/images/go.svg", width: 40, height: 40 },
  { title: "Python", src: "/images/python.svg", width: 40, height: 40 },
  { title: "OpenAI / ChatGPT", src: "/images/gpt.svg", width: 40, height: 40 },
  { title: "PostgreSQL", src: "/images/postgresql.svg", width: 40, height: 40 },
  { title: "Redis", src: "/images/redis.svg", width: 40, height: 40 },
];
</script>

<template>
  <section
    id="stack"
    class="flex flex-col justify-center items-center w-full"
    aria-labelledby="stack-title"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <header class="flex flex-col gap-4 w-full">
        <SectionTitle id="stack-title" text="Stack" />
      </header>

      <TooltipProvider>
        <ul
          class="flex flex-wrap items-center gap-5"
          role="list"
          aria-label="Technology stack"
        >
          <li v-for="item in stack" :key="item.title">
            <Tooltip>
              <TooltipTrigger as-child>
                <!-- Focusable trigger for keyboard + SR label -->
                <button
                  type="button"
                  class="cursor-default rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:scale-110"
                  :aria-label="item.title"
                >
                  <img
                    :src="item.src"
                    alt=""
                    class="h-10 w-auto block"
                    :width="item.width ?? 40"
                    :height="item.height ?? 40"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </button>
              </TooltipTrigger>

              <TooltipContent>
                {{ item.title }}
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </TooltipProvider>
    </div>
  </section>
</template>
