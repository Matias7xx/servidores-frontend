<template>
  <div
    :class="[
      'transition-all duration-300 bg-black min-h-screen flex-shrink-0',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <nav class="h-full">
      <div class="h-full overflow-y-auto">
        <div class="py-4 space-y-1">
          <!-- Menu Items -->
          <router-link
            to="/dashboard"
            :class="[
              'flex items-center px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors',
              $route.name === 'dashboard' ? 'bg-[#c1a85a] text-white border-r-2 border-[#c1a85a]' : ''
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Menu Item 1</span>
          </router-link>

          <router-link
            to="/item2"
            :class="[
              'flex items-center px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors',
              $route.name === 'item2' ? 'bg-[#c1a85a] text-white border-r-2 border-[#c1a85a]' : ''
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Menu Item 2</span>
          </router-link>

          <router-link
            to="/item3"
            :class="[
              'flex items-center px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors',
              $route.name === 'item3' ? 'bg-[#c1a85a] text-white border-r-2 border-[#c1a85a]' : ''
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Menu Item 3</span>
          </router-link>

          <!-- Submenu -->
          <div class="relative">
            <button
              @click="toggleSuporteMenu"
              :class="[
                'w-full flex items-center justify-between px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors text-left',
                isSuporteOpen ? 'bg-[#c1a85a] text-white' : ''
              ]"
            >
              <div class="flex items-center min-w-0 flex-1">
                <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span v-show="!isCollapsed" class="text-base truncate">Dropdown Menu</span>
              </div>
              <svg
                v-show="!isCollapsed"
                :class="[
                  'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                  isSuporteOpen ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Submenu Items -->
            <div
              v-show="isSuporteOpen && !isCollapsed"
              class="bg-gray-900 space-y-1"
            >
              <router-link
                to="/submenu1"
                :class="[
                  'flex items-center px-8 py-2 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors text-sm',
                  $route.name === 'submenu1' ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
                ]"
              >
                <svg class="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0a2 2 0 01-2 2m2-2a2 2 0 002 2M9 5a2 2 0 012 2v8a2 2 0 01-2 2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10V5a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2z"></path>
                </svg>
                <span class="truncate">Submenu Item 1</span>
              </router-link>

              <router-link
                to="/submenu2"
                :class="[
                  'flex items-center px-8 py-2 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors text-sm',
                  $route.name === 'submenu2' ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
                ]"
              >
                <svg class="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0a2 2 0 01-2 2m2-2a2 2 0 002 2M9 5a2 2 0 012 2v8a2 2 0 01-2 2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10V5a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2z"></path>
                </svg>
                <span class="truncate">Submenu Item 2</span>
              </router-link>
            </div>
          </div>

          <router-link
            to="/item4"
            :class="[
              'flex items-center px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors',
              $route.name === 'item4' ? 'bg-[#c1a85a] text-white border-r-2 border-[#c1a85a]' : ''
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Menu Item 4</span>
          </router-link>

          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-3 text-gray-100 hover:text-red-500 hover:bg-gray-900 transition-colors text-left"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Sair</span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

// Props
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

// Stores e Router
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Estado local
const isSuporteOpen = ref(false)

// Funções
const toggleSuporteMenu = () => {
  isSuporteOpen.value = !isSuporteOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// Watcher para manter submenu aberto nas rotas corretas
watch(() => route.path, (newPath) => {
  // Manter dropdown aberto se estiver em rotas do submenu
  if (newPath.startsWith('/submenu')) {
    isSuporteOpen.value = true
  }
  // Não fechar automaticamente em outras rotas para permitir navegação manual
})

// Fechar submenu quando sidebar colapsa
watch(() => props.isCollapsed, (newVal) => {
  if (newVal) {
    isSuporteOpen.value = false
  }
})
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>
