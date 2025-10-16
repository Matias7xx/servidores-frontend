<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-900">Editar Dependente</h1>
      <p class="text-sm text-neutral-500 mt-1.5">Atualize os dados do dependente</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ error }}</p>
    </div>

    <!-- Formulário -->
    <div v-else>
      <form @submit.prevent="atualizarDependente" class="space-y-5">
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
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
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
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              >
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
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              >
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
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
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
                v-model="cpfFormatado"
                @input="formatarCPF"
                maxlength="14"
                placeholder="000.000.000-00"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 placeholder:text-neutral-400',
                  errors.cpf
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              />
              <span v-if="errors.cpf" class="text-red-600 text-xs mt-1.5 block">{{
                errors.cpf[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1.5">
                Anexo <span class="text-red-500">(.pdf)</span>
              </label>
              <input
                type="file"
                ref="anexoInput"
                @change="onFileChange"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.anexoInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                  errors.anexo
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="truncate">
                  {{ nomeArquivoAnexo || 'O novo arquivo irá sobrescrever o atual' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.anexo ? 'bg-red-200 text-red-800' : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span v-if="errors.anexo" class="text-red-600 text-xs mt-1.5 block">{{
                errors.anexo[0]
              }}</span>

              <div
                v-if="mensagemAnexo"
                class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p
                  class="text-sm text-blue-700 font-medium whitespace-pre-wrap"
                  v-html="mensagemAnexo"
                ></p>
              </div>
              <div v-if="dependente.documento" class="mt-2 flex items-center gap-2"></div>

              <!-- Mostrar documento atual -->
              <div v-if="dependente.documento" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-green-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-neutral-600">
                  Arquivo atual:
                  <button
                    type="button"
                    @click="abrirAnexo(dependente.id)"
                    class="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Abrir PDF
                  </button>
                </p>
              </div>

              <!-- Mostrar novo arquivo selecionado -->
              <div v-if="form.anexo" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <p class="text-sm text-blue-600 font-medium">
                  ✓ Novo arquivo: {{ form.anexo.name }}
                </p>
              </div>

              <!-- Informação se não houver documento -->
              <div v-if="!dependente.documento && !form.anexo" class="mt-2">
                <p class="text-xs text-neutral-400">Nenhum arquivo anexado</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            @click="$router.push('/dependentes')"
            class="px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-all duration-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            :disabled="dependentesStore.loading"
            class="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all duration-200 disabled:opacity-50"
          >
            <span v-if="dependentesStore.loading">Atualizando...</span>
            <span v-else>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="showToast"
        :class="[
          'fixed bottom-6 right-6 flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50',
          toastType === 'success' ? 'bg-white border-green-500' : 'bg-white border-red-500',
        ]"
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
        <button type="button" @click="hideToast" class="shrink-0 text-neutral-400">
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDependentesStore } from '@/stores/dependentes'
import { useAuth } from '@websanova/vue-auth'
import { dependentesService } from '@/services/dependentesService'

const router = useRouter()
const route = useRoute()
const dependentesStore = useDependentesStore()
const auth = useAuth()

const loading = ref(true)
const error = ref(null)
const dependente = ref({})

const form = reactive({
  id: '',
  servidor_matricula: '',
  nome: '',
  cpf: '',
  sexo_dependente: '',
  tipo_dependente: '',
  data_nascimento: '',
  anexo: null,
})

const cpfFormatado = ref('')
const nomeArquivoAnexo = ref('')
const errors = reactive({})
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const formatarDataParaInput = (data) => {
  if (!data) return ''

  console.log('Data recebida para formatar:', data)

  // Se já está no formato YYYY-MM-DD, retorna direto
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return data
  }

  // Se está no formato DD/MM/YYYY
  if (data.includes('/')) {
    const [dia, mes, ano] = data.split('/')
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
  }

  // Se está no formato ISO (YYYY-MM-DDTHH:mm:ss.000000Z)
  if (data.includes('T')) {
    return data.split('T')[0]
  }

  // Tenta criar uma data e formatar
  try {
    const date = new Date(data)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  } catch (e) {
    console.error('Erro ao formatar data:', e)
  }

  return ''
}

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const dependenteId = route.params.id

    await dependentesStore.carregarDependentes()

    const dep = dependentesStore.dependentes.find((d) => d.id == dependenteId)

    if (!dep) {
      error.value = 'Dependente não encontrado'
      return
    }

    dependente.value = dep

    // Preencher formulário
    form.id = dep.id
    form.servidor_matricula = auth.user()?.matricula || ''
    form.nome = dep.nome || ''
    form.cpf = dep.cpf || ''
    form.sexo_dependente = dep.sexo_dependente || ''
    form.tipo_dependente = dep.tipo_dependente || ''

    // Formatar CPF para exibição
    if (dep.cpf) {
      let cpf = dep.cpf.replace(/\D/g, '')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      cpfFormatado.value = cpf
    }

    // Formatar data corretamente
    if (dep.data_nascimento) {
      form.data_nascimento = formatarDataParaInput(dep.data_nascimento)
    }

    console.log('Dependente carregado:', {
      id: form.id,
      nome: form.nome,
      data_original: dep.data_nascimento,
      data_formatada: form.data_nascimento,
      documento: dep.documento,
      tem_documento: !!dep.documento,
    })
  } catch (err) {
    console.error('Erro ao carregar dependente:', err)
    error.value = 'Erro ao conectar com o servidor'
  } finally {
    loading.value = false
  }
}

//Verificar se o CPF é válido
const validarCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  // Validação do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) {
    return false
  }

  // Validação do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(10))) {
    return false
  }

  return true
}

const formatarCPF = (event) => {
  // Remove tudo que não é número
  let valor = event.target.value.replace(/\D/g, '')

  // Limita a 11 dígitos
  valor = valor.substring(0, 11)

  // Aplica a máscara visual
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  // Atualiza o valor formatado (exibido no input)
  cpfFormatado.value = valor

  // Atualiza o valor sem formatação (enviado para o backend)
  form.cpf = valor.replace(/\D/g, '')
}

const calcularIdade = (dataNasc) => {
  if (!dataNasc) return null
  const hoje = new Date()
  const nasc = new Date(dataNasc)

  // Se a data não for um objeto Date válido, tenta criar novamente
  if (isNaN(nasc.getTime())) {
    try {
      const parts = dataNasc.split('-')
      if (parts.length === 3) {
        nasc.setFullYear(parts[0], parts[1] - 1, parts[2]) // YYYY-MM-DD
      }
    } catch (e) {
      return null
    }
  }

  let idade = hoje.getFullYear() - nasc.getFullYear()
  const mes = hoje.getMonth() - nasc.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
    idade--
  }
  return idade
}

const idadeDependente = computed(() => {
  return calcularIdade(form.data_nascimento)
})

const mensagemAnexo = computed(() => {
  if (form.tipo_dependente === 'Filho(a)') {
    const idade = idadeDependente.value
    if (idade >= 21 && idade <= 24) {
      return 'Para filhos(as) com idade entre 21 e 24 anos, o anexo deve conter o comprovante de matrícula em curso de nível superior.'
    } else if (idade > 24) {
      return 'Para filhos(as) com mais de 24 anos, o anexo deve conter documento que comprove a condição de dependência, como laudo médico ou outro comprovante equivalente (ex.: autismo, deficiência física, entre outros).'
    }
  }
  return ''
})

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      nomeArquivoAnexo.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      nomeArquivoAnexo.value = ''
      return
    }

    form.anexo = file
    nomeArquivoAnexo.value = file.name
    console.log('Novo arquivo selecionado:', file.name)
  } else {
    nomeArquivoAnexo.value = ''
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

const atualizarDependente = async () => {
  try {
    // Limpa erros anteriores
    Object.keys(errors).forEach((key) => delete errors[key])

    // Validação da data
    if (!form.data_nascimento || form.data_nascimento.trim() === '') {
      errors.data_nascimento = ['A data de nascimento é obrigatória']
      showToastMessage('Por favor, preencha a data de nascimento', 'error')
      return
    }

    // Validação do CPF
    if (!form.cpf || form.cpf.trim() === '') {
      errors.cpf = ['O CPF é obrigatório']
      showToastMessage('Por favor, preencha o CPF', 'error')
      return
    }

    if (!validarCPF(form.cpf)) {
      errors.cpf = ['CPF inválido']
      showToastMessage('CPF inválido. Por favor, verifique o número digitado', 'error')
      return
    }

    // Garante que tem matrícula
    form.servidor_matricula = auth.user()?.matricula || ''

    if (!form.servidor_matricula) {
      showToastMessage('Erro: Matrícula não encontrada', 'error')
      return
    }

    // Criar FormData
    const formData = new FormData()

    // ID do dependente (OBRIGATÓRIO)
    formData.append('id', form.id)

    // Campos obrigatórios
    formData.append('servidor_matricula', form.servidor_matricula)
    formData.append('nome', form.nome)
    formData.append('cpf', form.cpf)
    formData.append('sexo_dependente', form.sexo_dependente)
    formData.append('tipo_dependente', form.tipo_dependente)

    // Data em ambos os formatos (para validação e para o controller)
    formData.append('data_nascimento', form.data_nascimento)
    formData.append('datanascimento', form.data_nascimento)

    // Anexo (somente se houver novo arquivo)
    if (form.anexo instanceof File) {
      console.log('📎 Novo anexo sendo adicionado:', form.anexo.name)
      formData.append('anexo', form.anexo)
    }

    // Log para debug
    console.log('FormData completo:')
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`   ${key}: [FILE] ${value.name} (${value.size} bytes)`)
      } else {
        console.log(`   ${key}:`, value)
      }
    }

    const result = await dependentesStore.atualizarDependente(formData)

    if (result.success) {
      showToastMessage(result.message || 'Dependente atualizado com sucesso!', 'success')

      setTimeout(() => {
        router.push('/dependentes')
      }, 1500)
    } else {
      if (result.errors && Object.keys(result.errors).length > 0) {
        Object.assign(errors, result.errors)
        console.log('Erros de validação:', result.errors)
        showToastMessage('Verifique os campos do formulário', 'error')
      } else {
        showToastMessage(result.message || 'Erro ao atualizar dependente', 'error')
      }
    }
  } catch (err) {
    console.error('Erro ao atualizar:', err)

    if (err.response && err.response.status === 422) {
      const validationErrors = err.response.data.errors || {}
      console.log('Erros 422:', validationErrors)
      Object.keys(validationErrors).forEach((key) => {
        errors[key] = validationErrors[key]
      })
      showToastMessage('Verifique os campos do formulário', 'error')
    } else {
      showToastMessage(err.response?.data?.message || 'Erro ao atualizar dependente', 'error')
    }
  }
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

onMounted(() => {
  fetchData()
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
