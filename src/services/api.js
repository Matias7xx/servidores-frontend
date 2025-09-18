import axios from 'axios'

const api = axios.create({
  baseURL: '/', // URL relativa, vai usar o proxy
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

// Interceptor para adicionar token CSRF automaticamente
api.interceptors.request.use(async (config) => {
  // Para métodos que precisam de CSRF token
  if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    // Tentar pegar o token do meta tag primeiro
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    } else {
      console.warn('Token CSRF não encontrado')
    }
  }

  // Se não for FormData, definir Content-Type como JSON
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Debug do erro
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        headers: error.config?.headers
      }
    })

    if (error.response?.status === 419) {
      console.log('Token CSRF expirado')
      alert('Sessão expirada. A página será recarregada.')
      window.location.reload()
      return
    }

    if (error.response?.status === 401) {
      console.log('Não autenticado')
      // Não redirecionar automaticamente, deixar o componente tratar
    }

    return Promise.reject(error)
  }
)

export default api
