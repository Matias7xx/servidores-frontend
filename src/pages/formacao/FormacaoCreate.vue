<template>
  <div>
    <!-- Header -->
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">Nova Formação</h1>
      <p class="text-sm text-neutral-500 mt-1.5">Cadastre uma nova formação acadêmica</p>
    </div>

    <!-- Erro -->
    <div
      v-if="formacaoStore.error && !formacaoStore.loading"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
    >
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ formacaoStore.error }}</p>
    </div>

    <!-- Formulário -->
    <form v-if="!formacaoStore.loading" @submit.prevent="submitForm" class="space-y-5">
      <!-- Card: Dados da Formação -->
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
        <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
          Dados da Formação
        </h2>

        <!-- Buscar Curso -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-neutral-700 mb-2">
            Buscar Curso <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                @input="onSearchInput"
                @focus="onFocus"
                @blur="onBlur"
                placeholder="Digite pelo menos 3 caracteres para buscar..."
                :class="[
                  'w-full border rounded-lg py-2.5 pl-10 pr-3.5 text-sm transition-all duration-200',
                  errors.curso_id
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900',
                ]"
              />
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Dropdown de resultados -->
            <div
              v-if="showDropdown && searchResults.length > 0"
              class="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <button
                type="button"
                v-for="curso in searchResults"
                :key="curso.id"
                @mousedown.prevent="selectCurso(curso)"
                class="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
              >
                <div class="font-medium text-sm text-neutral-900">
                  {{ curso.curso }} › {{ curso.subcategoria }}
                </div>
                <div class="text-xs text-neutral-500 mt-0.5">
                  {{ curso.area }} › {{ curso.classe }}
                </div>
              </button>
            </div>

            <!-- Mensagem quando está buscando -->
            <!-- <div
              v-if="showDropdown && searchQuery.length >= 3 && loadingSearch"
              class="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg p-4"
            >
              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <div
                  class="animate-spin rounded-full h-4 w-4 border-2 border-neutral-300 border-t-neutral-900"
                ></div>
                Buscando cursos...
              </div>
            </div> -->

            <!-- Mensagem quando não encontra resultados -->
            <div
              v-if="
                showDropdown &&
                searchQuery.length >= 3 &&
                !loadingSearch &&
                !searchPending &&
                searchResults.length === 0
              "
              class="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg p-4"
            >
              <p class="text-sm text-neutral-600">Nenhum curso encontrado</p>
            </div>
          </div>

          <span v-if="errors.curso_id" class="text-red-600 text-xs mt-1.5 block">
            {{ errors.curso_id[0] }}
          </span>

          <p class="text-xs text-neutral-500 mt-2">
            Digite pelo menos 3 caracteres para buscar. Os campos Área, Classe e Curso serão
            preenchidos automaticamente.
          </p>

          <p class="text-xs text-neutral-500 mt-2">
            Caso seu Curso não conste na lista, solicite atendimento à Diretoria de Tecnologia da
            Informação por meio de um chamado.
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Área <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.area_nome"
              disabled
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 bg-neutral-50 border-neutral-200 text-neutral-600 cursor-not-allowed',
              ]"
              placeholder="Será preenchido automaticamente"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Classe <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.classe_nome"
              disabled
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 bg-neutral-50 border-neutral-200 text-neutral-600 cursor-not-allowed',
              ]"
              placeholder="Será preenchido automaticamente"
            />
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Curso <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.curso_nome"
              disabled
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 bg-neutral-50 border-neutral-200 text-neutral-600 cursor-not-allowed',
              ]"
              placeholder="Será preenchido automaticamente"
            />
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Data de Conclusão <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              v-model="form.dataconclusao"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.dataconclusao
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900',
              ]"
              required
            />
            <span v-if="errors.dataconclusao" class="text-red-600 text-xs mt-1.5 block">
              {{ errors.dataconclusao[0] }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Observação</label>
            <input
              type="text"
              v-model="form.obs"
              placeholder="Informações adicionais (opcional)"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 placeholder:text-neutral-400',
                errors.obs
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900',
              ]"
            />
            <span v-if="errors.obs" class="text-red-600 text-xs mt-1.5 block">
              {{ errors.obs[0] }}
            </span>
          </div>
        </div>

        <div class="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Certificado Frente <span class="text-red-500">(.pdf)</span>
              <span class="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref="anexoFrenteInput"
              @change="onFileChange($event, 'anexo_frente')"
              accept=".pdf"
              class="hidden"
            />
            <div
              @click="$refs.anexoFrenteInput.click()"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                errors.anexo_frente
                  ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
              ]"
            >
              <span class="truncate">
                {{ nomeArquivoFrente || 'Nenhum arquivo escolhido' }}
              </span>
              <span
                :class="[
                  'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                  errors.anexo_frente
                    ? 'bg-red-200 text-red-800'
                    : 'bg-neutral-200 text-neutral-700',
                ]"
              >
                Escolher arquivo
              </span>
            </div>
            <span v-if="errors.anexo_frente" class="text-red-600 text-xs mt-1.5 block">
              {{ errors.anexo_frente[0] }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Certificado Verso <span class="text-red-500">(.pdf)</span>
            </label>
            <input
              type="file"
              ref="anexoVersoInput"
              @change="onFileChange($event, 'anexo_verso')"
              accept=".pdf"
              class="hidden"
            />
            <div
              @click="$refs.anexoVersoInput.click()"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                errors.anexo_verso
                  ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
              ]"
            >
              <span class="truncate">
                {{ nomeArquivoVerso || 'Nenhum arquivo escolhido' }}
              </span>
              <span
                :class="[
                  'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                  errors.anexo_verso
                    ? 'bg-red-200 text-red-800'
                    : 'bg-neutral-200 text-neutral-700',
                ]"
              >
                Escolher arquivo
              </span>
            </div>
            <span v-if="errors.anexo_verso" class="text-red-600 text-xs mt-1.5 block">
              {{ errors.anexo_verso[0] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          @click="$router.push('/formacao')"
          class="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          :disabled="submitting"
          :class="[
            'px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all',
            submitting
              ? 'bg-neutral-400 cursor-not-allowed'
              : 'bg-neutral-900 hover:bg-neutral-800',
          ]"
        >
          <span>Salvar Formação</span>
        </button>
      </div>
    </form>

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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormacaoStore } from '../../stores/formacao'

const router = useRouter()
const formacaoStore = useFormacaoStore()

const submitting = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const nomeArquivoFrente = ref('')
const nomeArquivoVerso = ref('')

// Estados para busca
const searchQuery = ref('')
const searchResults = ref([])
const showDropdown = ref(false)
const loadingSearch = ref(false)
const searchPending = ref(false) // Indica se há busca pendente (debounce)
let searchTimeout = null

const form = reactive({
  area_id: '',
  area_nome: '',
  classe_id: '',
  classe_nome: '',
  curso_id: '',
  curso_nome: '',
  dataconclusao: '',
  obs: '',
  anexo_frente: null,
  anexo_verso: null,
})

const errors = reactive({})

// Buscar cursos na API
const buscarCursos = async (query) => {
  if (query.length < 3) {
    searchResults.value = []
    return
  }

  loadingSearch.value = true
  searchPending.value = false // Limpa flag de pendente

  try {
    const response = await formacaoStore.buscarCursos(query)

    if (response.success) {
      searchResults.value = response.data
    } else {
      searchResults.value = []
      console.warn(response.message)
    }
  } catch {
    searchResults.value = []
  } finally {
    loadingSearch.value = false
  }
}

const onSearchInput = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (searchQuery.value.length < 3) {
    searchResults.value = []
    showDropdown.value = false
    searchPending.value = false // Limpa flag de pendente
    return
  }

  // Mostrar dropdown quando tem 3+ caracteres
  showDropdown.value = true
  searchPending.value = true // Marca como busca pendente (durante debounce)

  searchTimeout = setTimeout(() => {
    buscarCursos(searchQuery.value)
  }, 300)
}

const onFocus = () => {
  showDropdown.value = true

  // Se já tem texto com 3+ caracteres, dispara a busca automaticamente
  if (searchQuery.value.length >= 3) {
    buscarCursos(searchQuery.value)
  }
}

const onBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const selectCurso = (curso) => {
  form.curso_id = curso.id
  form.curso_nome = curso.curso
  form.area_id = curso.area_id
  form.area_nome = curso.area
  form.classe_id = curso.classe_id
  form.classe_nome = curso.classe
  searchQuery.value = curso.curso
  showDropdown.value = false
  searchResults.value = []
}

const onFileChange = (event, fieldName) => {
  const file = event.target.files[0]
  form[fieldName] = file || null

  // Atualiza o nome do arquivo para exibição
  if (fieldName === 'anexo_frente') {
    nomeArquivoFrente.value = file ? file.name : ''
  } else if (fieldName === 'anexo_verso') {
    nomeArquivoVerso.value = file ? file.name : ''
  }
}

const submitForm = async () => {
  try {
    submitting.value = true
    Object.keys(errors).forEach((key) => delete errors[key])

    // Validações
    if (!form.curso_id) {
      errors.curso_id = ['Selecione um curso através da busca.']
      showToastMessage('Por favor, selecione um curso através da busca.', 'error')
      submitting.value = false
      return
    }

    if (!form.anexo_frente) {
      errors.anexo_frente = ['O Certificado Frente é obrigatório.']
      showToastMessage('O Certificado Frente é obrigatório. Por favor, anexe o documento.', 'error')
      submitting.value = false
      return
    }

    const formData = new FormData()

    formData.append('area_id', form.area_id)
    formData.append('classe_id', form.classe_id)
    formData.append('curso_id', form.curso_id)
    formData.append('data_conclusao', form.dataconclusao)

    if (form.obs) {
      formData.append('obs', form.obs)
    }

    formData.append('anexo_frente', form.anexo_frente)

    if (form.anexo_verso) {
      formData.append('anexo_verso', form.anexo_verso)
    }

    const response = await formacaoStore.criarFormacao(formData)

    if (response.success) {
      showToastMessage(response.message, 'success')
      setTimeout(() => {
        router.push('/formacao')
      }, 2000)
    } else {
      if (response.errors) {
        Object.assign(errors, response.errors)
      }
      showToastMessage(response.message, 'error')
    }
  } catch {
    showToastMessage('Erro ao salvar formação', 'error')
  } finally {
    submitting.value = false
  }
}

const showToastMessage = (message, type) => {
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
</script>

<style scoped>
input:focus,
select:focus {
  outline: none;
}

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
