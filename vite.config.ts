import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Jobbar Mia',
        short_name: 'JobbarMia',
        description: 'Visualisera Mias arbetsschema',
        theme_color: '#ffffff',
        icons: [
          // SVG icons for browsers that support them
          {
            src: 'icons/pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          // PNG icons for better compatibility (especially Android)
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          // Maskable icon specifically for Android
          {
            src: 'icons/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  base: '/jobbar-mia/', // Base path for GitHub Pages
})
