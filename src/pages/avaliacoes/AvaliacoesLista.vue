<template>
  <div>
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">
            Minhas Avaliações
            <span v-if="avaliacoes.length > 0" class="text-neutral-500 font-normal text-lg ml-2">
              ({{ avaliacoesMeses.length }})
            </span>
          </h1>
          <p class="text-sm text-neutral-500 mt-1.5">Visualize suas avaliações de desempenho</p>
        </div>

        <!-- Select de ano -->
        <div class="flex items-center gap-2 sm:gap-3">
          <label class="text-sm font-medium text-neutral-700 whitespace-nowrap">Ano:</label>
          <div class="relative">
            <select
              v-model="anoSelecionado"
              :disabled="carregando"
              class="pl-3 pr-9 py-2 border border-neutral-300 rounded-lg text-sm bg-white text-neutral-900 hover:border-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 appearance-none cursor-pointer min-w-[100px]"
              @change="buscarAvaliacoes"
            >
              <option v-for="ano in anosDisponiveis" :key="ano" :value="ano">
                {{ ano }}
              </option>
            </select>

            <!-- Ícone de dropdown -->
            <div class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
              <svg
                class="h-4 w-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="carregando" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Tabela de Avaliações -->
    <div
      v-else-if="!carregando && avaliacoes.length != 0"
      class="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div class="px-4 sm:px-6 py-4 border-b border-neutral-200">
        <h2 class="text-sm font-semibold text-neutral-900">
          Avaliações de {{ anoSelecionado }}
          <span class="text-neutral-500 font-normal">({{ avaliacoesMeses.length }})</span>
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Período
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Unidade
              </th>
              <th
                class="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                {{ tipoAvaliacao === 'servidor' ? 'Avaliador' : 'Servidor' }}
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Nota
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
              >
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="avaliacao in avaliacoesMeses"
              :key="`${avaliacao.mes}-${avaliacao.ano}`"
              class="hover:bg-neutral-50 transition-colors"
            >
              <!-- Período -->
              <td class="px-4 sm:px-6 py-4 text-sm font-medium text-neutral-900 whitespace-nowrap">
                {{ obterNomeMes(avaliacao.mes) }}/{{ avaliacao.ano }}
              </td>

              <!-- Unidade -->
              <td class="hidden sm:table-cell px-6 py-4 text-sm text-neutral-700">
                {{ avaliacao.delegacia?.nome || 'N/A' }}
              </td>

              <!-- Avaliador/Servidor -->
              <td class="hidden md:table-cell px-6 py-4 text-sm text-neutral-700">
                {{
                  tipoAvaliacao === 'servidor'
                    ? avaliacao.gestor_assinatura?.nome || 'Pendente'
                    : avaliacao.servidor?.nome || 'N/A'
                }}
              </td>

              <!-- Nota -->
              <td class="px-4 sm:px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="text-left">
                    <p class="text-lg font-bold text-neutral-900">
                      {{ avaliacao.total ? avaliacao.total.toFixed(1) : '0.0' }}
                    </p>
                    <p class="text-xs text-neutral-500">de 50</p>
                  </div>
                </div>
              </td>

              <!-- Ações -->
              <td class="px-4 sm:px-6 py-4">
                <button
                  @click="visualizarAvaliacao(avaliacao.mes, avaliacao.ano)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <span class="hidden sm:inline">Ver detalhes</span>
                  <span class="sm:hidden">Ver</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Estado Vazio -->
    <div
      v-else-if="!carregando && !inicializando && avaliacoes.length === 0"
      class="bg-white rounded-lg border border-neutral-200 shadow-sm p-12 text-center"
    >
      <svg
        class="mx-auto h-16 w-16 text-neutral-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-neutral-900 mb-2">Nenhuma avaliação encontrada</h3>
      <p class="text-sm text-neutral-600">
        Não há avaliações registradas para {{ anoSelecionado }} como
        {{ tipoAvaliacao === 'servidor' ? 'servidor' : 'gestor' }}.
      </p>
    </div>

    <!-- Resumo Anual -->
    <div
      v-if="avaliacoes.length > 0"
      class="mt-4 sm:mt-6 bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-6"
    >
      <h3 class="text-sm font-semibold text-neutral-900 mb-4">Resumo Anual {{ anoSelecionado }}</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total de Meses -->
        <div class="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p class="text-xs text-neutral-600 mb-1">Total Avaliado</p>
          <p class="text-3xl font-bold text-neutral-900">{{ avaliacoes.length }}</p>
          <p class="text-xs text-neutral-500 mt-0.5">meses</p>
        </div>

        <!-- Maior Nota -->
        <div class="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p class="text-xs text-neutral-600 mb-1">Maior Nota</p>
          <p class="text-3xl font-bold text-neutral-900">{{ maiorNota }}</p>
        </div>

        <!-- Menor Nota -->
        <div class="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p class="text-xs text-neutral-600 mb-1">Menor Nota</p>
          <p class="text-3xl font-bold text-neutral-900">{{ menorNota }}</p>
        </div>

        <!-- Média Geral -->
        <div class="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p class="text-xs text-neutral-600 mb-1">Média Geral</p>
          <p class="text-3xl font-bold text-neutral-900">{{ mediaGeral }}</p>
        </div>
      </div>
    </div>

    <!-- Toast de notificação -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-neutral-200 rounded-lg shadow-lg px-4 py-3 min-w-[300px] max-w-md"
        :class="{
          'border-green-200 bg-green-50': toastType === 'success',
          'border-red-200 bg-red-50': toastType === 'error',
        }"
      >
        <div class="shrink-0">
          <svg
            v-if="toastType === 'success'"
            class="w-5 h-5 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
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
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAvaliacoesStore } from '@/stores/avaliacoes'

const router = useRouter()
const avaliacoesStore = useAvaliacoesStore()

const tipoAvaliacao = ref('servidor')
const anoSelecionado = ref(new Date().getFullYear())
const anosComAvaliacoes = ref([])

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Evitar mostrar "nenhuma avaliação" na primeira carga
const inicializando = ref(true)

// Gera lista de anos disponíveis
const anosDisponiveis = computed(() => {
  if (anosComAvaliacoes.value.length > 0) {
    return [...anosComAvaliacoes.value].sort((a, b) => b - a) // Mais recente primeiro
  }
  // Fallback: ano atual se ainda não carregou
  return [new Date().getFullYear()]
})

// Acessa diretamente os dados da store
const avaliacoes = computed(() => avaliacoesStore.avaliacoes)
const carregando = computed(() => avaliacoesStore.loading)

// Extrai apenas os meses únicos das avaliações
const avaliacoesMeses = computed(() => {
  const mesesUnicos = new Map()

  avaliacoes.value.forEach((avaliacaoArray) => {
    avaliacaoArray.forEach((avaliacao) => {
      const chave = `${avaliacao.mes}-${avaliacao.ano}`
      if (!mesesUnicos.has(chave)) {
        mesesUnicos.set(chave, avaliacao)
      }
    })
  })

  return Array.from(mesesUnicos.values()).sort((a, b) => b.mes - a.mes)
})

// Cálculos de estatísticas
const mediaGeral = computed(() => {
  if (avaliacoesMeses.value.length === 0) return '0.0'
  const soma = avaliacoesMeses.value.reduce((acc, av) => acc + (av.total || 0), 0)
  return (soma / avaliacoesMeses.value.length).toFixed(1)
})

const maiorNota = computed(() => {
  if (avaliacoesMeses.value.length === 0) return '0.0'
  return Math.max(...avaliacoesMeses.value.map((av) => av.total || 0)).toFixed(1)
})

const menorNota = computed(() => {
  if (avaliacoesMeses.value.length === 0) return '0.0'
  return Math.min(...avaliacoesMeses.value.map((av) => av.total || 0)).toFixed(1)
})

// Função para obter nome do mês
const obterNomeMes = (mes) => {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return meses[mes - 1] || mes
}

// Toast functions
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => hideToast(), 5000)
}

const hideToast = () => {
  showToast.value = false
}

// Buscar anos com avaliações (busca últimos 10 anos e filtra os que têm dados)
const carregarAnosDisponiveis = async () => {
  const anoAtual = new Date().getFullYear()
  const anosParaBuscar = Array.from({ length: 10 }, (_, i) => anoAtual - i)
  const anosEncontrados = []

  // Busca em paralelo os últimos 10 anos
  const promises = anosParaBuscar.map(async (ano) => {
    try {
      let result
      // Usar a função da store que NÃO altera o estado 'avaliacoes'
      if (tipoAvaliacao.value === 'servidor') {
        result = await avaliacoesStore.checarAvaliacoesAnuaisServidor(ano)
      } else {
        result = await avaliacoesStore.checarAvaliacoesAnuaisGestor(ano)
      }

      // Se encontrou avaliações neste ano, adiciona à lista
      if (result.success && result.data && result.data.length > 0) {
        return ano
      }
      return null
    } catch {
      return null
    }
  })

  const resultados = await Promise.all(promises)

  // Filtra apenas os anos que retornaram dados
  resultados.forEach((ano) => {
    if (ano !== null) {
      anosEncontrados.push(ano)
    }
  })

  anosComAvaliacoes.value = anosEncontrados

  // Se encontrou anos, seleciona o mais recente
  if (anosEncontrados.length > 0) {
    // Apenas atualiza se o ano selecionado não for um dos encontrados
    if (!anosEncontrados.includes(anoSelecionado.value)) {
      anoSelecionado.value = Math.max(...anosEncontrados)
    }
  }
}

// Buscar avaliações usando a store
const buscarAvaliacoes = async () => {
  //Limpa o estado da lista anual imediatamente antes da busca
  avaliacoesStore.limparAvaliacoesAnuais()

  try {
    let result

    if (tipoAvaliacao.value === 'servidor') {
      result = await avaliacoesStore.carregarAvaliacoesAnuaisServidor(anoSelecionado.value)
    } else {
      result = await avaliacoesStore.carregarAvaliacoesAnuaisGestor(anoSelecionado.value)
    }

    if (!result.success) {
      showToastMessage(result.message || 'Erro ao carregar avaliações', 'error')
    }
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    showToastMessage('Erro ao carregar avaliações. Tente novamente.', 'error')
  }
}

// Visualizar avaliação específica
const visualizarAvaliacao = (mes, ano) => {
  router.push({
    name: 'avaliacoes_view',
    params: { mes, ano },
    query: { tipo: tipoAvaliacao.value },
  })
}

// Limpar dados antigos ANTES de montar o componente
onBeforeMount(() => {
  inicializando.value = true // Reset ao remontar componente
  avaliacoesStore.limparAvaliacoesAnuais()
})

// Buscar ao montar componente
onMounted(async () => {
  await carregarAnosDisponiveis()
  await buscarAvaliacoes()
  inicializando.value = false // Marca que já carregou pela primeira vez
})

// Recarregar anos disponíveis quando mudar o tipo
watch(tipoAvaliacao, async () => {
  avaliacoesStore.limparAvaliacoesAnuais()
  await carregarAnosDisponiveis()
  await buscarAvaliacoes()
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
