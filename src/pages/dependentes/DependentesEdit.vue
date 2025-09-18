<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="px-6 py-4">
          <h1 class="text-2xl font-semibold text-gray-700">Editar cadastro de dependente</h1>
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
        <form @submit.prevent="atualizarDependente" class="bg-white rounded-lg shadow-lg p-6">

          <!-- Primeira linha -->
          <div class="grid gap-6 md:grid-cols-7 mb-4">
            <div class="col-span-3">
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

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
              <select
                v-model="form.sexo_dependente"
                :class="[
                  'w-full border rounded-lg py-1 px-2',
                  errors.sexo_dependente ? 'border-red-500' : 'border-gray-300'
                ]"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <span v-if="errors.sexo_dependente" class="text-red-500 text-sm">{{ errors.sexo_dependente[0] }}</span>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo parentesco</label>
              <select
                v-model="form.tipo_dependente"
                :class="[
                  'w-full border rounded-lg py-1 px-2',
                  errors.tipo_dependente ? 'border-red-500' : 'border-gray-300'
                ]"
                required
              >
                <option value="Cônjuge">Cônjuge</option>
                <option value="Filho(a)">Filho(a)</option>
                <option value="Afilhado(a)">Afilhado(a)</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
              </select>
              <span v-if="errors.tipo_dependente" class="text-red-500 text-sm">{{ errors.tipo_dependente[0] }}</span>
            </div>
          </div>

          <!-- Segunda linha -->
          <div class="grid gap-6 md:grid-cols-6 mb-6">
            <div class="col-span-2">
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

            <div class="col-span-2">
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

            <div class="col-span-2">
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
              <div v-if="dependente.documento" class="text-xs text-gray-500 mt-1">
                Arquivo atual: {{ dependente.documento }}
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="$router.push('/dependentes')"
              class="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Voltar
            </button>

            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <span v-if="submitting">Atualizando...</span>
              <span v-else>Editar cadastro dependente</span>
            </button>
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
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { dependentesService } from '@/services/dependentesService'

// Router
const router = useRouter()
const route = useRoute()

// Estado
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)
const dependente = ref({})

// Formulário
const form = reactive({
  id: '',
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

// Métodos
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const dependenteId = route.params.id
    const response = await dependentesService.getDependenteEdit(dependenteId)

    if (response.success) {
      dependente.value = response.data.dependente

      // Preencher formulário
      form.id = dependente.value.id
      form.nome = dependente.value.nome || ''
      form.cpf = dependente.value.cpf || ''
      form.sexo_dependente = dependente.value.sexo_dependente || ''
      form.tipo_dependente = dependente.value.tipo_dependente || ''
      form.data_nascimento = dependente.value.data_nascimento || ''
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

const atualizarDependente = async () => {
  try {
    submitting.value = true

    // Limpar erros anteriores
    Object.keys(errors).forEach(key => delete errors[key])

    const response = await dependentesService.updateDependente(form)

    if (response.success) {
      showToastMessage('Dependente atualizado com sucesso!', 'success')

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dependentes')
      }, 2000)
    } else {
      showToastMessage(response.message, 'error')
    }
  } catch (err) {
    console.error('Erro ao atualizar:', err)

    if (err.response && err.response.status === 422) {
      // Erros de validação
      const validationErrors = err.response.data.errors
      Object.keys(validationErrors).forEach(key => {
        errors[key] = validationErrors[key]
      })
    } else {
      showToastMessage('Erro ao atualizar dependente', 'error')
    }
  } finally {
    submitting.value = false
  }
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
