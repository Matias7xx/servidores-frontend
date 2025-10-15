<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-neutral-900">Dependentes Inativos</h1>
          <p class="text-sm text-neutral-500 mt-1.5">Visualize e reative dependentes inativos</p>
        </div>
        <router-link
          to="/dependentes"
          class="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 inline mr-1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Voltar para Ativos
        </router-link>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="dependentesStore.loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Erro -->
    <div v-else-if="dependentesStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ dependentesStore.error }}</p>
    </div>

    <!-- Tabela -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-200 bg-red-50">
        <h2 class="text-sm font-semibold text-red-900">
          Inativos
          <span class="text-red-700 font-normal"
            >({{ dependentesStore.dependentesInativos.length }})</span
          >
        </h2>
      </div>

      <div v-if="dependentesStore.dependentesInativos.length === 0" class="p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 mx-auto text-neutral-300 mb-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-neutral-500 text-sm">Nenhum dependente inativo encontrado</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                #
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Sexo
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Parentesco
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Nascimento
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                CPF
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Anexo
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="(dependente, index) in dependentesStore.dependentesInativos"
              :key="dependente.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-neutral-500">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm font-medium text-neutral-900">{{ dependente.nome }}</td>
              <td class="px-6 py-4 text-sm text-neutral-700">
                {{ convertSexoFromDatabase(dependente.sexo_dependente) }}
              </td>
              <td class="px-6 py-4 text-sm text-neutral-700">{{ dependente.tipo_dependente }}</td>
              <td class="px-6 py-4 text-sm text-neutral-700">
                {{ formatarData(dependente.data_nascimento) }}
              </td>
              <td class="px-6 py-4 text-sm text-neutral-700">{{ formatarCPF(dependente.cpf) }}</td>
              <td class="px-6 py-4">
                <button
                  v-if="dependente.documento"
                  @click="abrirAnexo(dependente.documento)"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  Ver
                </button>
                <span v-else class="text-xs text-neutral-400">Sem anexo</span>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="confirmarReativacao(dependente)"
                  class="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Reativar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="showToast"
        :class="[
          'fixed bottom-6 right-6 flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
          toastType === 'success' ? 'bg-white/95 border-green-500' : 'bg-white/95 border-red-500',
        ]"
        role="alert"
      >
        <div
          :class="[
            'shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500',
          ]"
        >
          <svg
            v-if="toastType === 'success'"
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-neutral-900">{{ toastMessage }}</p>
        </div>
        <button
          type="button"
          @click="hideToast"
          class="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDependentesStore } from '@/stores/dependentes'
import { useAuth } from '@websanova/vue-auth'

const dependentesStore = useDependentesStore()
const auth = useAuth()

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const convertSexoFromDatabase = (sexo) => {
  if (!sexo) return ''
  return sexo === 'M' ? 'Masculino' : 'Feminino'
}

const fetchDependentesInativos = async () => {
  console.log('Carregando dependentes inativos...')
  await dependentesStore.carregarDependentesInativos()

  if (dependentesStore.error) {
    showToastMessage(dependentesStore.error, 'error')
  } else {
    console.log('Inativos carregados:', dependentesStore.dependentesInativos.length)
  }
}

const confirmarReativacao = async (dependente) => {
  if (confirm(`Tem certeza que deseja reativar o dependente "${dependente.nome}"?`)) {
    try {
      const matricula = auth.user()?.matricula

      if (!matricula) {
        showToastMessage('Erro: Matrícula do usuário não encontrada', 'error')
        return
      }

      console.log('Reativando dependente:', dependente.id)

      const result = await dependentesStore.reativarDependente(dependente.id, matricula)

      if (result.success) {
        showToastMessage(result.message || 'Dependente reativado com sucesso!', 'success')
      } else {
        showToastMessage(result.message || 'Erro ao reativar dependente', 'error')
      }
    } catch (err) {
      console.error('Erro ao reativar:', err)
      showToastMessage('Erro ao reativar dependente', 'error')
    }
  }
}

const abrirAnexo = (documento) => {
  const url = `/storage/doc_dependentes/${documento}`
  const janela = window.open(
    url,
    'anexo',
    'width=600,height=600,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,resizable=yes',
  )
  if (!janela) {
    alert('Popup bloqueado! Permita popups para visualizar o anexo.')
  }
}

const formatarData = (data) => {
  if (!data) return ''
  try {
    const date = new Date(data)
    return date.toLocaleDateString('pt-BR')
  } catch {
    return data
  }
}

const formatarCPF = (cpf) => {
  if (!cpf) return ''
  cpf = cpf.replace(/\D/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
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

onMounted(() => {
  console.log('Componente de inativos montado')
  fetchDependentesInativos()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
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
