import axios from 'axios'

const apiBaseUrl = `${import.meta.env.VITE_API_URL}/api`

const api = axios.create({
  // Deve ter /api no final
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

//Interceptor para incluir token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Token JWT adicionado:', config.url)
    } else {
      console.warn('Nenhum token encontrado para:', config.url)
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    console.log('Request:', config.method.toUpperCase(), config.baseURL + config.url)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

// Interceptor de resposta para tratar erros
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message,
      fullUrl: error.config?.baseURL + error.config?.url,
    })

    if (error.response?.status === 401) {
      console.warn('Token inválido ou expirado - Redirecionando para login')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    } else if (error.response?.status === 500) {
      console.error('Erro no servidor:', error.response?.data)
      error.message =
        'Ocorreu um erro interno no servidor. Por favor, entre em contato com a Diretoria de Tecnologia da Informação.'
    }

    return Promise.reject(error)
  },
)

export default api
