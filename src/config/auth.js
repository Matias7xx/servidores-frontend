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
    redirect: '/',
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

    // Fazer parseToken a executar
    parseToken: function (res) {
      // Websanova pode passar res.data ou res diretamente
      const data = res.data || res

      if (data?.access_token) {
        return data.access_token
      }

      if (data?.token) {
        return data.token
      }

      return null
    },

    // Fazer parseUserData executar
    parseUserData: function (res) {
      // Websanova pode passar res.data ou res diretamente
      const data = res.data || res

      if (data?.user) {
        return data.user
      }

      // Tentar extrair do token
      const token = data?.access_token || data?.token
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          return payload
        } catch (e) {
          console.error('[parseUserData] Erro ao decodificar:', e)
        }
      }

      return {}
    },
  },

  logoutData: {
    url: 'logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: false,
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
