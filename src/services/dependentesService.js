import api from './api'

export const dependentesService = {
  // Listar dependentes ativos
  async getDependentes() {
    const response = await api.get('/api/dependentes')
    return response.data
  },

  // Listar dependentes inativos
  async getDependentesInativos() {
    const response = await api.get('/api/dependentes/inativos')
    return response.data
  },

  // Dados para criação de dependente
  async getDadosCreate() {
    const response = await api.get('/api/dependentes/create')
    return response.data
  },

  // Criar novo dependente
  async createDependente(data) {
    const formData = new FormData()

    // Adicionar campos obrigatórios
    formData.append('nome', data.nome || '')
    formData.append('cpf', data.cpf || '')
    formData.append('sexo_dependente', data.sexo_dependente || '')
    formData.append('tipo_dependente', data.tipo_dependente || '')
    formData.append('data_nascimento', data.data_nascimento || '')

    // Adicionar arquivo se existir
    if (data.anexo && data.anexo instanceof File) {
      formData.append('anexo', data.anexo)
    }

    // Adicionar histórico vazio
    formData.append('historico', '')

    // Debug: mostrar conteúdo do FormData
    console.log('FormData sendo enviado:')
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value)
    }

    const response = await api.post('/api/dependentes', formData)
    return response.data
  },

  // Buscar dados de edição de dependente
  async getDependenteEdit(id) {
    const response = await api.get(`/api/dependentes/${id}/edit`)
    return response.data
  },

  // Atualizar dependente
  async updateDependente(data) {
    const formData = new FormData()

    // Adicionar ID
    formData.append('id', data.id)

    // Adicionar campos obrigatórios
    formData.append('nome', data.nome)
    formData.append('cpf', data.cpf)
    formData.append('sexo_dependente', data.sexo_dependente)
    formData.append('tipo_dependente', data.tipo_dependente)
    formData.append('data_nascimento', data.data_nascimento)

    // Adicionar arquivo se existir
    if (data.anexo && data.anexo instanceof File) {
      formData.append('anexo', data.anexo)
    }

    const response = await api.post('/api/dependentes/update', formData)
    return response.data
  },

  // Inativar dependente
  async inativarDependente(id) {
    const response = await api.post('/api/dependentes/inativar', {
      id_dependente: id
    })
    return response.data
  },

  // Reativar dependente
  async reativarDependente(id) {
    const response = await api.post('/api/dependentes/reativar', {
      id_dependente: id
    })
    return response.data
  },

  // Reativar dependente direto (via GET)
  async reativarDependenteDireto(id) {
    const response = await api.get(`/api/dependentes/reativar/${id}`)
    return response.data
  }
}
