import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed para verificar autenticação
  const isLoggedIn = computed(() => isAuthenticated.value && user.value)

  // Função para inicializar autenticação baseada nos dados do Laravel
  const initAuth = async () => {
    try {
      console.log('Inicializando autenticação...')
      console.log('window.User:', window.User)

      // Verificar se existe dados do usuário vindo do Laravel (window.User)
      if (window.User && window.User.id) {
        isAuthenticated.value = true
        user.value = window.User
        console.log('✅ Usuário autenticado via Laravel:', window.User)
        return true
      } else {
        // Se não tem window.User, tentar verificar via API
        console.log('⚠️ window.User não disponível, verificando via API...')
        const apiResult = await checkAuth()
        return apiResult
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar autenticação:', error)
      isAuthenticated.value = false
      user.value = null
      return false
    }
  }

  // Verificar autenticação via API como backup
  const checkAuth = async () => {
  try {
    loading.value = true
    // Use a instância 'api' do axios no lugar do fetch
    const response = await api.get('/api/user')

    isAuthenticated.value = true
    user.value = response.data
    console.log('✅ Usuário verificado via API:', response.data)
    return true

  } catch (error) {
    console.error('Erro ao verificar autenticação via API:', error)
    isAuthenticated.value = false
    user.value = null
    return false
  } finally {
    loading.value = false
  }
}

  // Login
  const login = async (credentials) => {
  try {
    loading.value = true
    error.value = null // Limpa erros anteriores

    await api.post('/login', credentials)

    // Se o login no Laravel for bem sucedido, ele redireciona.
    window.location.href = '/' // Redireciona para a home após o login

  } catch (err) {
    console.error('❌ Erro no login:', err)
    if (err.response?.status === 422) { // Erro de validação
      error.value = err.response.data.message || 'Dados inválidos.'
    } else {
      error.value = err.response?.data?.message || 'Credenciais incorretas ou erro no servidor.'
    }
    throw err
  } finally {
    loading.value = false
  }
}

  // Logout
  const logout = async () => {
    try {
      loading.value = true
      console.log('Fazendo logout...')

      await api.post('/logout')

      // Limpar estado local
      isAuthenticated.value = false
      user.value = null

      console.log('Logout realizado, recarregando a página...')
      window.location.reload()

    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      isAuthenticated.value = false
      user.value = null
      // Forçar o redirecionamento para a página de login
      window.location.href = '/login'
    } finally {
      loading.value = false
    }
  }

  // Atualizar dados do usuário
  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      console.log('✅ Dados do usuário atualizados:', user.value)
    }
  }

  // Obter dados do servidor
  const getServidorData = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/servidor')

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || 'Erro ao carregar dados do servidor')
    } catch (error) {
      console.error('Erro ao carregar dados do servidor:', error)
      error.value = error.message
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    isAuthenticated,
    user,
    loading,
    error,

    // Getters
    isLoggedIn,

    // Actions
    initAuth,
    checkAuth,
    login,
    logout,
    updateUser,
    getServidorData
  }
})
