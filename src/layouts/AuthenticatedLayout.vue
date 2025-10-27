<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <!-- Loading enquanto carrega user -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#c1a85a]"
        ></div>
        <p class="mt-4 text-neutral-600">Carregando...</p>
      </div>
    </div>

    <!-- Layout principal -->
    <template v-else>
      <!-- Navbar -->
      <Navbar @toggle-sidebar="toggleSidebar" :is-sidebar-open="isSidebarOpen" />

      <!-- Overlay para mobile quando sidebar está aberto -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSidebarOpen"
          @click="closeSidebar"
          class="fixed inset-0 bg-black/50 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      </Transition>

      <!-- Layout com Sidebar -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <Sidebar
          :is-collapsed="isSidebarCollapsed"
          :is-open="isSidebarOpen"
          @close="closeSidebar"
        />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col min-h-0">
          <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <!-- Conteúdo dinâmico das páginas -->
            <router-view />
          </main>

          <!-- Footer -->
          <Footer />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables/useAuthUser'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

// Usar composable
const { user, userName, userMatricula, isAuthenticated, reloadUser } = useAuthUser()

// Estado do sidebar
const isSidebarCollapsed = ref(false)
const isSidebarOpen = ref(false)
const loading = ref(true)

// Função para toggle do sidebar
const toggleSidebar = () => {
  // Em mobile, abre/fecha o drawer
  // Em desktop, apenas colapsa
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = !isSidebarOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

// Função para fechar sidebar (usado no overlay mobile)
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Fornecer dados do user para todos os componentes filhos
provide('authUser', {
  user,
  userName,
  userMatricula,
  isAuthenticated,
  reloadUser,
})

// Carregar user no mount
onMounted(async () => {
  // Se não tem user, tentar recarregar
  if (!user.value || !user.value.matricula) {
    await reloadUser()

    // Aguardar
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Verificar novamente
    if (!user.value || !user.value.matricula) {
      // Verificar se tem token no localStorage
      const hasToken = !!localStorage.getItem('auth_token')

      if (!hasToken) {
        router.push('/login')
        return
      }
    }
  }

  loading.value = false
})

// Observar mudanças no user
watch(
  () => user.value,
  (newUser) => {
    // Se user ficou null, tentar recarregar
    if (!newUser && isAuthenticated.value) {
      reloadUser()
    }
  },
)

// Fechar sidebar mobile quando mudar de rota
watch(
  () => router.currentRoute.value.path,
  () => {
    if (window.innerWidth < 1024) {
      closeSidebar()
    }
  },
)
</script>
