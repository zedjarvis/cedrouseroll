<script setup lang="ts">
import { MapPin, CloudSun, Wind } from "lucide-vue-next";
import { useWeather } from "~/composables/useWeather";

const { weather, loading } = useWeather();

const year = useState("footer-year", () => new Date().getFullYear());

// Reduced motion (avoid pulsing icons for users who prefer reduced motion)
const reduceMotion = ref(false);
onMounted(() => {
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
});
</script>

<template>
  <footer
    class="flex justify-center items-center w-full py-8"
    aria-label="Site footer"
  >
    <div class="flex flex-col gap-5 max-w-2xl w-full mx-auto p-4">
      <div class="text-center flex flex-col gap-2 w-full">
        <div
          class="text-xs text-muted-foreground flex items-center justify-center gap-1 flex-wrap"
        >
          <NuxtLink
            external
            to="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built using Nuxtjs
          </NuxtLink>
          <span aria-hidden="true">.</span>
          <NuxtLink
            external
            to="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TailwindCSS
          </NuxtLink>
          <span aria-hidden="true">.</span>
          <NuxtLink
            external
            to="https://www.shadcn-vue.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shadcn-vue
          </NuxtLink>
        </div>

        <div class="text-sm text-muted-foreground">
          &copy; {{ year }}
          <span class="text-foreground">by Cedrouseroll</span>
        </div>
      </div>

      <div
        class="flex justify-between text-muted-foreground text-xs flex-wrap gap-3"
      >
        <!-- Location -->
        <div class="flex items-center gap-1" aria-label="Location">
          <MapPin :size="18" aria-hidden="true" />
          <span class="tracking-wide">NAIROBI, KENYA</span>
        </div>

        <!-- Weather -->
        <div
          class="flex items-center gap-4 text-muted-foreground"
          aria-label="Local weather"
        >
          <!-- Loading -->
          <template v-if="loading">
            <div class="flex items-center gap-1 opacity-70">
              <CloudSun
                :size="18"
                aria-hidden="true"
                :class="reduceMotion ? '' : 'motion-safe:animate-pulse'"
              />
              <span class="tabular-nums">--°C</span>
              <span class="sr-only">Temperature loading</span>
            </div>

            <div class="flex items-center gap-1 opacity-70">
              <Wind
                :size="18"
                aria-hidden="true"
                :class="reduceMotion ? '' : 'motion-safe:animate-pulse'"
              />
              <span class="tabular-nums">-- km/h</span>
              <span class="sr-only">Wind speed loading</span>
            </div>
          </template>

          <!-- Loaded -->
          <template v-else-if="weather">
            <div class="flex items-center gap-1">
              <CloudSun :size="18" aria-hidden="true" />
              <span class="tabular-nums">{{ weather.temperature }}°C</span>
              <span class="sr-only">Temperature</span>
            </div>

            <div class="flex items-center gap-1">
              <Wind :size="18" aria-hidden="true" />
              <span class="tabular-nums">{{ weather.windspeed }} km/h</span>
              <span class="sr-only">Wind speed</span>
            </div>
          </template>

          <!-- Fallback when weather is unavailable -->
          <template v-else>
            <span class="opacity-70">Weather unavailable</span>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>
