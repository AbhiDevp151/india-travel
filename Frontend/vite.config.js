import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ye line add kar

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
})