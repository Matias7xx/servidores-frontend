import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Views
import Login from '../pages/Login.vue'

//views para integrar com Laravel
const Home = () => import('../pages/Home.vue')
const InformacoesPessoais = () => import('../pages/InformacoesPessoais.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true,
      title: 'Login - PCPB'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: 'Início - PCPB'
    }
  },
  {
    path: '/info_pessoal',
    name: 'info_pessoal',
    component: InformacoesPessoais,
    meta: {
      requiresAuth: true,
      title: 'Informações Pessoais - PCPB'
    }
  },
  {
    path: '/item2',
    name: 'item2',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
      title: 'Menu Item 2 - PCPB'
    }
  },
  {
    path: '/item3',
    name: 'item3',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
      title: 'Menu Item 3 - PCPB'
    }
  },
  {
    path: '/item4',
    name: 'item4',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
      title: 'Menu Item 4 - PCPB'
    }
  },
  {
    path: '/submenu1',
    name: 'submenu1',
    component: () => import('../pages/Submenu1.vue'),
    meta: {
      requiresAuth: true,
      title: 'Submenu Item 1 - PCPB'
    }
  },
  {
    path: '/submenu2',
    name: 'submenu2',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
      title: 'Submenu Item 2 - PCPB'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/Home.vue'),
    meta: {
      title: 'Página não encontrada - PCPB'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guards de navegação
router.beforeEach(async (to, from, next) => {
  console.log(`Navegando de ${from.name || 'inicial'} para ${to.name}`)

  const authStore = useAuthStore()

  // Definir título da página
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Se a store ainda não foi inicializada, inicializar
  if (authStore.user === null && authStore.isAuthenticated === false) {
    console.log('Store não inicializada, inicializando...')
    await authStore.initAuth()
  }

  // Log do estado de autenticação
  console.log('Estado de autenticação:', {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    toRoute: to.name,
    requiresAuth: to.meta.requiresAuth,
    requiresGuest: to.meta.requiresGuest
  })

  // Verificar se requer autenticação
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Rota requer autenticação, redirecionando para login')
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Verificar se é rota para visitantes apenas (login)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log('Usuário já autenticado, redirecionando para home')
    next({ name: 'Home' })
    return
  }

  // Se chegou até aqui, prosseguir normalmente
  console.log('Navegação permitida')
  next()
})

// Log após navegação
router.afterEach((to, from) => {
  console.log(`✅ Navegação concluída: ${from.name || 'inicial'} → ${to.name}`)
})

export default router
