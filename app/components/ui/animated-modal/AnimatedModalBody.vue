<script setup lang="ts">
import { useEventListener, useScrollLock } from "@vueuse/core";
import { AnimatePresence, Motion } from "motion-v";
import { inject, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { ANIMATED_MODAL_KEY } from "./AnimatedModalContext";

interface Props {
  class?: string;
  overlayClass?: string;
  contentClass?: string;
  showClose?: boolean;
  closeOnOutside?: boolean;
  lockScroll?: boolean;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  overlayClass: "",
  contentClass: "",
  showClose: true,
  closeOnOutside: true,
  lockScroll: true,
  zIndex: 10000,
  teleportTo: "body",
});

const modal = inject(ANIMATED_MODAL_KEY, null);
if (!modal) {
  throw new Error("AnimatedModalBody must be used within <AnimatedModal>");
}

type PanelRef = HTMLElement | { $el?: HTMLElement } | null;
const panelRef = ref<PanelRef>(null);
const previousActive = ref<HTMLElement | null>(null);
const reduceMotion = ref(false);

const getPanelEl = (): HTMLElement | null => {
  const raw = panelRef.value;
  if (!raw) return null;
  if (raw instanceof HTMLElement) return raw;
  if (raw.$el instanceof HTMLElement) return raw.$el;
  return null;
};

const focusPanel = async () => {
  if (!import.meta.client) return;
  await nextTick();
  getPanelEl()?.focus?.();
};

const closeIfOutside = (event: Event) => {
  if (!props.closeOnOutside) return;
  const el = getPanelEl();
  if (!el) return;
  const target = event.target as Node | null;
  if (!target) return;
  if (el.contains(target)) return;
  modal.closeModal();
};

const scrollLock = useScrollLock(import.meta.client ? document.body : null);

function getFocusableEls(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (!modal.open.value) return;

  if (event.key === "Escape") {
    event.preventDefault();
    modal.closeModal();
    return;
  }

  if (event.key !== "Tab") return;

  const panel = getPanelEl();
  if (!panel) return;

  const focusables = getFocusableEls(panel);
  if (focusables.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  }
}

watch(
  () => modal.open.value,
  async (value) => {
    if (!import.meta.client) return;
    if (value) {
      previousActive.value = (document.activeElement as HTMLElement) || null;

      if (props.lockScroll) {
        scrollLock.value = true;
      }

      await focusPanel();
    } else {
      scrollLock.value = false;

      previousActive.value?.focus?.();
      previousActive.value = null;
    }
  },
  { immediate: true },
);

if (import.meta.client) {
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  useEventListener(document, "mousedown", (e) => {
    if (!modal.open.value) return;
    closeIfOutside(e);
  });
  useEventListener(document, "touchstart", (e) => {
    if (!modal.open.value) return;
    closeIfOutside(e);
  });
  useEventListener(document, "keydown", onDocumentKeydown);
}

onBeforeUnmount(() => {
  scrollLock.value = false;
  previousActive.value?.focus?.();
  previousActive.value = null;
});
</script>

<template>
  <Teleport :to="props.teleportTo">
    <AnimatePresence>
      <Motion
        v-if="modal.open.value"
        as="div"
        :style="{ zIndex: props.zIndex }"
        class="fixed inset-0 z-50 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]"
        :initial="reduceMotion ? { opacity: 0 } : undefined"
        :animate="
          reduceMotion
            ? { opacity: 1 }
            : {
                backdropFilter: 'blur(10px)',
              }
        "
        :exit="
          reduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                backdropFilter: 'blur(0px)',
              }
        "
      >
        <Motion
          as="div"
          class="fixed inset-0 h-full w-full bg-black/50"
          :class="props.overlayClass"
          :initial="{ opacity: 0 }"
          :animate="
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  backdropFilter: 'blur(10px)',
                }
          "
          :exit="
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  backdropFilter: 'blur(0px)',
                }
          "
        />

        <Motion
          ref="panelRef"
          as="div"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="relative z-50 flex max-h-[85vh] w-[min(720px,calc(100vw-32px))] flex-col overflow-hidden overscroll-contain rounded-2xl border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950"
          :class="[props.class]"
          :initial="
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.5,
                  rotateX: 80,
                  y: 40,
                }
          "
          :animate="
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  y: 0,
                }
          "
          :exit="
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.8,
                  rotateX: 10,
                }
          "
          :transition="
            reduceMotion
              ? { duration: 0.12, ease: 'easeOut' }
              : {
                  opacity: { duration: 0.2, ease: 'easeOut' },
                  scale: { type: 'spring', stiffness: 260, damping: 15 },
                  rotateX: { type: 'spring', stiffness: 260, damping: 15 },
                  y: { type: 'spring', stiffness: 260, damping: 15 },
                }
          "
        >
          <button
            v-if="props.showClose"
            type="button"
            class="group absolute top-4 right-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Close"
            @click="modal.closeModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3 dark:text-white"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <div
            class="flex flex-1 flex-col"
            :class="[props.contentClass]"
          >
            <slot />
          </div>
        </Motion>
      </Motion>
    </AnimatePresence>
  </Teleport>
</template>
