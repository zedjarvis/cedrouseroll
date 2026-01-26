<script setup lang="ts">
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-vue-next";
</script>

<template>
  <section
    id="contact"
    class="flex flex-col gap-8 justify-center items-center w-full"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-4 flex flex-col items-start h-min px-4 relative scroll-mt-6"
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

      <div id="contact-form" />
    </div>

    <div class="flex flex-col w-full">
      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Mail />
              <p class="">Email</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>omondicedo@gmail.com</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>

      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Linkedin />
              <p class="">Linkedin</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>/in/cedrouseroll-omondi-44b119252</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>

      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Github />
              <p class="">GitHub</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>@zedjarvis</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center w-full mt-6">
      <NuxtImg src="/images/sig.svg" class="w-60" alt="Ced's sig" />
    </div>
  </section>
</template>
