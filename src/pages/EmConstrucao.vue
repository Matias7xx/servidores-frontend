<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center">
    <div class="text-center max-w-2xl mx-auto">
      <!-- Imagem construção -->
      <div class="mb-4 flex justify-center">
        <img
          src="/images/emconstrucao.png"
          alt="Em construção"
          class="w-96 h-auto object-contain drop-shadow-lg"
        />
      </div>

      <!-- Título -->
      <h1 class="text-4xl font-bold text-neutral-800 mb-4">Página em Construção</h1>

      <!-- Descrição -->
      <p class="text-lg text-neutral-600 mb-6">
        Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
      </p>

      <!-- Mensagem adicional -->
      <!-- <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-center mb-3">
          <svg
            class="w-6 h-6 text-yellow-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="font-semibold text-yellow-800">Estamos trabalhando nisso!</span>
        </div>
        <p class="text-sm text-yellow-700">
          Nossa equipe está desenvolvendo esta funcionalidade para melhorar sua experiência.
        </p>
      </div> -->

      <!-- Botão de voltar -->
      <button
        @click="goHome"
        class="inline-flex items-center px-6 py-3 bg-[#c1a85a] hover:bg-[#b09850] text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          class="w-5 h-5 mr-2"
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
