<script setup lang="ts">
import { Clock, Moon, Sun } from "lucide-vue-next";

const timeText = ref("");
const colorMode = useColorMode();

const currentThemeLabel = computed(() =>
  colorMode.value === "dark" ? "dark" : "light",
);

// Cache formatter (faster than building options each tick)
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

let timer: number | null = null;

function updateTime() {
  // Using formatter avoids allocating format options every tick
  const formatted = formatter.format(new Date());
  timeText.value = `${formatted} GMT+3`;
}

function start() {
  if (timer !== null) return;
  updateTime();
  timer = window.setInterval(updateTime, 1000);
}

function stop() {
  if (timer === null) return;
  clearInterval(timer);
  timer = null;
}

function onVisibilityChange() {
  // Don’t waste cycles updating when backgrounded
  if (document.visibilityState === "visible") start();
  else stop();
}

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

onMounted(() => {
  start();
  document.addEventListener("visibilitychange", onVisibilityChange, {
    passive: true,
  });
});

onBeforeUnmount(() => {
  stop();
  document.removeEventListener("visibilitychange", onVisibilityChange);
});
</script>

<template>
  <div class="flex w-full items-center justify-between max-w-2xl py-10 px-4">
    <div class="flex items-center gap-2">
      <!-- keep alt="" so it isn't announced -->
      <img
        src="/images/signature.svg"
        class="block h-7 w-auto invert transition-[filter,opacity] duration-200 dark:invert-0"
        alt=""
        width="255"
        height="200"
        loading="eager"
        decoding="async"
      />
      <p class="text-xs font-medium font-geist">EST. 2000</p>
    </div>

    <div class="flex items-center gap-2">
      <Clock :size="16" class="text-muted-foreground" aria-hidden="true" />
      <!-- Hide the constantly updating text from SR to avoid spam -->
      <p class="select-none text-xs tabular-nums font-geist" aria-hidden="true">
        {{ timeText }}
      </p>

      <!-- Provide a stable, SR-friendly equivalent (updates only on mount) -->
      <span class="sr-only"> Current time in Nairobi: {{ timeText }} </span>

      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        :aria-label="`Current theme: ${currentThemeLabel}. Toggle theme.`"
        @click="toggleTheme"
      >
        <Moon
          v-if="currentThemeLabel === 'dark'"
          :size="16"
          aria-hidden="true"
        />
        <Sun v-else :size="16" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
