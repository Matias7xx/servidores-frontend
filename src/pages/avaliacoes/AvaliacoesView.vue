<template>
  <div>
    <button
      @click="router.back()"
      class="mb-4 sm:mb-6 flex items-center text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
    >
      <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Voltar
    </button>

    <!-- <div v-if="carregando" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div> -->

    <div v-if="avaliacoes.length > 0" class="space-y-4 sm:space-y-6">
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6"
        >
          <div>
            <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">
              Avaliação de {{ obterNomeMes(mes) }}/{{ ano }}
            </h1>
            <p class="text-sm text-neutral-500 mt-1">
              {{
                tipoAvaliacao === 'servidor'
                  ? 'Sua avaliação mensal de desempenho'
                  : 'Avaliação realizada como gestor'
              }}
            </p>
          </div>
          <div class="text-center sm:text-right">
            <p class="text-xs text-neutral-600 mb-1">Nota Final</p>
            <p class="text-3xl sm:text-4xl font-bold text-neutral-900">
              {{ notaFinal.toFixed(1) }}
              <span class="text-lg font-medium text-neutral-500"> / 50</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
          <div>
            <p class="text-xs text-neutral-600 mb-1">Servidor Avaliado</p>
            <p class="font-medium text-neutral-900 text-sm">
              {{ user?.nome || 'N/A' }}
            </p>
            <p class="text-xs text-neutral-500 mt-0.5">Matrícula: {{ user?.matricula || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs text-neutral-600 mb-1">Gestor Avaliador</p>
            <p class="font-medium text-neutral-900 text-sm">
              {{ avaliacoes[0]?.gestor_assinatura?.nome || 'Não assinado' }}
            </p>
            <p class="text-xs text-neutral-500 mt-0.5">
              Mat: {{ avaliacoes[0]?.gestor_assinatura?.matricula || 'N/A' }}
            </p>
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-200 mt-4">
          <p class="text-xs text-neutral-600 mb-1">Unidade</p>
          <p class="font-medium text-neutral-900 text-sm">
            {{ avaliacoes[0]?.delegacia?.nome || 'N/A' }}
          </p>
        </div>
      </div>

      <div
        :class="[
          'bg-white rounded-lg border border-neutral-200 shadow-sm transition-all duration-300',
          { 'shadow-md ring-1 ring-neutral-100': criteriosVisiveis },
        ]"
      >
        <button
          @click="criteriosVisiveis = !criteriosVisiveis"
          :class="[
            'w-full flex justify-between items-center p-4 sm:p-6 text-sm font-semibold text-neutral-900 transition-colors',
            {
              'bg-neutral-50 hover:bg-neutral-100 rounded-t-lg': criteriosVisiveis,
              'hover:bg-neutral-50 rounded-lg': !criteriosVisiveis,
            },
          ]"
          :aria-expanded="criteriosVisiveis"
          aria-controls="detalhamento-criterios"
        >
          <span> Critérios de Avaliação (C1-C5) </span>
          <svg
            :class="[
              'h-5 w-5 text-neutral-500 transition-transform duration-300',
              { 'rotate-180': criteriosVisiveis },
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <Transition name="fade-slide">
          <div
            v-show="criteriosVisiveis"
            class="overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-3 p-4"
          >
            <div
              v-for="criterio in criterios"
              :key="criterio.id"
              class="group relative bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg p-4 transition-all duration-200"
            >
              <div class="flex items-start gap-3">
                <div
                  class="shrink-0 w-10 h-10 bg-neutral-800 text-white rounded-lg flex items-center justify-center font-bold text-sm"
                >
                  {{ criterio.numero }}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-sm text-neutral-900 mb-1 leading-tight">
                    {{ criterio.titulo }}
                  </h4>
                  <p class="text-xs text-neutral-600 leading-relaxed">
                    {{ criterio.descricao }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-6">
        <h2 class="text-sm font-semibold text-neutral-900 mb-4">Notas</h2>

        <div class="space-y-3">
          <div
            v-for="(avaliacao, index) in avaliacoes"
            :key="index"
            class="border border-neutral-200 rounded-lg p-3 sm:p-4"
          >
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 text-sm">
              <div class="text-center p-2 bg-neutral-50 rounded">
                <p class="text-neutral-600 mb-0.5">C1</p>
                <p class="font-semibold text-neutral-900">{{ avaliacao.c1 || 0 }}</p>
              </div>
              <div class="text-center p-2 bg-neutral-50 rounded">
                <p class="text-neutral-600 mb-0.5">C2</p>
                <p class="font-semibold text-neutral-900">{{ avaliacao.c2 || 0 }}</p>
              </div>
              <div class="text-center p-2 bg-neutral-50 rounded">
                <p class="text-neutral-600 mb-0.5">C3</p>
                <p class="font-semibold text-neutral-900">{{ avaliacao.c3 || 0 }}</p>
              </div>
              <div class="text-center p-2 bg-neutral-50 rounded">
                <p class="text-neutral-600 mb-0.5">C4</p>
                <p class="font-semibold text-neutral-900">{{ avaliacao.c4 || 0 }}</p>
              </div>
              <div class="text-center p-2 bg-neutral-50 rounded">
                <p class="text-neutral-600 mb-0.5">C5</p>
                <p class="font-semibold text-neutral-900">{{ avaliacao.c5 || 0 }}</p>
              </div>
            </div>

            <div v-if="avaliacao.historico" class="mt-3 pt-3 border-t border-neutral-200">
              <p class="text-xs text-neutral-600 mb-1">Observações:</p>
              <p class="text-sm text-neutral-700">{{ avaliacao.historico }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-6">
        <h2 class="text-sm font-semibold text-neutral-900 mb-4">Estatísticas</h2>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="text-center p-3 bg-neutral-50 rounded-lg">
            <p class="text-xs text-neutral-600 mb-1">Maior Nota</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ maiorNotaCriterio }}
              <span class="text-sm font-medium text-neutral-500"> / 10</span>
            </p>
          </div>
          <div class="text-center p-3 bg-neutral-50 rounded-lg">
            <p class="text-xs text-neutral-600 mb-1">Menor Nota</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ menorNotaCriterio }}
              <span class="text-sm font-medium text-neutral-500"> / 10</span>
            </p>
          </div>
          <div class="text-center p-3 bg-neutral-50 rounded-lg">
            <p class="text-xs text-neutral-600 mb-1">Média</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ mediaCriterios }}
              <span class="text-sm font-medium text-neutral-500"> / 10</span>
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="avaliacoes[0]?.data_hora_assinatura_gestor"
        class="bg-neutral-50 rounded-lg border border-neutral-200 p-4"
      >
        <div class="flex items-center space-x-3">
          <svg class="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="text-sm font-medium text-neutral-900">Avaliação Assinada</p>
            <p class="text-xs text-neutral-600">
              Data: {{ formatarDataHora(avaliacoes[0].data_hora_assinatura_gestor) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-else class="bg-white rounded-lg border border-neutral-200 shadow-sm p-8 text-center">
      <svg
        class="mx-auto h-12 w-12 text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 class="mt-4 text-base font-medium text-neutral-900">Avaliação não encontrada</h3>
      <p class="mt-2 text-sm text-neutral-500">
        Não foi possível carregar os dados desta avaliação.
      </p>
    </div> -->

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
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAvaliacoesStore } from '@/stores/avaliacoes'

const route = useRoute()
const router = useRouter()
const avaliacoesStore = useAvaliacoesStore()

// Pegar usuário autenticado
const authUser = inject('authUser')
const { user } = authUser

const mes = ref(parseInt(route.params.mes))
const ano = ref(parseInt(route.params.ano))
const tipoAvaliacao = ref(route.query.tipo || 'servidor')

// Estado para o colapsável de critérios
const criteriosVisiveis = ref(false)

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Acessa diretamente os dados da store
const avaliacoes = computed(() => avaliacoesStore.avaliacaoAtual)
//const carregando = computed(() => avaliacoesStore.loading)

// Computeds
const notaFinal = computed(() => {
  if (avaliacoes.value.length === 0) return 0
  return avaliacoes.value[0]?.total || 0
})

const mediaCriterios = computed(() => {
  if (avaliacoes.value.length === 0) return '0.0'
  const soma = avaliacoes.value.reduce((acc, av) => acc + obterNotaCriterio(av), 0)
  return (soma / avaliacoes.value.length).toFixed(1)
})

const maiorNotaCriterio = computed(() => {
  if (avaliacoes.value.length === 0) return '0.0'
  const todasNotas = avaliacoes.value.flatMap((av) => [
    parseFloat(av.c1) || 0,
    parseFloat(av.c2) || 0,
    parseFloat(av.c3) || 0,
    parseFloat(av.c4) || 0,
    parseFloat(av.c5) || 0,
  ])
  return Math.max(...todasNotas).toFixed(1)
})

const menorNotaCriterio = computed(() => {
  if (avaliacoes.value.length === 0) return '0.0'
  const todasNotas = avaliacoes.value.flatMap((av) => [
    parseFloat(av.c1) || 0,
    parseFloat(av.c2) || 0,
    parseFloat(av.c3) || 0,
    parseFloat(av.c4) || 0,
    parseFloat(av.c5) || 0,
  ])
  return Math.min(...todasNotas).toFixed(1)
})

const obterNomeMes = (mes) => {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  return meses[mes - 1] || mes
}

const criterios = [
  {
    numero: 'C-1',
    titulo: 'PRODUTIVIDADE NO DESEMPENHO DAS FUNÇÕES',
    descricao: 'Postura orientada para resultados e eficiência.',
  },
  {
    numero: 'C-2',
    titulo: 'CONHECIMENTO DE MÉTODOS E TÉCNICAS NECESSÁRIAS',
    descricao: 'Domínio técnico e solução de problemas.',
  },
  {
    numero: 'C-3',
    titulo: 'VISÃO SISTÊMICA, TRABALHO EM EQUIPE E LIDERANÇA',
    descricao: 'Cooperação, liderança e integração.',
  },
  {
    numero: 'C-4',
    titulo: 'COMPROMETIMENTO COM O TRABALHO',
    descricao: 'Responsabilidade, dedicação e iniciativa.',
  },
  {
    numero: 'C-5',
    titulo: 'CUMPRIMENTO DAS NORMAS DE PROCEDIMENTOS',
    descricao: 'Assiduidade, disciplina e respeito às normas.',
  },
]

const obterNotaCriterio = (avaliacao) => {
  const c1 = parseFloat(avaliacao.c1) || 0
  const c2 = parseFloat(avaliacao.c2) || 0
  const c3 = parseFloat(avaliacao.c3) || 0
  const c4 = parseFloat(avaliacao.c4) || 0
  const c5 = parseFloat(avaliacao.c5) || 0
  return (c1 + c2 + c3 + c4 + c5) / 5
}

const formatarDataHora = (dataHora) => {
  if (!dataHora) return 'N/A'
  const data = new Date(dataHora)
  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Toast
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => hideToast(), 5000)
}

const hideToast = () => {
  showToast.value = false
}

// Buscar avaliação usando a store
const buscarAvaliacao = async () => {
  try {
    let result

    if (tipoAvaliacao.value === 'servidor') {
      result = await avaliacoesStore.carregarAvaliacaoMensalServidor(mes.value, ano.value)
    } else {
      result = await avaliacoesStore.carregarAvaliacaoMensalGestor(mes.value, ano.value)
    }

    if (!result.success) {
      showToastMessage(result.message || 'Erro ao carregar avaliação', 'error')
    }
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error)
    showToastMessage('Erro ao carregar avaliação. Tente novamente.', 'error')
  }
}

onMounted(() => {
  buscarAvaliacao()
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

/* Transição para o acordeon */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    max-height 0.4s ease-in-out,
    opacity 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  max-height: 500px; /* Um valor alto o suficiente para caber o conteúdo */
  opacity: 1;
}
</style>
