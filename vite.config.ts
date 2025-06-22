import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/appiconly/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  }
})
