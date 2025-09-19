<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="px-6 py-4">
          <h1 class="text-2xl font-semibold text-gray-700">Cadastro</h1>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="px-6 py-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {{ error }}
        </div>
      </div>

      <!-- Formulário -->
      <div v-else class="px-6 py-6">
        <form @submit.prevent="salvarDependente" class="space-y-1">
          <!-- Card do formulário -->
          <div class="overflow-x-auto border border-gray-300 rounded-lg bg-white">
            <!-- Header da seção -->
            <div class="bg-black text-white p-2 rounded-t-lg border-l-8" style="border-left-color: rgb(193,168,90);">
              <h2 class="text-xl font-semibold">
                Dependentes
              </h2>
            </div>

            <!-- Conteúdo do formulário -->
            <div class="p-3">
              <!-- Primeira linha -->
              <div class="grid gap-6 md:grid-cols-2 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    v-model="form.nome"
                    :class="[
                      'w-full border rounded-lg py-1 px-2',
                      errors.nome ? 'border-red-500' : 'border-gray-300'
                    ]"
                    required
                  />
                  <span v-if="errors.nome" class="text-red-500 text-sm">{{ errors.nome[0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                  <select
                    v-model="form.sexo_dependente"
                    :class="[
                      'w-full border rounded-lg py-1 px-2',
                      errors.sexo_dependente ? 'border-red-500' : 'border-gray-300'
                    ]"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                  <span v-if="errors.sexo_dependente" class="text-red-500 text-sm">{{ errors.sexo_dependente[0] }}</span>
                </div>
              </div>

              <!-- Segunda linha -->
              <div class="grid gap-6 md:grid-cols-2 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipo parentesco</label>
                  <select
                    v-model="form.tipo_dependente"
                    :class="[
                      'w-full border rounded-lg py-1 px-2',
                      errors.tipo_dependente ? 'border-red-500' : 'border-gray-300'
                    ]"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Cônjuge">Cônjuge</option>
                    <option value="Filho(a)">Filho(a)</option>
                    <option value="Pai">Pai</option>
                    <option value="Mãe">Mãe</option>
                  </select>
                  <span v-if="errors.tipo_dependente" class="text-red-500 text-sm">{{ errors.tipo_dependente[0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Data Nascimento</label>
                  <input
                    type="date"
                    v-model="form.data_nascimento"
                    :class="[
                      'w-full border rounded-lg py-1 px-2',
                      errors.data_nascimento ? 'border-red-500' : 'border-gray-300'
                    ]"
                    required
                  />
                  <span v-if="errors.data_nascimento" class="text-red-500 text-sm">{{ errors.data_nascimento[0] }}</span>
                </div>
              </div>

              <!-- Terceira linha -->
              <div class="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <input
                    type="text"
                    v-model="form.cpf"
                    @input="formatarCPF"
                    maxlength="11"
                    :class="[
                      'w-full border rounded-lg py-1 px-2',
                      errors.cpf ? 'border-red-500' : 'border-gray-300'
                    ]"
                    placeholder="Somente números"
                    required
                  />
                  <span v-if="errors.cpf" class="text-red-500 text-sm">{{ errors.cpf[0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Anexo <span class="text-red-500">(.pdf)</span>
                  </label>
                  <input
                    type="file"
                    @change="onFileChange"
                    accept=".pdf"
                    :class="[
                      'w-full border rounded-lg py-1 px-2 text-sm',
                      errors.anexo ? 'border-red-500' : 'border-gray-300'
                    ]"
                  />
                  <span v-if="errors.anexo" class="text-red-500 text-sm">{{ errors.anexo[0] }}</span>
                </div>
              </div>

              <!-- Botões -->
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="$router.push('/dependentes')"
                  class="inline-flex items-center gap-1 bg-gray-600 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-gray-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Voltar para a lista
                </button>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="inline-flex items-center gap-1 bg-green-600 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-green-700 transition disabled:opacity-50"
                >
                  <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span v-if="submitting">Cadastrando...</span>
                  <span v-else>Cadastrar novo dependente</span>
                </button>
              </div>
            </div>
          </div>
        </form>
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

      <!-- Modal de confirmação para reativação -->
      <div v-if="showReactiveModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            <h3 class="text-lg font-medium text-gray-900">Dependente já cadastrado</h3>
            <div class="mt-2 px-7 py-3">
              <p class="text-sm text-gray-500">
                Este dependente já está cadastrado, porém está inativo. Deseja reativá-lo?
              </p>
            </div>
            <div class="flex justify-center space-x-4 px-4 py-3">
              <button
                @click="cancelarReativacao"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                @click="confirmarReativacao"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Reativar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dependentesService } from '@/services/dependentesService'

// Router
const router = useRouter()

// Estado
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)

// Formulário
const form = reactive({
  nome: '',
  cpf: '',
  sexo_dependente: '',
  tipo_dependente: '',
  data_nascimento: '',
  anexo: null
})

const errors = reactive({})

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Modal de reativação
const showReactiveModal = ref(false)
const dependenteParaReativar = ref(null)

// Métodos
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await dependentesService.getDadosCreate()

    if (response.success) {
      // Dados carregados com sucesso
      console.log('Dados para criação:', response.data)
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

const formatarCPF = (event) => {
  // Remove tudo que não for número
  form.cpf = event.target.value.replace(/[^0-9]/g, '')
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tipo de arquivo
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      return
    }

    // Validar tamanho (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      return
    }

    form.anexo = file
  }
}

const salvarDependente = async () => {
  try {
    submitting.value = true

    // Limpar erros anteriores
    Object.keys(errors).forEach(key => delete errors[key])

    const response = await dependentesService.createDependente(form)

    if (response.success) {
      showToastMessage('Dependente cadastrado com sucesso!', 'success')

      // Limpar formulário
      Object.keys(form).forEach(key => {
        form[key] = key === 'anexo' ? null : ''
      })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dependentes')
      }, 2000)
    } else {
      if (response.action === 'confirm_reactivate') {
        // Mostrar modal de confirmação
        dependenteParaReativar.value = response.dependente_id
        showReactiveModal.value = true
      } else {
        showToastMessage(response.message, 'error')
      }
    }
  } catch (err) {
    console.error('Erro ao salvar:', err)

    if (err.response && err.response.status === 422) {
      // Erros de validação
      const validationErrors = err.response.data.errors
      Object.keys(validationErrors).forEach(key => {
        errors[key] = validationErrors[key]
      })
    } else {
      showToastMessage('Erro ao cadastrar dependente', 'error')
    }
  } finally {
    submitting.value = false
  }
}

const confirmarReativacao = async () => {
  try {
    const response = await dependentesService.reativarDependenteDireto(dependenteParaReativar.value)

    if (response.success) {
      showToastMessage('Dependente reativado com sucesso!', 'success')
      showReactiveModal.value = false

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dependentes')
      }, 2000)
    } else {
      showToastMessage(response.message, 'error')
    }
  } catch (err) {
    showToastMessage('Erro ao reativar dependente', 'error')
  }
}

const cancelarReativacao = () => {
  showReactiveModal.value = false
  dependenteParaReativar.value = null
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
  fetchData()
})
</script>
