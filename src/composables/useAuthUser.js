import { ref, computed, watch } from 'vue'
import { useAuth } from '@websanova/vue-auth'

//Esse Composable gerencia o estado do usuário autenticado,
//integrando o sistema de autenticação do Websanova com o localStorage,
//para garantir que os dados do usuário estejam sempre disponíveis
//mesmo após recarregamentos de página ou sessões expiradas. Foi necessário pois o Websanova tem um bug ao carregar dados com FormData.

// Estado reativo global do user
const userState = ref(null)
let initialized = false

export function useAuthUser() {
  const auth = useAuth()

  // Função para carregar user do localStorage
  const loadUserFromStorage = () => {
    const userStr = localStorage.getItem('auth_user')

    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        userState.value = user
        return user
      } catch {
        userState.value = null
        return null
      }
    } else {
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

  // Computed para acessar o user
  const user = computed(() => {
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
    const hasToken = !!localStorage.getItem('auth_token')
    const hasUser = !!user.value
    return hasToken && hasUser
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
