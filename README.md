# Cedrouseroll Omondi — Portfolio
[![Coverage](https://codecov.io/gh/zedjarvis/cedrouseroll/graph/badge.svg)](https://codecov.io/gh/zedjarvis/cedrouseroll)

This is my personal portfolio website built with **Nuxt 4**, **Vue 3**, **TailwindCSS**, and **shadcn-vue**.

It includes my selected work, experience, writing, and a contact form powered by Supabase.

Live: **<https://cedrouseroll.dev>**

---

## Prerequisites

- **Node.js 22+**
- **pnpm** (recommended via Corepack)

Enable Corepack and activate pnpm:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Tech Stack

- **Nuxt 4** (Vue 3)
- **TailwindCSS**
- **shadcn-vue**
- **Supabase** (contact form storage)
- **VueUse**
- **Nuxt Image**
- **Nuxt A11y**
- **Sonner (vue-sonner)** for toast notifications

---

## Features

- Minimal portfolio layout
- Performance + accessibility focused UI
- Blog pages with automatic **word count** and **reading time**
- Custom cursor interaction
- Weather widget in footer
- Contact form with validation + Supabase integration
- SEO optimized metadata + OpenGraph support

---

## Setup

Install dependencies:

```bash
pnpm install
```

---

## Development

Start the dev server:

```bash
pnpm dev
```

App runs on:

```
http://localhost:3000
```

---

## Build

Build for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

---

## Test Coverage

Run coverage locally:

```bash
pnpm test:coverage -- --run
```

Coverage is uploaded in CI (GitHub Actions) and reflected in the badge at the top of this README.

---

## Environment Variables

Create a `.env` file (or copy from `.env.example` if you keep one):

```env
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_KEY=your_supabase_key
NUXT_PUBLIC_SITE_URL=https://cedrouseroll.dev
```

The contact form requires Supabase public URL/key to be present.

---

## Available Scripts

```bash
pnpm dev            # start local dev server
pnpm build          # production build
pnpm preview        # preview production build
pnpm test           # run all tests
pnpm test:watch     # test in watch mode
pnpm test:coverage  # coverage run
pnpm test:unit      # unit project tests
pnpm test:nuxt      # nuxt project tests
pnpm commit         # interactive conventional commit (Commitizen)
pnpm changelog      # regenerate CHANGELOG.md from commits
pnpm release        # changelog + version bump flow
```

---

## Contributing

Please read [contribution.md](./contribution.md) before opening a PR.
This project uses Husky hooks and commitlint, so commit messages must follow Conventional Commits.

---

## Deployment

Deployed on **Vercel**, but works on any Nuxt-compatible platform.

Docs: [https://nuxt.com/docs/getting-started/deployment](https://nuxt.com/docs/getting-started/deployment)

---

## Author

**Cedrouseroll Omondi**
Software Engineer

- GitHub: [https://github.com/zedjarvis](https://github.com/zedjarvis)
- LinkedIn: [https://www.linkedin.com/in/cedrouseroll-omondi-44b119252](https://www.linkedin.com/in/cedrouseroll-omondi-44b119252)
