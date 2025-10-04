import api from './api'

export const servidorService = {
  // Dados para a (home)
  async getHome() {
    const response = await api.get('/')
    return response.data
  },

  // Dados para edição de informações pessoais
  async getServidorEdit() {
    const response = await api.get('/api/info_pessoal')
    return response.data
  },

  // Atualizar informações pessoais
  async updateServidor(data) {
    const response = await api.post('/api/info_pessoal_update', data)
    return response.data
  },
}
