<script setup lang="ts">
const cursorLeftPage = usePageLeave();
const cursorRef = useTemplateRef<HTMLElement>("cursorRef");

const showCustomCursor = ref(false);
const isAvailabilityHover = ref(false);

const CURSOR_SIZE = 20;
const FOLLOW_SPEED = 0.35; // 👈 tight follow (increase = faster)

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let rafId = 0;

const animateCursor = () => {
  currentX += (mouseX - currentX) * FOLLOW_SPEED;
  currentY += (mouseY - currentY) * FOLLOW_SPEED;

  if (cursorRef.value) {
    cursorRef.value.style.transform = `
      translate3d(
        ${currentX - CURSOR_SIZE / 2}px,
        ${currentY - CURSOR_SIZE / 2}px,
        0
      )
    `;
  }

  rafId = requestAnimationFrame(animateCursor);
};

const onMouseMove = (e: MouseEvent) => {
  if (!showCustomCursor.value) showCustomCursor.value = true;

  mouseX = e.clientX;
  mouseY = e.clientY;

  const el = document.elementFromPoint(
    e.clientX,
    e.clientY,
  ) as HTMLElement | null;

  isAvailabilityHover.value = !!el?.closest('[data-cursor="availability"]');
};

onMounted(() => {
  if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateCursor);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  cancelAnimationFrame(rafId);
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
      class="pointer-events-none fixed top-0 left-0 z-99999 h-5 hidden md:flex items-center justify-center rounded-full bg-white/30 mix-blend-difference backdrop-blur"
      :class="`${isAvailabilityHover ? 'w-fit px-2' : 'w-5'}`"
    >
      <!-- Availability text (only on hover target) -->
      <div v-if="isAvailabilityHover" class="flex items-center gap-2">
        <span class="h-3 w-3 rounded-full bg-green-500 shrink-0"></span>
        <span class="text-xs font-medium whitespace-nowrap leading-none">
          AVAILABLE FOR WORK
        </span>
      </div>
    </div>
  </div>
</template>
