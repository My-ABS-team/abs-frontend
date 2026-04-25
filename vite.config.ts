import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Allows "@/components/..." imports throughout the project
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    // Proxy API calls to backend during development — change the target
    // to your backend URL when you have one
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manually split large vendor libs so the main bundle stays lean
        manualChunks: {
          'vendor-react':   ['react', 'react-dom', 'react-router-dom'],
          'vendor-query':   ['@tanstack/react-query'],
          'vendor-charts':  ['recharts'],
          'vendor-forms':   ['react-hook-form', 'zod', '@hookform/resolvers'],
          'vendor-zustand': ['zustand'],
        },
      },
    },
  },
})
