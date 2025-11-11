/**
 * Utilitário para validação de tokens JWT
 */

/**
 * Decodifica o payload de um JWT de forma segura
 * @param {string} token - Token JWT
 * @returns {Object|null} - Payload decodificado ou null em erro
 */
export function decodeJWTPayloadSafely(token) {
  try {
    let payload = token.split('.')[1]
    if (!payload) return null

    // Corrige URL-safe Base64 pois alguns usuários não estavam conseguindo logar porque o JWT estava corrompendo
    payload = payload.replace(/-/g, '+').replace(/_/g, '/')

    // Adiciona padding se necessário
    const padding = payload.length % 4
    if (padding) {
      payload += '='.repeat(4 - padding)
    }

    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch (e) {
    console.warn('Erro ao decodificar JWT:', e.message)
    return null
  }
}

/**
 * Valida se um token JWT está expirado
 * @param {string} token - Token JWT para validar
 * @returns {boolean} - true se o token é válido
 */
export function validateToken(token) {
  if (!token) return false

  const payload = decodeJWTPayloadSafely(token)
  if (!payload || !payload.exp) return false

  const expTimestamp = payload.exp * 1000
  return expTimestamp > Date.now()
}

/**
 * Limpa todos os dados de autenticação (localStorage e websanova)
 * @param {Object} auth
 */
export function clearAuth(auth = null) {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')

  if (auth) {
    auth.token(null, null, false)
    auth.user(null)
  }
}

/**
 * Obtém o token válido do websanova ou localStorage
 * @param {Object} auth - Instância do websanova
 * @returns {string|null} - Token válido ou null
 */
export function getValidToken(auth = null) {
  let token = null

  // Tentar pegar do websanova primeiro
  if (auth && typeof auth.token === 'function') {
    try {
      token = auth.token()
    } catch {
      // Ignorar erro se auth não estiver disponível
    }
  }

  // Fallback para localStorage
  if (!token) {
    token = localStorage.getItem('auth_token')
  }

  // Validar e retornar
  return validateToken(token) ? token : null
}
