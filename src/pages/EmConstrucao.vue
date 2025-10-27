<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
    <div class="text-center max-w-2xl mx-auto w-full">
      <!-- Imagem construção -->
      <div class="mb-4 sm:mb-6 flex justify-center">
        <img
          src="/images/emconstrucao.png"
          alt="Em construção"
          class="w-64 sm:w-80 md:w-96 h-auto object-contain drop-shadow-lg"
        />
      </div>

      <!-- Título -->
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-3 sm:mb-4">
        Página em Construção
      </h1>

      <!-- Descrição -->
      <p class="text-sm sm:text-base md:text-lg text-neutral-600 mb-4 sm:mb-6 px-4">
        Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
      </p>

      <!-- Botão de voltar -->
      <button
        @click="goHome"
        class="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-800 hover:bg-neutral-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
        Voltar ao Início
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
