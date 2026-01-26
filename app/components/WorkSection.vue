<script setup lang="ts">
import { DotGrid } from "~/components/ui/dot-grid";

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

const isMobile = breakpoints.smaller("sm"); // < 640px
// const isTablet = breakpoints.between("sm", "md");
// const isDesktop = breakpoints.greaterOrEqual("lg");
</script>

<template>
  <section
    id="work"
    class="flex flex-col gap-4 w-full h-min scroll-mt-6 relative justify-center items-center"
  >
    <div
      class="flex flex-col items-start gap-6 mx-auto w-full max-w-2xl px-4 relative h-min"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="work" />
        </div>
        <div class="contents">
          <SectionDescription
            text="Below are some select projects, full walkthrough on request"
          />
        </div>
      </div>
    </div>
    <div
      id="canvas"
      class="w-full py-10 md:py-0 h-min md:h-135 relative flex items-center justify-center overflow-hidden"
    >
      <!-- Dotted background -->
      <div
        v-if="isMobile"
        class="absolute inset-0 bg-[url(/images/dot-bg.svg)] bg-repeat bg-center bg-size-[150px_auto] opacity-20 pointer-events-none"
      />
      <div
        v-else
        class="absolute inset-0 top-0 left-0 opacity-20 pointer-events-none"
      >
        <DotGrid
          :dot-size="4"
          :gap="12"
          base-color="#8f8f8f"
          active-color="#8f8f8f"
          :proximity="200"
          :speed-trigger="150"
          :shock-radius="350"
          :shock-strength="7"
          :max-speed="5000"
          :resistance="750"
          :return-duration="1.5"
          class-name="custom-dot-grid"
        />
      </div>

      <!-- Images scattered -->
      <div class="contents">
        <div
          class="relative flex flex-col items-center gap-6 md:block w-full h-min md:h-94 md:max-w-275"
        >
          <!-- Image 1 -->
          <div
            class="group md:absolute will-change-transform transform-none opacity-100 w-80 h-62 md:z-1 md:hover:z-10 hover:scale-[1.08] transition-all duration-300 ease-out md:top-2.75 md:left-2.25"
          >
            <div
              class="relative bg-white border-white border-4 border-solid w-full h-full md:rotate-[-4deg] md:group-hover:rotate-0 transition-transform duration-300 ease-out shadow-md rounded-lg overflow-hidden p-1"
            >
              <div class="absolute inset-0">
                <NuxtImg
                  src="/images/sb.jpg"
                  alt="Project screenshot"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Image 2 -->
          <div
            class="group md:absolute will-change-transform transform-none opacity-100 w-80 h-62 md:z-4 md:hover:z-10 hover:scale-[1.08] transition-all duration-300 ease-out md:bottom-2.75 md:left-60.5"
          >
            <div
              class="relative bg-white border-white border-4 border-solid w-full h-full md:rotate-[4deg] md:group-hover:rotate-0 transition-transform duration-300 ease-out shadow-md rounded-lg overflow-hidden p-1"
            >
              <div class="absolute inset-0">
                <NuxtImg
                  src="/images/portfolio.jpg"
                  alt="Project screenshot"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Image 3 -->
          <div
            class="group md:absolute will-change-transform transform-none opacity-100 w-80 h-62 md:z-1 md:hover:z-10 hover:scale-[1.08] transition-all duration-300 ease-out md:top-2.5 md:left-118"
          >
            <div
              class="relative bg-white border-white border-4 border-solid w-full h-full md:rotate-[-4deg] md:group-hover:rotate-0 transition-transform duration-300 ease-out shadow-md rounded-lg overflow-hidden p-1"
            >
              <div class="absolute inset-0">
                <NuxtImg
                  src="/images/meskith.jpg"
                  alt="Project screenshot"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Image 4 -->
          <div
            class="group md:absolute will-change-transform transform-none opacity-100 w-80 h-62 md:z-4 md:hover:z-10 hover:scale-[1.08] transition-all duration-300 ease-out md:bottom-2.25 md:left-176.5"
          >
            <div
              class="relative bg-white border-white border-4 border-solid w-full h-full md:rotate-[4deg] md:group-hover:rotate-0 transition-transform duration-300 ease-out shadow-md rounded-lg overflow-hidden p-1"
            >
              <div class="absolute inset-0">
                <NuxtImg
                  src="/images/portfolio2.jpg"
                  alt="Project screenshot"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
