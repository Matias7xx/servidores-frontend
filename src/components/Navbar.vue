<template>
  <nav class="bg-black border-b border-gray-950 px-4 py-3" role="navigation" aria-label="Navegação principal">
    <div class="flex items-center justify-between">
      <!-- Logo e título -->
      <div class="flex items-center">
        <router-link
          to="/"
          class="flex items-center text-white hover:text-gray-300 transition-colors focus:outline-none rounded"
          aria-label="Página inicial do sistema"
        >
          <img src="/img/logo-pc.png" alt="" class="w-12 h-12 mr-3" role="presentation" />
          <div class="logo-container">
            <div class="logo-text">
              <span class="text-lg font-semibold">
                Recursos Humanos
                <span class="text-[#c1a85a]" aria-hidden="true">|</span>
                Servidor
              </span>
            </div>
            <div class="logo-tagline hidden md:block">
              <small class="text-gray-400 text-sm">Polícia Civil da Paraíba</small>
            </div>
          </div>
        </router-link>

        <!-- Botão Toggle Sidebar -->
        <button
          @click="$emit('toggle-sidebar')"
          class="ml-4 lg:ml-6 bg-black text-white hover:text-gray-300 hover:bg-gray-900 transition-colors p-2 rounded focus:outline-none"
          type="button"
          aria-label="Alternar menu lateral"
          aria-expanded="false"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div class="hidden md:block flex-1"></div>

      <!-- Perfil do usuário -->
      <div class="relative">
        <div class="dropdown">
          <button
            @click="toggleDropdown"
            @keydown.escape="closeDropdown"
            class="flex items-center text-white hover:text-gray-300 transition-colors p-2 rounded focus:outline-none"
            type="button"
            :aria-expanded="isDropdownOpen"
            aria-haspopup="true"
            aria-label="Menu do usuário"
          >
            <span class="mr-2 hidden sm:inline" v-if="authStore.user?.name">{{ authStore.user.name }}</span>
            <span v-else class="mr-2 hidden sm:inline">Usuário</span>

            <svg class="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
            </svg>

            <svg
              :class="[
                'w-4 h-4 transition-transform duration-200',
                isDropdownOpen ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownOpen"
            @click.away="closeDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            role="menu"
            aria-orientation="vertical"
          >
            <button
              @click="handleLogout"
              class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:bg-red-50"
              :class="{ 'opacity-50 cursor-not-allowed': isLoggingOut }"
              :disabled="isLoggingOut"
              role="menuitem"
            >
              <svg v-if="!isLoggingOut" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoggingOut ? 'Saindo...' : 'Sair' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

defineEmits(['toggle-sidebar'])

const authStore = useAuthStore()
const router = useRouter()

const isDropdownOpen = ref(false)
const isLoggingOut = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = async () => {
  if (isLoggingOut.value) return

  try {
    isLoggingOut.value = true
    closeDropdown()
    await authStore.logout()
    await router.push({ name: 'Login' })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    await router.push({ name: 'Login' })
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

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
