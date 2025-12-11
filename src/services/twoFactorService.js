import api from './api'

class TwoFactorService {
  /**
   * Verifica se o servidor tem 2FA configurado
   * @param {string} matricula
   */
  async checkStatus(matricula) {
    try {
      const response = await api.get(`/2fa/status/${matricula}`)
      return {
        success: true,
        hasToken: response.data.has_token,
        data: response.data,
      }
    } catch (error) {
      console.error('Erro ao verificar status 2FA:', error)
      return {
        success: false,
        hasToken: false,
        message: error.response?.data?.message || 'Erro ao verificar 2FA',
      }
    }
  }

  /**
   * Obtém o QR Code para configuração do 2FA
   * @param {string} matricula
   */
  async getQRCode(matricula) {
    try {
      const response = await api.get(`/2fa/qrcode/${matricula}`)
      return {
        success: true,
        secret: response.data.secret,
        qrSrc: response.data.qr_src,
        otpAuth: response.data.otp_auth,
        hasToken: response.data.has_token,
      }
    } catch (error) {
      console.error('Erro ao obter QR Code:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao gerar QR Code',
      }
    }
  }

  /**
   * Verifica e salva o código 2FA
   * @param {string} matricula
   * @param {string} secret
   * @param {string} token
   */
  async verifyAndSave(matricula, secret, token) {
    try {
      const response = await api.post('/2fa/verify-save', {
        matricula,
        secret,
        token,
      })
      return {
        success: true,
        message: response.data.message || '2FA ativado com sucesso',
      }
    } catch (error) {
      console.error('Erro ao verificar código 2FA:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Código inválido',
      }
    }
  }
}

export const twoFactorService = new TwoFactorService()
