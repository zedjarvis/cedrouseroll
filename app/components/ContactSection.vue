<script setup lang="ts"></script>

<template>
  <section
    id="contact"
    class="flex flex-col justify-center items-center w-full"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Contact" />
        </div>

        <div class="contents">
          <SectionDescription
            text="You can contact me using the form or via the links below."
          />
        </div>
      </div>

      <div class="flex justify-center items-center w-full">
        <NuxtImg src="/images/sig2.svg" class="w-[280px]" alt="Ced's sig" />
      </div>
    </div>
  </section>
</template>
