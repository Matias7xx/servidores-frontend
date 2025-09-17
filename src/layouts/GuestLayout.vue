<template>
  <div class="guest-layout min-h-screen bg-gray-50">
    <!-- Verificar se a rota atual é de login -->
    <div v-if="$route.name === 'Login' || !$route.name">
      <!-- Componente de Login diretamente -->
      <Login />
    </div>

    <!-- Para rotas públicas futuras -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full space-y-8 p-8">
        <div class="text-center">
          <img class="mx-auto h-12 w-auto" src="/img/logo-pc.png" alt="PCPB">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Acesso Restrito
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Você precisa estar logado para acessar esta página.
          </p>
          <div class="mt-4">
            <router-link
              to="/login"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Fazer Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Login from '../pages/Login.vue'

const $route = useRoute()
</script>

<style scoped>
.guest-layout {
  /* Estilos específicos para layout de visitante */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
