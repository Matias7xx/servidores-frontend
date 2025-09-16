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
        <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Nome do Sistema</h1>
      </div>
    </div>

    <!-- Card de Login -->
    <div class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-gray-200">      
      
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
            />
          </div>
          <div v-if="errors.matricula" class="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
            {{ errors.matricula }}
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
              'w-full flex items-center justify-center space-x-2 px-6 py-2 sm:py-3 bg-[#c1a85a] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c1a85a] transition-all duration-200 text-sm sm:text-base',
              isLoading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:bg-[#c1a85a] hover:shadow-lg transform hover:-translate-y-0.5'
            ]"
            :disabled="isLoading"
          >
            <!-- Spinner de loading -->
            <svg 
              v-if="isLoading" 
              class="animate-spin h-4 w-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? 'Entrando...' : 'Entrar' }}</span>
          </button>

          <!-- Link Esqueci a senha -->
          <button 
            type="button"
            class="text-sm text-gray-600 hover:text-[#c1a85a] underline transition-colors duration-200 text-center"
            @click="handleForgotPassword"
          >
            Esqueceu sua senha?
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Composables
const router = useRouter()
const authStore = useAuthStore()

// Estado reativo
const form = reactive({
  matricula: '',
  password: '',
  remember: false
})

const errors = reactive({})
const status = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const currentYear = new Date().getFullYear()

// Refs dos elementos
const logoRef = ref(null)
const cardRef = ref(null)

// Métodos
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  // Limpar erros anteriores
  Object.keys(errors).forEach(key => delete errors[key])
  
  if (!form.matricula || form.matricula.length !== 7) {
    errors.matricula = 'A matrícula deve ter exatamente 7 caracteres'
  }
  
  if (!form.password || form.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres'
  }
  
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  status.value = ''
  
  try {
    await authStore.login({
      matricula: form.matricula,
      password: form.password,
      remember: form.remember
    })
    
    status.value = 'Login realizado com sucesso!'
    
    // O router guard vai redirecionar automaticamente
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
    
  } catch (error) {
    console.error('Erro no login:', error)
    status.value = 'Erro ao realizar login. Verifique suas credenciais.'
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  // Implementar lógica de esqueci minha senha
  alert('Implementar funcionalidade de recuperação de senha')
}

// Animações de entrada
onMounted(() => {
  // Animação simples
  const elements = document.querySelectorAll('[data-animate]')
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, index * 100)
  })
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
  box-shadow: 0 0 0 2px rgba(234, 179, 8, 0.25);
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