import axios from 'axios'

export const recuperacaoSenhaService = {
  /**
   * Solicita recuperação de senha enviando email com nova senha
   * @param {string} matricula - Matrícula do servidor
   * @returns {Promise} Resposta da API
   */
  async recuperarSenha(matricula) {
    try {
      const response = await axios.post('/api/recuperar_senha', {
        matricula: matricula.trim(),
      })

      return {
        success: true,
        message: response.data.msg || 'Nova senha enviada para seu e-mail!',
        data: response.data,
      }
    } catch (error) {
      // Tratamento de erros
      if (error.response) {
        const status = error.response.status
        const errorData = error.response.data

        // Erros HTTP
        switch (status) {
          case 400:
            return {
              success: false,
              message: errorData.error || 'Dados inválidos fornecidos.',
            }
          case 404:
            return {
              success: false,
              message: 'Servidor não encontrado ou inativo.',
            }
          case 429:
            return {
              success: false,
              message: 'Muitas tentativas. Por favor, aguarde alguns minutos e tente novamente.',
            }
          case 500:
            return {
              success: false,
              message: 'Erro ao enviar e-mail. Tente novamente mais tarde.',
            }
          default:
            return {
              success: false,
              message: errorData.error || 'Erro ao processar solicitação.',
            }
        }
      }

      // Erro de rede
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
      }
    }
  },
}
