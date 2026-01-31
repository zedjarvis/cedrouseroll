<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { toast } from "vue-sonner";

// copy email
const email = ref("omondicedo@gmail.com");
const { copy, copied, isSupported } = useClipboard({ source: email });

onKeyStroke(["c", "C"], (e) => {
  const target = e.target as HTMLElement;

  // Guard: don't hijack typing
  if (
    target?.tagName === "INPUT" ||
    target?.tagName === "TEXTAREA" ||
    target?.isContentEditable
  ) {
    return;
  }
  if (e.repeat) {
    console.log("REPEATED,, ABORTING");
  }

  // Clipboard not supported
  if (!isSupported) {
    toast.error("Clipboard not supported on this device");
    return;
  }

  copy(email.value);
});

watch(copied, (value: boolean) => {
  if (value) {
    toast.success("COPIED EMAIL", {
      position: "top-center",
      action: {
        label: "Send Message",
        onClick: () => console.log("Chatting"),
      },
    });
  }
});
</script>

<template>
  <section
    id="intro"
    class="max-w-2xl mx-auto px-4 flex flex-col items-start gap-6 w-full"
  >
    <!-- Profile -->
    <div id="profile" class="flex flex-col items-start gap-4">
      <!-- Avatar -->
      <div class="relative h-14 w-14">
        <div
          class="h-14 w-14 overflow-hidden [mask:url(/images/mask.svg)_50%/cover_no-repeat_alpha]"
        >
          <img src="/images/ced.jpeg" sizes="56" alt="Cedrouseroll Omondi" />
        </div>

        <!-- Online status dot -->
        <span
          class="absolute bottom-0 -right-1.5 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
        />
      </div>

      <!-- Name + Role (below avatar) -->
      <div id="Name+Role" class="flex flex-col items-start">
        <div class="flex items-center gap-1.5">
          <h1 class="text-base font-semibold tracking-wide">
            Cedrouseroll Omondi
          </h1>
          <div class="scale-95 aspect-square relative w-5">
            <div class="aspect-square w-5 h-4.5">
              <img
                src="/images/verified.svg"
                alt="Verified"
                class="h-full w-full"
              />
            </div>
          </div>
        </div>

        <p class="text-sm text-[#8f8f8f] font-medium">Software Developer</p>
      </div>
    </div>

    <div class="contents">
      <p class="text-[#8f8f8f] tracking-wide leading-6">
        Hey, I'm Ced, a lead Developer at
        <LinkPreview url="https://www.schoolbooks.ke">
          <span class="text-foreground">Schoolbooks </span>
          <span
            class="bg-[#248567] h-5 w-5 inline-flex text-white font-semibold rounded items-center justify-center"
          >
            S
          </span>
        </LinkPreview>
        based in Nairobi, Kenya
        <span class="inline-flex items-center gap-1">
          <img
            src="/images/ke.svg"
            alt="Kenyan Flag"
            class="h-3.5 w-auto rounded"
          />
        </span>
        where I specialize in building secure, stateless APIs and backend
        systems with a strong focus on performance, accessibility, simplicity
        and reliability.
      </p>
    </div>

    <div id="email-shortcut">
      <p class="text-[#8f8f8f]">
        Press
        <Button
          variant="outline"
          size="sm"
          class="h-6 w-5"
          @click="copy(email)"
        >
          <kbd>C</kbd>
        </Button>
        to copy my email
      </p>
    </div>
  </section>
</template>
