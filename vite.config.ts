import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/pop-toast.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: ''
      // external: /^lit/
      // external: mode === "production" ? "" : /^lit-element/,
    }
  }
})
