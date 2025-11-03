import { validateToken, clearAuth } from '../utils/token-validator'

/* Plugin de inicialização do auth
 Restaura a sessão do usuário se houver token válido no localStorage */

export default function authInitPlugin(app, options) {
  const { auth } = options

  const token = localStorage.getItem('auth_token')
  const userStr = localStorage.getItem('auth_user')

  // Se não tem token ou user, limpar tudo
  if (!token || !userStr) {
    clearAuth(auth)
    return
  }

  // Validar token
  if (!validateToken(token)) {
    clearAuth(auth)
    return
  }

  // Token válido, restaurar sessão no websanova
  try {
    const user = JSON.parse(userStr)
    auth.token(null, token, false)
    auth.user(user)
  } catch {
    // Erro ao parsear user, limpar tudo
    clearAuth(auth)
  }
}
