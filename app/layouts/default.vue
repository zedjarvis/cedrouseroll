<script setup lang="ts">
const cursorLeftPage = usePageLeave();
const cursorRef = useTemplateRef<HTMLElement>("cursorRef");

const showCustomCursor = ref(false);
const isAvailabilityHover = ref(false);

const CURSOR_SIZE = 20;
const FOLLOW_SPEED = 0.35;

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let rafId: number | null = null;

const canHover = ref(false);
const reduceMotion = ref(false);

function animateCursor() {
  currentX += (mouseX - currentX) * FOLLOW_SPEED;
  currentY += (mouseY - currentY) * FOLLOW_SPEED;

  const el = cursorRef.value;
  if (el) {
    // keep it as a single-line transform string (fast path)
    el.style.transform = `translate3d(${currentX - CURSOR_SIZE / 2}px, ${
      currentY - CURSOR_SIZE / 2
    }px, 0)`;
  }

  rafId = window.requestAnimationFrame(animateCursor);
}

function startAnimation() {
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(animateCursor);
}

function stopAnimation() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}

function onMouseMove(e: MouseEvent) {
  if (!showCustomCursor.value) showCustomCursor.value = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
}

/**
 * Instead of elementFromPoint on every move:
 * - listen to pointerover/out on document
 * - flip state when entering/leaving availability target
 */
function onPointerOver(e: PointerEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (target.closest?.('[data-cursor="availability"]')) {
    isAvailabilityHover.value = true;
  }
}

function onPointerOut(e: PointerEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  // If we're moving out of the availability element and not into another one
  const related = e.relatedTarget as HTMLElement | null;
  const leavingAvailability = target.closest?.('[data-cursor="availability"]');
  const enteringAvailability = related?.closest?.(
    '[data-cursor="availability"]',
  );

  if (leavingAvailability && !enteringAvailability) {
    isAvailabilityHover.value = false;
  }
}

function onVisibilityChange() {
  if (document.visibilityState === "visible") startAnimation();
  else stopAnimation();
}

onMounted(() => {
  canHover.value = window.matchMedia?.("(hover: hover)")?.matches ?? false;
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Only run custom cursor on devices that can hover + users who allow motion
  if (!canHover.value || reduceMotion.value) return;

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("pointerover", onPointerOver, { passive: true });
  document.addEventListener("pointerout", onPointerOut, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  startAnimation();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("pointerover", onPointerOver);
  document.removeEventListener("pointerout", onPointerOut);
  document.removeEventListener("visibilitychange", onVisibilityChange);
  stopAnimation();
});
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <slot />

    <!-- Footer -->
    <CustomFooter />

    <!-- Custom cursor (decorative) -->
    <div
      v-show="!cursorLeftPage && showCustomCursor"
      ref="cursorRef"
      class="pointer-events-none fixed top-0 left-0 z-99999 h-5 hidden md:flex items-center justify-center rounded-full bg-white/30 mix-blend-difference backdrop-blur"
      :class="
        isAvailabilityHover ? 'w-fit px-2 cursor-grab' : 'w-5 cursor-grab'
      "
      aria-hidden="true"
    >
      <div v-if="isAvailabilityHover" class="flex items-center gap-2">
        <span class="h-3 w-3 rounded-full bg-green-500 shrink-0"></span>
        <span class="text-xs font-medium whitespace-nowrap leading-none">
          AVAILABLE FOR WORK
        </span>
      </div>
    </div>
  </div>
</template>
