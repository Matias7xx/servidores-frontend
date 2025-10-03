import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Layouts
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'

// Views
import Login from '../pages/Login.vue'
const Home = () => import('../pages/Home.vue')
const InformacoesPessoais = () => import('../pages/pessoais/InformacoesPessoais.vue')
const DependentesLista = () => import('../pages/dependentes/DependentesLista.vue')
const DependentesCreate = () => import('../pages/dependentes/DependentesCreate.vue')
const DependentesEdit = () => import('../pages/dependentes/DependentesEdit.vue')
const DependentesInativos = () => import('../pages/dependentes/DependentesInativos.vue')
const FormacaoLista = () => import('../pages/formacao/FormacaoLista.vue')
const FormacaoCreate = () => import('../pages/formacao/FormacaoCreate.vue')
const FormacaoEdit = () => import('../pages/formacao/FormacaoEdit.vue')

const routes = [
  // Login
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true,
      title: 'Login - PCPB'
    }
  },

  // Rotas autenticadas (com AuthenticatedLayout)
  {
    path: '/',
    component: AuthenticatedLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { title: 'Início - PCPB' }
      },
      {
        path: 'info_pessoal',
        name: 'info_pessoal',
        component: InformacoesPessoais,
        meta: { title: 'Informações Pessoais - PCPB' }
      },
      {
        path: 'dependentes',
        name: 'dependentes',
        component: DependentesLista,
        meta: { title: 'Dependentes - PCPB' }
      },
      {
        path: 'dependentes/create',
        name: 'dependentes_create',
        component: DependentesCreate,
        meta: { title: 'Cadastrar Dependente - PCPB' }
      },
      {
        path: 'dependentes/edit/:id',
        name: 'dependentes_edit',
        component: DependentesEdit,
        meta: { title: 'Editar Dependente - PCPB' }
      },
      {
        path: 'dependentes/inativos',
        name: 'dependentes_inativos',
        component: DependentesInativos,
        meta: { title: 'Dependentes Inativos - PCPB' }
      },
      {
        path: 'formacao',
        name: 'formacao',
        component: FormacaoLista,
        meta: { title: 'Formação Acadêmica - PCPB' }
      },
      {
        path: 'formacao/create',
        name: 'formacao_create',
        component: FormacaoCreate,
        meta: { title: 'Cadastrar Formação - PCPB' }
      },
      {
        path: 'formacao/edit/:id',
        name: 'formacao_edit',
        component: FormacaoEdit,
        meta: { title: 'Editar Formação - PCPB' }
      }
    ]
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Flag para controlar se a inicialização já foi feita
let authInitialized = false

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Definir título
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Resetar flag
  if (window.__authInitialized === false) {
    authInitialized = false
    window.__authInitialized = undefined
  }

  if (!authInitialized) {
    try {
      await authStore.initAuth()
      authInitialized = true
    } catch (error) {
      console.error('Erro ao inicializar autenticação no router:', error)
      authInitialized = true
    }
  }

  // Se precisa de auth e não está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Só adiciona redirect se não for a home
    if (to.path !== '/') {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next({ name: 'Login' })
    }
    return
  }

  // Se é login e já está autenticado
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
