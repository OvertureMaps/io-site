import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import wasmPack from 'vite-plugin-wasm-pack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
  }
//  plugins: [react(), wasmPack([],['@geoarrow/geoarrow-wasm/esm/index_bg'] )],
})
