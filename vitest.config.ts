import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

// Prevent @nuxtjs/supabase plugin warnings/errors in test runtime.
process.env.NUXT_PUBLIC_SUPABASE_URL ??= 'https://example.supabase.co'
process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??= 'test-publishable-key'
process.env.SUPABASE_URL ??= 'https://example.supabase.co'
process.env.SUPABASE_KEY ??= 'test-service-role-key'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{test,spec}.ts'],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL('.', import.meta.url)),
              domEnvironment: 'happy-dom',
            },
          },
        },
      }),
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
    },
  },
})
