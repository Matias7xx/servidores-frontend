import axios from 'axios'

const api = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

// Interceptor para adicionar token CSRF
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    let csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

    if (!csrfToken) {
      // Buscar cookie CSRF
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
        csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      } catch (error) {
        console.error('Erro ao obter CSRF token:', error)
      }
    }

    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 419) {
      console.warn('Token CSRF expirado, recarregando...')
      window.location.reload()
      return
    }

    if (error.response?.status === 401) {
      console.warn('Não autenticado')
    }

    return Promise.reject(error)
  },
)

export default api
