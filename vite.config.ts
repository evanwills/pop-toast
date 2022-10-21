import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/pop-toast.ts',
      formats: ['es']
    },
    rollupOptions: {
      // output: {
      //   format: 'es',
      //   compact: true
      // },
      external: ''
      // external: /^lit/
      // external: mode === "production" ? "" : /^lit-element/,
      // output: {
      //   generatedCode: {
      //     // arrowFunctions: false,
      //     preset: 'es2015'
      //   }
      // }
    }
    // minify: 'terser'
  },
  server: {
    port: 3014
  }
})
