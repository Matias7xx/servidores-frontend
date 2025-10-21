import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseado no modo (development, production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      cors: true,
      watch: {
        usePolling: true,
      },
      hmr: {
        clientPort: 5173
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://172.16.30.6:8095',
          changeOrigin: true,
          secure: false,
          //rewrite: (path) => path, //caso duplique o /api
          configure: (proxy) => {
            proxy.on('proxyReq', (req) => {
              console.log('Proxy Request:', req.method, req.url)
            })
          }
        },
        '/storage': {
          target: env.VITE_API_URL || 'http://172.16.30.6:8095',
          changeOrigin: true,
          secure: false,
          //rewrite: (path) => path, //caso duplique o /api
        }
      }
    }
  }
})
