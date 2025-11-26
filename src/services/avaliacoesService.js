import api from './api'

export const avaliacoesService = {
  // Avaliações de Desempenho do Servidor
  async getAvaliacoesAnuaisServidor(matricula, ano) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      if (!ano) {
        throw new Error('Ano é obrigatório')
      }

      const response = await api.get(`/avaliacao_desempenho_anual_servidor/${matricula}/${ano}`)

      return {
        success: true,
        data: response.data || [],
        message: 'Avaliações anuais carregadas com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações anuais do servidor:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar avaliações anuais',
        error: error.response?.data,
        data: [],
      }
    }
  },

  async getAvaliacaoMensalServidor(matricula, mes, ano) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      if (!mes || !ano) {
        throw new Error('Mês e ano são obrigatórios')
      }

      // Garante formato com zero à esquerda (01-12)
      const mesFormatado = mes.toString().padStart(2, '0')

      const response = await api.get(
        `/avaliacao_desempenho_mensal_servidor/${matricula}/${mesFormatado}/${ano}`,
      )

      return {
        success: true,
        data: response.data || [],
        message: 'Avaliação mensal carregada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar avaliação mensal do servidor:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar avaliação mensal',
        error: error.response?.data,
        data: [],
      }
    }
  },

  // Avaliações de Desempenho do Gestor
  async getAvaliacoesAnuaisGestor(matricula, ano) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      if (!ano) {
        throw new Error('Ano é obrigatório')
      }

      const response = await api.get(`/avaliacao_desempenho_anual_gestor/${matricula}/${ano}`)

      return {
        success: true,
        data: response.data || [],
        message: 'Avaliações anuais carregadas com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações anuais do gestor:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar avaliações anuais',
        error: error.response?.data,
        data: [],
      }
    }
  },

  async getAvaliacaoMensalGestor(matricula, mes, ano) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      if (!mes || !ano) {
        throw new Error('Mês e ano são obrigatórios')
      }

      // Garante formato com zero à esquerda (01-12)
      const mesFormatado = mes.toString().padStart(2, '0')

      const response = await api.get(
        `/avaliacao_desempenho_mensal_gestor/${matricula}/${mesFormatado}/${ano}`,
      )

      return {
        success: true,
        data: response.data || [],
        message: 'Avaliação mensal carregada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar avaliação mensal do gestor:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar avaliação mensal',
        error: error.response?.data,
        data: [],
      }
    }
  },
}
