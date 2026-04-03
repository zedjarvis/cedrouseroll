<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { toast } from "vue-sonner";

const EMAIL = "omondicedo@gmail.com";

// UseClipboard can stay, but keep source stable (no need for a ref here)
const { copy, copied, isSupported } = useClipboard({ source: EMAIL });

// SR-only announcement text (helps non-visual users even if toast is not read)
const srMessage = ref("");

function openMailClient() {
  // Build a mailto with a friendly subject/body (encode to be safe)
  const subject = encodeURIComponent("Hello Ced — from your portfolio");
  const body = encodeURIComponent(
    "Hi Ced,\n\nI found your portfolio and would like to connect.\n\n—",
  );
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

function copyEmail() {
  if (!isSupported.value) {
    srMessage.value = "Clipboard not supported on this device.";
    toast.error("Clipboard not supported on this device", {
      position: "top-center",
    });
    return;
  }

  copy();
}

function onGlobalKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null;

  // Don’t hijack typing or editable controls
  if (
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable)
  ) {
    return;
  }

  // Don’t repeat-fire when key is held down
  if (e.repeat) return;

  // Only handle C/c with no modifiers (avoid conflicts like Ctrl+C)
  if (e.key === "c" || e.key === "C") {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    e.preventDefault();
    copyEmail();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeydown, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
});

// Toast + SR announcement on successful copy
watch(copied, (value) => {
  if (!value) return;

  srMessage.value = `Email copied: ${EMAIL}.`;

  toast.success("Copied email", {
    position: "top-center",
    action: {
      label: "Send Message",
      onClick: openMailClient,
    },
  });
});
</script>

<template>
  <section
    id="intro"
    class="max-w-2xl mx-auto px-4 flex flex-col items-start gap-6 w-full"
    aria-labelledby="intro-heading"
  >
    <!-- SR-only announcer -->
    <p class="sr-only" aria-live="polite" aria-atomic="true">
      {{ srMessage }}
    </p>

    <!-- Profile -->
    <div id="profile" class="flex flex-col items-start gap-4">
      <!-- Avatar -->
      <div class="relative h-14 w-14">
        <div
          class="h-14 w-14 overflow-hidden [mask:url(/images/mask.svg)_50%/cover_no-repeat_alpha]"
        >
          <img
            src="/images/ced.jpeg"
            alt="Cedrouseroll Omondi"
            width="56"
            height="56"
            loading="eager"
            decoding="async"
            class="h-14 w-14 object-cover"
          />
        </div>

        <!-- Online status dot (decorative) -->
        <span
          data-cursor="availability"
          class="absolute bottom-0 -right-1.5 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
          aria-hidden="true"
        />
      </div>

      <!-- Name + Role -->
      <div class="flex flex-col items-start">
        <div class="flex items-center gap-1.5">
          <h1 id="intro-heading" class="text-base font-semibold tracking-wide">
            Cedrouseroll Omondi
          </h1>

          <!-- Verified badge is decorative; the name already conveys identity -->
          <span class="scale-95 aspect-square relative w-5" aria-hidden="true">
            <span class="aspect-square w-5 h-4.5 block">
              <img
                src="/images/verified.svg"
                alt=""
                width="20"
                height="18"
                loading="lazy"
                decoding="async"
                class="h-full w-full"
              />
            </span>
          </span>
        </div>

        <p class="text-sm text-muted-foreground font-medium">
          Full-Stack Software Engineer
        </p>
      </div>
    </div>

    <!-- Keep server-rendered for SEO; only LinkPreview might need ClientOnly -->
    <p class="text-muted-foreground tracking-wide leading-6">
      Hey, I'm Ced, a Lead Engineer at
      <ClientOnly>
        <LinkPreview url="https://www.schoolbooks.ke">
          <span class="text-foreground">Schoolbooks </span>
          <span
            class="bg-[#248567] h-5 w-5 inline-flex text-white font-semibold rounded items-center justify-center"
            aria-hidden="true"
          >
            S
          </span>
        </LinkPreview>
        <template #fallback>
          <a
            href="https://www.schoolbooks.ke"
            class="text-foreground underline underline-offset-4"
            rel="noopener"
            target="_blank"
          >
            Schoolbooks
          </a>
        </template>
      </ClientOnly>
      based in Nairobi, Kenya
      <span class="inline-flex items-center gap-1">
        <img
          src="/images/ke.svg"
          alt="Kenyan flag"
          width="14"
          height="14"
          loading="lazy"
          decoding="async"
          class="h-3.5 w-auto rounded"
        />
      </span>
      where I build and shape the product from architecture to interface,
      focusing on making the platform simple, performant and scalable. I'm
      constantly exploring how AI can improve both developer workflows and the
      end user's experience.
    </p>

    <div id="email-shortcut">
      <p class="text-muted-foreground">
        Press
        <Button
          variant="outline"
          size="sm"
          class="h-6 w-5"
          type="button"
          :aria-label="`Copy email address ${EMAIL}`"
          @click="copyEmail"
        >
          <kbd aria-hidden="true">C</kbd>
        </Button>
        to copy my email
        <span class="sr-only">. Email address is {{ EMAIL }}.</span>
      </p>
    </div>
  </section>
</template>
