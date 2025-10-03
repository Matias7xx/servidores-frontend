import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => isAuthenticated.value && user.value)

  const initAuth = async () => {
    try {
      console.log('Inicializando autenticação...')

      // Tentar verificar via API
      try {
        const response = await api.get('/api/user')
        isAuthenticated.value = true
        user.value = response.data
        console.log('✅ Usuário autenticado:', response.data)
        return true
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('ℹ️ Não autenticado')
        }
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

      // Obter CSRF cookie
      await api.get('/sanctum/csrf-cookie')

      // Fazer login
      const formData = new FormData()
      formData.append('matricula', credentials.matricula)
      formData.append('password', credentials.password)
      if (credentials.remember) {
        formData.append('remember', '1')
      }

      const response = await api.post('/login', formData)

      if (response.data.success) {
        isAuthenticated.value = true
        user.value = response.data.user
        console.log('✅ Login bem-sucedido')
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

      // Fazer logout no backend
      await api.post('/logout')

      console.log('✅ Logout realizado no backend')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      // Limpar estado local
      isAuthenticated.value = false
      user.value = null
      loading.value = false

      // Resetar flag de inicialização do router
      window.__authInitialized = false

      console.log('✅ Estado local limpo')
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
    initAuth,
    login,
    logout,
    clearError
  }
})
