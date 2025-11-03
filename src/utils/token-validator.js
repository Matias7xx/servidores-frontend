/**
 * Utilitário para validação de tokens JWT
 */

/**
 * Valida se um token JWT está expirado
 * @param {string} token - Token JWT para validar
 * @returns {boolean} - true se o token é válido
 */
export function validateToken(token) {
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expTimestamp = payload.exp * 1000 // exp vem em segundos, converter para ms
    return expTimestamp > Date.now()
  } catch {
    return false
  }
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
