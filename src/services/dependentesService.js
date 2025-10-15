import api from './api'

export const dependentesService = {
  // GET /servidor_dependentes_ativos/{matricula}
  async getDependentes(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula do servidor é obrigatória')
      }
      console.log('Buscando dependentes ativos:', matricula)
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
      console.log('Buscando dependentes inativos:', matricula)
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
        console.log('Anexo detectado:', data.anexo.name)
        formData.append('anexo', data.anexo)

        // SOLUÇÃO: Criar um nome fictício para o campo documento
        // O backend vai sobrescrever isso com o nome gerado, mas precisa existir
        formData.append('documento', data.anexo.name)
      }

      console.log('FormData completo:')
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`   ${key}: [FILE] ${value.name}`)
        } else {
          console.log(`   ${key}:`, value)
        }
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

      console.log('Response do backend:', response.data)

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
      // Pega o ID do FormData
      const id = formData.get('id')

      if (!id) {
        throw new Error('ID do dependente é obrigatório')
      }

      console.log('Atualizando dependente ID:', id)

      // Log do FormData para debug
      console.log('FormData sendo enviado:')
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`   ${key}: [FILE] ${value.name} (${value.size} bytes)`)
        } else {
          console.log(`   ${key}:`, value)
        }
      }

      const response = await api.post(`/servidor_dependentes_update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Response do backend:', response.data)

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

      console.log('Inativando dependente:', { id, matricula })

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

      console.log('Reativando dependente:', { id, matricula })

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
  async getDocumentoUrl(idDependente) {
    try {
      if (!idDependente) {
        throw new Error('ID do dependente é obrigatório')
      }

      console.log('Buscando URL do documento para dependente:', idDependente)

      const response = await api.get(`/servidor_dependentes_documento/${idDependente}`)

      return {
        success: response.data.success || true,
        url: response.data.url,
      }
    } catch (error) {
      console.error('Erro ao buscar URL do documento:', error)
      throw error
    }
  },
}
