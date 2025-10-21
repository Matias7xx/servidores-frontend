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
                <option value="Filho">Filho(a)</option>
                <option value="Enteado">Enteado(a)</option>
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
                v-model="cpfFormatado"
                @input="formatarCPF"
                maxlength="14"
                placeholder="000.000.000-00"
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
              <label class="block text-sm font-medium text-neutral-700 mb-1.5">
                Documento de Vínculo entre o Dependente e o Servidor
                <span class="text-red-500">(.pdf)</span> <span class="text-red-500">*</span>
              </label>
              <input
                type="file"
                ref="anexoInput"
                @change="onFileChange($event, 'anexo')"
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
                  {{ nomeArquivoAnexo || 'Nenhum arquivo escolhido' }}
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
            </div>
          </div>
        </div>

        <div
          v-if="showDeficienciaOuFinanceiraInput"
          class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6"
        >
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Documentos de Comprovação Adicionais
          </h2>

          <div
            v-if="showNewDocs21To24"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4"
          >
            <p class="text-sm text-yellow-800 font-medium">
              ATENÇÃO: Para esta faixa etária você deve anexar pelo menos UM dos três documentos
              abaixo.
            </p>
          </div>
          <div
            v-else-if="showNewDocsOver24"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4"
          >
            <p class="text-sm text-yellow-800 font-medium">
              ATENÇÃO: Para esta faixa etária você deve anexar pelo menos UM dos documentos abaixo.
            </p>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Declaração de Dependência Financeira
              </label>
              <input
                type="file"
                ref="docDependenciaFinanceiraInput"
                @change="onFileChange($event, 'doc_dependencia_financeira')"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docDependenciaFinanceiraInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                  errors.doc_dependencia_financeira
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="truncate">
                  {{ nomeArquivoDependenciaFinanceira || 'Nenhum arquivo escolhido' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_dependencia_financeira
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span
                v-if="errors.doc_dependencia_financeira"
                class="text-red-600 text-xs mt-1.5 block"
                >{{ errors.doc_dependencia_financeira[0] }}</span
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Laudo de Deficiência
              </label>
              <input
                type="file"
                ref="docLaudoDeficienciaInput"
                @change="onFileChange($event, 'doc_laudo_deficiencia')"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docLaudoDeficienciaInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                  errors.doc_laudo_deficiencia
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="truncate">
                  {{ nomeArquivoLaudoDeficiencia || 'Nenhum arquivo escolhido' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_laudo_deficiencia
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span v-if="errors.doc_laudo_deficiencia" class="text-red-600 text-xs mt-1.5 block">{{
                errors.doc_laudo_deficiencia[0]
              }}</span>
            </div>

            <div v-if="showNewDocs21To24">
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Comprovante de Curso Superior
              </label>
              <input
                type="file"
                ref="docCursoSuperiorInput"
                @change="onFileChange($event, 'doc_curso_superior')"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docCursoSuperiorInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between',
                  errors.doc_curso_superior
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="truncate">
                  {{ nomeArquivoCursoSuperior || 'Nenhum arquivo escolhido' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_curso_superior
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span v-if="errors.doc_curso_superior" class="text-red-600 text-xs mt-1.5 block">{{
                errors.doc_curso_superior[0]
              }}</span>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex items-center justify-end gap-3 pt-4">
          <router-link
            to="/dependentes"
            class="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Cancelar
          </router-link>
          <button
            type="submit"
            class="px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 border border-transparent rounded-lg transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>

    <!-- Modal de Confirmação -->
    <div
      v-if="showReactiveModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 class="text-lg font-semibold text-neutral-900 mb-4">Dependente já cadastrado</h3>
        <p class="text-sm text-neutral-600 mb-6">
          Este dependente já foi cadastrado anteriormente e está inativo. Deseja reativá-lo?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="cancelarReativacao"
            class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
          >
            Cancelar
          </button>
          <button
            @click="confirmarReativacao"
            class="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800"
          >
            Reativar
          </button>
        </div>
      </div>
    </div>

    <!-- Toast de Notificação -->
    <Transition name="slide-up">
      <div
        v-if="showToast"
        :class="[
          'fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl text-white text-sm font-medium max-w-sm z-50',
          toastType === 'success'
            ? 'bg-green-600'
            : toastType === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600',
        ]"
      >
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg
              v-if="toastType === 'success'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="whitespace-pre-wrap break-words">{{ toastMessage }}</p>
          </div>
          <button @click="hideToast" class="flex-shrink-0 ml-2 text-white hover:text-neutral-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDependentesStore } from '@/stores/dependentes'
import { useAuth } from '@websanova/vue-auth'

const router = useRouter()
const dependentesStore = useDependentesStore()
const auth = useAuth()

// Estados
const loadingData = ref(false)
const showReactiveModal = ref(false)
const dependenteParaReativar = ref(null)

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Nomes dos arquivos
const nomeArquivoAnexo = ref('')
const nomeArquivoDependenciaFinanceira = ref('')
const nomeArquivoLaudoDeficiencia = ref('')
const nomeArquivoCursoSuperior = ref('')

// Formulário
const form = reactive({
  nome: '',
  sexo_dependente: '',
  tipo_dependente: '',
  data_nascimento: '',
  cpf: '',
  anexo: null,
  doc_dependencia_financeira: null,
  doc_laudo_deficiencia: null,
  doc_curso_superior: null,
  servidor_matricula: '',
})

const errors = reactive({})

// CPF formatado
const cpfFormatado = ref('')

const formatarCPF = (event) => {
  let valor = event.target.value.replace(/\D/g, '')

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  cpfFormatado.value = valor
  form.cpf = valor.replace(/\D/g, '')
}

const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11) return false
  if (/^(\d)\1+$/.test(cpf)) return false

  let soma = 0
  let resto

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return false

  return true
}

// Computed properties
const idadeDependente = computed(() => {
  if (!form.data_nascimento) return null

  const hoje = new Date()
  const nascimento = new Date(form.data_nascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
})

const isFilhoOuEnteado = computed(() => {
  return form.tipo_dependente === 'Filho' || form.tipo_dependente === 'Enteado'
})

const showDeficienciaOuFinanceiraInput = computed(() => {
  if (!isFilhoOuEnteado.value) return false

  const idade = idadeDependente.value
  if (idade === null) return false

  return idade >= 21
})

const showNewDocs21To24 = computed(() => {
  if (!isFilhoOuEnteado.value) return false
  const idade = idadeDependente.value
  return idade !== null && idade >= 21 && idade <= 24
})

const showNewDocsOver24 = computed(() => {
  if (!isFilhoOuEnteado.value) return false
  const idade = idadeDependente.value
  return idade !== null && idade > 24
})

const mensagemAnexo = computed(() => {
  if (!form.tipo_dependente) return ''

  const mensagens = {
    Cônjuge:
      'Anexe aqui a <strong>Certidão de Casamento</strong> ou <strong>Declaração de União Estável</strong>.',
    Filho:
      'Anexe aqui o <strong>documento que comprove a relação do(a) filho(a) com o servidor</strong>.',
    Enteado:
      'Anexe aqui o <strong>documento que comprove a relação do(a) enteado(a) com o servidor</strong>.',
    Pai: 'Anexe aqui o <strong>documento que comprove a relação do pai com o servidor</strong>.',
    Mãe: 'Anexe aqui o <strong>documento que comprove a relação da mãe com o servidor</strong>.',
  }

  return mensagens[form.tipo_dependente] || ''
})

const onFileChange = (event, fieldName) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    showToastMessage('Por favor, selecione apenas arquivos PDF', 'error')
    event.target.value = ''
    return
  }

  form[fieldName] = file

  if (fieldName === 'anexo') {
    nomeArquivoAnexo.value = file.name
  } else if (fieldName === 'doc_dependencia_financeira') {
    nomeArquivoDependenciaFinanceira.value = file.name
  } else if (fieldName === 'doc_laudo_deficiencia') {
    nomeArquivoLaudoDeficiencia.value = file.name
  } else if (fieldName === 'doc_curso_superior') {
    nomeArquivoCursoSuperior.value = file.name
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

    // BLOCO DE VALIDAÇÃO DO ANEXO
    if (!form.anexo) {
      errors.anexo = ['O anexo é obrigatório.']

      showToastMessage('O anexo é obrigatório. Por favor, anexe o documento.', 'error')
      return
    }

    if (isFilhoOuEnteado.value) {
      const idade = idadeDependente.value

      // Regra: Se 21 a 24 anos, um dos três é obrigatório
      if (idade >= 21 && idade <= 24) {
        if (
          !form.doc_dependencia_financeira &&
          !form.doc_laudo_deficiencia &&
          !form.doc_curso_superior
        ) {
          errors.doc_dependencia_financeira = [
            'É obrigatório anexar UM dos três documentos de comprovação.',
          ]
          showToastMessage(
            'Para esta faixa etária, é obrigatório anexar a Dependência Financeira, o Laudo de Deficiência OU o Comprovante de Curso Superior.',
            'error',
          )
          return
        }
      }

      // Regra: Se > 24 anos, um dos dois é obrigatório (Curso Superior não é aceito)
      if (idade > 24) {
        if (!form.doc_dependencia_financeira && !form.doc_laudo_deficiencia) {
          errors.doc_dependencia_financeira = [
            'É obrigatório anexar UM dos dois documentos de comprovação.',
          ]
          showToastMessage(
            'Para esta faixa etária, é obrigatório anexar a Dependência Financeira OU o Laudo de Deficiência.',
            'error',
          )
          return
        }
      }
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

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
