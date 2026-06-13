import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "/",
  build: {
    sourcemap: false,
    assetsDir: "code",
    target: ["esnext"],
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,json,svg,png,webp}',
        ],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      injectRegister: false,
      manifest: false,
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  optimizeDeps: {
    include: ['@shoelace-style/shoelace']
  }
})
