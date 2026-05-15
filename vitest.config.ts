import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/booking/__tests__/**/*.test.ts'],
  },
})
