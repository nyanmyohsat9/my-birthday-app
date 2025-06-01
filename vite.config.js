import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },
  build: {
    rollupOptions: {
      external: ['html2canvas'], // 👈 This prevents Rollup from trying to bundle html2canvas
    },
  },
})