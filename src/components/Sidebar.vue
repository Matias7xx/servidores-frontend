<template>
  <aside
    :class="[
      'transition-all duration-300 bg-neutral-950 min-h-screen flex-shrink-0',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
    :aria-label="isCollapsed ? 'Menu de navegação (recolhido)' : 'Menu de navegação'"
    role="complementary"
  >
    <nav class="h-full" aria-label="Menu principal">
      <div class="h-full overflow-y-auto">
        <div class="py-4 space-y-1">
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
              class="w-5 h-5 flex-shrink-0"
              :class="isCollapsed ? 'mr-0' : 'mr-3'"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"
              ></path>
            </svg>
            <span v-show="!isCollapsed" class="text-base truncate font-medium">Início</span>
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
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 flex-shrink-0"
                  :class="isCollapsed ? 'mr-0' : 'mr-3'"
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
                <span v-show="!isCollapsed" class="text-base truncate font-medium"
                  >Minhas Informações</span
                >
              </div>
              <svg
                v-show="!isCollapsed"
                :class="[
                  'w-4 h-4 transition-transform duration-200',
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
                v-show="isInformacoesOpen && !isCollapsed"
                id="submenu-informacoes"
                class="bg-neutral-900 rounded-r-sm mr-2 overflow-hidden border-l-2 border-[#c1a85a]"
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
                    class="w-4 h-4 mr-3 flex-shrink-0"
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
                    class="w-4 h-4 mr-3 flex-shrink-0"
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
                    class="w-4 h-4 mr-3 flex-shrink-0"
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

          <!-- Logout -->
          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-3 text-neutral-100 hover:text-red-400 hover:bg-neutral-900 transition-all text-left mr-2 mt-4"
            :disabled="isLoggingOut"
          >
            <svg
              v-if="!isLoggingOut"
              class="w-5 h-5 flex-shrink-0"
              :class="isCollapsed ? 'mr-0' : 'mr-3'"
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
              class="animate-spin w-5 h-5 flex-shrink-0"
              :class="isCollapsed ? 'mr-0' : 'mr-3'"
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
            <span v-show="!isCollapsed" class="text-base truncate">
              {{ isLoggingOut ? 'Saindo...' : 'Sair' }}
            </span>
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

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const auth = useAuth()
const route = useRoute()

const isInformacoesOpen = ref(false)
const isLoggingOut = ref(false)

const toggleInformacoesMenu = () => {
  isInformacoesOpen.value = !isInformacoesOpen.value
}

//  Logout
const handleLogout = async () => {
  if (isLoggingOut.value) return

  try {
    isLoggingOut.value = true

    console.log('[Sidebar Logout] Iniciando...')

    // Usar auth.logout()
    await auth.logout({
      makeRequest: false,
      redirect: '/login',
    })

    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')

    console.log('[Sidebar Logout] Concluído')

    window.location.href = '/login'
  } catch (error) {
    console.error('[Sidebar Logout] Erro:', error)
    localStorage.clear()
    window.location.href = '/login'
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
