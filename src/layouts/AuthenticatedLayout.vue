<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="toggleSidebar" />
    
    <!-- Layout com Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar :is-collapsed="isSidebarCollapsed" />
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-h-0">
        <main class="flex-1 p-2 sm:p-4 overflow-auto">
          <!-- Conteúdo dinâmico das páginas -->
          <router-view />
        </main>
        
        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

// Estado do sidebar
const isSidebarCollapsed = ref(false)

// Função para toggle do sidebar
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>