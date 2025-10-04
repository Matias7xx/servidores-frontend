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

    console.log('🔍 Service recebeu:', data)

    if (!data.matricula) {
      console.error('❌ ERRO: Matrícula não foi passada para o service!')
      throw new Error('Matrícula do servidor é obrigatória')
    }

    // Campos obrigatórios
    formData.append('matricula', data.matricula)
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
    formData.append('documento', '')
    formData.append('historico', '')
    formData.append('status', 'A')

    console.log('FormData sendo enviado (CREATE):')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `[File: ${value.name}]` : value)
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

    // ID do dependente
    formData.append('id', data.id)

    // Matrícula do servidor
    if (data.matricula) formData.append('matricula', data.matricula)

    // Campos obrigatórios
    if (data.nome) formData.append('nome', data.nome)
    if (data.cpf) formData.append('cpf', data.cpf)
    if (data.sexo_dependente) formData.append('sexo_dependente', data.sexo_dependente)
    if (data.tipo_dependente) formData.append('tipo_dependente', data.tipo_dependente)
    if (data.data_nascimento) formData.append('data_nascimento', data.data_nascimento)

    // Adicionar arquivo se existir
    if (data.anexo && data.anexo instanceof File) {
      formData.append('documento', data.anexo)
    }

    console.log('FormData sendo enviado (UPDATE):')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `[File: ${value.name}]` : value)
    }

    const response = await api.post('/api/dependentes/update', formData)
    return response.data
  },

  // Inativar dependente
  async inativarDependente(id, matricula) {
    const response = await api.post('/api/dependentes/inativar', {
      id_dependente: id,
      matricula_servidor: matricula,
    })
    return response.data
  },

  // Reativar dependente
  async reativarDependente(id, matricula) {
    const response = await api.post('/api/dependentes/reativar', {
      id_dependente: id,
      matricula_servidor: matricula,
    })
    return response.data
  },

  // Reativar dependente direto (via GET)
  async reativarDependenteDireto(id) {
    const response = await api.get(`/api/dependentes/reativar/${id}`)
    return response.data
  },
}
