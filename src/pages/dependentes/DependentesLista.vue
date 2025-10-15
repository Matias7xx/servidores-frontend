<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-neutral-900">Dependentes</h1>
          <p class="text-sm text-neutral-500 mt-1.5">Gerencie seus dependentes cadastrados</p>
        </div>
        <div class="flex gap-3">
          <router-link
            to="/dependentes/inativos"
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
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Inativos
          </router-link>
          <router-link
            to="/dependentes/create"
            class="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 inline mr-1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Dependente
          </router-link>
        </div>
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
      <div class="px-6 py-4 border-b border-neutral-200">
        <h2 class="text-sm font-semibold text-neutral-900">
          Ativos
          <span class="text-neutral-500 font-normal"
            >({{ dependentesStore.dependentes.length }})</span
          >
        </h2>
      </div>

      <div v-if="dependentesStore.dependentes.length === 0" class="p-12 text-center">
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
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        <p class="text-neutral-500 text-sm">Nenhum dependente cadastrado</p>
        <router-link
          to="/dependentes/create"
          class="inline-block mt-4 text-sm text-neutral-900 font-medium hover:text-neutral-700"
        >
          Cadastrar primeiro dependente →
        </router-link>
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
              v-for="(dependente, index) in dependentesStore.dependentes"
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
                  @click="abrirAnexo(dependente.id)"
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
                  Ver PDF
                </button>
                <span v-else class="text-xs text-neutral-400">Sem anexo</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <router-link
                    :to="`/dependentes/edit/${dependente.id}`"
                    class="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                    title="Editar"
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </router-link>
                  <button
                    @click="confirmarExclusao(dependente)"
                    class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Inativar"
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
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
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
import { ref, onMounted, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useDependentesStore } from '@/stores/dependentes'
import { dependentesService } from '@/services/dependentesService'
import { useAuth } from '@websanova/vue-auth'

const route = useRoute()
const dependentesStore = useDependentesStore()
const auth = useAuth()

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const convertSexoFromDatabase = (sexo) => {
  if (!sexo) return ''
  return sexo === 'M' ? 'Masculino' : 'Feminino'
}

const fetchDependentes = async () => {
  await dependentesStore.carregarDependentes()
  if (dependentesStore.error) {
    showToastMessage(dependentesStore.error, 'error')
  }
}

const confirmarExclusao = async (dependente) => {
  if (confirm(`Tem certeza que deseja inativar o dependente "${dependente.nome}"?`)) {
    try {
      const matricula = auth.user()?.matricula
      if (!matricula) {
        showToastMessage('Erro: Matrícula do usuário não encontrada', 'error')
        return
      }
      const result = await dependentesStore.inativarDependente(dependente.id, matricula)
      if (result.success) {
        showToastMessage(result.message || 'Dependente inativado com sucesso!', 'success')
      } else {
        showToastMessage(result.message || 'Erro ao inativar dependente', 'error')
      }
    } catch {
      showToastMessage('Erro ao inativar dependente', 'error')
    }
  }
}

const abrirAnexo = async (idDependente) => {
  try {
    const response = await dependentesService.getDocumentoUrl(idDependente)
    if (response.success && response.url) {
      const janela = window.open(
        response.url,
        'anexo',
        'width=600,height=600,scrollbars=yes,resizable=yes',
      )
      if (!janela) {
        alert('Popup bloqueado! Permita popups para visualizar o anexo.')
      }
    } else {
      showToastMessage('Erro ao abrir documento', 'error')
    }
  } catch (error) {
    console.error('Erro ao buscar URL do documento:', error)
    showToastMessage('Erro ao abrir documento', 'error')
  }
}

const formatarData = (data) => {
  if (!data) return ''
  try {
    if (typeof data === 'string' && data.includes('T')) {
      return new Date(data).toLocaleDateString('pt-BR')
    }
    if (typeof data === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split('-')
      return `${dia}/${mes}/${ano}`
    }
    const date = new Date(data)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('pt-BR')
    }
    return data
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
  setTimeout(() => hideToast(), 5000)
}

const hideToast = () => {
  showToast.value = false
}

watch(
  () => route.fullPath,
  (newPath) => {
    if (newPath === '/dependentes') fetchDependentes()
  },
)

onActivated(() => fetchDependentes())
onMounted(() => fetchDependentes())
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
