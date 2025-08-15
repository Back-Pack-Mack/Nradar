import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootPath = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': rootPath + 'src',
    },
  }
})