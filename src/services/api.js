import axios from 'axios'

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
    //Verificar se é uma requisição de login
    const isLoginRequest =
      error.config?.url?.includes('login') || error.config?.url?.endsWith('/login')

    // Se for erro 401 E NÃO for login, limpar e redirecionar
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      // Redirecionar para login
      window.location.replace('/login')
    }
    //Se for erro 401 EM LOGIN, apenas rejeitar (não redirecionar)
    else if (error.response?.status === 401 && isLoginRequest) {
      // Apenas propagar o erro
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
