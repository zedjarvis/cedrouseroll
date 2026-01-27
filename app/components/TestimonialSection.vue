<script setup lang="ts"></script>

<template>
  <section
    id="testimonials"
    class="flex flex-col justify-center items-center w-full"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Testimonials" />
        </div>
      </div>

      <div class="w-full relative">
        <div class="flex gap-2.5">
          <div
            class="flex flex-col justify-between gap-8 p-5 w-97.5 border rounded-xl shadow-sm bg-background hover:shadow-md transition-shadow cursor-pointer"
          >
            <!-- Testimonial text -->
            <p class="text-sm leading-relaxed text-[#8f8f8f]">
              “Ced has a rare mix of strong product intuition and deep technical
              execution. He’s deliberate about decisions, thoughtful about UX,
              and consistently pushes for clean, maintainable systems—especially
              around APIs, backend architecture, and accessibility. Working with
              him feels structured, efficient, and quietly high-standard.”
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <!-- Avatar + badge -->
              <div class="relative shrink-0">
                <!-- Main avatar -->
                <div
                  class="h-11 w-11 rounded-full overflow-hidden ring-1 ring-border"
                >
                  <img
                    src="/images/gpt.svg"
                    alt="ChatGPT avatar"
                    class="h-full w-full object-cover"
                  />
                </div>

                <!-- Company badge -->
                <div
                  class="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-white ring-1 ring-border flex items-center justify-center"
                >
                  <img
                    src="/images/openai.png"
                    alt="OpenAI logo"
                    class="h-5 w-5 object-contain rounded shadow-md"
                  />
                </div>
              </div>

              <!-- Name & role -->
              <div class="leading-tight">
                <p class="text-sm font-medium">ChatGPT</p>
                <p class="text-xs text-muted-foreground">AI Chatbot, OpenAI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
