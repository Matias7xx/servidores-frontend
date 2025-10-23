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
        path: 'avaliacoes',
        name: 'avaliacoes',
        component: EmConstrucao,
        meta: {
          auth: true,
          title: 'Minhas Avaliações',
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

export default router
