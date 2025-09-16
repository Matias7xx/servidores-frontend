<template>
  <div class="dashboard-page">
    <!-- Cabeçalho da página -->
    <div class="mb-4 sm:mb-6">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-sm sm:text-base text-gray-600 mt-1">Bem-vindo ao painel de controle</p>
    </div>
    
    <!-- Cards de informações -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
      <!-- Card 1 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 mb-2">Total de Itens</h3>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ stats.total }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Total acumulado</p>
          </div>
          <div class="flex-shrink-0">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 mb-2">Itens Abertos</h3>
            <p class="text-2xl sm:text-3xl font-bold text-yellow-600">{{ stats.open }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Aguardando análise</p>
          </div>
          <div class="flex-shrink-0">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 mb-2">Itens Finalizados</h3>
            <p class="text-2xl sm:text-3xl font-bold text-green-600">{{ stats.completed }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Concluídos este mês</p>
          </div>
          <div class="flex-shrink-0">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção principal com duas colunas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
      <!-- Exemplo de Atividades Recentes -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-900">Atividades Recentes</h3>
          <button class="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver todas</button>
        </div>
        
        <div class="space-y-3">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div class="flex items-center min-w-0 flex-1">
              <div class="flex-shrink-0 mr-3">
                <div :class="[
                  'w-2 h-2 rounded-full',
                  activity.color === 'green' ? 'bg-green-500' : 
                  activity.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
                ]"></div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm text-gray-900 truncate">{{ activity.name }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
            <span :class="[
              'text-xs font-medium px-2 py-1 rounded-full flex-shrink-0',
              activity.color === 'green' ? 'text-green-700 bg-green-100' :
              activity.color === 'yellow' ? 'text-yellow-700 bg-yellow-100' : 'text-blue-700 bg-blue-100'
            ]">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Exemplo de Resumo e Métricas -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Métricas do Sistema</h3>
        
        <div class="space-y-4">
          <!-- Meta Semanal -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">Meta Semanal</span>
              <span class="font-medium text-gray-900">{{ weeklyProgress.percentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                :style="`width: ${weeklyProgress.percentage}%`"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ weeklyProgress.completed }} de {{ weeklyProgress.total }} tarefas</p>
          </div>

          <!-- Produtividade -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">Produtividade</span>
              <span class="font-medium text-gray-900">{{ productivity.percentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-green-600 h-2 rounded-full transition-all duration-500" 
                :style="`width: ${productivity.percentage}%`"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Acima da média mensal</p>
          </div>

          <!-- Eficiência -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">Eficiência</span>
              <span class="font-medium text-gray-900">{{ efficiency.percentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-yellow-600 h-2 rounded-full transition-all duration-500" 
                :style="`width: ${efficiency.percentage}%`"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Tempo médio de resolução</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button 
          v-for="action in quickActions" 
          :key="action.id"
          @click="handleQuickAction(action.id)"
          class="flex flex-col items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <div :class="[
            'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2',
            action.bgColor
          ]">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon"></path>
            </svg>
          </div>
          <span class="text-xs sm:text-sm font-medium text-gray-900 text-center leading-tight">{{ action.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estados reativos para dados do dashboard
const stats = ref({
  total: 150,
  open: 45,
  completed: 105
})

const recentActivities = ref([
  { 
    id: '001', 
    name: 'Item processado #001', 
    status: 'Concluído', 
    color: 'green',
    time: 'há 2 minutos'
  },
  { 
    id: '002', 
    name: 'Item processado #002', 
    status: 'Em análise', 
    color: 'yellow',
    time: 'há 15 minutos'
  },
  { 
    id: '003', 
    name: 'Item processado #003', 
    status: 'Novo', 
    color: 'blue',
    time: 'há 1 hora'
  },
  { 
    id: '004', 
    name: 'Item processado #004', 
    status: 'Concluído', 
    color: 'green',
    time: 'há 2 horas'
  }
])

const weeklyProgress = ref({
  percentage: 70,
  completed: 14,
  total: 20
})

const productivity = ref({
  percentage: 85
})

const efficiency = ref({
  percentage: 92
})

const quickActions = ref([
  {
    id: 'new',
    name: 'Novo Item',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'search',
    name: 'Buscar',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600'
  },
  {
    id: 'report',
    name: 'Relatório',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 'settings',
    name: 'Configurações',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
])

// Funções
const handleQuickAction = (actionId) => {
  console.log(`Ação rápida clicada: ${actionId}`)
  // Implementar navegação ou ação específica para cada botão
  switch(actionId) {
    case 'new':
      // router.push('/novo-item')
      break
    case 'search':
      // router.push('/buscar')
      break
    case 'report':
      // router.push('/relatorios')
      break
    case 'settings':
      // router.push('/configuracoes')
      break
  }
}

// Função para carregar dados do dashboard
const loadDashboardData = async () => {
  try {
    // Aqui seria feita a chamada para alguma API
    // const response = await api.getDashboardStats()
    // stats.value = response.data
    
    console.log('Carregando dados do dashboard...')
    
    // Simulação de carregamento com dados dinâmicos
    setTimeout(() => {
      // Simular mudança nos dados
      stats.value.total = Math.floor(Math.random() * 200) + 100
      stats.value.open = Math.floor(Math.random() * 50) + 20
      stats.value.completed = stats.value.total - stats.value.open
    }, 2000)
    
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

// Função para atualizar métricas em tempo real
const updateMetrics = () => {
  // Simular atualizações em tempo real
  setInterval(() => {
    weeklyProgress.value.percentage = Math.min(100, weeklyProgress.value.percentage + Math.floor(Math.random() * 5))
    productivity.value.percentage = Math.min(100, Math.max(70, productivity.value.percentage + (Math.random() - 0.5) * 10))
    efficiency.value.percentage = Math.min(100, Math.max(80, efficiency.value.percentage + (Math.random() - 0.5) * 5))
  }, 30000) // Atualizar a cada 30 segundos
}

onMounted(() => {
  loadDashboardData()
  updateMetrics()
})
</script>

<style scoped>
/* Estilos específicos do dashboard se necessário */
</style>