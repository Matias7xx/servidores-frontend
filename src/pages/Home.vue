<template>
  <div>
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900">
        {{ greeting }}, {{ userName || 'Usuário' }}!
      </h1>
      <p class="text-xs sm:text-sm text-neutral-500 mt-2">
        {{ currentDate }} • Gerencie suas informações
      </p>
    </div>

    <!-- Conteúdo -->
    <div class="space-y-4 sm:space-y-6">
      <!-- Ações Rápidas -->
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <!-- Atualizar Dados -->
          <router-link
            to="/info_pessoal"
            class="group p-4 sm:p-5 border border-neutral-200 rounded-lg hover:border-neutral-400 hover:shadow-md transition-all duration-200"
          >
            <div
              class="p-2 sm:p-3 bg-neutral-50 rounded-lg mb-3 sm:mb-4 group-hover:bg-neutral-100 transition-colors"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 class="text-sm sm:text-base font-semibold text-neutral-900 mb-1 sm:mb-2">
              Atualizar Dados Pessoais
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600">
              Mantenha suas informações pessoais atualizadas
            </p>
          </router-link>

          <!-- Gerenciar Dependentes -->
          <router-link
            to="/dependentes"
            class="group p-4 sm:p-5 border border-neutral-200 rounded-lg hover:border-neutral-400 hover:shadow-md transition-all duration-200"
          >
            <div
              class="p-2 sm:p-3 bg-neutral-50 rounded-lg mb-3 sm:mb-4 group-hover:bg-neutral-100 transition-colors"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-sm sm:text-base font-semibold text-neutral-900 mb-1 sm:mb-2">
              Gerenciar Dependentes
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600">
              Adicione ou atualize informações dos dependentes
            </p>
          </router-link>

          <!-- Registrar Formação -->
          <router-link
            to="/formacao"
            class="group p-4 sm:p-5 border border-neutral-200 rounded-lg hover:border-neutral-400 hover:shadow-md transition-all duration-200"
          >
            <div
              class="p-2 sm:p-3 bg-neutral-50 rounded-lg mb-3 sm:mb-4 group-hover:bg-neutral-100 transition-colors"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            </div>
            <h3 class="text-sm sm:text-base font-semibold text-neutral-900 mb-1 sm:mb-2">
              Registrar Formação Acadêmica
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600">
              Adicione suas formações e certificados
            </p>
          </router-link>
        </div>
      </div>

      <!-- Informações do Sistema -->
      <div
        class="bg-linear-to-br from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200 p-4 sm:p-6"
      >
        <div class="flex items-start gap-3 sm:gap-4">
          <div class="p-2 sm:p-3 bg-white rounded-lg shadow-sm shrink-0">
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">
              Mantenha seus dados atualizados
            </h3>
            <p class="text-xs text-neutral-600 leading-relaxed">
              É importante manter suas informações pessoais, dependentes e formações sempre
              atualizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { inject } from 'vue'
const authUser = inject('authUser')

const { userName } = authUser

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 5) return 'Boa madrugada'
  if (hour >= 5 && hour < 12) return 'Bom dia'
  if (hour >= 12 && hour < 18) return 'Boa tarde'
  return 'Boa noite'
})

const currentDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.space-y-4 > *,
.space-y-6 > * {
  animation: fadeInUp 0.4s ease-out forwards;
}

.space-y-4 > *:nth-child(1),
.space-y-6 > *:nth-child(1) {
  animation-delay: 0.1s;
}

.space-y-4 > *:nth-child(2),
.space-y-6 > *:nth-child(2) {
  animation-delay: 0.2s;
}

.space-y-4 > *:nth-child(3),
.space-y-6 > *:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
