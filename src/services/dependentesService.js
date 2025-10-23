import api from './api'

export const dependentesService = {
  // GET /servidor_dependentes_ativos/{matricula}
  async getDependentes(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }
      const response = await api.get(`/servidor_dependentes_ativos/${matricula}`)

      return {
        success: true,
        data: response.data || [],
        message: 'Dependentes carregados com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar dependentes:', error)
      throw error
    }
  },

  // GET /servidor_dependentes_inativos/{matricula}
  async getDependentesInativos(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }
      const response = await api.get(`/servidor_dependentes_inativos/${matricula}`)

      return {
        success: true,
        data: response.data || [],
        message: 'Dependentes inativos carregados',
      }
    } catch (error) {
      console.error('Erro ao buscar dependentes inativos:', error)
      throw error
    }
  },

  // POST /servidor_dependentes_store/{matricula}
  async createDependente(data) {
    try {
      if (!data.servidor_matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }

      if (!data.data_nascimento || data.data_nascimento.trim() === '') {
        throw new Error('Data de nascimento é obrigatória')
      }

      const formData = new FormData()
      formData.append('servidor_matricula', data.servidor_matricula)
      formData.append('matricula', data.servidor_matricula)
      formData.append('nome', data.nome || '')
      formData.append('cpf', data.cpf || '')
      formData.append('sexo_dependente', data.sexo_dependente || '')
      formData.append('tipo_dependente', data.tipo_dependente || '')
      formData.append('datanascimento', data.data_nascimento)
      formData.append('data_nascimento', data.data_nascimento)

      // IMPORTANTE: O backend processa o arquivo em 'anexo' mas salva o nome em 'documento'
      if (data.anexo && data.anexo instanceof File) {
        formData.append('anexo', data.anexo)
        formData.append('documento', data.anexo.name)
      }

      // Documentos adicionais opcionais
      if (data.doc_dependencia_financeira && data.doc_dependencia_financeira instanceof File) {
        formData.append('doc_dependencia_financeira', data.doc_dependencia_financeira)
      }

      if (data.doc_laudo_deficiencia && data.doc_laudo_deficiencia instanceof File) {
        formData.append('doc_laudo_deficiencia', data.doc_laudo_deficiencia)
      }

      if (data.doc_curso_superior && data.doc_curso_superior instanceof File) {
        formData.append('doc_curso_superior', data.doc_curso_superior)
      }

      const response = await api.post(
        `/servidor_dependentes_store/${data.servidor_matricula}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return {
        success: response.data.success || true,
        message: response.data.message || 'Dependente cadastrado com sucesso!',
        data: response.data,
      }
    } catch (error) {
      console.error('Erro ao criar dependente:', error)
      console.error('Response:', error.response?.data)
      throw error
    }
  },

  async updateDependente(formData) {
    try {
      const id = formData.get('id')

      if (!id) {
        throw new Error('ID do dependente é obrigatório')
      }

      const response = await api.post(`/servidor_dependentes_update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: response.data.success || true,
        message: response.data.message || 'Dependente atualizado com sucesso!',
        data: response.data,
      }
    } catch (error) {
      console.error('Erro ao atualizar dependente:', error)
      console.error('Response:', error.response?.data)
      throw error
    }
  },

  // POST /servidor_dependentes_inativar/{id}/{matricula}
  async inativarDependente(id, matricula) {
    try {
      if (!id || !matricula) {
        throw new Error('ID do dependente e matrícula são obrigatórios')
      }

      const response = await api.post(`/servidor_dependentes_inativar/${id}/${matricula}`)

      return {
        success: response.data.success || true,
        message: response.data.message || 'Dependente inativado com sucesso!',
        data: response.data,
      }
    } catch (error) {
      console.error('Erro ao inativar dependente:', error)
      throw error
    }
  },

  // POST /servidor_dependentes_reativar/{id}/{matricula}
  async reativarDependente(id, matricula) {
    try {
      if (!id || !matricula) {
        throw new Error('ID do dependente e matrícula são obrigatórios')
      }

      const response = await api.post(`/servidor_dependentes_reativar/${id}/${matricula}`)

      return {
        success: response.data.success || true,
        message: response.data.message || 'Dependente reativado com sucesso!',
        data: response.data,
      }
    } catch (error) {
      console.error('Erro ao reativar dependente:', error)
      throw error
    }
  },

  // Buscar URL do documento no MinIO
  // tipo de documento como parâmetro
  async getDocumentoUrl(idDependente, tipoDocumento = 'documento') {
    try {
      if (!idDependente) {
        throw new Error('ID do dependente é obrigatório')
      }

      const response = await api.get(
        `/servidor_dependentes_documento/${idDependente}?tipo=${tipoDocumento}`,
      )

      return {
        success: response.data.success || true,
        url: response.data.url,
      }
    } catch (error) {
      console.error('Erro ao buscar URL do documento:', error)
      throw error
    }
  },

  // Wrapper para chamadas de documentos adicionais
  async getDocumentoAdicionalUrl(idDependente, tipoDocumento) {
    return this.getDocumentoUrl(idDependente, tipoDocumento)
  },
}
