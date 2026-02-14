<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

const colorMode = useColorMode();

// Prefer dark immediately (avoid client-only flicker)
if (colorMode.preference !== "dark") {
  colorMode.preference = "dark";
}

// Ensure background/text classes exist at the root for consistent paint
useHead({
  htmlAttrs: {
    class: "dark", // keeps first paint aligned with your design
  },
});
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
