<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header com título e botões -->
      <div class="bg-white shadow-sm border-b">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-700">Lista</h1>
            <div class="flex space-x-2">
              <router-link
                to="/dependentes"
                class="inline-flex items-center gap-1 bg-gray-600 text-white text-sm font-semibold rounded-full px-4 py-1 hover:bg-gray-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Voltar para a lista de ativos
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo principal -->
      <div class="px-6 py-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {{ error }}
        </div>

        <!-- Tabela -->
        <div v-else class="overflow-x-auto border border-gray-300 rounded-lg bg-white">
          <!-- Header da tabela -->
          <div class="bg-black text-white p-2 rounded-t-lg border-l-8" style="border-left-color: rgb(193,168,90);">
            <h2 class="text-xl font-semibold">
              Dependentes <strong class="text-red-600">Inativos</strong>
            </h2>
          </div>

          <!-- Tabela -->
          <div v-if="dependentes.length === 0" class="p-6 text-center text-gray-500">
            Nenhum dependente inativo encontrado
          </div>

          <table v-else class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left font-medium text-gray-900">#</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Nome</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Sexo</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Parentesco</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Data Nascimento</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">CPF</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Anexo</th>
                <th class="px-4 py-2 text-left font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dependente, index) in dependentes" :key="dependente.id" class="border-t hover:bg-gray-50">
                <td class="px-4 py-3 text-gray-900">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-gray-900">{{ dependente.nome }}</td>
                <td class="px-4 py-3 text-gray-900">{{ dependente.sexo_dependente === 'F' ? 'Feminino' : 'Masculino' }}</td>
                <td class="px-4 py-3 text-gray-900">{{ dependente.tipo_dependente }}</td>
                <td class="px-4 py-3 text-gray-900">{{ formatarData(dependente.data_nascimento) }}</td>
                <td class="px-4 py-3 text-gray-900">{{ dependente.cpf }}</td>
                <td class="px-4 py-3">
                  <button
                    v-if="dependente.documento"
                    @click="abrirAnexo(dependente.documento)"
                    class="inline-flex items-center gap-1 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Ver Anexo
                  </button>
                  <span v-else class="text-gray-500 text-xs">Sem anexo</span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex space-x-2">
                    <button
                      @click="confirmarReativacao(dependente)"
                      class="inline-flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Reativar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Toast de notificação -->
      <div v-if="showToast" :class="[
        'fixed top-4 right-4 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm',
        toastType === 'success' ? 'text-gray-500 bg-green-100' : 'text-gray-500 bg-red-100'
      ]" role="alert">
        <div :class="[
          'inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg',
          toastType === 'success' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'
        ]">
          <svg v-if="toastType === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        </div>
        <div class="ms-3 text-sm font-normal">{{ toastMessage }}</div>
        <button type="button" @click="hideToast" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dependentesService } from '@/services/dependentesService'

// Estado
const loading = ref(true)
const error = ref(null)
const dependentes = ref([])

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Métodos
const fetchDependentesInativos = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await dependentesService.getDependentesInativos()

    if (response.success) {
      dependentes.value = response.data
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = 'Erro ao conectar com o servidor'
    console.error('Erro detalhado:', err)
  } finally {
    loading.value = false
  }
}

const confirmarReativacao = async (dependente) => {
  if (confirm(`Tem certeza que deseja reativar o dependente "${dependente.nome}"?`)) {
    try {
      const response = await dependentesService.reativarDependente(dependente.id)

      if (response.success) {
        showToastMessage('Dependente reativado com sucesso!', 'success')
        await fetchDependentesInativos() // Recarregar lista
      } else {
        showToastMessage(response.message, 'error')
      }
    } catch (err) {
      showToastMessage('Erro ao reativar dependente', 'error')
      console.error('Erro:', err)
    }
  }
}

const abrirAnexo = (documento) => {
  const url = `/storage/doc_dependentes/${documento}`
  const janela = window.open(url, 'anexo', 'width=600,height=600,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,resizable=yes')
  if (!janela) {
    alert('Popup bloqueado! Permita popups para visualizar o anexo.')
  }
}

const formatarData = (data) => {
  if (!data) return ''
  return new Date(data).toLocaleDateString('pt-BR')
}

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    hideToast()
  }, 5000)
}

const hideToast = () => {
  showToast.value = false
}

// Lifecycle
onMounted(() => {
  fetchDependentesInativos()
})
</script>
