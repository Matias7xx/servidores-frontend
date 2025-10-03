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
    host: '0.0.0.0', // Permite acesso externo ao container
    port: 5173,
    strictPort: true,
    cors: true,
    watch: {
      usePolling: true, // Hot reload no Docker
    },
    hmr: {
      clientPort: 5173 // Porta para Hot Module Replacement
    },
    proxy: {
      // Login e Logout
      '^/(login|logout)': {
        target: 'http://host.docker.internal:8092', // Acessa o host da máquina
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
        target: 'http://host.docker.internal:8092',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      },
      '/sanctum': {
        target: 'http://host.docker.internal:8092',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      },
      '/storage': {
        target: 'http://host.docker.internal:8092',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
