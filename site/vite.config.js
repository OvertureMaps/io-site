import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
//import wasmPack from 'vite-plugin-wasm-pack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  build: {
    target: 'esnext',
  }
//  plugins: [react(), wasmPack([],['@geoarrow/geoarrow-wasm/esm/index_bg'] )],
})
