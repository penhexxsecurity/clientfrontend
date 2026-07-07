import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Jab bhi frontend '/api' se shuru hone wali request bhejega, 
      // Vite use automatically backend server par redirect kar dega.
      '/api': {
        target: 'https://final-client-backend.onrender.com/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})