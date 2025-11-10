import { defineStore } from 'pinia'
import { ref } from 'vue'
import { servidorService } from '../services/servidorService'
import { useAuthUser } from '@/composables/useAuthUser'

export const useServidorStore = defineStore('servidor', () => {
  const servidor = ref(null)
  const cidades = ref([])
  const estados = ref([])
  const servidorConfig = ref([])
  const loading = ref(false)
  const error = ref(null)

  const { userMatricula } = useAuthUser()

  // Pegar matrícula do Composable
  const getMatricula = () => {
    const matricula = userMatricula.value

    return matricula
  }

  // Carregar dados do servidor
  const carregarServidor = async (matricula = null) => {
    loading.value = true
    error.value = null

    try {
      // Se não passou matrícula, pega do auth
      if (!matricula) {
        matricula = getMatricula()
      }

      if (!matricula) {
        throw new Error('Matrícula não encontrada. Faça login novamente.')
      }

      const response = await servidorService.getServidor(matricula)

      if (response.success) {
        // Atribui os dados do servidor
        servidor.value = response.data.servidor

        // ATRIBUI estados/cidades SE VIERAM DA API
        // Se não vieram, mantém os que já foram carregados
        if (response.data.estados && response.data.estados.length > 0) {
          estados.value = response.data.estados
        }

        if (response.data.cidades && response.data.cidades.length > 0) {
          cidades.value = response.data.cidades
        }

        servidorConfig.value = response.data.servidor_config || []

        return {
          success: true,
          data: servidor.value,
          message: 'Dados carregados com sucesso',
        }
      } else {
        error.value = response.message
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar dados'
      return {
        success: false,
        message: err.message || 'Erro ao carregar dados',
      }
    } finally {
      loading.value = false
    }
  }

  const carregarEstados = async () => {
    try {
      const response = await servidorService.getEstados()

      if (response.success) {
        estados.value = response.data
        return { success: true }
      } else {
        error.value = response.message
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar estados'
      return { success: false, message: err.message }
    }
  }

  const carregarCidadesPorEstado = async (codigoEstado) => {
    try {
      const response = await servidorService.getCidadesPorEstado(codigoEstado)

      if (response.success) {
        cidades.value = response.data
        return { success: true }
      } else {
        error.value = response.message
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar cidades'
      return { success: false, message: err.message }
    }
  }

  const atualizarServidor = async (dados) => {
    error.value = null

    try {
      // Adiciona o ID do servidor aos dados
      const dadosCompletos = {
        ...dados,
        id: servidor.value?.id,
      }

      const response = await servidorService.updateServidor(dadosCompletos)

      if (response.success) {
        // Recarrega os dados após atualização
        await carregarServidor(dados.matricula)

        return {
          success: true,
          message: response.message || 'Dados atualizados com sucesso',
        }
      } else {
        error.value = response.message
        return {
          success: false,
          message: response.message,
          errors: response.errors,
        }
      }
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar servidor'
      return {
        success: false,
        message: err.response?.data?.message || 'Erro ao atualizar servidor',
        errors: err.response?.data?.errors || {},
      }
    }
  }

  const limparErros = () => {
    error.value = null
  }

  const limparDados = () => {
    servidor.value = null
    cidades.value = []
    estados.value = []
    servidorConfig.value = []
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
    carregarEstados,
    carregarCidadesPorEstado,
    atualizarServidor,
    limparErros,
    limparDados,
    getMatricula,
  }
})
