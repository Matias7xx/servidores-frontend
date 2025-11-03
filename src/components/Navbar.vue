<template>
  <nav
    class="bg-neutral-900 border-b border-neutral-800 px-3 sm:px-4 py-3 sticky top-0 z-20"
    role="navigation"
    aria-label="Navegação principal"
  >
    <div class="flex items-center justify-between">
      <!-- Logo e título -->
      <div class="flex items-center min-w-0 flex-1">
        <router-link
          to="/"
          class="flex items-center text-white hover:text-neutral-300 transition-colors focus:outline-none min-w-0"
          aria-label="Página inicial do sistema"
        >
          <img
            src="/img/logo-pc.png"
            alt=""
            class="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 shrink-0"
            role="presentation"
          />
          <div class="logo-container min-w-0">
            <div class="logo-text">
              <span class="text-base sm:text-xl font-semibold truncate block">
                Ficha Funcional
              </span>
            </div>
            <div class="logo-tagline hidden md:block">
              <small class="text-neutral-400 text-xs sm:text-sm"> Polícia Civil da Paraíba </small>
            </div>
          </div>
        </router-link>

        <!-- Botão Toggle Sidebar -->
        <button
          @click="$emit('toggle-sidebar')"
          class="ml-2 sm:ml-4 lg:ml-6 bg-neutral-900 text-white hover:text-neutral-300 hover:bg-neutral-800 transition-colors p-2 rounded focus:outline-none flex-shrink-0"
          type="button"
          :aria-label="isSidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'"
          :aria-expanded="isSidebarOpen"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Perfil do usuário -->
      <div class="relative shrink-0 ml-2">
        <div class="dropdown">
          <button
            @click="toggleDropdown"
            @keydown.escape="closeDropdown"
            class="flex items-center text-white hover:text-neutral-300 transition-colors p-1 sm:p-2 rounded focus:outline-none group"
            type="button"
            :aria-expanded="isDropdownOpen ? 'true' : 'false'"
            aria-haspopup="true"
            aria-label="Menu do usuário"
          >
            <!-- Nome do usuário - oculto em telas muito pequenas -->
            <span
              class="mr-2 hidden sm:inline font-medium text-sm truncate max-w-[120px] md:max-w-none"
              v-if="userName"
            >
              {{ userName }}
            </span>
            <span v-else class="mr-2 hidden sm:inline font-medium text-sm">Usuário</span>

            <!-- FOTO DO SERVIDOR / Ícone -->
            <div class="relative shrink-0">
              <div
                class="w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-neutral-800 border border-neutral-600 group-hover:border-neutral-400 flex items-center justify-center transition-all duration-300 shadow-lg overflow-hidden"
              >
                <!-- Exibir foto do servidor se disponível -->
                <img
                  v-if="userPhoto && !imageLoadError"
                  :src="userPhoto"
                  :alt="`Foto de ${userName || 'usuário'}`"
                  @error="handleImageError"
                  class="w-full h-full object-cover"
                />

                <!-- Ícone padrão como fallback -->
                <svg
                  v-else
                  class="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- Seta dropdown -->
            <svg
              :class="[
                'w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-200 flex-shrink-0',
                isDropdownOpen ? 'rotate-180' : '',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg shadow-2xl bg-white border border-neutral-200 z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div class="py-1">
                <!-- Logout -->
                <button
                  @click="handleLogout"
                  :disabled="isLoggingOut"
                  class="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  role="menuitem"
                >
                  <svg
                    v-if="!isLoggingOut"
                    class="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="animate-spin w-4 h-4 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { inject } from 'vue'
import { useAuth } from '@websanova/vue-auth'
import api from '../services/api'

defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false,
  },
})

const authUser = inject('authUser')
const { userName } = authUser
const auth = useAuth()

// Obter foto do usuário do token JWT
const userPhoto = computed(() => {
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) return null

    // Decodificar o payload do JWT (segunda parte do token)
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))

    // Retornar a URL da foto (foto_url está dentro de user)
    return decoded.user?.foto_url || null
  } catch {
    return null
  }
})

// Estado para controlar erro de carregamento da imagem
const imageLoadError = ref(false)

const handleImageError = () => {
  imageLoadError.value = true
}

defineEmits(['toggle-sidebar'])

const isDropdownOpen = ref(false)
const isLoggingOut = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Logout invalida o token no backend
const handleLogout = async () => {
  if (isLoggingOut.value) return

  try {
    isLoggingOut.value = true
    closeDropdown()

    // 1. Invalidar token no backend (usando a blacklist do JWT)
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        await api.post(
          'logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log('[Logout] Token invalidado no backend')
      } catch (error) {
        console.warn('[Logout] Erro ao invalidar token no backend:', error)
        // Continua mesmo se der erro no backend
      }
    }

    // 2. Limpar do Websanova
    await auth.logout({
      makeRequest: false,
      redirect: false,
    })

    // 3. Limpar localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')

    // 4. Redirecionar
    window.location.replace('/login')
  } catch (error) {
    console.error('[Logout] Erro:', error)
    // Em caso de erro, força limpeza
    localStorage.clear()
    window.location.replace('/login')
  } finally {
    isLoggingOut.value = false
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
