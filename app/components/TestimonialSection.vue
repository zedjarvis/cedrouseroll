<script setup lang="ts">
type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatarSrc: string;
  authorAvatarAlt?: string; // optional; can be decorative if name is present
  companyName: string;
  companyBadgeSrc: string;
  companyBadgeAlt?: string; // optional; can be decorative
};

const testimonials: Testimonial[] = [
  {
    id: "openai-gpt",
    quote:
      "Ced has a rare mix of strong product intuition and deep technical execution. He’s deliberate about decisions, thoughtful about UX, and consistently pushes for clean, maintainable systems—especially around APIs, backend architecture, and accessibility. Working with him feels structured, efficient, and quietly high-standard.",
    authorName: "ChatGPT",
    authorRole: "AI Chatbot",
    authorAvatarSrc: "/images/gpt.svg",
    authorAvatarAlt: "", // decorative (name is already visible)
    companyName: "OpenAI",
    companyBadgeSrc: "/images/openai.png",
    companyBadgeAlt: "", // decorative (company name is shown)
  },
];
</script>

<template>
  <section
    id="testimonials"
    class="flex flex-col justify-center items-center w-full"
    aria-labelledby="testimonials-title"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <header
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="testimonials-title" text="Testimonials" />
        </div>
      </header>

      <div class="w-full relative">
        <!-- If you later add many testimonials, this is already ready for a grid/slider -->
        <ul class="flex gap-2.5" role="list">
          <li v-for="t in testimonials" :key="t.id" class="w-full">
            <figure
              class="flex flex-col justify-between gap-8 p-5 w-97.5 border rounded-xl shadow-sm bg-background hover:shadow-md transition-shadow"
            >
              <blockquote class="text-sm leading-relaxed text-muted-foreground">
                <span class="sr-only">Testimonial: </span>
                “{{ t.quote }}”
              </blockquote>

              <figcaption class="flex items-center gap-3">
                <!-- Avatar + badge -->
                <div class="relative shrink-0" aria-hidden="true">
                  <div
                    class="h-11 w-11 rounded-full overflow-hidden ring-1 ring-border"
                  >
                    <img
                      :src="t.authorAvatarSrc"
                      :alt="t.authorAvatarAlt ?? ''"
                      class="h-full w-full object-cover"
                      :class="{
                        'invert dark:invert-0': t.authorAvatarSrc === '/images/gpt.svg',
                      }"
                      width="44"
                      height="44"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div
                    class="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-white ring-1 ring-border flex items-center justify-center"
                  >
                    <img
                      :src="t.companyBadgeSrc"
                      :alt="t.companyBadgeAlt ?? ''"
                      class="h-5 w-5 object-contain rounded shadow-md"
                      width="20"
                      height="20"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <!-- Name & role -->
                <div class="leading-tight">
                  <p class="text-sm font-medium">
                    {{ t.authorName }}
                    <span class="sr-only">, {{ t.authorRole }}</span>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ t.authorRole }}, {{ t.companyName }}
                  </p>
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
