import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    testIsolation: false,
    viewportHeight: 900,
    viewportWidth: 1280,
  },
})
