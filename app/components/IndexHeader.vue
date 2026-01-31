<script setup lang="ts">
import { Clock } from "lucide-vue-next";

// reactive time logic
const currentTime = ref("");
let timer: number;

const updateTime = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  currentTime.value = `${time} GMT+3`;
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <header class="flex w-full justify-between items-center max-w-2xl py-10 px-4">
    <div class="flex items-center gap-2">
      <img src="/images/signature.svg" class="h-7" alt="Ced's Signature Logo" />
      <p class="text-xs font-medium font-geist">EST. 2000</p>
    </div>

    <div class="flex items-center gap-2">
      <Clock :size="16" class="text-muted-foreground" />
      <p class="select-none text-xs tabular-nums font-geist">
        {{ currentTime }}
      </p>
    </div>
  </header>
</template>
