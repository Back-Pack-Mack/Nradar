import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootPath = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': rootPath + 'src',
    },
  }
})