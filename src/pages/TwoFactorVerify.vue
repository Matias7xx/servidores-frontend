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
        <h1 class="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800">
          Verificação em Dois Fatores
        </h1>
      </div>
    </div>

    <!-- Card de Verificação -->
    <div
      class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-neutral-200"
    >
      <!-- Erro -->
      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
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
            />
          </svg>
          <div class="text-sm text-red-600">{{ error }}</div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleVerify" class="space-y-4 sm:space-y-6">
        <!-- Info do Usuário -->
        <div v-if="userInfo" class="bg-neutral-50 rounded-md p-4">
          <p class="text-sm text-neutral-600">Entrando como:</p>
          <p class="font-medium text-neutral-900">{{ userInfo.nome }}</p>
          <p class="text-sm text-neutral-600">Matrícula: {{ userInfo.matricula }}</p>
        </div>

        <!-- Campo de Código -->
        <div>
          <label for="token" class="block text-sm font-medium text-neutral-700 mb-2">
            Código de 6 dígitos
          </label>
          <input
            id="token"
            ref="tokenInput"
            v-model="verificationCode"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="6"
            placeholder="000000"
            autocomplete="one-time-code"
            class="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border border-neutral-300 rounded-md focus:border-transparent"
            :class="{ 'border-red-500': codeError }"
            @input="handleCodeInput"
            required
          />
          <p v-if="codeError" class="mt-2 text-sm text-red-600">
            {{ codeError }}
          </p>
        </div>

        <!-- Botão Verificar -->
        <button
          type="submit"
          :disabled="verifying || verificationCode.length !== 6"
          :class="[
            'w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#c1a85a] text-white font-medium rounded-md focus:outline-none transition-all duration-200',
            verifying || verificationCode.length !== 6
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#a8924e] hover:shadow-lg transform hover:-translate-y-0.5',
          ]"
        >
          <svg
            v-if="verifying"
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
          <span>{{ verifying ? 'Verificando...' : 'Verificar e Entrar' }}</span>
        </button>

        <!-- Botão Voltar -->
        <button
          type="button"
          @click="handleCancel"
          class="w-full text-neutral-600 hover:text-neutral-900 py-2 text-sm font-medium transition-colors"
        >
          ← Voltar para o login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@websanova/vue-auth'
import { twoFactorService } from '../services/twoFactorService'

const router = useRouter()
const auth = useAuth()

// Refs
const tokenInput = ref(null)

// Estado
const verifying = ref(false)
const error = ref('')
const codeError = ref('')
const verificationCode = ref('')
const userInfo = ref(null)
const tempLoginData = ref(null)

// Carregar dados temporários
onMounted(() => {
  const tempData = sessionStorage.getItem('temp_login_data')

  console.log('🔍 TwoFactorVerify - Verificando dados temporários...')
  console.log('tempData:', tempData)

  if (!tempData) {
    console.error('❌ Sem dados temporários!')
    error.value = 'Sessão expirada. Por favor, faça login novamente.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    return
  }

  try {
    tempLoginData.value = JSON.parse(tempData)
    userInfo.value = tempLoginData.value.user
    console.log('✅ Dados temporários carregados:', tempLoginData.value)

    // Focar no campo de código
    setTimeout(() => {
      tokenInput.value?.focus()
    }, 100)
  } catch (err) {
    console.error('❌ Erro ao carregar dados temporários:', err)
    error.value = 'Erro ao carregar dados. Tente fazer login novamente.'
  }
})

// Limpar erro ao digitar
const handleCodeInput = (event) => {
  codeError.value = ''
  error.value = ''
  // Permitir apenas números
  event.target.value = event.target.value.replace(/\D/g, '')
  verificationCode.value = event.target.value
}

// Verificar código
const handleVerify = async () => {
  if (verificationCode.value.length !== 6) {
    codeError.value = 'O código deve ter 6 dígitos'
    return
  }

  verifying.value = true
  codeError.value = ''
  error.value = ''

  try {
    console.log('🔐 Verificando código 2FA...')

    // Primeiro, buscar o secret do usuário
    const statusResult = await twoFactorService.checkStatus(tempLoginData.value.matricula)
    console.log('📡 Status 2FA:', statusResult)

    if (!statusResult.success || !statusResult.hasToken) {
      console.error('❌ 2FA não configurado!')
      error.value = '2FA não configurado. Redirecionando...'
      setTimeout(() => {
        router.push('/2fa/setup')
      }, 1500)
      return
    }

    // Buscar o QR Code para obter o secret (mesmo que já configurado, o backend retorna o secret)
    const qrResult = await twoFactorService.getQRCode(tempLoginData.value.matricula)
    console.log('📡 QR Code data:', qrResult)

    if (!qrResult.success) {
      console.error('❌ Erro ao buscar secret:', qrResult.message)
      error.value = 'Erro ao verificar código. Tente novamente.'
      verifying.value = false
      return
    }

    // Verificar o código
    console.log('🔐 Validando código com secret...')
    const result = await twoFactorService.verifyAndSave(
      tempLoginData.value.matricula,
      qrResult.secret,
      verificationCode.value,
    )

    console.log('📡 Resposta da verificação:', result)

    if (result.success) {
      console.log('✅ Código válido! Autenticando...')

      // Salvar token e user no localStorage
      localStorage.setItem('auth_token', tempLoginData.value.token)
      localStorage.setItem('auth_user', JSON.stringify(tempLoginData.value.user))

      // Configurar no Websanova
      auth.token(null, tempLoginData.value.token, false)
      auth.user(tempLoginData.value.user)

      // Limpar dados temporários
      sessionStorage.removeItem('temp_login_data')

      console.log('✅ Autenticado com sucesso! Redirecionando...')

      // Redirecionar para home
      await router.push('/')
    } else {
      console.error('❌ Código inválido:', result.message)
      codeError.value = result.message
    }
  } catch (err) {
    console.error('❌ Erro na verificação:', err)
    error.value = 'Erro ao verificar código. Tente novamente.'
  } finally {
    verifying.value = false
  }
}

// Cancelar e voltar para login
const handleCancel = () => {
  console.log('↩️ Voltando para login...')
  sessionStorage.removeItem('temp_login_data')
  router.push('/login')
}
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
