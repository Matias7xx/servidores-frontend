<template>
  <footer class="bg-neutral-50 border-t border-neutral-200 mt-auto" role="contentinfo">
    <div class="px-4 sm:px-6 py-4 max-w-7xl mx-auto">
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-neutral-600"
      >
        <!-- Copyright -->
        <div class="text-center sm:text-left">
          <span class="font-medium">Diretoria de Tecnologia da Informação</span>
          <span aria-hidden="true"> © </span>
          <span class="sr-only">Copyright</span>
          <time :datetime="currentYear.toString()">{{ currentYear }}</time>
        </div>

        <!-- Versão -->
        <div class="flex items-center gap-2 text-center sm:text-right">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-medium"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>
            <span>Versão 2.0</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  flex-shrink: 0;
}
</style>
