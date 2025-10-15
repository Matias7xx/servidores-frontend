import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => isAuthenticated.value && user.value)

  // Atualizar getMatricula
  const getMatricula = () => {
    // Tentar pegar do user
    if (user.value?.matricula) {
      return user.value.matricula
    }

    // Tentar pegar do token
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.matricula || payload.sub || null
      } catch (e) {
        console.error('Erro ao decodificar token:', e)
      }
    }

    return null
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

      // Decodificar token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        user.value = payload
        isAuthenticated.value = true
        console.log('Usuário autenticado:', payload.nome || payload.matricula)
        return true
      } catch (error) {
        console.error('Erro ao decodificar token:', error)
        isAuthenticated.value = false
        user.value = null
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
  }
})
