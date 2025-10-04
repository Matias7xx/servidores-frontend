import api from './api'

class FormacaoService {
  // Listar formações
  async getFormacoes() {
    try {
      const response = await api.get('/api/servidor_formacao_list')

      return {
        success: true,
        data: response.data.data,
        message: 'Formações carregadas com sucesso',
      }
    } catch (error) {
      console.error('Erro ao carregar formações:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar formações',
        error: error.response?.data,
      }
    }
  }

  // Buscar dados para criar formação
  async getFormacaoCreate() {
    try {
      const response = await api.get('/api/servidor_formacao_create')

      return {
        success: true,
        data: response.data.data,
        message: 'Dados carregados com sucesso',
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar dados',
        error: error.response?.data,
      }
    }
  }

  // Criar formação
  async createFormacao(formData) {
    try {
      const response = await api.post('/api/servidor_formacao_store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Formação cadastrada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao criar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao cadastrar formação',
        errors: error.response?.data?.errors,
        error: error.response?.data,
      }
    }
  }

  // Buscar dados para editar formação
  async getFormacaoEdit(id) {
    try {
      const response = await api.get(`/api/servidor_formacao_edit/${id}`)

      return {
        success: true,
        data: response.data.data,
        message: 'Dados carregados com sucesso',
      }
    } catch (error) {
      console.error('Erro ao carregar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar formação',
        error: error.response?.data,
      }
    }
  }

  // Atualizar formação
  async updateFormacao(formData) {
    try {
      const response = await api.post('/api/servidor_formacao_update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Formação atualizada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao atualizar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao atualizar formação',
        errors: error.response?.data?.errors,
        error: error.response?.data,
      }
    }
  }

  // Inativar formação
  async inativarFormacao(id) {
    try {
      const response = await api.post('/api/servidor_formacao_inativar', { id })

      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Formação inativada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao inativar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao inativar formação',
        error: error.response?.data,
      }
    }
  }

  // Buscar classes por área
  async getClassesByArea(areaId) {
    try {
      const response = await api.get(`/api/formacao/classes/${areaId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao carregar classes:', error)
      throw error
    }
  }

  // Buscar cursos por classe
  async getCursosByClasse(classeId) {
    try {
      const response = await api.get(`/api/formacao/cursos/${classeId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao carregar cursos:', error)
      throw error
    }
  }
}

export const formacaoService = new FormacaoService()
