import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dependentesService } from '../services/dependentesService'
import { useAuthUser } from '@/composables/useAuthUser'

export const useDependentesStore = defineStore('dependentes', () => {
  const dependentes = ref([])
  const dependentesInativos = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Usar o composable direto
  const { userMatricula } = useAuthUser()

  // Pegar matrícula do Composable
  const getMatricula = () => {
    const matricula = userMatricula.value

    return matricula
  }

  const carregarDependentes = async () => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await dependentesService.getDependentes(matricula)

      dependentes.value = response.data || []

      return { success: true, data: dependentes.value }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dependentes'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const carregarDependentesInativos = async () => {
    loading.value = true
    error.value = null

    try {
      const matricula = getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await dependentesService.getDependentesInativos(matricula)

      dependentesInativos.value = response.data || []

      return { success: true, data: dependentesInativos.value }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dependentes inativos'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const criarDependente = async (dados) => {
    error.value = null

    try {
      // Garantir que a matrícula está presente
      if (!dados.servidor_matricula) {
        dados.servidor_matricula = getMatricula()
      }

      if (!dados.servidor_matricula) {
        throw new Error('Matrícula não encontrada')
      }

      const response = await dependentesService.createDependente(dados)

      return {
        success: true,
        message: response.message || 'Dependente cadastrado com sucesso!',
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao criar dependente'

      return {
        success: false,
        error: err,
        message: err.response?.data?.message || 'Erro ao criar dependente',
        errors: err.response?.data?.errors || {},
      }
    }
  }

  const atualizarDependente = async (formData) => {
    error.value = null

    try {
      // Verifica se a matrícula está presente no FormData
      const matricula = formData.get('servidor_matricula')

      if (!matricula) {
        const mat = getMatricula()
        if (mat) {
          formData.append('servidor_matricula', mat)
        } else {
          throw new Error('Matrícula não encontrada')
        }
      }

      const response = await dependentesService.updateDependente(formData)

      return {
        success: true,
        message: response.message || 'Dependente atualizado com sucesso!',
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao atualizar dependente'

      return {
        success: false,
        error: err,
        message: err.response?.data?.message || 'Erro ao atualizar dependente',
        errors: err.response?.data?.errors || {},
      }
    }
  }

  const inativarDependente = async (id, matricula = null) => {
    error.value = null

    try {
      if (!matricula) {
        matricula = getMatricula()
      }

      if (!matricula) {
        throw new Error('Matrícula não encontrada')
      }

      const response = await dependentesService.inativarDependente(id, matricula)

      // Recarrega a lista
      await carregarDependentes()

      return {
        success: true,
        message: response.message || 'Dependente inativado com sucesso!',
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao inativar dependente'

      return {
        success: false,
        message: error.value,
      }
    }
  }

  const reativarDependente = async (id, matricula = null) => {
    error.value = null

    try {
      if (!matricula) {
        matricula = getMatricula()
      }

      if (!matricula) {
        throw new Error('Matrícula não encontrada')
      }

      const response = await dependentesService.reativarDependente(id, matricula)

      // Recarrega ambas as listas
      await carregarDependentesInativos()
      await carregarDependentes()

      return {
        success: true,
        message: response.message || 'Dependente reativado com sucesso!',
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao reativar dependente'

      return {
        success: false,
        message: error.value,
      }
    }
  }

  const limparErros = () => {
    error.value = null
  }

  return {
    dependentes,
    dependentesInativos,
    loading,
    error,
    carregarDependentes,
    carregarDependentesInativos,
    criarDependente,
    atualizarDependente,
    inativarDependente,
    reativarDependente,
    limparErros,
    getMatricula,
  }
})
