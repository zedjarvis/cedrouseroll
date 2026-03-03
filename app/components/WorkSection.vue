<script setup lang="ts">
import { Maximize, SquareArrowOutUpRight } from "lucide-vue-next";
import { DotGrid } from "~/components/ui/dot-grid";
import { AnimatedModal, AnimatedModalBody } from "./ui/animated-modal";
import {
  clampOffset,
  createOffsetMap,
  getKeyboardStep,
  isWorkCardControlKey,
  type Offset,
} from "~/lib/workSection";

const breakpoints = useBreakpoints({ sm: 640, md: 768, lg: 1024, xl: 1280 });
const isMobile = breakpoints.smaller("sm"); // < 640px

type Project = {
  id: string;
  image: string;
  description: string;
  link: string;
  alt: string;
  // default absolute positioning classes (DO NOT CHANGE)
  posClass: string;
  zClass: string;
  rotateClass: string;
};

const projects: Project[] = [
  {
    id: "sb",
    image: "/images/sb.jpg",
    alt: "Schoolbooks platform screenshot",
    description:
      "An all-in-one, user-first, AI-enabled platform designed to simplify school accounting and management.",
    link: "https://www.schoolbooks.ke",
    posClass: "md:top-2.75 md:left-2.25",
    zClass: "md:z-1",
    rotateClass: "md:rotate-[-4deg]",
  },
  {
    id: "haft",
    image: "/images/portfolio.jpg",
    alt: "Haft Studio website screenshot",
    description:
      "A modern, minimal website built for a design and furniture studio.",
    link: "https://haftstudio-website.vercel.app",
    posClass: "md:bottom-2.75 md:left-60.5",
    zClass: "md:z-4",
    rotateClass: "md:rotate-[4deg]",
  },
  {
    id: "meskith",
    image: "/images/meskith.jpg",
    alt: "Meskith Studio landing page screenshot",
    description:
      "Landing page and branding system for Meskith Studio, including Meskith AI.",
    link: "http://meskith.com",
    posClass: "md:top-2.5 md:left-118",
    zClass: "md:z-1",
    rotateClass: "md:rotate-[-4deg]",
  },
  {
    id: "compare",
    image: "/images/portfolio2.jpg",
    alt: "Vue3 compare image component screenshot",
    description:
      "Built an open-source Vue 3 component for visually comparing two images.",
    link: "https://vue3-compare-image.vercel.app",
    posClass: "md:bottom-2.25 md:left-176.5",
    zClass: "md:z-4",
    rotateClass: "md:rotate-[4deg]",
  },
];

const activeProject = ref<Project | null>(null);
const isModalOpen = ref(false);

function openModal(project: Project) {
  activeProject.value = project;
  isModalOpen.value = true;
}

/**
 * Drag + persistence
 * - We do NOT change your base absolute positioning classes.
 * - We apply only an extra translate offset on a wrapper via inline style.
 * - Stored offsets are relative (dx, dy) pixels.
 */
const STORAGE_KEY = "work:dragOffsets:v1";

type Offsets = Record<string, Offset>;
const offsets = reactive<Offsets>({});

function loadOffsets() {
  if (!import.meta.client) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Offsets;
    for (const p of projects) {
      if (parsed?.[p.id]) offsets[p.id] = parsed[p.id];
    }
  } catch {
    // ignore corrupt storage
  }
}

function saveOffsets() {
  if (!import.meta.client) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offsets));
  } catch {
    // storage may be disabled
  }
}

function ensureOffset(id: string) {
  if (!offsets[id]) offsets[id] = { x: 0, y: 0 };
  return offsets[id];
}

function resetPosition(projectId: string) {
  offsets[projectId] = { x: 0, y: 0 };
  saveOffsets();
}

const canvasEl = ref<HTMLElement | null>(null);

const draggingId = ref<string | null>(null);
const start = reactive({
  pointerId: 0,
  startX: 0,
  startY: 0,
  origX: 0,
  origY: 0,
});

const reduceMotion = ref(false);

onMounted(() => {
  Object.assign(offsets, createOffsetMap(projects.map((project) => project.id)));
  loadOffsets();
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
});

function clampWithinCanvas(el: HTMLElement, nextX: number, nextY: number) {
  const canvas = canvasEl.value;
  if (!canvas) return { x: nextX, y: nextY };

  const canvasRect = canvas.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  // If we move by (dx, dy), the rect becomes:
  // left+dx, top+dy. We clamp so it stays inside the canvas.
  const minX = canvasRect.left - elRect.left;
  const maxX = canvasRect.right - elRect.right;
  const minY = canvasRect.top - elRect.top;
  const maxY = canvasRect.bottom - elRect.bottom;

  return clampOffset({ x: nextX, y: nextY }, { minX, maxX, minY, maxY });
}

function onPointerDown(e: PointerEvent, projectId: string) {
  // Only enable dragging on md+ layouts (mobile is stacked)
  if (!import.meta.client) return;
  if (window.matchMedia("(min-width: 768px)").matches === false) return;

  // Only left click / primary touch
  if (e.button !== 0 && e.pointerType === "mouse") return;

  const target = e.currentTarget as HTMLElement | null;
  if (!target) return;

  draggingId.value = projectId;
  const off = ensureOffset(projectId);

  start.pointerId = e.pointerId;
  start.startX = e.clientX;
  start.startY = e.clientY;
  start.origX = off.x;
  start.origY = off.y;

  target.setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent, projectId: string) {
  if (draggingId.value !== projectId) return;
  if (e.pointerId !== start.pointerId) return;

  const target = e.currentTarget as HTMLElement | null;
  if (!target) return;

  const dx = e.clientX - start.startX;
  const dy = e.clientY - start.startY;

  const nextX = start.origX + dx;
  const nextY = start.origY + dy;

  const clamped = clampWithinCanvas(target, nextX, nextY);

  offsets[projectId] = clamped;
}

function onPointerUp(e: PointerEvent, projectId: string) {
  if (draggingId.value !== projectId) return;
  if (e.pointerId !== start.pointerId) return;

  draggingId.value = null;
  saveOffsets();
}

function nudge(
  projectId: string,
  deltaX: number,
  deltaY: number,
  el: HTMLElement,
) {
  const off = ensureOffset(projectId);
  const clamped = clampWithinCanvas(el, off.x + deltaX, off.y + deltaY);
  offsets[projectId] = clamped;
  saveOffsets();
}

function handleCardKeydown(event: KeyboardEvent, projectId: string) {
  if (!isWorkCardControlKey(event.key)) return;
  event.preventDefault();

  const el = event.currentTarget as HTMLElement;
  const step = getKeyboardStep(event.shiftKey);
  if (event.key === "ArrowLeft") nudge(projectId, -step, 0, el);
  if (event.key === "ArrowRight") nudge(projectId, step, 0, el);
  if (event.key === "ArrowUp") nudge(projectId, 0, -step, el);
  if (event.key === "ArrowDown") nudge(projectId, 0, step, el);
  if (event.key === "Escape") resetPosition(projectId);
}
</script>

<template>
  <section
    id="work"
    class="flex flex-col gap-4 w-full h-min scroll-mt-6 relative justify-center items-center"
    aria-labelledby="work-title"
  >
    <div
      class="flex flex-col items-start gap-6 mx-auto w-full max-w-2xl px-4 relative h-min"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="work-title" text="work" />
        </div>
        <div class="contents">
          <SectionDescription
            text="Below are some select projects, full walkthrough on request"
          />
        </div>
      </div>
    </div>

    <div
      id="canvas"
      ref="canvasEl"
      class="w-full py-10 md:py-0 h-min md:h-135 relative flex items-center justify-center overflow-hidden"
    >
      <!-- Background -->
      <div
        v-if="isMobile"
        class="absolute inset-0 bg-[url(/images/dot-bg.svg)] bg-repeat bg-center bg-size-[150px_auto] opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        v-else
        class="absolute inset-0 top-0 left-0 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <!-- Optional: avoid heavy motion for reduced-motion users -->
        <ClientOnly>
          <DotGrid
            v-if="!reduceMotion"
            :dot-size="3"
            :gap="12"
            base-color="#8f8f8f"
            active-color="#8f8f8f"
            :proximity="100"
            :speed-trigger="150"
            :shock-radius="250"
            :shock-strength="5"
            :max-speed="5000"
            :resistance="750"
            :return-duration="1.5"
            class-name="custom-dot-grid"
          />
        </ClientOnly>
      </div>

      <!-- Cards -->
      <div
        class="relative flex flex-col items-center gap-6 md:block w-full h-min md:h-94 md:max-w-275"
      >
        <p id="work-drag-help" class="sr-only">
          On desktop, you can drag project cards within this section. Focus a
          card and use arrow keys to nudge it; hold Shift for bigger steps.
        </p>

          <div
            v-for="project in projects"
            :key="project.id"
            class="md:absolute"
          :class="[project.posClass, project.zClass]"
        >
          <!-- Drag wrapper: translate only, no default positioning changes -->
          <div
            class="group select-none touch-none"
            :class="[
              'will-change-transform',
              draggingId === project.id ? 'cursor-grabbing' : 'cursor-grab',
            ]"
            :style="{
              transform: `translate3d(${ensureOffset(project.id).x}px, ${ensureOffset(project.id).y}px, 0)`,
            }"
            role="group"
            tabindex="0"
            :aria-describedby="'work-drag-help'"
            @pointerdown="(e) => onPointerDown(e, project.id)"
            @pointermove="(e) => onPointerMove(e, project.id)"
            @pointerup="(e) => onPointerUp(e, project.id)"
            @pointercancel="(e) => onPointerUp(e, project.id)"
            @dblclick.stop="resetPosition(project.id)"
            @keydown="(event) => handleCardKeydown(event, project.id)"
          >
            <!-- Visual card (keeps your hover scale + rotation) -->
            <div
              class="relative bg-white border-white border-4 border-solid w-80 h-62 shadow-md rounded-lg overflow-hidden p-1 transition-all duration-300 ease-out group-hover:scale-[1.08] focus-visible:scale-[1.08] outline-none"
              :class="[
                project.rotateClass,
                'md:group-hover:rotate-0 md:focus-visible:rotate-0 transition-transform duration-300 ease-out',
                'focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              ]"
            >
              <!-- Open modal button (not hover-only; also appears on focus) -->
              <button
                type="button"
                class="absolute hidden group-hover:flex group-focus-within:flex items-center justify-center h-9 w-9 bg-[#1c1c1c] hover:bg-[#222] rounded-full top-2 right-2 text-muted-foreground transition z-10"
                :aria-label="`Open preview for ${project.alt}`"
                @pointerdown.stop
                @click.stop="openModal(project)"
              >
                <Maximize :size="18" aria-hidden="true" />
              </button>

              <div class="absolute inset-0 z-0">
                <NuxtImg
                  :src="project.image"
                  :alt="project.alt"
                  width="320"
                  height="248"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  densities="x1"
                  format="webp"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <AnimatedModal v-model:open="isModalOpen">
      <AnimatedModalBody :lock-scroll="true">
        <div v-if="activeProject">
          <NuxtImg
            :src="activeProject.image"
            :alt="activeProject.alt"
            width="1280"
            height="900"
            class="w-full h-auto"
            loading="eager"
            densities="x1"
            format="webp"
          />

          <p
            class="p-4 flex justify-center text-center text-muted-foreground text-sm leading-relaxed gap-2 items-center"
          >
            <span>{{ activeProject.description }}</span>

            <NuxtLink
              external
              :to="activeProject.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center"
              :aria-label="`Open ${activeProject.alt} in a new tab`"
            >
              <SquareArrowOutUpRight :size="16" aria-hidden="true" />
            </NuxtLink>
          </p>
        </div>
      </AnimatedModalBody>
    </AnimatedModal>
  </section>
</template>
