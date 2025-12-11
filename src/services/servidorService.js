import api from './api'

// Converte null em string vazia
const sanitizeNullValues = (obj) => {
  if (obj === null || obj === undefined) return ''

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeNullValues(item))
  }

  if (typeof obj === 'object') {
    const sanitized = {}
    for (const key in obj) {
      sanitized[key] = sanitizeNullValues(obj[key])
    }
    return sanitized
  }

  return obj
}

export const servidorService = {
  // Buscar dados do servidor
  async getServidor(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula é obrigatória')
      }

      const response = await api.get(`/info_pessoal/${matricula}`)

      const apiData = response.data

      // SANITIZA os dados antes de retornar
      const servidorSanitizado = sanitizeNullValues(apiData.servidor)

      return {
        success: true,
        data: {
          servidor: servidorSanitizado,
          estados: apiData.estados || [],
          cidades: apiData.cidades || [],
          servidor_config: apiData.servidor_config || [],
        },
        message: 'Dados carregados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar dados',
        error: error.response?.data,
      }
    }
  },

  async getEstados() {
    try {
      const response = await api.get('/estados')
      return {
        success: true,
        data: response.data,
        message: 'Estados carregados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar estados',
        error: error.response?.data,
      }
    }
  },

  async getCidadesPorEstado(codigoEstado) {
    try {
      const response = await api.get(`/cidades/${codigoEstado}`)
      return {
        success: true,
        data: response.data,
        message: 'Cidades carregadas com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar cidades',
        error: error.response?.data,
      }
    }
  },

  async updateServidor(data) {
    try {
      const { ...dadosEditaveis } = data

      const payload = {
        id: data.id || null,
        matricula: data.matricula,
        ...dadosEditaveis,
      }

      const response = await api.put('/servidor/editar', payload)

      return {
        success: true,
        data: response.data,
        message: 'Dados atualizados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao atualizar dados',
        errors: error.response?.data?.errors,
      }
    }
  },

  async checkSenhaAssinatura(matricula, senha) {
    try {
      const response = await api.post('/servidor/check-senha-assinatura', {
        matricula: matricula,
        senha_assinatura: senha,
      })
      return {
        success: true,
        data: response.data,
        message: 'Senha verificada',
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Senha inválida',
      }
    }
  },

  async alterarSenhaAcesso(data) {
    try {
      const response = await api.post('/servidor/senha-acesso', data)

      if (response.data.ok) {
        return {
          success: true,
          message: response.data.msg || 'Senha de acesso alterada com sucesso',
        }
      } else {
        return {
          success: false,
          message: response.data.msg || 'Erro ao alterar senha de acesso',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || 'Erro ao alterar senha de acesso',
      }
    }
  },

  async alterarSenhaAssinatura(data) {
    try {
      const response = await api.post('/servidor/senha-assinatura', data)

      if (response.data.ok) {
        return {
          success: true,
          message: response.data.msg || 'Senha de assinatura alterada com sucesso',
        }
      } else {
        return {
          success: false,
          message: response.data.msg || 'Erro ao alterar senha de assinatura',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || 'Erro ao alterar senha de assinatura',
      }
    }
  },
}
