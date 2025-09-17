<template>
  <!-- Navbar principal -->
  <nav class="bg-black border-b border-gray-950 px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Logo e título do sistema -->
      <div class="flex items-center">
        <a href="#" class="flex items-center text-white hover:text-gray-300 transition-colors">
          <img src="/img/logo-pc.png" alt="Logo PCPB" class="w-12 h-12 mr-3" />
          <div class="logo-container">
            <div class="logo-text">
              <span class="text-lg font-semibold">
                Recursos Humanos
                <span class="text-[#c1a85a]">|</span>
                Servidor
              </span>
            </div>
            <div class="logo-tagline hidden md:block">
              <small class="text-gray-400 text-sm">Polícia Civil da Paraíba</small>
            </div>
          </div>
        </a>

        <!-- Botão Toggle Sidebar -->
        <button
          @click="$emit('toggle-sidebar')"
          class="btn btn-link ml-4 lg:ml-6 bg-black text-white hover:text-gray-300 transition-colors"
          type="button"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Espaçador flexível -->
      <div class="hidden md:block flex-1"></div>

      <!-- Perfil do usuário -->
      <div class="relative">
        <div class="dropdown">
          <button
            @click="toggleDropdown"
            class="flex items-center text-white hover:text-gray-300 transition-colors focus:outline-none"
            type="button"
          >
            <span class="mr-2 hidden sm:inline" v-if="authStore.user?.name">{{ authStore.user.name }}</span>
            <span v-else class="mr-2 hidden sm:inline">Usuário</span>

            <svg class="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
            </svg>
            <!-- Setinha do dropdown -->
            <svg
              :class="[
                'w-4 h-4 transition-transform duration-200',
                isDropdownOpen ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownOpen"
            @click.away="closeDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          >
            <a
              href="#"
              @click="handleLogout"
              class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sair
            </a>
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

// Emits
defineEmits(['toggle-sidebar'])

// Stores e Router
const authStore = useAuthStore()
const router = useRouter()

// Estado do dropdown
const isDropdownOpen = ref(false)

// Funções
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  closeDropdown()
  router.push('/login')
}

// Fechar dropdown quando clicar fora
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

</style>
