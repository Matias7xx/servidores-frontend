// src/stores/servidor.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { servidorService } from '../services/servidorService'

export const useServidorStore = defineStore('servidor', () => {
  const servidor = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const carregarServidor = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await servidorService.getServidorEdit()
      if (response.success) {
        servidor.value = response.data.servidor
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar servidor'
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
        return true
      } else {
        error.value = response.message
        return false
      }
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar servidor'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    servidor,
    loading,
    error,
    carregarServidor,
    atualizarServidor
  }
})
