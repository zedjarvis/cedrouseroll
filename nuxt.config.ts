// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    preset: "static",
  },
  ssr: false,

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
    redirect: false,
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  vite: {
    plugins: [tailwindcss()],
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
      htmlAttrs: {
        lang: "en",
      },

      title: "Cedrouseroll Omondi — Software Engineer & Design Engineer",
      // titleTemplate: "%s · Cedrouseroll Omondi",

      meta: [
        // Core SEO
        {
          name: "description",
          content:
            "Cedrouseroll Omondi is a software and design engineer building thoughtful digital products, exploring UI performance, systems design, and AI-assisted workflows.",
        },
        {
          name: "author",
          content: "Cedrouseroll Omondi",
        },

        // Mobile / UX
        { name: "theme-color", content: "#0a0a0a" },
        { name: "color-scheme", content: "dark light" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // Open Graph (LinkedIn, Facebook, Slack)
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Ced Omondi — Software Engineer & Design Engineer",
        },
        {
          property: "og:description",
          content:
            "Thoughts, projects, and experiments at the intersection of engineering, design, and systems.",
        },
        {
          property: "og:image",
          content: "/og.png",
        },
        {
          property: "og:url",
          content: "https://Cedrouseroll.vercel.app",
        },

        // Twitter / X
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
        {
          name: "twitter:image",
          content: "/og.png",
        },

        // Search / indexing quality
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
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

        // PWA / Manifest
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },

        // Canonical (VERY important for SEO)
        {
          rel: "canonical",
          href: "https://cedrouseroll.vercel.app",
        },
      ],
    },
  },
});
