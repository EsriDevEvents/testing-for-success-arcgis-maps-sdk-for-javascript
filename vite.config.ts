/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/load': 'http://localhost:4000',
      '/save': 'http://localhost:4000',
    }
  },
  test: {
    include: ['**/__tests__/**/*.[jt]s?(x)']
  }
})
