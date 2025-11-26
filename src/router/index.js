import { createRouter, createWebHistory } from 'vue-router'

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
const AvaliacoesLista = () => import('../pages/avaliacoes/AvaliacoesLista.vue')
const AvaliacoesView = () => import('../pages/avaliacoes/AvaliacoesView.vue')
const EmConstrucao = () => import('../pages/EmConstrucao.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
      title: 'Login',
    },
  },

  {
    path: '/',
    component: AuthenticatedLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          auth: true,
          title: 'Início',
        },
      },
      {
        path: 'info_pessoal',
        name: 'info_pessoal',
        component: InformacoesPessoais,
        meta: {
          auth: true,
          title: 'Dados Pessoais',
        },
      },
      {
        path: 'dependentes',
        name: 'dependentes',
        component: DependentesLista,
        meta: {
          auth: true,
          title: 'Dependentes',
        },
      },
      {
        path: 'dependentes/create',
        name: 'dependentes_create',
        component: DependentesCreate,
        meta: {
          auth: true,
          title: 'Cadastrar Dependente',
        },
      },
      {
        path: 'dependentes/edit/:id',
        name: 'dependentes_edit',
        component: DependentesEdit,
        meta: {
          auth: true,
          title: 'Editar Dependente',
        },
      },
      {
        path: 'dependentes/inativos',
        name: 'dependentes_inativos',
        component: DependentesInativos,
        meta: {
          auth: true,
          title: 'Dependentes Inativos',
        },
      },
      {
        path: 'formacao',
        name: 'formacao',
        component: FormacaoLista,
        meta: {
          auth: true,
          title: 'Formação Acadêmica',
        },
      },
      {
        path: 'formacao/create',
        name: 'formacao_create',
        component: FormacaoCreate,
        meta: {
          auth: true,
          title: 'Cadastrar Formação',
        },
      },
      {
        path: 'formacao/edit/:id',
        name: 'formacao_edit',
        component: FormacaoEdit,
        meta: {
          auth: true,
          title: 'Editar Formação',
        },
      },
      // Rotas de Avaliações
      {
        path: 'avaliacoes',
        name: 'avaliacoes',
        component: AvaliacoesLista,
        meta: {
          auth: true,
          title: 'Minhas Avaliações',
        },
      },
      {
        path: 'avaliacoes/:mes/:ano',
        name: 'avaliacoes_view',
        component: AvaliacoesView,
        meta: {
          auth: true,
          title: 'Visualizar Avaliação',
        },
      },
      // Novas rotas - Em Construção
      {
        path: 'escalas',
        name: 'escalas',
        component: EmConstrucao,
        meta: {
          auth: true,
          title: 'Minhas Escalas',
        },
      },
      {
        path: 'cautelas',
        name: 'cautelas',
        component: EmConstrucao,
        meta: {
          auth: true,
          title: 'Minhas Cautelas',
        },
      },
      {
        path: 'frequencias',
        name: 'frequencias',
        component: EmConstrucao,
        meta: {
          auth: true,
          title: 'Minhas Frequências',
        },
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Router Guard
// A validação de expiração do token acontece no useAuthUser!!
// Aqui verifica se o token existe
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth === true)

  if (!requiresAuth) {
    return next()
  }

  // Verificar se existe token E se está válido
  const token = localStorage.getItem('auth_token')

  if (!token) {
    return next('/login')
  }

  // Se token expirado, limpar e redirecionar
  //DECODIFICAR JWT
  function decodeTokenSafely(token) {
    try {
      let payload = token.split('.')[1]
      if (!payload) return null

      // Corrige URL-safe Base64
      payload = payload.replace(/-/g, '+').replace(/_/g, '/')

      // Adiciona padding se necessário
      const padding = payload.length % 4
      if (padding) {
        payload += '='.repeat(4 - padding)
      }

      const decoded = atob(payload)
      return JSON.parse(decoded)
    } catch (e) {
      console.warn('Token JWT inválido ou corrompido:', e.message)
      return null
    }
  }

  // VALIDAÇÃO COM DECODE
  const payload = decodeTokenSafely(token)
  if (!payload || !payload.exp) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    return next('/login')
  }

  const expTimestamp = payload.exp * 1000
  if (expTimestamp < Date.now()) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    return next('/login')
  }

  // Token existe e está válido, permitir navegação
  next()
})

// Atualizar título da página
router.afterEach((to) => {
  const title = to.meta.title
  document.title = title ? `${title} - Ficha Funcional` : 'Ficha Funcional'
})

export default router
