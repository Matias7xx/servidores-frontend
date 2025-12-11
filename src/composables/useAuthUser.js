import { ref, computed, watch } from 'vue'
import { useAuth } from '@websanova/vue-auth'
import { validateToken, clearAuth } from '@/utils/token-validator'

// Esse Composable gerencia o estado do usuário autenticado,
// integrando o sistema de autenticação do Websanova com o localStorage,
// para garantir que os dados do usuário estejam sempre disponíveis
// mesmo após recarregamentos de página ou sessões expiradas.

// Estado reativo global do user
const userState = ref(null)
let initialized = false

export function useAuthUser() {
  const auth = useAuth()

  // Função para carregar user do localStorage COM VALIDAÇÃO
  const loadUserFromStorage = () => {
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')

    // Validar token primeiro
    if (!token || !validateToken(token)) {
      clearAuth(auth)
      userState.value = null
      return null
    }

    // Token válido, carregar user
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        userState.value = user
        return user
      } catch {
        clearAuth(auth)
        userState.value = null
        return null
      }
    } else {
      clearAuth(auth)
      userState.value = null
      return null
    }
  }

  // Inicializar apenas uma vez
  if (!initialized) {
    // Carregar user
    loadUserFromStorage()

    // Observar mudanças no auth do Websanova
    watch(
      () => auth.user(),
      (newUser) => {
        if (newUser) {
          userState.value = newUser
        } else {
          // Se auth.user() ficou null, tentar carregar do localStorage
          loadUserFromStorage()
        }
      },
      { immediate: true },
    )

    initialized = true
  }

  // Função auxiliar para verificar se está em rota 2FA
  const is2FARoute = () => {
    if (typeof window === 'undefined') return false
    const path = window.location.pathname
    return path.includes('/2fa/') || path === '/2fa/setup' || path === '/2fa/verify'
  }

  // Computed para acessar o user COM VALIDAÇÃO
  const user = computed(() => {
    // Validar token
    const token = localStorage.getItem('auth_token')
    if (!validateToken(token)) {
      clearAuth(auth)

      // NÃO redirecionar se estiver em rota 2FA
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/recuperar-senha' &&
        !is2FARoute()
      ) {
        window.location.replace('/login')
      }

      return null
    }

    // Primeiro tenta pegar do Websanova
    const authUser = auth.user()
    if (authUser && authUser.matricula) {
      return authUser
    }

    // Se não tem no Websanova, pega do localStorage
    if (userState.value && userState.value.matricula) {
      return userState.value
    }

    // Última tentativa: carregar do localStorage
    return loadUserFromStorage()
  })

  // Computed helpers
  const isAuthenticated = computed(() => {
    const token = localStorage.getItem('auth_token')
    const hasValidToken = validateToken(token)
    const hasUser = !!user.value
    return hasValidToken && hasUser
  })

  const userName = computed(() => {
    return user.value?.nome || user.value?.name || 'Usuário'
  })

  const userMatricula = computed(() => {
    return user.value?.matricula || ''
  })

  // Função para forçar reload do user
  const reloadUser = () => {
    return loadUserFromStorage()
  }

  return {
    user,
    isAuthenticated,
    userName,
    userMatricula,
    reloadUser,
  }
}
