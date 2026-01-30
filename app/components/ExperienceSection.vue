<script setup lang="ts"></script>

<template>
  <section id="experience" class="flex flex-col items-center w-full">
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <!-- Header -->
      <div class="flex flex-col gap-4 w-full">
        <SectionTitle text="experience" />
        <SectionDescription
          text="I’ve had the opportunity to work with teams across different environments, contributing to products at various stages—from early builds to production systems. Here's a brief overview."
        />
      </div>

      <!-- ITEM -->
      <div class="w-full">
        <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
          <!-- Period -->
          <div
            class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
          >
            <SectionTitle text="2025 — NOW" />
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1 w-full">
            <p class="text-foreground">
              Lead Developer at
              <a
                href="https://www.schoolbooks.ke"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1 hover:text-[#248567] transition"
              >
                <span
                  class="bg-[#248567] h-5 w-5 inline-flex items-center justify-center text-white text-xs font-semibold rounded"
                >
                  S
                </span>
                SchoolBooks
              </a>
            </p>

            <p class="text-[#8f8f8f] text-sm w-full">
              Leading backend and API development, building secure, scalable
              systems and internal tools that support core operations and
              financial workflows.
            </p>
          </div>
        </div>
      </div>

      <!-- ITEM -->
      <div class="w-full">
        <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
          <!-- Period -->
          <div
            class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
          >
            <SectionTitle text="2023 — NOW" />
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1 w-full">
            <p class="text-foreground flex flex-wrap items-center gap-1">
              Full-Stack Engineer at
              <a
                href="https://sunculture.io"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1 hover:text-foreground transition"
              >
                <span class="h-5 w-5 inline-flex items-center justify-center">
                  <img
                    src="/images/sunculture.png"
                    alt="SunCulture Logo"
                    class="h-4 w-4"
                  />
                </span>
                SunCulture
              </a>
            </p>

            <p class="text-[#8f8f8f] text-sm w-full">
              Built and maintained internal systems, secure APIs, and commission
              workflows while supporting architecture reviews and cross-team
              delivery.
            </p>
          </div>
        </div>
      </div>

      <!-- ITEM -->
      <div class="w-full">
        <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
          <!-- Period -->
          <div
            class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
          >
            <SectionTitle text="2022 — 2023" />
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1 w-full">
            <p class="text-foreground">
              Software Developer at
              <a
                href="https://clifford.co.ke"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1 hover:text-[#4bc4f1] transition"
              >
                <span
                  class="bg-[#4bc4f1] h-5 w-5 inline-flex items-center justify-center text-white text-xs font-semibold rounded"
                >
                  C
                </span>
                Clifford Technologies
              </a>
            </p>

            <p class="text-[#8f8f8f] text-sm w-full">
              Developed and optimized Laravel and Vue applications, improved
              platform performance, and managed deployments across AWS
              infrastructure.
            </p>
          </div>
        </div>
      </div>

      <!-- CV LINK -->
      <a
        href="/cv/ced-omondi.pdf"
        target="_blank"
        class="text-sm text-muted-foreground hover:text-foreground transition"
      >
        view full document →
      </a>
    </div>
  </section>
</template>
