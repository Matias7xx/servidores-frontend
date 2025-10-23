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
      <Navbar @toggle-sidebar="toggleSidebar" />

      <!-- Layout com Sidebar -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <Sidebar :is-collapsed="isSidebarCollapsed" />

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
const loading = ref(true)

// Função para toggle do sidebar
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

//Fornecer dados do user para todos os componentes filhos
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

//Observar mudanças no user
watch(
  () => user.value,
  (newUser) => {
    // Se user ficou null, tentar recarregar
    if (!newUser && isAuthenticated.value) {
      reloadUser()
    }
  },
)
</script>

<style scoped></style>
