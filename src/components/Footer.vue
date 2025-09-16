<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="px-2 sm:px-4 py-3 max-w-full">
      <div class="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
        <div class="text-center sm:text-left">
          DITI/DG-PCPB &copy; {{ currentYear }}
        </div>
        <div class="text-center sm:text-right">
          <span>Versão 1.0</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// Ano atual
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>