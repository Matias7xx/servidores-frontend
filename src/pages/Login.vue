<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-4 sm:pt-0 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-200">

    <!-- Logo e título -->
    <div class="relative z-10 mb-6 sm:mb-8 flex flex-col items-center">
      <img
        src="/img/logo-pc.png"
        alt="Logo PCPB"
        class="w-24 sm:w-32 lg:w-40 h-auto drop-shadow-lg flex-shrink-0"
      />

      <div class="mt-2 sm:mt-3 text-center">
        <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Recursos Humanos | Servidor</h1>
        <p class="text-sm text-gray-600">Polícia Civil da Paraíba</p>
      </div>
    </div>

    <!-- Card de Login -->
    <div class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-gray-200">

      <!-- Mensagens de erro gerais -->
      <div v-if="errors.general || authStore.error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
        <div class="text-sm text-red-600">
          {{ errors.general?.[0] || authStore.error }}
        </div>
      </div>

      <!-- Mensagem de status -->
      <div v-if="status" class="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 rounded-lg text-green-700 text-sm">
        {{ status }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        <!-- Matrícula -->
        <div class="relative">
          <label for="matricula" class="block text-sm font-medium text-gray-700 mb-2">
            Matrícula
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <input
              id="matricula"
              ref="matriculaInput"
              v-model="form.matricula"
              type="text"
              :class="[
                'pl-10 pr-4 block w-full border rounded-md shadow-sm transition-colors duration-200 py-2 sm:py-3 text-sm sm:text-base',
                errors.matricula
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-[#c1a85a] focus:ring-[#c1a85a]'
              ]"
              required
              autofocus
              placeholder="Informe sua Matrícula"
              maxlength="7"
              minlength="7"
              :disabled="authStore.loading"
              @input="clearFieldError('matricula')"
            />
          </div>
          <div v-if="errors.matricula" class="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
            {{ Array.isArray(errors.matricula) ? errors.matricula[0] : errors.matricula }}
          </div>
        </div>

        <!-- Senha -->
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              ref="passwordInput"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :class="[
                'pl-10 pr-10 block w-full border rounded-md shadow-sm transition-colors duration-200 py-2 sm:py-3 text-sm sm:text-base',
                errors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-[#c1a85a] focus:ring-[#c1a85a]'
              ]"
              required
              placeholder="••••••••"
              :disabled="authStore.loading"
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
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg v-if="showPassword" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <!-- Aviso de Caps Lock -->
          <div v-if="capsLockOn" class="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-200">
            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Caps Lock está ativo</span>
          </div>

          <div v-if="errors.password" class="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
            {{ Array.isArray(errors.password) ? errors.password[0] : errors.password }}
          </div>
        </div>

        <!-- Lembrar-me -->
        <div class="flex items-center">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="rounded border-gray-300 h-4 w-4 text-[#c1a85a] focus:ring-[#c1a85a]"
          />
          <label for="remember" class="ml-2 text-sm text-gray-600">Lembrar-me</label>
        </div>

        <!-- Botões de ação -->
        <div class="flex flex-col space-y-3 sm:space-y-4">
          <!-- Botão de Login -->
          <button
            type="submit"
            :class="[
              'w-full flex items-center justify-center space-x-2 px-6 py-2 sm:py-3 bg-[#c1a85a] text-white font-medium rounded-md focus:outline-none transition-all duration-200 text-sm sm:text-base',
              authStore.loading
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:bg-[#a8924e] hover:shadow-lg transform hover:-translate-y-0.5'
            ]"
            :disabled="authStore.loading"
          >
            <!-- Spinner de loading -->
            <svg
              v-if="authStore.loading"
              class="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ authStore.loading ? 'Entrando...' : 'Entrar' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Rodapé -->
    <div class="mt-4 sm:mt-8 text-center px-4">
      <div class="text-xs sm:text-sm text-gray-600">
        © {{ currentYear }} Polícia Civil da Paraíba - Todos os direitos reservados
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

// Estado reativo
const form = reactive({
  matricula: '',
  password: '',
  remember: false
})

const errors = ref({})
const status = ref('')
const showPassword = ref(false)
const capsLockOn = ref(false)
const currentYear = new Date().getFullYear()

// Refs dos elementos
const matriculaInput = ref(null)
const passwordInput = ref(null)

// Métodos
const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
  if (errors.value.general) {
    delete errors.value.general
  }
  authStore.clearError()
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
    newErrors.matricula = 'A matrícula deve ter exatamente 7 caracteres'
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

  try {
    await authStore.login({
      matricula: form.matricula.trim(),
      password: form.password,
      remember: form.remember
    })

    setTimeout(() => {
      const redirectTo = route.query.redirect || '/'
      router.push(redirectTo)
    }, 1000)

  } catch (err) {
    if (err.response?.status === 422 && err.response?.data?.errors) {
      errors.value = err.response.data.errors
    } else {
      errors.value = {
        general: [authStore.error || 'Erro ao fazer login. Tente novamente.']
      }
    }

    form.password = ''

    if (passwordInput.value) {
      passwordInput.value.focus()
    }
  }
}

onMounted(() => {
  if (matriculaInput.value) {
    matriculaInput.value.focus()
  }
})
</script>

<style scoped>
/* Animação de loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Efeitos de hover nos elementos */
button, a {
  transition: all 0.2s ease-in-out;
}

/* Visual para campos de formulário */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(193, 168, 90, 0.25);
}

/* Responsividade */
@media (max-width: 480px) {
  .max-w-sm {
    max-width: 95%;
  }
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  button,
  a {
    transition-duration: 0.01ms !important;
  }

  .animate-spin {
    animation: none;
  }
}
</style>
