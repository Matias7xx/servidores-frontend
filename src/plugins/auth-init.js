export default function authInitPlugin(app, options) {
  const { auth } = options

  // Aguardar para garantir que tudo foi inicializado
  setTimeout(() => {
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')

    if (token && userStr) {
      try {
        // Decodificar o JWT para verificar expiração
        const payload = JSON.parse(atob(token.split('.')[1]))
        const expTimestamp = payload.exp * 1000 // exp vem em segundos, converter para ms
        const now = Date.now()

        // Se o token expirou, limpar tudo e não restaurar a sessão
        if (expTimestamp < now) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')

          // Limpar também o websanova
          auth.token(null, null, false)
          auth.user(null)

          return
        }

        // Token ainda válido, restaurar sessão
        const user = JSON.parse(userStr)
        auth.token(null, token, false)
        auth.user(user)
      } catch {
        //Erro ao validar token
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')

        // Limpar também o websanova
        auth.token(null, null, false)
        auth.user(null)
      }
    }
  }, 0)
}
