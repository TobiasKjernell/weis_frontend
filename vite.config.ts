import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// The artist platform API doesn't send Access-Control-Allow-Origin, so the
// browser blocks direct cross-origin fetches. Proxy /api same-origin instead
// of depending on the backend adding CORS headers (nginx.conf mirrors this in prod).
const ARTIST_API_ORIGIN = 'https://artistplatformdocs.polarbearsandboxproduction.com'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: ARTIST_API_ORIGIN,
        changeOrigin: true,
      },
    },
  },
})
