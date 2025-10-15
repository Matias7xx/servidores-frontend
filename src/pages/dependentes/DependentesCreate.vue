<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-900">Novo Dependente</h1>
      <p class="text-sm text-neutral-500 mt-1.5">Cadastre um novo dependente</p>
    </div>

    <!-- Loading -->
    <div v-if="loadingData" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Formulário -->
    <div v-else>
      <form @submit.prevent="salvarDependente" class="space-y-5">
        <!-- Card: Dados do Dependente -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Dados do Dependente
          </h2>

          <div class="grid gap-5 md:grid-cols-2 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Nome Completo <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="form.nome"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.nome
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
                required
              />
              <span v-if="errors.nome" class="text-red-600 text-xs mt-1.5 block">{{
                errors.nome[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Sexo <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.sexo_dependente"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.sexo_dependente
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
                required
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <span v-if="errors.sexo_dependente" class="text-red-600 text-xs mt-1.5 block">{{
                errors.sexo_dependente[0]
              }}</span>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de Parentesco <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.tipo_dependente"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.tipo_dependente
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
                required
              >
                <option value="">Selecione</option>
                <option value="Cônjuge">Cônjuge</option>
                <option value="Filho(a)">Filho(a)</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
              </select>
              <span v-if="errors.tipo_dependente" class="text-red-600 text-xs mt-1.5 block">{{
                errors.tipo_dependente[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Data de Nascimento <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                v-model="form.data_nascimento"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.data_nascimento
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
                required
              />
              <span v-if="errors.data_nascimento" class="text-red-600 text-xs mt-1.5 block">{{
                errors.data_nascimento[0]
              }}</span>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                CPF <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="form.cpf"
                @input="formatarCPF"
                maxlength="11"
                placeholder="Somente números"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 placeholder:text-neutral-400',
                  errors.cpf
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
                required
              />
              <span v-if="errors.cpf" class="text-red-600 text-xs mt-1.5 block">{{
                errors.cpf[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Anexo <span class="text-red-500">(.pdf)</span>
              </label>
              <input
                type="file"
                @change="onFileChange"
                accept=".pdf"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.anexo
                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : 'bg-white border-neutral-300 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                ]"
              />
              <span v-if="errors.anexo" class="text-red-600 text-xs mt-1.5 block">{{
                errors.anexo[0]
              }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            @click="$router.push('/dependentes')"
            class="px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            :disabled="dependentesStore.loading"
            class="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
          >
            <span v-if="dependentesStore.loading">Cadastrando...</span>
            <span v-else>Cadastrar Dependente</span>
          </button>
        </div>
      </form>
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

    <!-- Modal de Reativação -->
    <div
      v-if="showReactiveModal"
      class="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-neutral-900 mb-3">Dependente já cadastrado</h3>
        <p class="text-sm text-neutral-600 mb-6">
          Este dependente já está cadastrado, porém está inativo. Deseja reativá-lo?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="cancelarReativacao"
            class="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmarReativacao"
            class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Reativar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDependentesStore } from '@/stores/dependentes'
import { useAuth } from '@websanova/vue-auth'

const router = useRouter()
const dependentesStore = useDependentesStore()
const auth = useAuth()

const form = reactive({
  servidor_matricula: '',
  nome: '',
  cpf: '',
  sexo_dependente: '',
  tipo_dependente: '',
  data_nascimento: '',
  anexo: null,
})

const errors = reactive({})
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const showReactiveModal = ref(false)
const dependenteParaReativar = ref(null)
const loadingData = ref(false)

const formatarCPF = (event) => {
  form.cpf = event.target.value.replace(/[^0-9]/g, '')
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      return
    }

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
    // Limpa erros anteriores
    Object.keys(errors).forEach((key) => delete errors[key])

    // Pega a matrícula do usuário logado
    const matricula = auth.user()?.matricula

    if (!matricula) {
      showToastMessage('Erro: Matrícula do usuário não encontrada. Faça login novamente.', 'error')
      return
    }

    // Validação manual da data antes de enviar
    if (!form.data_nascimento || form.data_nascimento.trim() === '') {
      errors.data_nascimento = ['A data de nascimento é obrigatória']
      showToastMessage('Por favor, preencha a data de nascimento', 'error')
      return
    }

    // Define a matrícula no formulário
    form.servidor_matricula = matricula

    console.log('📝 Dados do formulário antes de enviar:', {
      ...form,
      data_nascimento: form.data_nascimento,
      data_nascimento_length: form.data_nascimento?.length,
      data_nascimento_type: typeof form.data_nascimento,
    })

    const result = await dependentesStore.criarDependente(form)

    if (result.success) {
      showToastMessage(result.message || 'Dependente cadastrado com sucesso!', 'success')

      // Limpa o formulário
      Object.keys(form).forEach((key) => {
        if (key === 'anexo') {
          form[key] = null
        } else if (key === 'servidor_matricula') {
          form[key] = matricula
        } else {
          form[key] = ''
        }
      })

      // Limpa o input de arquivo
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''

      setTimeout(() => {
        router.push('/dependentes')
      }, 1500)
    } else {
      // Verifica se há erros de validação
      if (result.errors && Object.keys(result.errors).length > 0) {
        Object.assign(errors, result.errors)
        console.log('Erros de validação:', result.errors)
        showToastMessage('Verifique os campos do formulário', 'error')
      } else {
        showToastMessage(result.message || 'Erro ao cadastrar dependente', 'error')
      }
    }
  } catch (err) {
    console.error('Erro capturado:', err)
    console.log('Response completa:', err.response)

    if (err.response && err.response.status === 409) {
      const responseData = err.response.data

      if (responseData.showConfirmation && responseData.dependenteId) {
        dependenteParaReativar.value = responseData.dependenteId
        showReactiveModal.value = true
      } else {
        showToastMessage(responseData.message, 'error')
      }
    } else if (err.response && err.response.status === 422) {
      const validationErrors = err.response.data.errors || {}
      console.log('Erros 422:', validationErrors)
      Object.keys(validationErrors).forEach((key) => {
        errors[key] = validationErrors[key]
      })
      showToastMessage('Verifique os campos do formulário', 'error')
    } else {
      showToastMessage(err.response?.data?.message || 'Erro ao cadastrar dependente', 'error')
    }
  }
}

const confirmarReativacao = async () => {
  try {
    const matricula = auth.user()?.matricula

    if (!matricula) {
      showToastMessage('Erro: Matrícula não encontrada', 'error')
      return
    }

    const response = await dependentesStore.reativarDependente(
      dependenteParaReativar.value,
      matricula,
    )

    if (response.success) {
      showToastMessage('Dependente reativado com sucesso!', 'success')
      showReactiveModal.value = false

      setTimeout(() => {
        router.push('/dependentes')
      }, 1500)
    } else {
      showToastMessage(response.message, 'error')
    }
  } catch (err) {
    console.error('Erro ao reativar:', err)
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

onMounted(() => {
  const matricula = auth.user()?.matricula
  if (matricula) {
    form.servidor_matricula = matricula
    console.log('Matrícula carregada:', matricula)
  } else {
    console.warn('Matrícula não encontrada no auth')
  }
})
</script>
