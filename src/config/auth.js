import { decodeJWTPayloadSafely } from '@/utils/token-validator'

export default {
  tokenDefaultKey: 'auth_token',
  tokenType: 'Bearer',
  tokenHeader: 'Authorization',
  tokenStore: ['localStorage'],

  userDefaultKey: 'auth_user',

  // Login
  loginData: {
    url: 'login',
    method: 'POST',
    // IMPORTANTE: NÃO fazer redirect automático - será tratado manualmente no Login.vue
    redirect: null,
    fetchUser: false,
    staySignedIn: true,

    // Transformar para FormData
    transformRequest: [
      (data) => {
        const formData = new FormData()
        formData.append('matricula', data.matricula)
        formData.append('senha', data.senha || data.password)

        return formData
      },
    ],

    // NÃO fazer parseToken - será tratado manualmente no Login.vue
    parseToken: function (res) {
      // Retornar null para evitar que o Websanova salve o token automaticamente
      return null
    },

    // NÃO fazer parseUserData - será tratado manualmente no Login.vue
    parseUserData: function (res) {
      // Retornar null para evitar que o Websanova salve o user automaticamente
      return null
    },
  },

  logoutData: {
    url: 'logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: true, // Requisição para invalidar TOKEN no backend
  },

  fetchData: {
    enabled: false,
  },

  refreshData: {
    enabled: false,
  },

  notFoundRedirect: { path: '/login' },
  forbiddenRedirect: { path: '/login' },
  authRedirect: { path: '/login' },
}
