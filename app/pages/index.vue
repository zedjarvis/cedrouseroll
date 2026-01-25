<script setup lang="ts">
import { Clock } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";

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

watch(copied, (value) => {
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
  <div
    class="flex flex-col items-center w-full min-h-screen bg-background text-foreground"
  >
    <!-- Header -->
    <header
      class="flex w-full justify-between items-center max-w-2xl py-10 px-4"
    >
      <div class="flex gap-2">
        <p class="text-xs font-medium font-geist">EST. 2000</p>
      </div>

      <div class="flex items-center gap-2">
        <Clock :size="16" class="text-muted-foreground" />
        <p class="select-none text-xs tabular-nums font-geist">
          {{ currentTime }}
        </p>
      </div>
    </header>

    <!-- Main -->
    <main class="w-full flex flex-col gap-10 pb-16">
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
              <NuxtImg
                src="/images/ced.jpeg"
                sizes="56"
                alt="Cedrouseroll Omondi"
              />
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
                  <NuxtImg
                    src="/images/verified.svg"
                    alt="Verified"
                    class="h-full w-full"
                  />
                </div>
              </div>
            </div>

            <p class="text-sm text-[#8f8f8f] font-medium">Software Engineer</p>
          </div>
        </div>

        <div class="contents">
          <p class="text-[#8f8f8f] tracking-wide leading-6">
            Hey, I'm Ced, a lead engineer at
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
              <NuxtImg
                src="/images/ke.svg"
                alt="Kenyan Flag"
                class="h-3.5 w-auto rounded"
              />
            </span>
            where I specialize in building secure, stateless APIs and backend
            systems with a strong focus on performance, accessibility,
            simplicity and reliability.
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

      <!-- 👉 PROJECTS -->
      <ClientOnly>
        <WorkSection />
      </ClientOnly>

      <!-- 👉 EXPERIENCE -->
      <ExperienceSection />

      <!-- 👉 TESTIMONIALS -->
      <TestimonialSection />

      <!-- 👉 STACK -->
      <StackSection />

      <!-- 👉 VENTURES -->
      <VentureSection />

      <!-- 👉 WRITING -->
      <WritingSection />

      <!-- 👉 PERSONAL -->
      <PersonalSection />

      <!-- 👉 CONTACT -->
      <ContactSection />
    </main>

    <!-- 👉 FOOTER -->
    <CustomFooter />
  </div>
</template>
