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
          <!-- Dashboard -->
          <router-link
            to="/"
            :class="[
              'flex items-center px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors',
              $route.name === 'Home' ? 'bg-[#c1a85a] text-white border-r-2 border-[#c1a85a]' : ''
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate">Dashboard</span>
          </router-link>

          <!-- Menu Informações -->
          <div class="relative">
            <button
              @click="toggleInformacoesMenu"
              :class="[
                'w-full flex items-center justify-between px-4 py-3 text-gray-100 hover:text-white hover:bg-[#c1a85a] transition-colors text-left focus:border-[#c1a85a]',
                isInformacoesOpen ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
              ]"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 flex-shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span v-show="!isCollapsed" class="text-base truncate">Informações</span>
              </div>
              <svg
                v-show="!isCollapsed"
                :class="['w-4 h-4 transition-transform', isInformacoesOpen ? 'rotate-180' : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Submenu -->
            <div v-show="isInformacoesOpen && !isCollapsed" class="bg-gray-900">
              <router-link
                to="/info_pessoal"
                :class="[
                  'flex items-center px-8 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                  $route.name === 'info_pessoal' ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
                ]"
              >
                <svg class="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="truncate">Pessoais</span>
              </router-link>

              <router-link
                to="/dependentes"
                :class="[
                  'flex items-center px-8 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                  $route.name === 'dependentes' ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
                ]"
              >
                <svg class="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span class="truncate">Dependentes</span>
              </router-link>

              <router-link
                to="/formacao"
                :class="[
                  'flex items-center px-8 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                  $route.name === 'formacao' ? 'text-white bg-[#c1a85a] border-r-2 border-[#c1a85a]' : ''
                ]"
              >
                <svg class="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <span class="truncate">Formação</span>
              </router-link>
            </div>
          </div>

          <!-- Logout -->
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

// Props
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

// Stores e Router
const authStore = useAuthStore()
const route = useRoute()

// Estado local
const isInformacoesOpen = ref(false)

// Funções
const toggleInformacoesMenu = () => {
  isInformacoesOpen.value = !isInformacoesOpen.value
}

const handleLogout = () => {
  authStore.logout()
}

// Watcher para manter submenu aberto nas rotas corretas
watch(() => route.path, (newPath) => {
  // Manter dropdown aberto se estiver em rotas do submenu informações
  if (newPath.startsWith('/info-') || newPath.startsWith('/dependentes') || newPath.startsWith('/formacao')) {
    isInformacoesOpen.value = true
  }
})

// Fechar submenu quando sidebar colapsa
watch(() => props.isCollapsed, (newVal) => {
  if (newVal) {
    isInformacoesOpen.value = false
  }
})
</script>

<style scoped>
button:focus {
  outline: none;
  border-right: 2px solid #c1a85a;
}
</style>
