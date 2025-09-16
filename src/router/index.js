import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Views
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { 
      requiresGuest: true,
      title: 'Login - PCPB'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true,
      title: 'Dashboard - PCPB'
    }
  },
  {
    path: '/item2',
    name: 'item2',
    component: () => import('../pages/Dashboard.vue'), // Substituir pela view correta
    meta: { 
      requiresAuth: true,
      title: 'Menu Item 2 - PCPB'
    }
  },
  {
    path: '/item3',
    name: 'item3',
    component: () => import('../pages/Dashboard.vue'), // Substituir pela view correta
    meta: { 
      requiresAuth: true,
      title: 'Menu Item 3 - PCPB'
    }
  },
  {
    path: '/item4',
    name: 'item4',
    component: () => import('../pages/Dashboard.vue'), // Substituir pela view correta
    meta: { 
      requiresAuth: true,
      title: 'Menu Item 4 - PCPB'
    }
  },
  // Rotas do submenu
  {
    path: '/submenu1',
    name: 'submenu1',
    component: () => import('../pages/Submenu1.vue'), // Substituir pela view correta
    meta: { 
      requiresAuth: true,
      title: 'Submenu Item 1 - PCPB'
    }
  },
  {
    path: '/submenu2',
    name: 'submenu2',
    component: () => import('../pages/Dashboard.vue'), // Substituir pela view correta
    meta: { 
      requiresAuth: true,
      title: 'Submenu Item 2 - PCPB'
    }
  },
  // Rota 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/Dashboard.vue'), // Criar uma view 404
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
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Definir título da página
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Verificar autenticação
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirecionar para login se não autenticado
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirecionar para dashboard se já autenticado
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router