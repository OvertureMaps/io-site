import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '../../geoarrow-rs/js/pkg/esm/index_bg.wasm',
          dest: 'assets'
        },
        {
          src: '../../geoarrow-rs/js/pkg/esm/index_bg.wasm.d.ts',
          dest: 'assets'
        },
        {
          src: 'public/nybb.parquet',
          dest: 'assets'
        }
      ]
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['../../'],
    },
  },
  base: process.env.BASE_ARIA_URL
})
