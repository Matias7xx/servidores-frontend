import { defineStore } from 'pinia'
import { ref } from 'vue'
import { servidorService } from '../services/servidorService'

export const useServidorStore = defineStore('servidor', () => {
  const servidor = ref(null)
  const cidades = ref([])
  const estados = ref([])
  const servidorConfig = ref([])
  const loading = ref(false)
  const error = ref(null)

  const carregarServidor = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await servidorService.getServidorEdit()
      if (response.success) {
        servidor.value = response.data.servidor
        cidades.value = response.data.cidades || []
        estados.value = response.data.estados || []
        servidorConfig.value = response.data.servidor_config || []
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar servidor'
      console.error('Erro ao carregar servidor:', err)
    } finally {
      loading.value = false
    }
  }

  const atualizarServidor = async (dados) => {
    loading.value = true
    error.value = null

    try {
      const response = await servidorService.updateServidor(dados)
      if (response.success) {
        servidor.value = response.data.servidor
        return { success: true, message: response.message }
      } else {
        error.value = response.message
        return { success: false, message: response.message, errors: response.errors }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar servidor'
      return {
        success: false,
        message: err.response?.data?.message || 'Erro ao atualizar servidor',
        errors: err.response?.data?.errors || {},
      }
    } finally {
      loading.value = false
    }
  }

  const limparErros = () => {
    error.value = null
  }

  return {
    servidor,
    cidades,
    estados,
    servidorConfig,
    loading,
    error,
    carregarServidor,
    atualizarServidor,
    limparErros,
  }
})
