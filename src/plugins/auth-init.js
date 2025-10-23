export default function authInitPlugin(app, options) {
  const { auth } = options

  // Aguardar para garantir que tudo foi inicializado
  setTimeout(() => {
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)

        //Restaurar token e user no Websanova
        auth.token(null, token, false)
        auth.user(user)
      } catch {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
  }, 0)
}
