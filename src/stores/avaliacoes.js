import { defineStore } from 'pinia'
import { ref } from 'vue'
import { avaliacoesService } from '../services/avaliacoesService'
import { useAuthUser } from '@/composables/useAuthUser'

export const useAvaliacoesStore = defineStore('avaliacoes', () => {
  const avaliacoes = ref([])
  const avaliacaoAtual = ref([])
  const loading = ref(false)
  const error = ref(null)

  const { userMatricula } = useAuthUser()

  // Pegar matrícula do Composable
  const getMatricula = () => {
    const matricula = userMatricula.value
    return matricula
  }

  // Limpa o estado da lista anual
  const limparAvaliacoesAnuais = () => {
    avaliacoes.value = []
  }

  // Limpa o estado da avaliação atual
  const limparAvaliacaoAtual = () => {
    avaliacaoAtual.value = []
  }

  //Checa se há dados anuais SEM alterar o estado (para carregar filtros na Lista)
  const checarAvaliacoesAnuaisServidor = async (ano) => {
    const matricula = getMatricula()
    if (!matricula) throw new Error('Matrícula não encontrada. Faça login novamente.')
    // Retorna o resultado do service diretamente sem alterar o estado.
    return await avaliacoesService.getAvaliacoesAnuaisServidor(matricula, ano)
  }

  // Checa se há dados anuais SEM alterar o estado
  const checarAvaliacoesAnuaisGestor = async (ano) => {
    const matricula = getMatricula()
    if (!matricula) throw new Error('Matrícula não encontrada. Faça login novamente.')
    // Retorna o resultado do service diretamente sem alterar o estado.
    return await avaliacoesService.getAvaliacoesAnuaisGestor(matricula, ano)
  }

  // Carregar avaliações anuais do servidor
  const carregarAvaliacoesAnuaisServidor = async (ano) => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await avaliacoesService.getAvaliacoesAnuaisServidor(matricula, ano)

      if (response.success) {
        avaliacoes.value = response.data
        return { success: true, data: avaliacoes.value }
      } else {
        error.value = response.message
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar avaliações anuais'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  // Carregar avaliação mensal do servidor
  const carregarAvaliacaoMensalServidor = async (mes, ano) => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await avaliacoesService.getAvaliacaoMensalServidor(matricula, mes, ano)

      if (response.success) {
        avaliacaoAtual.value = response.data
        return { success: true, data: avaliacaoAtual.value }
      } else {
        error.value = response.message
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar avaliação mensal'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  // Carregar avaliações anuais do gestor
  const carregarAvaliacoesAnuaisGestor = async (ano) => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await avaliacoesService.getAvaliacoesAnuaisGestor(matricula, ano)

      if (response.success) {
        avaliacoes.value = response.data
        return { success: true, data: avaliacoes.value }
      } else {
        error.value = response.message
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar avaliações anuais do gestor'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  // Carregar avaliação mensal do gestor
  const carregarAvaliacaoMensalGestor = async (mes, ano) => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await avaliacoesService.getAvaliacaoMensalGestor(matricula, mes, ano)

      if (response.success) {
        avaliacaoAtual.value = response.data
        return { success: true, data: avaliacaoAtual.value }
      } else {
        error.value = response.message
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar avaliação mensal do gestor'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    avaliacoes,
    avaliacaoAtual,
    loading,
    error,
    limparAvaliacoesAnuais,
    limparAvaliacaoAtual,
    checarAvaliacoesAnuaisServidor,
    checarAvaliacoesAnuaisGestor,
    carregarAvaliacoesAnuaisServidor,
    carregarAvaliacaoMensalServidor,
    carregarAvaliacoesAnuaisGestor,
    carregarAvaliacaoMensalGestor,
  }
})
