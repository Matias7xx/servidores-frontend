<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-neutral-900">Formação Acadêmica</h1>
          <p class="text-sm text-neutral-500 mt-1.5">Gerencie suas formações e certificados</p>
        </div>
        <router-link
          to="/formacao/create"
          class="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline mr-1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nova Formação
        </router-link>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="formacaoStore.loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"></div>
    </div>

    <!-- Erro -->
    <div v-else-if="formacaoStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ formacaoStore.error }}</p>
    </div>

    <!-- Tabela -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-200">
        <h2 class="text-sm font-semibold text-neutral-900">
          Formações Cadastradas <span class="text-neutral-500 font-normal">({{ formacaoStore.formacoes.length }})</span>
        </h2>
      </div>

      <div v-if="formacaoStore.formacoes.length === 0" class="p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto text-neutral-300 mb-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
        <p class="text-neutral-500 text-sm">Nenhuma formação cadastrada</p>
        <router-link
          to="/formacao/create"
          class="inline-block mt-4 text-sm text-neutral-900 font-medium hover:text-neutral-700"
        >
          Cadastrar primeira formação →
        </router-link>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Área/Classe</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Categoria</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Curso</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Conclusão</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Certificado</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Validação</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="(formacao, index) in formacaoStore.formacoes"
              :key="formacao.id"
              :class="[
                'hover:bg-neutral-50 transition-colors',
                !formacao.status ? 'bg-red-50' : ''
              ]"
            >
              <td class="px-6 py-4 text-sm text-neutral-500">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm text-neutral-900">
                {{ formacao.area_nome || '-' }} / {{ formacao.classe_nome || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-neutral-700">
                {{ formacao.categoria_nome || '-' }} / {{ formacao.subcategoria_nome || '-' }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-neutral-900">{{ formacao.curso_nome || '-' }}</td>
              <td class="px-6 py-4 text-sm text-neutral-700">{{ formatDate(formacao.data_conclusao) }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-1.5">
                  <button
                    v-if="formacao.anexo_frente"
                    @click="abrirAnexo(formacao.anexo_frente)"
                    class="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Frente
                  </button>
                  <span v-if="formacao.anexo_frente && formacao.anexo_verso" class="text-neutral-300">•</span>
                  <button
                    v-if="formacao.anexo_verso"
                    @click="abrirAnexo(formacao.anexo_verso)"
                    class="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Verso
                  </button>
                  <span v-if="!formacao.anexo_frente && !formacao.anexo_verso" class="text-xs text-neutral-400">
                    Sem anexo
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    formacao.validacao_status === 'A' || !formacao.validacao_status
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  ]"
                >
                  {{ formacao.validacao_status === 'A' || !formacao.validacao_status ? 'Aguardando' : 'Válido' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    !formacao.status
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  ]"
                >
                  {{ !formacao.status ? 'Recuperado' : 'Ativo' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/formacao/edit/${formacao.id}`"
                  class="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors inline-flex"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="showToast" :class="[
        'fixed bottom-6 right-6 flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
        toastType === 'success' ? 'bg-white/95 border-green-500' : 'bg-white/95 border-red-500'
      ]" role="alert">
        <div :class="[
          'shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        ]">
          <svg v-if="toastType === 'success'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-neutral-900">{{ toastMessage }}</p>
        </div>
        <button type="button" @click="hideToast" class="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFormacaoStore } from '../../stores/formacao'

const formacaoStore = useFormacaoStore()

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const abrirAnexo = (nomeArquivo) => {
  const url = `/storage/diplomas/${nomeArquivo}`
  window.open(url, '_blank', 'width=800,height=600')
}

const showToastMessage = (message, type) => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 5000)
}

const hideToast = () => {
  showToast.value = false
}

onMounted(async () => {
  await formacaoStore.carregarFormacoes()
})
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
