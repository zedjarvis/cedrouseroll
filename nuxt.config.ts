// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || "https://www.cedrouseroll.dev",
    },
  },

  css: ["~/assets/css/tailwind.css"],
  modules: [
    "@nuxt/a11y",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
  ],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    types: false,
    redirect: false,
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "lucide-vue-next",
        "vue-sonner",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "mathjs",
        "reka-ui",
        "motion-v",
        "gsap",
        "gsap/InertiaPlugin",
      ],
    },
  },
  colorMode: {
    classSuffix: "",
  },
  // image: {
  //   provider: "ipxStatic",
  // },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Geist Mono", provider: "google" },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },

      title: "Cedrouseroll Omondi — Software Engineer & Design Engineer",

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // Core SEO
        {
          name: "description",
          content:
            "Cedrouseroll Omondi is a software and design engineer building thoughtful digital products, exploring UI performance, systems design, and AI-assisted workflows.",
        },
        { name: "author", content: "Cedrouseroll Omondi" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },

        // UX / platform
        { name: "theme-color", content: "#0a0a0a" },
        { name: "color-scheme", content: "dark light" },
        { name: "format-detection", content: "telephone=no" },

        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Cedrouseroll Omondi" },
        { property: "og:locale", content: "en_US" },
        {
          property: "og:title",
          content: "Cedrouseroll Omondi — Software Engineer & Design Engineer",
        },
        {
          property: "og:description",
          content:
            "Thoughts, projects, and experiments at the intersection of engineering, design, and systems.",
        },
        // IMPORTANT: make image absolute in app.vue where you know siteUrl
        // Keep this as a fallback only if you want; otherwise set dynamically.

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Cedrouseroll Omondi — Software Engineer",
        },
        {
          name: "twitter:description",
          content:
            "Projects, writing, and experiments in modern software and product engineering.",
        },
        { name: "twitter:image", content: "/og.png" },
        {
          name: "twitter:image:alt",
          content: "Cedrouseroll Omondi portfolio preview",
        },
        // Optional if you have a handle:
        // { name: "twitter:creator", content: "@yourhandle" },
      ],

      link: [
        // Favicons
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },

        // PWA
        { rel: "manifest", href: "/site.webmanifest" },
      ],

      script: [
        // JSON-LD (static defaults; canonical/url handled per-route in app.vue)
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Cedrouseroll Omondi",
            jobTitle: "Software Engineer",
            url: "https://www.cedrouseroll.dev",
            sameAs: [
              "https://github.com/zedjarvis",
              "https://www.linkedin.com/in/cedrouseroll-omondi-44b119252",
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cedrouseroll Omondi",
            url: "https://www.cedrouseroll.dev",
          }),
        },
      ],
    },
  },
});
