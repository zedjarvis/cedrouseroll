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
    preference: "dark",
    fallback: "dark",
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

      title: "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // Core SEO
        {
          name: "description",
          content:
            "Cedrouseroll Omondi is a full-stack software engineer in Nairobi, Kenya building SaaS products, secure APIs, internal tools, and high-performance web applications.",
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
          content:
            "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
        },
        {
          property: "og:description",
          content:
            "Full-stack software engineer in Nairobi building scalable SaaS products, secure APIs, fast frontends, and reliable product systems.",
        },
        // IMPORTANT: make image absolute in app.vue where you know siteUrl
        // Keep this as a fallback only if you want; otherwise set dynamically.

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "Cedrouseroll Omondi | Full-Stack Software Engineer in Nairobi, Kenya",
        },
        {
          name: "twitter:description",
          content:
            "Full-stack software engineer in Nairobi building scalable SaaS products, secure APIs, fast frontends, and reliable product systems.",
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
            jobTitle: "Full-Stack Software Engineer",
            url: "https://www.cedrouseroll.dev",
            description:
              "Full-stack software engineer in Nairobi, Kenya building SaaS platforms, secure APIs, internal tools, and accessible web products.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            knowsAbout: [
              "Software engineering",
              "Full-stack development",
              "API development",
              "SaaS product development",
              "Vue.js",
              "Nuxt",
              "Laravel",
              "Accessibility",
              "Performance optimization",
            ],
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
