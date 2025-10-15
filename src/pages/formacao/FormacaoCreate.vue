<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-900">Nova Formação</h1>
      <p class="text-sm text-neutral-500 mt-1.5">Cadastre uma nova formação acadêmica</p>
    </div>

    <!-- Loading -->
    <div v-if="formacaoStore.loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Erro -->
    <div
      v-if="formacaoStore.error && !formacaoStore.loading"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
    >
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ formacaoStore.error }}</p>
    </div>

    <!-- Formulário (sempre visível, exceto em loading) -->
    <form v-if="!formacaoStore.loading" @submit.prevent="submitForm" class="space-y-5">
      <!-- Card: Dados da Formação -->
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
        <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
          Dados da Formação
        </h2>

        <div class="grid gap-5 md:grid-cols-2 mb-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Área <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.area_id"
              @change="onAreaChange"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.area_id
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            >
              <option value="">Selecione a área</option>
              <option v-for="area in formacaoStore.areas" :key="area.id" :value="area.id">
                {{ area.area }}
              </option>
            </select>
            <span v-if="errors.area_id" class="text-red-600 text-xs mt-1.5 block">{{
              errors.area_id[0]
            }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Classe <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.classe_id"
              @change="onClasseChange"
              :disabled="!form.area_id || loadingClasses"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.classe_id
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : !form.area_id || loadingClasses
                    ? 'bg-neutral-100 border-neutral-200 text-neutral-500 cursor-not-allowed'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            >
              <option value="">
                {{ loadingClasses ? 'Carregando...' : 'Selecione a classe' }}
              </option>
              <option v-for="classe in formacaoStore.classes" :key="classe.id" :value="classe.id">
                {{ classe.classe }}
              </option>
            </select>
            <span v-if="errors.classe_id" class="text-red-600 text-xs mt-1.5 block">{{
              errors.classe_id[0]
            }}</span>
          </div>
        </div>

        <div class="grid gap-5 md:grid-cols-2 mb-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Curso <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.curso_id"
              :disabled="!form.classe_id || loadingCursos"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.curso_id
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : !form.classe_id || loadingCursos
                    ? 'bg-neutral-100 border-neutral-200 text-neutral-500 cursor-not-allowed'
                    : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            >
              <option value="">{{ loadingCursos ? 'Carregando...' : 'Selecione o curso' }}</option>
              <option v-for="curso in formacaoStore.cursos" :key="curso.id" :value="curso.id">
                {{ curso.curso }}
              </option>
            </select>
            <span v-if="errors.curso_id" class="text-red-600 text-xs mt-1.5 block">{{
              errors.curso_id[0]
            }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2"
              >Data de Conclusão <span class="text-red-500">*</span></label
            >
            <input
              type="date"
              v-model="form.dataconclusao"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.dataconclusao
                  ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            />
            <span v-if="errors.dataconclusao" class="text-red-600 text-xs mt-1.5 block">{{
              errors.dataconclusao[0]
            }}</span>
          </div>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Observação</label>
          <input
            type="text"
            v-model="form.obs"
            placeholder="Informações adicionais (opcional)"
            :class="[
              'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 placeholder:text-neutral-400',
              errors.obs
                ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
            ]"
          />
          <span v-if="errors.obs" class="text-red-600 text-xs mt-1.5 block">{{
            errors.obs[0]
          }}</span>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Certificado Frente <span class="text-red-500">(.pdf)</span>
            </label>
            <input
              type="file"
              ref="anexoFrenteInput"
              @change="onFileChange($event, 'anexo_frente')"
              accept=".pdf"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.anexo_frente
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : 'bg-white border-neutral-300 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            />
            <span v-if="errors.anexo_frente" class="text-red-600 text-xs mt-1.5 block">{{
              errors.anexo_frente[0]
            }}</span>
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
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                errors.anexo_verso
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                  : 'bg-white border-neutral-300 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
              ]"
            />
            <span v-if="errors.anexo_verso" class="text-red-600 text-xs mt-1.5 block">{{
              errors.anexo_verso[0]
            }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <router-link
          to="/formacao"
          class="px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
        >
          Cancelar
        </router-link>

        <button
          type="submit"
          :disabled="submitting"
          class="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
        >
          <span v-if="submitting">Cadastrando...</span>
          <span v-else>Cadastrar Formação</span>
        </button>
      </div>
    </form>

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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormacaoStore } from '../../stores/formacao'

const router = useRouter()
const formacaoStore = useFormacaoStore()

const submitting = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const loadingClasses = ref(false)
const loadingCursos = ref(false)

const form = reactive({
  area_id: '',
  classe_id: '',
  curso_id: '',
  dataconclusao: '',
  obs: '',
  anexo_frente: null,
  anexo_verso: null,
})

const errors = reactive({})

const onAreaChange = async () => {
  form.classe_id = ''
  form.curso_id = ''
  formacaoStore.limparCaches()

  if (!form.area_id) return

  try {
    loadingClasses.value = true
    await formacaoStore.carregarClasses(form.area_id)
  } catch {
    showToastMessage('Erro ao carregar classes', 'error')
  } finally {
    loadingClasses.value = false
  }
}

const onClasseChange = async () => {
  form.curso_id = ''
  formacaoStore.cursos = []

  if (!form.classe_id) return

  try {
    loadingCursos.value = true
    await formacaoStore.carregarCursos(form.classe_id)
  } catch {
    showToastMessage('Erro ao carregar cursos', 'error')
  } finally {
    loadingCursos.value = false
  }
}

const onFileChange = (event, fieldName) => {
  const file = event.target.files[0]
  form[fieldName] = file || null
}

const submitForm = async () => {
  try {
    submitting.value = true
    Object.keys(errors).forEach((key) => delete errors[key])

    const formData = new FormData()

    formData.append('area_id', form.area_id)
    formData.append('classe_id', form.classe_id)
    formData.append('curso_id', form.curso_id)
    formData.append('data_conclusao', form.dataconclusao)

    if (form.obs) {
      formData.append('obs', form.obs)
    }

    if (form.anexo_frente) {
      formData.append('anexo_frente', form.anexo_frente)
    }
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

onMounted(async () => {
  await formacaoStore.carregarAreas()
})
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
