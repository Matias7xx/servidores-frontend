import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Actions
  const login = async (credentials) => {
    isLoading.value = true
    
    try {
      // Simulação de autenticação - substituir pela API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Dados simulados - substituir pelos dados da API
      const userData = {
        id: 1,
        name: 'Usuário Teste',
        matricula: credentials.matricula,
        email: 'usuario@pcpb.gov.br'
      }
      
      const authToken = 'fake-jwt-token-' + Date.now()
      
      // Definir usuário e token
      user.value = userData
      token.value = authToken
      
      // Salvar no localStorage se "lembrar-me" estiver marcado
      if (credentials.remember) {
        localStorage.setItem('auth_token', authToken)
        localStorage.setItem('auth_user', JSON.stringify(userData))
      } else {
        sessionStorage.setItem('auth_token', authToken)
        sessionStorage.setItem('auth_user', JSON.stringify(userData))
      }
      
      return { user: userData, token: authToken }
      
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error('Credenciais inválidas')
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    
    // Limpar storage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_user')
  }

  const initAuth = () => {
    // Verificar se há token salvo
    const savedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Erro ao recuperar dados de autenticação:', error)
        logout()
      }
    }
  }

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    
    // Atualizar no storage também
    const storage = localStorage.getItem('auth_user') ? localStorage : sessionStorage
    storage.setItem('auth_user', JSON.stringify(user.value))
  }

  return {
    // State
    user,
    token,
    isLoading,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    initAuth,
    updateUser
  }
})