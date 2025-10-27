<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-4 sm:pt-0 px-4 sm:px-6 bg-linear-to-b from-neutral-50 to-neutral-100"
  >
    <!-- Logo e título -->
    <div class="relative z-10 mb-6 sm:mb-8 flex flex-col items-center">
      <img
        src="/img/logo-pc.png"
        alt="Logo PCPB"
        class="w-32 sm:w-40 lg:w-40 h-auto drop-shadow-lg shrink-0"
      />

      <div class="mt-3 text-center">
        <h1 class="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800">Ficha Funcional</h1>
        <div class="mt-1 text-sm text-gray-600">Diretoria de Recursos Humanos</div>
      </div>
    </div>

    <!-- Card de Login -->
    <div
      class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-neutral-200"
    >
      <!-- Mensagens de erro gerais -->
      <div v-if="errors.general" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
        <div class="flex items-start">
          <svg
            class="w-5 h-5 text-red-500 mr-2 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div class="text-sm text-red-600">
            {{ errors.general }}
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        <!-- Matrícula -->
        <div class="relative">
          <label for="matricula" class="block text-sm font-medium text-neutral-700 mb-2">
            Matrícula
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <input
              id="matricula"
              ref="matriculaInput"
              v-model="form.matricula"
              type="text"
              inputmode="numeric"
              :class="[
                'h-11 pl-10 pr-4 block w-full border rounded-md shadow-sm transition-colors duration-200 py-2 sm:py-3 text-sm sm:text-base',
                errors.matricula
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                  : 'border-neutral-300',
              ]"
              required
              autofocus
              placeholder="Informe sua Matrícula"
              maxlength="7"
              :disabled="loading"
              @input="handleMatriculaInput"
            />
          </div>
          <div v-if="errors.matricula" class="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
            {{ errors.matricula }}
          </div>
        </div>

        <!-- Senha -->
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
            Senha
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              id="password"
              ref="passwordInput"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :class="[
                'h-11 pl-10 pr-4 block w-full border rounded-md shadow-sm transition-colors duration-200 py-2 sm:py-3 text-sm sm:text-base',
                errors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                  : 'border-neutral-300',
              ]"
              required
              placeholder="••••••••"
              :disabled="loading"
              autocomplete="current-password"
              @input="clearFieldError('password')"
              @keydown="checkCapsLock"
              @keyup="checkCapsLock"
              @focus="checkCapsLock"
              @blur="capsLockOn = false"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors"
              tabindex="-1"
            >
              <svg
                v-if="showPassword"
                class="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                class="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          <!-- Aviso de Caps Lock -->
          <div
            v-if="capsLockOn"
            class="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-200"
          >
            <svg
              class="w-4 h-4 mr-2 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>Caps Lock está ativo</span>
          </div>

          <div v-if="errors.password" class="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
            {{ errors.password }}
          </div>
        </div>

        <!-- Lembrar-me -->
        <div class="flex items-center">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="rounded border-neutral-300 h-4 w-4 text-[#c1a85a]"
          />
          <label for="remember" class="ml-2 text-sm text-neutral-600">Lembrar-me</label>
        </div>

        <!-- Botão de Login -->
        <div class="flex flex-col space-y-3 sm:space-y-4">
          <button
            type="submit"
            :class="[
              'w-full flex items-center justify-center space-x-2 px-6 py-2 sm:py-3 bg-[#c1a85a] text-white font-medium rounded-md focus:outline-none transition-all duration-200 text-sm sm:text-base',
              loading
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:bg-[#a8924e] hover:shadow-lg transform hover:-translate-y-0.5',
            ]"
            :disabled="loading"
          >
            <svg
              v-if="loading"
              class="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ loading ? 'ENTRANDO...' : 'ENTRAR' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Rodapé -->
    <div class="mt-4 sm:mt-8 text-center px-4">
      <div class="text-xs sm:text-sm text-neutral-600">
        © {{ currentYear }} Polícia Civil da Paraíba - Todos os direitos reservados
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@websanova/vue-auth'
import api from '../services/api'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

//Estado reativo
const form = reactive({
  matricula: '',
  password: '',
  remember: false,
})

const errors = ref({})
const status = ref('')
const showPassword = ref(false)
const capsLockOn = ref(false)
const loading = ref(false)
const currentYear = new Date().getFullYear()

//Refs dos elementos
const matriculaInput = ref(null)
const passwordInput = ref(null)

//Tradutor de mensagens do backend
const translateErrorMessage = (message) => {
  const translations = {
    'The senha field is required.': 'O campo senha é obrigatório.',
    'The password field is required.': 'O campo senha é obrigatório.',
    'The matricula field is required.': 'O campo matrícula é obrigatório.',
    'The senha must be at least 6 characters.': 'A senha deve ter pelo menos 6 caracteres.',
    'The password must be at least 6 characters.': 'A senha deve ter pelo menos 6 caracteres.',
    'The matricula must be 7 digits.': 'A matrícula deve ter 7 dígitos.',
    'These credentials do not match our records.': 'Matrícula ou senha incorretos.',
    'Invalid credentials.': 'Matrícula ou senha incorretos.',
    Unauthorized: 'Matrícula ou senha incorretos.',
    'Unauthenticated.': 'Matrícula ou senha incorretos.',
    'Too many login attempts.': 'Muitas tentativas de login. Tente novamente em alguns minutos.',
    'The given data was invalid.': 'Dados inválidos. Verifique e tente novamente.',
  }

  if (translations[message]) {
    return translations[message]
  }

  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes('required') && lowerMessage.includes('senha')) {
    return 'O campo senha é obrigatório.'
  }
  if (lowerMessage.includes('required') && lowerMessage.includes('matricula')) {
    return 'O campo matrícula é obrigatório.'
  }
  if (lowerMessage.includes('credentials') || lowerMessage.includes('unauthorized')) {
    return 'Matrícula ou senha incorretos.'
  }
  if (lowerMessage.includes('too many')) {
    return 'Muitas tentativas de login. Aguarde alguns minutos.'
  }

  return message
}

// Métodos
const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
  if (errors.value.general) {
    delete errors.value.general
  }
}

const handleMatriculaInput = (event) => {
  const value = event.target.value.replace(/\D/g, '').slice(0, 7)
  form.matricula = value
  clearFieldError('matricula')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const checkCapsLock = (event) => {
  if (event.getModifierState) {
    capsLockOn.value = event.getModifierState('CapsLock')
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!form.matricula || form.matricula.length !== 7) {
    newErrors.matricula = 'A matrícula deve ter exatamente 7 dígitos'
  }

  if (!form.password || form.password.length < 6) {
    newErrors.password = 'A senha deve ter pelo menos 6 caracteres'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  status.value = ''
  errors.value = {}
  loading.value = true

  try {
    const formData = new FormData()
    formData.append('matricula', form.matricula.trim())
    formData.append('senha', form.password)
    formData.append('remember', form.remember ? '1' : '0')

    const response = await api.post('login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // Extrair token e user
    const token = response.data?.access_token || response.data?.token
    const user = response.data?.user

    if (!token) {
      throw new Error('Token não encontrado na resposta')
    }

    if (!user) {
      throw new Error('User não encontrado na resposta')
    }

    // Salvar no localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))

    // Configurar no Websanova
    auth.token(null, token, false)
    auth.user(user)

    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Redirecionar
    const redirectTo = route.query.redirect || '/'

    await router.push(redirectTo)
  } catch (err) {
    // Erro 401 - Credenciais inválidas
    if (err.response?.status === 401) {
      errors.value = {
        general: 'Matrícula ou senha incorretos.',
      }
    }
    // Erro 422 - Validação
    else if (err.response?.status === 422) {
      const apiErrors = err.response.data?.errors

      if (apiErrors) {
        if (apiErrors.senha || apiErrors.password) {
          const senhaError = apiErrors.senha || apiErrors.password
          const errorMsg = Array.isArray(senhaError) ? senhaError[0] : senhaError
          errors.value.password = translateErrorMessage(errorMsg)
        }

        if (apiErrors.matricula) {
          const matriculaError = Array.isArray(apiErrors.matricula)
            ? apiErrors.matricula[0]
            : apiErrors.matricula
          errors.value.matricula = translateErrorMessage(matriculaError)
        }

        // Se não capturou erros específicos
        if (!errors.value.password && !errors.value.matricula) {
          errors.value.general = 'Dados inválidos. Verifique e tente novamente.'
        }
      } else {
        errors.value.general = 'Dados inválidos. Verifique e tente novamente.'
      }
    }
    // Erro de rede ou outros
    else {
      // Se for erro de rede (sem response)
      if (!err.response) {
        errors.value = {
          general: 'Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.',
        }
      } else {
        // Outros erros HTTP
        const errorMsg = err.response?.data?.message || err.message
        errors.value = {
          general: translateErrorMessage(errorMsg) || 'Erro ao processar sua solicitação.',
        }
      }
    }

    // Limpar a senha e focar no campo
    form.password = ''
    await nextTick()
    if (passwordInput.value) {
      passwordInput.value.focus()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (matriculaInput.value) {
    matriculaInput.value.focus()
  }
})
</script>

<style scoped>
button,
a {
  transition: all 0.2s ease-in-out;
}

@media (max-width: 480px) {
  .max-w-sm {
    max-width: 95%;
  }
}

@media (prefers-reduced-motion: reduce) {
  button,
  a {
    transition-duration: 0.01ms !important;
  }
}
</style>
