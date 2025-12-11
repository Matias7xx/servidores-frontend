<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-4 sm:pt-0 px-4 sm:px-6 bg-linear-to-b from-neutral-50 to-neutral-100"
  >
    <div class="relative z-10 mb-6 sm:mb-3 flex flex-col items-center">
      <div class="mt-3 text-center">
        <h1 class="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800">
          Configurar Autenticação de Dois Fatores
        </h1>
      </div>
    </div>

    <div
      class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-neutral-200"
    >
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

      <div v-if="loading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#c1a85a]"
        ></div>
        <p class="mt-4 text-sm text-neutral-600">Gerando QR Code...</p>
      </div>

      <div v-else-if="qrData" class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 class="font-semibold text-blue-900 mb-2 flex items-center text-sm">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            Como configurar:
          </h3>
          <ol class="text-sm text-blue-800 space-y-1 ml-7 list-decimal">
            <li>
              Instale um
              <strong> APP AUTENTICADOR (Google/Microsoft Authenticator, Authy)</strong> no seu
              celular.
            </li>
            <li>Escaneie o QR Code abaixo com o app.</li>
            <li>Digite o código de 6 dígitos gerado.</li>
          </ol>
        </div>

        <div
          class="flex justify-center p-6 bg-neutral-50 rounded-md border-2 border-dashed border-neutral-300"
        >
          <img :src="qrData.qrSrc" alt="QR Code" class="w-64 h-64" />
        </div>

        <div class="text-center">
          <p class="text-xs text-neutral-600 mb-2">Ou digite o código manualmente:</p>
          <div
            class="bg-neutral-100 px-4 py-2 rounded font-mono text-sm text-neutral-800 inline-block break-all"
          >
            {{ qrData.secret }}
          </div>
        </div>

        <form @submit.prevent="handleVerify" class="space-y-4 pt-4">
          <div>
            <label for="token" class="block text-sm font-medium text-neutral-700 mb-2">
              Código de Verificação
            </label>
            <input
              id="token"
              v-model="verificationCode"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="6"
              placeholder="000000"
              class="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border border-neutral-300 rounded-md focus:border-transparent"
              :class="{ 'border-red-500': codeError }"
              @input="handleCodeInput"
              required
            />
            <p v-if="codeError" class="mt-2 text-sm text-red-600">
              {{ codeError }}
            </p>
          </div>

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
            <span>{{ verifying ? 'Verificando...' : 'Ativar 2FA' }}</span>
          </button>

          <button
            type="button"
            @click="handleVoltar"
            class="w-full text-neutral-600 hover:text-neutral-900 py-2 text-sm font-medium transition-colors"
          >
            ← Voltar para o login
          </button>
        </form>
      </div>
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

const loading = ref(true)
const verifying = ref(false)
const error = ref('')
const codeError = ref('')
const qrData = ref(null)
const verificationCode = ref('')
const tempLoginData = ref(null)

onMounted(async () => {
  const tempData = sessionStorage.getItem('temp_login_data')

  if (!tempData) {
    error.value = 'Sessão expirada. Por favor, faça login novamente.'
    setTimeout(() => router.push('/login'), 2000)
    return
  }

  try {
    tempLoginData.value = JSON.parse(tempData)
    const result = await twoFactorService.getQRCode(tempLoginData.value.matricula)

    if (result.success) {
      qrData.value = result
    } else {
      error.value = result.message
    }
  } catch {
    error.value = 'Erro ao carregar configuração do 2FA'
  } finally {
    loading.value = false
  }
})

const handleCodeInput = (event) => {
  codeError.value = ''
  event.target.value = event.target.value.replace(/\D/g, '')
  verificationCode.value = event.target.value
}

const handleVerify = async () => {
  if (verificationCode.value.length !== 6) {
    codeError.value = 'O código deve ter 6 dígitos'
    return
  }

  verifying.value = true
  codeError.value = ''
  error.value = ''

  try {
    const result = await twoFactorService.verifyAndSave(
      tempLoginData.value.matricula,
      qrData.value.secret,
      verificationCode.value,
    )

    if (result.success) {
      localStorage.setItem('auth_token', tempLoginData.value.token)
      localStorage.setItem('auth_user', JSON.stringify(tempLoginData.value.user))

      auth.token(null, tempLoginData.value.token, false)
      auth.user(tempLoginData.value.user)

      sessionStorage.removeItem('temp_login_data')
      await router.push('/')
    } else {
      codeError.value = result.message
    }
  } catch {
    codeError.value = 'Erro ao verificar código. Tente novamente.'
  } finally {
    verifying.value = false
  }
}

const handleVoltar = () => {
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
