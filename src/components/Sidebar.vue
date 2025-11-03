<template>
  <aside
    :class="[
      'transition-all duration-300 bg-neutral-900 min-h-screen shrink-0',
      // Desktop: largura baseada em collapsed
      'lg:relative',
      isCollapsed ? 'lg:w-16' : 'lg:w-64',
      // Mobile: sidebar como drawer
      'fixed inset-y-0 left-0 z-40 lg:z-auto',
      'w-64',
      // Transição mobile
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
    :aria-label="isCollapsed ? 'Menu de navegação (recolhido)' : 'Menu de navegação'"
    role="complementary"
  >
    <!-- Botão fechar mobile -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 lg:hidden text-neutral-400 hover:text-white p-2"
      aria-label="Fechar menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <nav class="h-full" aria-label="Menu principal">
      <div class="h-full overflow-y-auto">
        <div class="py-4 space-y-1 pt-16 lg:pt-4">
          <!-- Dashboard -->
          <router-link
            to="/"
            :class="[
              'w-full flex items-center px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all mr-2',
              $route.name === 'Home' ? 'bg-[#c1a85a] text-white shadow-lg' : '',
            ]"
            :aria-current="$route.name === 'Home' ? 'page' : undefined"
          >
            <svg
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"
              ></path>
            </svg>
            <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
              Início
            </span>
          </router-link>

          <!-- Menu Informações -->
          <div class="relative">
            <button
              @click="toggleInformacoesMenu"
              :class="[
                'w-full flex items-center justify-between px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all text-left mr-2',
                isInformacoesOpen ? 'text-white bg-[#c1a85a] shadow-lg' : '',
              ]"
              :aria-expanded="isInformacoesOpen ? 'true' : 'false'"
              aria-controls="submenu-informacoes"
              aria-label="Expandir ou recolher menu de Informações"
            >
              <div class="flex items-center min-w-0">
                <svg
                  class="w-5 h-5 shrink-0"
                  :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
                  Minhas Informações
                </span>
              </div>
              <svg
                v-show="(!isCollapsed && !isOpen) || isOpen"
                :class="[
                  'w-4 h-4 transition-transform duration-200 shrink-0',
                  isInformacoesOpen ? 'rotate-180' : '',
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

            <!-- Submenu -->
            <transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-show="isInformacoesOpen && (!isCollapsed || isOpen)"
                id="submenu-informacoes"
                class="bg-neutral-800 rounded-r-sm mr-2 overflow-hidden border-l-2 border-[#c1a85a]"
              >
                <router-link
                  to="/info_pessoal"
                  :class="[
                    'flex items-center px-8 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                    $route.name === 'info_pessoal' ? 'text-white bg-[#c1a85a]' : '',
                  ]"
                  :aria-current="$route.name === 'info_pessoal' ? 'page' : undefined"
                >
                  <svg
                    class="w-4 h-4 mr-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span class="truncate">Dados Pessoais</span>
                </router-link>

                <router-link
                  to="/dependentes"
                  :class="[
                    'flex items-center px-8 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                    $route.name === 'dependentes' ? 'text-white bg-[#c1a85a]' : '',
                  ]"
                  :aria-current="$route.name === 'dependentes' ? 'page' : undefined"
                >
                  <svg
                    class="w-4 h-4 mr-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  <span class="truncate">Dependentes</span>
                </router-link>

                <router-link
                  to="/formacao"
                  :class="[
                    'flex items-center px-8 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-[#c1a85a] transition-colors',
                    $route.name === 'formacao' ? 'text-white bg-[#c1a85a]' : '',
                  ]"
                  :aria-current="$route.name === 'formacao' ? 'page' : undefined"
                >
                  <svg
                    class="w-4 h-4 mr-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                  <span class="truncate">Formação Acadêmica</span>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Minhas Escalas -->
          <router-link
            to="/escalas"
            :class="[
              'w-full flex items-center px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all mr-2',
              $route.name === 'escalas' ? 'bg-[#c1a85a] text-white shadow-lg' : '',
            ]"
            :aria-current="$route.name === 'escalas' ? 'page' : undefined"
          >
            <svg
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
              Minhas Escalas
            </span>
          </router-link>

          <!-- Minhas Cautelas -->
          <router-link
            to="/cautelas"
            :class="[
              'w-full flex items-center px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all mr-2',
              $route.name === 'cautelas' ? 'bg-[#c1a85a] text-white shadow-lg' : '',
            ]"
            :aria-current="$route.name === 'cautelas' ? 'page' : undefined"
          >
            <svg
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
              Minhas Cautelas
            </span>
          </router-link>

          <!-- Minhas Avaliações -->
          <router-link
            to="/avaliacoes"
            :class="[
              'w-full flex items-center px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all mr-2',
              $route.name === 'avaliacoes' ? 'bg-[#c1a85a] text-white shadow-lg' : '',
            ]"
            :aria-current="$route.name === 'avaliacoes' ? 'page' : undefined"
          >
            <svg
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
              Minhas Avaliações
            </span>
          </router-link>

          <!-- Minhas Frequências -->
          <router-link
            to="/frequencias"
            :class="[
              'w-full flex items-center px-4 py-3 text-neutral-100 hover:text-white hover:bg-[#c1a85a] transition-all mr-2',
              $route.name === 'frequencias' ? 'bg-[#c1a85a] text-white shadow-lg' : '',
            ]"
            :aria-current="$route.name === 'frequencias' ? 'page' : undefined"
          >
            <svg
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            <span v-show="!isCollapsed || isOpen" class="text-base truncate font-medium">
              Minhas Frequências
            </span>
          </router-link>

          <!-- Logout -->
          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-3 text-neutral-100 hover:text-red-400 hover:bg-neutral-800 transition-all text-left mr-2 mt-4"
            :disabled="isLoggingOut"
          >
            <svg
              v-if="!isLoggingOut"
              class="w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
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
              class="animate-spin w-5 h-5 shrink-0"
              :class="isCollapsed ? 'lg:mr-0' : 'mr-3'"
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
            <span v-show="!isCollapsed || isOpen" class="text-base truncate"> Sair </span>
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@websanova/vue-auth'
import api from '../services/api'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])

const auth = useAuth()
const route = useRoute()

const isInformacoesOpen = ref(false)
const isLoggingOut = ref(false)

const toggleInformacoesMenu = () => {
  isInformacoesOpen.value = !isInformacoesOpen.value
}

// Logout invalida o token no backend
const handleLogout = async () => {
  if (isLoggingOut.value) return

  try {
    isLoggingOut.value = true

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

watch(
  () => route.path,
  (newPath) => {
    if (
      newPath.startsWith('/info_pessoal') ||
      newPath.startsWith('/dependentes') ||
      newPath.startsWith('/formacao')
    ) {
      isInformacoesOpen.value = true
    } else {
      isInformacoesOpen.value = false
    }
  },
  { immediate: true },
)

watch(
  () => props.isCollapsed,
  (newVal) => {
    if (newVal) {
      isInformacoesOpen.value = false
    }
  },
)
</script>

<style scoped>
/* Scroll */
nav {
  scrollbar-width: thin;
  scrollbar-color: #c1a85a #171717;
}

nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: #171717;
}

nav::-webkit-scrollbar-thumb {
  background: #c1a85a;
  border-radius: 3px;
}
</style>
