<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900" v-if="authStore.user?.name">
            Bem-vindo, {{ authStore.user.name }}!
          </h1>
          <h1 v-else class="text-2xl font-bold text-gray-900">
            Bem-vindo, Usuário!
          </h1>
          <p class="text-gray-600 mt-1">
            Gerencie suas informações pessoais.
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="bg-gray-100 p-3 rounded-full">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Dependentes</h3>
            <p class="text-sm text-gray-600">{{ dependentesCount }} cadastrados</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="bg-gray-100 p-3 rounded-full">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Formações</h3>
            <p class="text-sm text-gray-600">{{ formacoesCount }} registradas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link to="/info_pessoal" class="quick-action-card">
          <div class="bg-gray-50 p-3 rounded-lg mb-3">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="font-medium text-gray-900">Atualizar Dados</h3>
          <p class="text-sm text-gray-600 mt-1">Mantenha suas informações pessoais atualizadas</p>
        </router-link>

        <router-link to="/dependentes" class="quick-action-card">
          <div class="bg-gray-50 p-3 rounded-lg mb-3">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-medium text-gray-900">Gerenciar Dependentes</h3>
          <p class="text-sm text-gray-600 mt-1">Adicione ou atualize informações dos dependentes</p>
        </router-link>

        <router-link to="/formacao" class="quick-action-card">
          <div class="bg-gray-50 p-3 rounded-lg mb-3">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h3 class="font-medium text-gray-900">Registrar Formação</h3>
          <p class="text-sm text-gray-600 mt-1">Adicione cursos e qualificações profissionais</p>
        </router-link>

        <router-link to="/avaliacao-servidor" class="quick-action-card">
          <div class="bg-gray-50 p-3 rounded-lg mb-3">
            <svg class="h-6 w-6 text-[#c1a85a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="font-medium text-gray-900">Avaliação de Desempenho</h3>
          <p class="text-sm text-gray-600 mt-1">Consulte suas avaliações</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServidorStore } from '../stores/servidor'
import { useAuthStore } from '../stores/auth'

// Stores
const servidorStore = useServidorStore()
const authStore = useAuthStore()

// Estado local
const loading = ref(true)
const dependentesCount = ref(0)
const formacoesCount = ref(0)

// Inicializar ao montar o componente
onMounted(async () => {
  try {
    loading.value = true

    await servidorStore.carregarServidor()

    // Atualizar contadores com dados reais do servidor
    if (servidorStore.servidor) {
      dependentesCount.value = servidorStore.servidor.dependentesCount || 0
      formacoesCount.value = servidorStore.servidor.formacoesCount || 0
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.quick-action-card {
  @apply block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors;
}

.quick-action-card:hover {
  transform: translateY(-2px);
}
</style>
