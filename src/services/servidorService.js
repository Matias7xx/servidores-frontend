import api from './api'

export const servidorService = {
  // Buscar dados do servidor
  async getServidor(matricula) {
    try {
      if (!matricula) {
        throw new Error('Matrícula é obrigatória')
      }

      console.log('Buscando dados do servidor:', matricula)
      const response = await api.get(`/info_pessoal/${matricula}`)

      const apiData = response.data

      return {
        success: true,
        data: {
          servidor: apiData.servidor,
          estados: apiData.estados || [],
          cidades: apiData.cidades || [],
          servidor_config: apiData.servidor_config || [],
        },
        message: 'Dados carregados com sucesso',
      }
    } catch (error) {
      console.error('Erro ao buscar servidor:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao carregar dados',
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

      console.log('Enviando dados para atualização:', payload)

      const response = await api.put('/servidor/editar', payload)

      return {
        success: true,
        data: response.data,
        message: 'Dados atualizados com sucesso',
      }
    } catch (error) {
      console.error('Erro ao atualizar servidor:', error)
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
      console.error('Erro ao verificar senha:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Senha inválida',
      }
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/login', credentials)

      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }

      return {
        success: true,
        data: response.data,
        token: response.data.token,
        message: 'Login realizado com sucesso',
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      }
    }
  },

  async logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    return {
      success: true,
      message: 'Logout realizado',
    }
  },
}
