import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "https://BrayamFonck.github.io/Dashboard-react-vite",
  server:{
    allowedHosts: true,
    host: true,
    port: 5173,
    strictPort: true,
    open: true,
  }
})
