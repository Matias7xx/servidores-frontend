<template>
  <div id="app" class="min-h-screen">
    <!-- Loading inicial -->
    <div v-if="authStore.loading" class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>

    <template v-else>
      <!-- Se autenticado, usar AuthenticatedLayout -->
      <AuthenticatedLayout v-if="authStore.isAuthenticated" />

      <!-- Se não autenticado, mostrar apenas o Login -->
      <Login v-else />
    </template>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue'
import Login from './pages/Login.vue'

// Store de autenticação
const authStore = useAuthStore()

// Inicializar autenticação ao montar o componente
onMounted(() => {
  console.log('🚀 Inicializando App Vue...')
  console.log('📊 Dados disponíveis:', {
    windowUser: window.User,
    windowLaravel: window.Laravel
  })

  // Inicializar autenticação baseada nos dados do Laravel
  authStore.initAuth()
})

// Cleanup ao desmontar
onUnmounted(() => {
  console.log('🔄 App Vue desmontado')
})
</script>

<style>
/*  estilos globais */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: #2c3e50;
}

/* Estilos para loading */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Estilos para scroll suave */
html {
  scroll-behavior: smooth;
}

/* Focus styles para acessibilidade */
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Remover outline para mouse users */
.js-focus-visible button:focus:not(.focus-visible),
.js-focus-visible input:focus:not(.focus-visible),
.js-focus-visible select:focus:not(.focus-visible),
.js-focus-visible textarea:focus:not(.focus-visible) {
  outline: none;
}
</style>
