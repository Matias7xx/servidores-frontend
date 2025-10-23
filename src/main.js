import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from './services/api'

import { createAuth } from '@websanova/vue-auth'
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js'
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js'
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js'
import authConfig from './config/auth'
import authInitPlugin from './plugins/auth-init'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Instalar router ANTES do auth
app.use(router)

// Configurar auth DEPOIS do router
const auth = createAuth({
  plugins: {
    http: api,
    router: router,
  },
  drivers: {
    auth: driverAuthBearer,
    http: driverHttpAxios,
    router: driverRouterVueRouter,
  },
  options: authConfig,
})

app.use(auth)

// Plugin de inicialização do auth
auth.load([authInitPlugin])

app.mount('#app')
