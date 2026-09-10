import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  plugins: [vue()],

  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9600',
        changeOrigin: true,
        secure: false
      },
    }
  }
})
