<template>
  <div>
    <!-- Header -->
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">Dependentes Inativos</h1>
          <p class="text-sm text-neutral-500 mt-1.5">Visualize e reative dependentes inativos</p>
        </div>
        <router-link
          to="/dependentes"
          class="w-full sm:w-auto px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
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

      <div v-else class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="text-xs sm:text-sm w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                #
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Sexo
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Parentesco
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Nascimento
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                CPF
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider min-w-[200px]"
              >
                Anexos
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Reativar
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="(dependente, index) in dependentesStore.dependentesInativos"
              :key="dependente.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-500">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-neutral-900">{{ dependente.nome }}</td>
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-700">
                {{ convertSexoFromDatabase(dependente.sexo_dependente) }}
              </td>
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-700">
                {{ dependente.tipo_dependente }}
              </td>
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-700">
                {{ formatarData(dependente.data_nascimento) }}
              </td>
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-700">
                {{ formatarCPF(dependente.cpf) }}
              </td>

              <!-- COLUNA DE ANEXOS  -->
              <td class="px-3 py-3 sm:px-6 sm:py-4">
                <div class="flex flex-col gap-1.5">
                  <!-- Documento Principal -->
                  <button
                    v-if="dependente.documento"
                    @click="abrirDocumento(dependente.id, 'principal')"
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors w-fit"
                    title="Documento principal (Certidão/Declaração)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3.5 h-3.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Comprovação de Vínculo
                  </button>

                  <!-- Dependência Financeira -->
                  <button
                    v-if="dependente.doc_dependencia_financeira"
                    @click="abrirDocumento(dependente.id, 'doc_dependencia_financeira')"
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 px-2 py-1 rounded transition-colors w-fit"
                    title="Declaração de Dependência Financeira"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3.5 h-3.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Dep. Financeira
                  </button>

                  <!-- Laudo de Deficiência -->
                  <button
                    v-if="dependente.doc_laudo_deficiencia"
                    @click="abrirDocumento(dependente.id, 'doc_laudo_deficiencia')"
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded transition-colors w-fit"
                    title="Laudo Médico de Deficiência"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3.5 h-3.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                    Laudo Deficiência
                  </button>

                  <!-- Curso Superior -->
                  <button
                    v-if="dependente.doc_curso_superior"
                    @click="abrirDocumento(dependente.id, 'doc_curso_superior')"
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-2 py-1 rounded transition-colors w-fit"
                    title="Comprovante de Curso Superior"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3.5 h-3.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    Curso Superior
                  </button>

                  <!-- Nenhum documento -->
                  <span
                    v-if="
                      !dependente.documento &&
                      !dependente.doc_dependencia_financeira &&
                      !dependente.doc_laudo_deficiencia &&
                      !dependente.doc_curso_superior
                    "
                    class="text-xs text-neutral-400"
                  >
                    Sem anexos
                  </span>
                </div>
              </td>

              <td class="px-3 py-3 sm:px-6 sm:py-4">
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
                    class="w-4 h-4 ml-4"
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
          'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
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
import { dependentesService } from '@/services/dependentesService'
import { inject } from 'vue'

const dependentesStore = useDependentesStore()

//Pegando usuário autenticado pelo Composable
const authUser = inject('authUser')
const { user } = authUser

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const convertSexoFromDatabase = (sexo) => {
  if (!sexo) return ''
  return sexo === 'M' ? 'Masculino' : 'Feminino'
}

const fetchDependentesInativos = async () => {
  await dependentesStore.carregarDependentesInativos()

  if (dependentesStore.error) {
    showToastMessage(dependentesStore.error, 'error')
  }
}

const confirmarReativacao = async (dependente) => {
  if (confirm(`Tem certeza que deseja reativar o dependente "${dependente.nome}"?`)) {
    try {
      const matricula = user.value?.matricula || null

      if (!matricula) {
        showToastMessage('Erro: Matrícula do usuário não encontrada', 'error')
        return
      }

      const result = await dependentesStore.reativarDependente(dependente.id, matricula)

      if (result.success) {
        showToastMessage(result.message || 'Dependente reativado com sucesso!', 'success')
      } else {
        showToastMessage(result.message || 'Erro ao reativar dependente', 'error')
      }
    } catch {
      showToastMessage('Erro ao reativar dependente', 'error')
    }
  }
}

const abrirDocumento = async (idDependente, tipoDocumento) => {
  try {
    let response

    if (tipoDocumento === 'principal') {
      response = await dependentesService.getDocumentoUrl(idDependente)
    } else {
      // Documentos adicionais
      response = await dependentesService.getDocumentoAdicionalUrl(idDependente, tipoDocumento)
    }

    if (response.success && response.url) {
      const janela = window.open(
        response.url,
        'anexo',
        'width=800,height=600,scrollbars=yes,resizable=yes',
      )
      if (!janela) {
        alert('Popup bloqueado! Permita popups para visualizar o anexo.')
      }
    } else {
      showToastMessage('Erro ao abrir documento', 'error')
    }
  } catch {
    showToastMessage('Erro ao abrir documento', 'error')
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
