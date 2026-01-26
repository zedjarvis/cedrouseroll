<script setup lang="ts"></script>

<template>
  <section
    id="personal"
    class="flex flex-col justify-center items-center w-full"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-4 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div
        class="flex flex-col content-start items-start gap-3 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Personal" />
        </div>
        <div>
          <SectionDescription
            text="In my spare time, I enjoy listening to music and designing stuff in blender"
          />
        </div>
      </div>
      <div class="w-full">
        <div>
          <iframe
            data-testid="embed-iframe"
            style="border-radius: 12px"
            src="https://open.spotify.com/embed/track/4qZLrKsaGkYmVRGUviVPtk?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowfullscreen="false"
            allow="
              autoplay;
              clipboard-write;
              encrypted-media;
              fullscreen;
              picture-in-picture;
            "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
