import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dependentesService } from '../services/dependentesService'

export const useDependentesStore = defineStore('dependentes', () => {
  const dependentes = ref([])
  const dependentesInativos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const carregarDependentes = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.getDependentes()
      if (response.success) {
        dependentes.value = response.data
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dependentes'
    } finally {
      loading.value = false
    }
  }

  const carregarDependentesInativos = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.getDependentesInativos()
      if (response.success) {
        dependentesInativos.value = response.data
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dependentes inativos'
    } finally {
      loading.value = false
    }
  }

  const criarDependente = async (dados) => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.createDependente(dados)
      if (response.success) {
        await carregarDependentes() // Recarregar lista
        return true
      } else {
        error.value = response.message
        return false
      }
    } catch (err) {
      error.value = err.message || 'Erro ao criar dependente'
      return false
    } finally {
      loading.value = false
    }
  }

  const atualizarDependente = async (dados) => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.updateDependente(dados)
      if (response.success) {
        await carregarDependentes() // Recarregar lista
        return true
      } else {
        error.value = response.message
        return false
      }
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar dependente'
      return false
    } finally {
      loading.value = false
    }
  }

  const inativarDependente = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.inativarDependente(id)
      if (response.success) {
        await carregarDependentes() // Recarregar lista
        return true
      } else {
        error.value = response.message
        return false
      }
    } catch (err) {
      error.value = err.message || 'Erro ao inativar dependente'
      return false
    } finally {
      loading.value = false
    }
  }

  const reativarDependente = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await dependentesService.reativarDependente(id)
      if (response.success) {
        await carregarDependentesInativos() // Recarregar lista de inativos
        await carregarDependentes() // Recarregar lista de ativos
        return true
      } else {
        error.value = response.message
        return false
      }
    } catch (err) {
      error.value = err.message || 'Erro ao reativar dependente'
      return false
    } finally {
      loading.value = false
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
    limparErros
  }
})
