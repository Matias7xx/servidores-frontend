export default {
  tokenDefaultKey: 'auth_token',
  tokenType: 'Bearer',
  tokenHeader: 'Authorization',
  tokenStore: ['localStorage'],

  userDefaultKey: 'auth_user',

  // Login
  loginData: {
    url: '/login',
    method: 'POST',
    redirect: '/',
    fetchUser: false,
    staySignedIn: true,

    // Transformar para FormData
    transformRequest: [
      (data) => {
        const formData = new FormData()
        formData.append('matricula', data.matricula)
        formData.append('password', data.password)
        return formData
      },
    ],

    // Extrair token da resposta
    parseToken: (response) => {
      console.log('[parseToken] Response:', response)

      if (response.data?.token) {
        return response.data.token
      }

      return null
    },

    // Extrair usuário da resposta
    parseUserData: (response) => {
      console.log('[parseUserData] Response:', response)

      if (response.data?.user) {
        return response.data.user
      }

      // Se o backend retorna o usuário no token, decodificar
      if (response.data?.token) {
        try {
          const payload = JSON.parse(atob(response.data.token.split('.')[1]))
          return payload
        } catch (e) {
          console.error('Erro ao decodificar token:', e)
        }
      }

      return {}
    },
  },

  logoutData: {
    url: '/api/logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: false, // Não fazer requisição automática
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
