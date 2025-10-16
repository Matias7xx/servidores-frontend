import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formacaoService } from '../services/formacaoService'
import { useAuthStore } from './auth'

export const useFormacaoStore = defineStore('formacao', () => {
  const formacoes = ref([])
  const areas = ref([])
  const classes = ref([])
  const cursos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const authStore = useAuthStore()

  const carregarFormacoes = async () => {
    loading.value = true
    error.value = null

    try {
      const matricula = authStore.getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await formacaoService.getFormacoes(matricula)

      if (response.success) {
        formacoes.value = response.data
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar formações'
    } finally {
      loading.value = false
    }
  }

  const carregarAreas = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.getAreas()

      if (response.success) {
        areas.value = response.data
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar áreas'
    } finally {
      loading.value = false
    }
  }

  const carregarClasses = async (areaId) => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.getClassesByArea(areaId)
      classes.value = response
    } catch (err) {
      error.value = err.message || 'Erro ao carregar classes'
    } finally {
      loading.value = false
    }
  }

  const carregarCursos = async (classeId) => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.getCursosByClasse(classeId)
      cursos.value = response
    } catch (err) {
      error.value = err.message || 'Erro ao carregar cursos'
    } finally {
      loading.value = false
    }
  }

  const criarFormacao = async (formData) => {
    loading.value = true
    error.value = null

    try {
      const matricula = authStore.getMatricula()

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await formacaoService.createFormacao(matricula, formData)

      if (response.success) {
        await carregarFormacoes()
        return { success: true, message: response.message }
      } else {
        if (!response.errors) {
          error.value = response.message
        }
        return {
          success: false,
          message: response.message,
          errors: response.errors,
        }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao criar formação'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const atualizarFormacao = async (formData) => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.updateFormacao(formData)

      if (response.success) {
        await carregarFormacoes()
        return { success: true, message: response.message }
      } else {
        if (!response.errors) {
          error.value = response.message
        }
        return {
          success: false,
          message: response.message,
          errors: response.errors,
        }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar formação'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const inativarFormacao = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.inativarFormacao(id)

      if (response.success) {
        await carregarFormacoes()
        return { success: true, message: response.message }
      } else {
        error.value = response.message
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao inativar formação'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const obterFormacao = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await formacaoService.getFormacaoEdit(id)

      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Formação carregada com sucesso',
        }
      } else {
        error.value = response.message
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar formação'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const getCertificadoUrl = async (formacaoId, tipo) => {
    try {
      const response =
        tipo === 'frente'
          ? await formacaoService.getAnexoFrenteUrl(formacaoId)
          : await formacaoService.getAnexoVersoUrl(formacaoId)

      return {
        success: response.success || true,
        url: response.url,
      }
    } catch (error) {
      console.error('Erro ao buscar URL do certificado:', error)

      return {
        success: false,
        message: error.message || 'Erro ao buscar certificado',
      }
    }
  }

  // Função para limpar caches quando necessário
  const limparCaches = () => {
    classes.value = []
    cursos.value = []
  }

  const limparErros = () => {
    error.value = null
  }

  return {
    // Estado
    formacoes,
    areas,
    classes,
    cursos,
    loading,
    error,

    // Ações
    carregarFormacoes,
    carregarAreas,
    carregarClasses,
    carregarCursos,
    criarFormacao,
    atualizarFormacao,
    inativarFormacao,
    obterFormacao,
    limparCaches,
    limparErros,
    getCertificadoUrl,
  }
})
