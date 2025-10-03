import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      // Login e Logout
      '^/(login|logout)': {
        target: 'http://localhost:8092',
        changeOrigin: true,
        secure: false,
        credentials: 'include',
        bypass: function (req, res, options) {
          if (req.method === 'GET') {
            return req.url
          }
        }
      },
      '/api': {
        target: 'http://localhost:8092',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      },
      '/sanctum': {
        target: 'http://localhost:8092',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      },
      '/storage': {
        target: 'http://localhost:8092',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
