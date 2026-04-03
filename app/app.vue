<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

const colorMode = useColorMode();
const themeColor = computed(() =>
  colorMode.value === "dark" ? "#0a0a0a" : "#f6f2e9",
);

useHead(() => ({
  meta: [
    {
      name: "theme-color",
      content: themeColor.value,
    },
  ],
}));
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Toasts: keep at root -->
    <Toaster />
  </div>
</template>
