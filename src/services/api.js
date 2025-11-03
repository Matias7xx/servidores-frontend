import axios from 'axios'
import { validateToken, clearAuth } from '@/utils/token-validator'

const apiBaseUrl = `${import.meta.env.VITE_API_URL}/api`

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

// Interceptor para incluir token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    // Validar token antes de usar
    if (token && validateToken(token)) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (token && !validateToken(token)) {
      // Limpar token expirado
      clearAuth()
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de resposta para tratar erros
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Verificar se é uma requisição de login ou logout
    const isLoginRequest =
      error.config?.url?.includes('login') || error.config?.url?.endsWith('/login')

    const isLogoutRequest =
      error.config?.url?.includes('logout') || error.config?.url?.endsWith('/logout')

    // Se for erro 401 E NÃO for login/logout, limpar e redirecionar
    if (error.response?.status === 401 && !isLoginRequest && !isLogoutRequest) {
      // Limpar autenticação
      clearAuth()

      // Redirecionar para login
      window.location.replace('/login')
    }
    // Se for erro 401 EM LOGIN ou LOGOUT, apenas rejeitar (não redirecionar)
    else if (error.response?.status === 401 && (isLoginRequest || isLogoutRequest)) {
      // Apenas propagar o erro
    }
    // Erro 403 - Acesso negado
    else if (error.response?.status === 403) {
      error.message = 'Você não tem permissão para acessar este recurso.'
    }
    // Erro 500
    else if (error.response?.status === 500) {
      error.message =
        'Ocorreu um erro interno no servidor. Por favor, entre em contato com a Diretoria de Tecnologia da Informação.'
    }

    return Promise.reject(error)
  },
)

export default api
