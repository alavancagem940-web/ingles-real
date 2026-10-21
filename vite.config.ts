/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// @ts-expect-error plain JS hop for local Microsoft neural TTS
import { attachTtsMiddleware } from './scripts/tts-middleware.mjs'

const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'ingles-real-live-tts',
      configureServer(server) {
        attachTtsMiddleware(server)
      },
      configurePreviewServer(server) {
        attachTtsMiddleware(server)
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: 'Inglês Real',
        short_name: 'Inglês Real',
        description: 'Do Básico à Fluência: inglês falado nos EUA, com pronúncia nativa no iPhone.',
        lang: 'pt-BR',
        dir: 'ltr',
        theme_color: '#0B1F3A',
        background_color: '#0B1F3A',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cacheId: 'ingles-real-jenny-v1',
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff,woff2}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /\/tts\/.*\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ingles-real-neural-mp3-v1',
              expiration: { maxEntries: 2500, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 43921,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 43921,
    strictPort: true,
  },
  test: {
    environment: 'node',
  },
})
