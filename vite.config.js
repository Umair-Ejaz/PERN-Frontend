import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Add these configurations for better production builds
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Helps with debugging production errors
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactRouter: ['react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          icons: ['react-icons']
        }
      }
    }
  },
  // Important for Netlify deployments
  base: './',
  // Development server configuration
  server: {
    port: 3000,
    strictPort: true,
    open: true
  },
  preview: {
    port: 3000,
    strictPort: true
  }
})