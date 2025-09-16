<template>
  <div id="app" class="min-h-screen">
    <!-- Layout Condicional baseado na autenticação -->
    <AuthenticatedLayout v-if="isAuthenticated" />
    <GuestLayout v-else />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from './stores/auth'
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue'
import GuestLayout from './layouts/GuestLayout.vue'

// Store de autenticação
const authStore = useAuthStore()

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Inicializar autenticação ao montar o componente
onMounted(() => {
  authStore.initAuth()
})
</script>

<style scoped>
/* Estilos mínimos necessários */
</style>