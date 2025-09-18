import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Proxy para API e autenticação do Laravel
      '/login': 'http://localhost:8092',
      '/logout': 'http://localhost:8092',
      '/api': 'http://localhost:8092',
      '/sanctum': 'http://localhost:8092',
      '/storage': 'http://localhost:8092'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
