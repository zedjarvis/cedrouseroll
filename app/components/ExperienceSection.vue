<template>
  <section
    id="experience"
    class="flex flex-col items-center w-full"
    aria-labelledby="experience-title"
  >
    <div
      class="w-full max-w-2xl mx-auto gap-8 flex flex-col items-start h-min px-4 relative scroll-mt-6"
    >
      <!-- Header -->
      <header class="flex flex-col gap-4 w-full">
        <SectionTitle id="experience-title" text="experience" />
        <SectionDescription
          text="Experience building production software for startups and operating teams across backend systems, APIs, internal tools, frontend architecture, and product delivery."
        />
      </header>

      <!-- Items -->
      <ol class="w-full flex flex-col gap-8" aria-label="Work experience">
        <!-- ITEM 1 -->
        <li class="w-full">
          <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
            <div
              class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
            >
              <SectionTitle text="2025 — NOW" />
            </div>

            <div class="flex flex-col gap-1 w-full">
              <p class="text-foreground">
                Lead Engineer at
                <a
                  href="https://www.schoolbooks.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-[#248567] transition"
                  aria-label="SchoolBooks (opens in a new tab)"
                >
                  <span
                    class="bg-[#248567] h-5 w-5 inline-flex items-center justify-center text-white text-xs font-semibold rounded"
                    aria-hidden="true"
                  >
                    S
                  </span>
                  SchoolBooks
                </a>
              </p>

              <p class="text-muted-foreground text-sm w-full">
                Leading full-stack engineering across backend systems, frontend
                architecture, and API design for secure school finance,
                administration, and internal operations software.
              </p>
            </div>
          </div>
        </li>

        <!-- ITEM 2 -->
        <li class="w-full">
          <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
            <div
              class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
            >
              <SectionTitle text="2023 — NOW" />
            </div>

            <div class="flex flex-col gap-1 w-full">
              <p class="text-foreground flex flex-wrap items-center gap-1">
                Full-Stack Engineer at
                <a
                  href="https://sunculture.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-foreground transition"
                  aria-label="SunCulture (opens in a new tab)"
                >
                  <span
                    class="h-5 w-5 inline-flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <img
                      src="/images/sunculture.png"
                      alt=""
                      class="h-4 w-4"
                      width="16"
                      height="16"
                      loading="lazy"
                      decoding="async"
                    >
                    
                  </span>
                  SunCulture
                </a>
              </p>

              <p class="text-muted-foreground text-sm w-full">
                Built internal systems, secure APIs, and commission flows, while
                contributing to architecture reviews and cross-team product
                delivery.
              </p>
            </div>
          </div>
        </li>

        <!-- ITEM 3 -->
        <li class="w-full">
          <div class="flex flex-col sm:flex-row sm:gap-8 gap-2">
            <div
              class="sm:w-30 shrink-0 text-xs sm:text-base text-muted-foreground"
            >
              <SectionTitle text="2022 — 2023" />
            </div>

            <div class="flex flex-col gap-1 w-full">
              <p class="text-foreground">
                Software Developer at
                <a
                  href="https://clifford.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-[#4bc4f1] transition"
                  aria-label="Clifford Technologies (opens in a new tab)"
                >
                  <span
                    class="bg-[#4bc4f1] h-5 w-5 inline-flex items-center justify-center text-white text-xs font-semibold rounded"
                    aria-hidden="true"
                  >
                    C
                  </span>
                  Clifford Technologies
                </a>
              </p>

              <p class="text-muted-foreground text-sm w-full">
                Shipped Laravel and Vue applications, improved performance, and
                handled AWS deployments end-to-end for client and business
                systems.
              </p>
            </div>
          </div>
        </li>
      </ol>

      <!-- CV LINK -->
      <a
        href="/cedrouseroll_omondi_fullstack_developer_cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-muted-foreground hover:text-foreground transition"
        aria-label="View full CV document (opens in a new tab)"
      >
        view full document →
      </a>
    </div>
  </section>
</template>
