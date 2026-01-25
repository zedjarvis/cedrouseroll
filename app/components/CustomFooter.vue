<script setup lang="ts">
import { MapPin, CloudSun, Wind } from "lucide-vue-next";
import { useWeather } from "~/composables/useWeather";

const { weather, loading } = useWeather();
</script>

<template>
  <footer class="flex justify-center items-center w-full py-4">
    <div class="flex flex-col gap-5 max-w-2xl w-full mx-auto p-4">
      <div class="text-center flex flex-col gap-2 w-full">
        <div class="text-xs text-muted-foreground">
          Built using Nuxt4 . TailwindCSS . Shadcn-vue
        </div>
        <div class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }}
          <span class="text-foreground">by Cedrouseroll</span>
        </div>
      </div>

      <div
        class="flex justify-between text-muted-foreground text-xs flex-wrap gap-3"
      >
        <!-- Location -->
        <div class="flex items-center gap-1">
          <MapPin :size="18" />
          <span class="tracking-wide">NAIROBI, KENYA</span>
        </div>

        <!-- Weather -->
        <div class="flex items-center gap-4 text-muted-foreground">
          <!-- Loading state -->
          <template v-if="loading">
            <div class="flex items-center gap-1 opacity-70">
              <CloudSun :size="18" class="animate-pulse" />
              <span class="tabular-nums">--°C</span>
            </div>

            <div class="flex items-center gap-1 opacity-70">
              <Wind :size="18" class="animate-pulse" />
              <span class="tabular-nums">-- km/h</span>
            </div>
          </template>

          <!-- Loaded state -->
          <template v-else-if="weather">
            <div class="flex items-center gap-1">
              <CloudSun :size="18" />
              <span class="tabular-nums">{{ weather.temperature }}°C</span>
            </div>

            <div class="flex items-center gap-1">
              <Wind :size="18" />
              <span class="tabular-nums">{{ weather.windspeed }} km/h</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>
