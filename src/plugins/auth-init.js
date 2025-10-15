export default {
  install: (app, options) => {
    const { auth } = options

    console.log('[auth-init] Inicializando...')

    // Restaurar sessão do localStorage
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')

    console.log('Token:', token ? 'Presente' : 'Ausente')
    console.log('User:', userStr ? 'Presente' : 'Ausente')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)

        // Restaurar no Websanova**
        auth.token(null, token, false) // false = não fazer requisição
        auth.user(user)

        console.log('Sessão restaurada!')
        console.log('  - auth.check():', auth.check())
        console.log('  - User:', user.nome)
      } catch (e) {
        console.error('Erro ao restaurar:', e)
        localStorage.clear()
      }
    } else {
      console.log('Nenhuma sessão para restaurar')
    }
  },
}
