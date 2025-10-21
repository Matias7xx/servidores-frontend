import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => isAuthenticated.value && user.value)

  // Função para limpar token inválido
  const limparTokenInvalido = () => {
    console.warn('Removendo token inválido...')
    localStorage.removeItem('auth_token')
    isAuthenticated.value = false
    user.value = null
    error.value = 'Sessão expirada. Por favor, faça login novamente.'
  }

  // Atualizar getMatricula
  const getMatricula = () => {
    // Tentar pegar do user
    if (user.value?.matricula) {
      return user.value.matricula
    }

    // Tentar pegar do token
    const token = localStorage.getItem('auth_token')
    if (!token) {
      return null
    }

    try {
      // Validar formato do token JWT
      const parts = token.split('.')

      if (parts.length !== 3) {
        console.error('Token JWT inválido - formato incorreto')
        limparTokenInvalido()
        return null
      }

      // Pegar o payload
      let payload = parts[1]

      // Corrigir padding do base64url se necessário
      payload = payload.replace(/-/g, '+').replace(/_/g, '/')
      const pad = payload.length % 4
      if (pad) {
        if (pad === 1) {
          throw new Error('String base64url inválida')
        }
        payload += new Array(5 - pad).join('=')
      }

      // Decodificar o payload
      const decoded = JSON.parse(atob(payload))
      return decoded.matricula || decoded.sub || null

    } catch (e) {
      console.error('Erro ao decodificar token:', e)
      limparTokenInvalido()
      return null
    }
  }

  const initAuth = async () => {
    try {
      console.log('Inicializando autenticação...')

      const token = localStorage.getItem('auth_token')
      if (!token) {
        console.log('Sem token')
        isAuthenticated.value = false
        user.value = null
        return false
      }

      // Validar e decodificar token
      try {
        const parts = token.split('.')

        if (parts.length !== 3) {
          throw new Error('Token JWT com formato inválido')
        }

        // Pegar o payload com tratamento base64url
        let payload = parts[1]
        payload = payload.replace(/-/g, '+').replace(/_/g, '/')
        const pad = payload.length % 4
        if (pad) {
          if (pad === 1) {
            throw new Error('String base64url inválida')
          }
          payload += new Array(5 - pad).join('=')
        }

        const decoded = JSON.parse(atob(payload))
        user.value = decoded
        isAuthenticated.value = true
        console.log('Usuário autenticado:', decoded.nome || decoded.matricula)
        return true

      } catch (error) {
        console.error('Erro ao decodificar token:', error)
        limparTokenInvalido()
        return false
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error)
      isAuthenticated.value = false
      user.value = null
      return false
    }
  }

  const login = async (credentials) => {
    try {
      loading.value = true
      error.value = null

      console.log('Fazendo login...')

      const formData = new FormData()
      formData.append('matricula', credentials.matricula)
      formData.append('password', credentials.password)

      const response = await api.post('/api/login', formData)

      if (response.data.success && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)

        await initAuth()
        console.log('Login bem-sucedido')
        return { success: true }
      }
    } catch (err) {
      console.error('Erro no login:', err)

      if (err.response?.status === 422) {
        error.value = 'Dados inválidos'
      } else if (err.response?.status === 401) {
        error.value = 'Matrícula ou senha incorretos'
      } else {
        error.value = 'Erro no servidor. Tente novamente.'
      }

      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      console.log('Fazendo logout...')

      await api.post('/api/logout')
      console.log('Logout realizado no backend')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      localStorage.removeItem('auth_token')

      isAuthenticated.value = false
      user.value = null
      loading.value = false

      console.log('Estado local limpo')
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isAuthenticated,
    user,
    loading,
    error,
    isLoggedIn,
    getMatricula,
    initAuth,
    login,
    logout,
    clearError,
    limparTokenInvalido,
  }
})
