import api from './api'

function convertErrorKeys(errors) {
  if (!errors) return {}

  const converted = {}
  for (const [key, value] of Object.entries(errors)) {
    // Converte data_conclusao → dataconclusao
    const newKey = key === 'data_conclusao' ? 'dataconclusao' : key
    converted[newKey] = value
  }
  return converted
}

class FormacaoService {
  async getFormacoes(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      console.log('Buscando formações:', matricula)
      const response = await api.get(`/formacao_servidor_list/${matricula}`)

      return {
        success: true,
        data: response.data.data || response.data,
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

  async getAreas() {
    try {
      console.log('Buscando áreas')
      const response = await api.get('/formacao_areas')

      return {
        success: true,
        data: response.data,
        message: 'Áreas carregadas com sucesso',
      }
    } catch (error) {
      console.error('Erro ao carregar áreas:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar áreas',
        error: error.response?.data,
      }
    }
  }

  async getFormacaoEdit(id) {
    try {
      if (!id) {
        throw new Error('ID da formação é obrigatório')
      }

      console.log('Buscando formação para edição:', id)
      const response = await api.get(`/formacao_servidor_edit/${id}`)

      return {
        success: response.data.success || true,
        data: response.data.servidorFormacao,
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

  async createFormacao(matricula, formData) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      console.log('Criando formação:', matricula)

      const response = await api.post(`/formacao_servidor_store/${matricula}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Formação cadastrada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao criar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao cadastrar formação',
        errors: convertErrorKeys(error.response?.data?.errors),
        error: error.response?.data,
      }
    }
  }

  async updateFormacao(formData) {
    try {
      const id = formData.get('id')

      if (!id) {
        throw new Error('ID da formação é obrigatório')
      }

      console.log('Atualizando formação:', id)

      formData.append('_method', 'PUT')

      const response = await api.post(`/formacao_servidor_update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Formação atualizada com sucesso',
      }
    } catch (error) {
      console.error('Erro ao atualizar formação:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao atualizar formação',
        errors: convertErrorKeys(error.response?.data?.errors),
        error: error.response?.data,
      }
    }
  }

  async getClassesByArea(areaId) {
    try {
      if (!areaId) {
        throw new Error('ID da área é obrigatório')
      }

      console.log('Buscando classes da área:', areaId)
      const response = await api.get(`/formacao_classe_area/${areaId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao carregar classes:', error)
      throw error
    }
  }

  async getCursosByClasse(classeId) {
    try {
      if (!classeId) {
        throw new Error('ID da classe é obrigatório')
      }

      console.log('Buscando cursos da classe:', classeId)
      const response = await api.get(`/formacao_curso_classe/${classeId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao carregar cursos:', error)
      throw error
    }
  }

  async getAnexoFrenteUrl(id) {
    try {
      console.log('Buscando URL do anexo frente:', id)
      const response = await api.get(`/formacao_anexo_frente/${id}`)
      return {
        success: response.data.success || true,
        url: response.data.url,
      }
    } catch (error) {
      console.error('Erro ao buscar URL do anexo frente:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao buscar anexo',
      }
    }
  }

  async getAnexoVersoUrl(id) {
    try {
      console.log('Buscando URL do anexo verso:', id)
      const response = await api.get(`/formacao_anexo_verso/${id}`)
      return {
        success: response.data.success || true,
        url: response.data.url,
      }
    } catch (error) {
      console.error('Erro ao buscar URL do anexo verso:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao buscar anexo',
      }
    }
  }
}

export const formacaoService = new FormacaoService()
