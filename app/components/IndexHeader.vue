<script setup lang="ts">
import { Clock } from "lucide-vue-next";

const timeText = ref("");

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
        class="h-7"
        alt=""
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
    </div>
  </div>
</template>
