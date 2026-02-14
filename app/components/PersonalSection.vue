<script setup lang="ts">
const spotifyUrl =
  "https://open.spotify.com/embed/track/4qZLrKsaGkYmVRGUviVPtk?utm_source=generator&theme=0";

const showEmbed = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Lazy-mount the iframe when section is near viewport (reduces work + third-party cost)
  if (!sectionRef.value || !("IntersectionObserver" in window)) {
    showEmbed.value = true;
    return;
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        showEmbed.value = true;
        io.disconnect();
      }
    },
    { root: null, threshold: 0.01, rootMargin: "200px" },
  );

  io.observe(sectionRef.value);

  onBeforeUnmount(() => io.disconnect());
});
</script>

<template>
  <section
    id="personal"
    ref="sectionRef"
    class="flex flex-col justify-center items-center w-full"
    aria-labelledby="personal-title"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-4 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <header
        class="flex flex-col content-start items-start gap-3 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="personal-title" text="Personal" />
        </div>
        <div>
          <SectionDescription
            text="In my spare time, I enjoy listening to music and designing stuff in blender"
          />
        </div>
      </header>

      <div class="w-full">
        <div>
          <iframe
            v-if="showEmbed"
            id="spotify-music"
            title="Spotify embed: my favourite track"
            style="border-radius: 12px"
            :src="spotifyUrl"
            width="100%"
            height="152"
            frameborder="0"
            loading="lazy"
            referrerpolicy="no-referrer"
            allow="
              autoplay;
              clipboard-write;
              encrypted-media;
              fullscreen;
              picture-in-picture;
            "
          />

          <!-- Small fallback while we delay-mount (keeps layout stable) -->
          <div
            v-else
            class="w-full rounded-xl border border-border h-[152px] flex items-center justify-center text-sm text-muted-foreground"
            aria-hidden="true"
          >
            Loading music…
          </div>

          <noscript>
            <p class="text-sm text-muted-foreground mt-2">
              JavaScript is required to load the Spotify player.
              <a
                href="https://open.spotify.com/track/4qZLrKsaGkYmVRGUviVPtk"
                target="_blank"
                rel="noopener noreferrer"
                class="underline underline-offset-4"
              >
                Open on Spotify
              </a>
            </p>
          </noscript>
        </div>
      </div>
    </div>
  </section>
</template>
