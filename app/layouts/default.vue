<script setup lang="ts">
import { gsap } from "gsap";

const cursorLeftPage = usePageLeave();
const cursorRef = useTemplateRef("cursorRef");
const showCustomCursor = ref(false);

const CURSOR_SIZE = 20;

const moveCursor = (x: number, y: number) => {
  if (!cursorRef.value) return;

  gsap.to(cursorRef.value, {
    x: x - CURSOR_SIZE / 2,
    y: y - CURSOR_SIZE / 2,
    duration: 0.12,
    ease: "power3.out",
  });
};

const onMouseMove = (e: MouseEvent) => {
  if (!showCustomCursor.value) showCustomCursor.value = true;
  moveCursor(e.clientX, e.clientY);
};

onMounted(() => {
  // Hide default cursor (desktop only)
  if (window.matchMedia("(hover: hover)").matches) {
    // document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMouseMove);
  }
});

onBeforeUnmount(() => {
  // document.body.style.cursor = "";
  window.removeEventListener("mousemove", onMouseMove);
});
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <slot />

    <!-- Footer -->
    <CustomFooter />

    <!-- Custom cursor -->
    <div
      v-show="!cursorLeftPage && showCustomCursor"
      ref="cursorRef"
      class="pointer-events-none fixed top-0 left-0 z-99999 h-5 w-5 rounded-full bg-white/30 mix-blend-difference hidden md:block backdrop-blur"
    />
  </div>
</template>
